<script setup lang="ts">
import {ref, nextTick, computed} from 'vue'
import EmojiPicker from '~/components/im/web/right/Input/EmojiPicker.vue'
import ImageUploader from '~/components/im/web/right/Input/ImageUploader.vue'
const emit = defineEmits<{
  'send': [content: string, type: number] // type: 0-文本, 1-图片,
}>()

// 输入框内容
const messageInput = ref('')
const inputRef = ref<HTMLDivElement | null>(null)

// 处理表情选择
const handleEmojiSelect = (emoji: string) => {
  messageInput.value += emoji
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.textContent = messageInput.value
    }
  })
}


// 处理键盘事件
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    if (e.ctrlKey) {
      // Ctrl+Enter: 换行
      e.preventDefault()
      document.execCommand('insertLineBreak')
    } else {
      // Enter: 发送
      e.preventDefault()
      if (!messageInput.value.trim()) return
      emit('send', messageInput.value, 0)
      messageInput.value = ''
      if (inputRef.value) {
        inputRef.value.textContent = ''
      }
    }
  }
}

// 处理输入内容更新
const handleInput = (e: Event) => {
  const target = e.target as HTMLDivElement
  messageInput.value = target.textContent || ''
}

const appStore = useAppStore()
//appStore.mobile
const isMobile = computed(() => appStore.mobile)
</script>

<template>
  <div class="shadow-lg rounded-lg bg-white/10 dark:bg-gray-800/20 ">
    <div class="flex space-x-2 px-4 py-2">
      <EmojiPicker @select="handleEmojiSelect" />
      <ImageUploader @select="(content, type) => emit('send', content, type)" />
    </div>


    <!-- Web端输入框 -->
    <div v-if="!isMobile" class="relative">
      <div
        ref="inputRef"
        contenteditable="true"
        data-placeholder="Enter：发送 | Ctrl+Enter：换行"
        class="w-full pl-4 py-2 min-h-[120px] max-h-[200px] focus:outline-none overflow-y-auto
        text-gray-800 dark:text-gray-200 transition-colors duration-200
        empty:before:content-[attr(data-placeholder)] before:text-gray-400/70 dark:before:text-gray-500/70"
        @keydown="handleKeydown"
        @input="handleInput"
      ></div>
    </div>

    <!-- 移动端输入框 -->
    <div v-else class="relative">
      <div
        ref="inputRef"
        contenteditable="true"
        class="w-full px-3 py-2 min-h-[50px] max-h-[100px] focus:outline-none overflow-y-auto
        text-gray-800 dark:text-gray-200 transition-colors duration-200
        text-base leading-normal"
        @keydown="handleKeydown"
        @input="handleInput"
      ></div>
    </div>
  </div>
</template>

<style scoped>

</style>