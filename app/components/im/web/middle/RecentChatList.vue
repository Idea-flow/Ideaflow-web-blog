<script setup lang="ts">
import {useImStore} from "~/stores/ImStore";
import {computed} from "vue";

const props = defineProps<{
  chats: any[],
  currentChat?: any
}>()

const emit = defineEmits<{
  'select-chat': [value: any]
}>()
const imStore = useImStore()
const groupList = computed(() => imStore.groupList)
const friendList = computed(() => imStore.friendList)

// 选择聊天
const selectChat = (chat: any) => {
  emit('select-chat', chat)
}

// 处理名字显示
const formatName = (name: string) => {
  if (name.length > 9) {
    return name.slice(0, 9) + '...'
  }
  return name
}

// 根据名字长度判断是否使用小字体
const getNameClass = (name: string) => {
  return name.length > 5 ? 'text-sm' : ''
}

// 判断是否为当前选中的聊天
const isCurrentChat = (chat: any) => {
  return props.currentChat?.id === chat.id
}

// 获取身份标识文本
const getIdentificationText = (chat: any) => {
  let identification = null

  if (chat.type === 'private') {
    const friend = friendList.value.find(f => f.id == chat.id)
    // console.log("chat.id ",chat.id)
    // console.log("JSON.stringify(friendList.value) ",JSON.stringify(friendList.value))
    // console.log("'private':friend-",friend)
    identification = friend?.identification
    
    switch (identification) {
      case 1: return '站长'
      case 2: return '练气境'
      case 3: return '筑基境'
      case 4: return '金丹境'
      case 5: return '元婴境'
      default: return ''
    }
  } else if (chat.type === 'group') {
    const group = groupList.value.find(g => g.id == chat.id)
    identification = group?.identification
    
    switch (identification) {
      case 1: return '官方群'
      case 2: return '个人群'
      default: return ''
    }
  }
  return ''
}

// 获取身份标识样式类
const getIdentificationClass = (chat: any) => {
  let identification = null
  
  if (chat.type === 'private') {
    const friend = friendList.value.find(f => f.id == chat.id)
    identification = friend?.identification
  } else if (chat.type === 'group') {
    const group = groupList.value.find(g => g.id == chat.id)
    identification = group?.identification
  }
  
  if (!identification) return ''
  
  const baseClass = 'ml-1 px-1 py-0.5 text-[10px] rounded backdrop-blur-sm'
  
  if (chat.type === 'private') {
    switch (identification) {
      case 1: return `${baseClass} bg-green-100/40 text-green-800 dark:text-green-200`
      case 2: return `${baseClass} bg-purple-500/30 text-purple-700 dark:text-purple-300`
      case 3: return `${baseClass} bg-purple-500/30 text-purple-700 dark:text-purple-300`
      case 4: return `${baseClass} bg-pink-500/30 text-pink-700 dark:text-pink-300`
      case 5: return `${baseClass} bg-red-500/30 text-red-700 dark:text-red-300`
      default: return ''
    }
  } else if (chat.type === 'group') {
    switch (identification) {
      case 1: return `${baseClass} bg-yellow-500/30 text-yellow-700 dark:text-yellow-300`
      case 2: return `${baseClass} bg-purple-500/30 text-purple-700 dark:text-purple-300`
      default: return ''
    }
  }
  return ''
}
</script>

<template>
  <div class="space-y-1">
    <div class="text-lg font-semibold mb-4 text-text-base">最近聊天</div>
    <div v-for="chat in chats" :key="chat.id" 
         @click="selectChat(chat)"
         :class="[
           'p-2 rounded-lg cursor-pointer transition-all duration-200',
           isCurrentChat(chat) 
             ? 'bg-white/20 dark:bg-gray-700/30 '
             : 'hover:bg-white/20 dark:hover:bg-gray-700/30'
         ]">
      <div class="flex items-center">
        <div v-if="chat.avatar" class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img :src="chat.avatar" :alt="chat.name" class="w-full h-full object-cover">
        </div>
        <div v-else class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-lg font-medium flex-shrink-0">
          {{ chat.name.charAt(0) }}
        </div>
        <div class="flex-1 min-w-0 ml-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="['font-medium whitespace-nowrap overflow-hidden overflow-ellipsis text-text-base', getNameClass(chat.name)]" style="max-width: 150px">
                {{ formatName(chat.name) }}
              </div>
              <span :class="getIdentificationClass(chat)">
                {{ getIdentificationText(chat) }}
              </span>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{{ chat.time }}</div>
          </div>
          <div class="text-xs text-gray-600/80 dark:text-gray-400/80 mt-1 whitespace-nowrap overflow-hidden overflow-ellipsis" style="max-width: 200px">{{ chat.lastMessage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>