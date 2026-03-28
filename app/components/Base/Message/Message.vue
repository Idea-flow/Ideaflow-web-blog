<template>
  <Teleport to="body">
    <TransitionGroup
      tag="div"
      :name="transition"
      class="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
    >
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          'max-w-sm px-4 py-2 rounded-lg shadow-lg backdrop-blur-md pointer-events-auto',
          'flex items-center gap-2 transition-all duration-300 ease-out',
          message.type === 'success' ? 'bg-green-500/80 text-white' :
          message.type === 'error' ? 'bg-red-500/80 text-white' :
          message.type === 'warning' ? 'bg-yellow-500/80 text-white' :
          'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white'
        ]"
      >
        <!-- 图标 -->
        <span class="flex-shrink-0">
          <svg v-if="message.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else-if="message.type === 'error'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else-if="message.type === 'warning'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        
        <!-- 消息内容 -->
        <span class="flex-1 text-sm font-medium">{{ message.content }}</span>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Message {
  id: number
  content: string
  type: 'info' | 'success' | 'warning' | 'error'
  duration: number
}

const messages = ref<Message[]>([])
const transition = 'message'
let messageId = 0

// 添加消息
const show = (content: string, type: Message['type'] = 'info', duration = 3000) => {
  const id = ++messageId
  const message: Message = {
    id,
    content,
    type,
    duration
  }
  
  messages.value.push(message)
  
  if (duration > 0) {
    setTimeout(() => {
      close(id)
    }, duration)
  }
  
  return id
}

// 关闭消息
const close = (id: number) => {
  const index = messages.value.findIndex(msg => msg.id === id)
  if (index !== -1) {
    messages.value.splice(index, 1)
  }
}

// 导出方法
defineExpose({
  show,
  success: (content: string, duration?: number) => show(content, 'success', duration),
  error: (content: string, duration?: number) => show(content, 'error', duration),
  warning: (content: string, duration?: number) => show(content, 'warning', duration),
  info: (content: string, duration?: number) => show(content, 'info', duration),
  close
})
</script>

<style scoped>

</style>