<script setup lang="ts">
import { computed, ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps<{
  messages: Array<{
    id: number | string
    content: string
    type: number
    sendTime: string
    avatar: string
    isSelf: boolean
    username: string // 只有group的时候有值
  }>
  currentChat: {
    id: number
    name: string
    avatar: string
    type: string // private, group
  }
}>()

// console.log("消息展示--",JSON.stringify(props.messages))
// 消息容器的引用
const messageContainer = ref<HTMLElement | null>(null)

// 滚动到底部的方法
const scrollToBottom = () => {
  console.log("messageContainer.value:",messageContainer.value)
  console.log("messageContainer.value.scrollTop:",messageContainer.value.scrollTop)
  console.log("messageContainer.value.scrollHeight:",messageContainer.value.scrollHeight)
  if (messageContainer.value) {
    console.log("messageContainer.value:jinlaile ")
    let scrollHeight = messageContainer.value.scrollHeight;
    messageContainer.value.scrollTop = scrollHeight
    console.log("messageContainer.value.scrollHeight2:",scrollHeight)
    console.log("messageContainer.value.scrollTop2:",messageContainer.value.scrollTop)
  }
  // console.log("messageContainer.value.scrollTop:",messageContainer.value.scrollTop)
  // console.log("messageContainer.value.scrollHeight:",messageContainer.value.scrollHeight)
}

// 监听消息列表变化
watch(() => props.messages, () => {
  // 使用nextTick确保DOM更新后再滚动
  nextTick(() => {
    scrollToBottom()
  })
}, { deep: true })

// 组件挂载时滚动到底部
onMounted(() => {
  scrollToBottom()
})

// 格式化时间显示
const formatTime = (time: string) => {
  const messageDate = new Date(time)
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  // 判断是否是同一年
  if (messageDate.getFullYear() !== now.getFullYear()) {
    return messageDate.toLocaleDateString()
  }

  // 判断是否是昨天
  if (
    messageDate.getDate() === yesterday.getDate() &&
    messageDate.getMonth() === yesterday.getMonth() &&
    messageDate.getFullYear() === yesterday.getFullYear()
  ) {
    return `昨天 ${messageDate.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}` 
  }

  // 判断是否是今天
  if (
    messageDate.getDate() === now.getDate() &&
    messageDate.getMonth() === now.getMonth() &&
    messageDate.getFullYear() === now.getFullYear()
  ) {
    return messageDate.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  // 今年其他日期
  return messageDate.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
}

// 计算需要显示时间的消息索引
const timeDisplayIndices = computed(() => {
  const indices = new Set<number>()
  let lastMessageTime: number | null = null

  props.messages.forEach((message, index) => {
    const currentTime = new Date(message.sendTime).getTime()
    
    // 第一条消息总是显示时间
    if (index === 0) {
      indices.add(index)
      lastMessageTime = currentTime
      return
    }

    // 如果与上一条消息相差超过10分钟，显示时间
    if (lastMessageTime && (currentTime - lastMessageTime) >= 10 * 60 * 1000) {
      indices.add(index)
    }

    lastMessageTime = currentTime
  })

  return indices
})

// 获取头像或首字符
const getAvatarDisplay = (message: any) => {
  if (message.avatar) return { type: 'image', value: message.avatar }
  
  const name = message.isSelf ? '我' : (message.username || props.currentChat.name)
  return {
    type: 'text',
    value: name.charAt(0),
    bgClass: `bg-gradient-to-br from-emerald-300 via-green-200 to-sky-200 dark:from-emerald-600 dark:via-green-500 dark:to-sky-500`
  }
}
</script>

<template>
  <div ref="messageContainer" class="flex-1 p-4 overflow-y-auto">
    <div v-if="currentChat" class="space-y-3">
      <template v-for="(message, index) in messages" :key="message.id">
        <!-- 时间分割线 -->
        <div v-if="timeDisplayIndices.has(index)" class="flex justify-center my-2">
          <span class="px-3 py-1 text-xs bg-gray-50/90 dark:bg-gray-800/90 rounded-full text-gray-500 dark:text-gray-400 shadow-sm backdrop-blur-sm">
            {{ formatTime(message.sendTime) }}
          </span>
        </div>

        <!-- 系统消息 -->
        <div v-if="message.type === 21" class="flex justify-center my-2">
          <span class="px-3 py-1 text-sm text-gray-500 dark:text-gray-400">
            {{ message.content }}
          </span>
        </div>

        <!-- 普通消息气泡 -->
        <div v-else :class="['flex items-start', message.isSelf ? 'flex-row-reverse' : '']">
          <!-- 头像 -->
          <div class="flex-shrink-0" :class="[message.isSelf ? 'ml-2' : 'mr-2']">
            <template v-if="getAvatarDisplay(message).type === 'image'">
              <img :src="getAvatarDisplay(message).value" 
                   :alt="message.isSelf ? '我' : currentChat.name"
                   class="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-white/90 dark:ring-gray-800/90 hover:scale-105 transition-transform duration-200"
              >
            </template>
            <template v-else>
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium text-white shadow-sm ring-1 ring-white/90 dark:ring-gray-800/90 hover:scale-105 transition-transform duration-200',
                getAvatarDisplay(message).bgClass
              ]">
                {{ getAvatarDisplay(message).value }}
              </div>
            </template>
          </div>
          
          <!-- 消息内容区域 -->
          <div :class="['max-w-[45%]', message.isSelf ? 'flex flex-col items-end' : 'flex flex-col items-start']">
            <!-- 群聊中显示发送者名称 -->
            <p v-if="currentChat.type === 'group' && !message.isSelf" class="text-sm text-gray-500 dark:text-gray-400 px-1 mb-1">
              {{ message.username }}
            </p>
            
            <!-- 文本消息 -->
            <p v-if="message.type === 0" 
               :class="[
                 'p-2.5 rounded-lg break-words whitespace-pre-wrap w-full',
                 message.isSelf 
                   ? 'bg-emerald-200 dark:bg-emerald-500 text-gray-800 dark:text-gray-800'
                   : 'bg-blue-100 dark:bg-blue-300 text-gray-800 dark:text-gray-800'
               ]"
            >{{ message.content }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}
</style>