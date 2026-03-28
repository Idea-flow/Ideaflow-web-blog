<script setup lang="ts">
interface Props {
  placeholder?: string
  parentId?: number
  replyToUserId?: number
  replyToUserName?: string
  position?: 'fixed' | 'relative'
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '写下你的评论...',
  position: 'relative'
})

const emit = defineEmits<{
  'submit': [content: string, parentId?: number, replyToUserId?: number]
  'cancel': []
}>()

const commentContent = ref('')
const isSubmitting = ref(false)
const inputRef = ref<HTMLTextAreaElement | null>(null)

// 自动调整文本框高度
const adjustHeight = () => {
  if (inputRef.value) {
    inputRef.value.style.height = 'auto'
    inputRef.value.style.height = `${inputRef.value.scrollHeight}px`
  }
}

// 提交评论
const handleSubmit = async () => {
  if (!commentContent.value.trim() || isSubmitting.value) return

  try {
    isSubmitting.value = true
    emit('submit', commentContent.value, props.parentId, props.replyToUserId)
    commentContent.value = ''
    adjustHeight()
  } finally {
    isSubmitting.value = false
  }
}

// 取消评论
const handleCancel = () => {
  commentContent.value = ''
  adjustHeight()
  emit('cancel')
}

// 监听Cmd+Enter或Ctrl+Enter提交
const handleKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    handleSubmit()
  }
}

// 在mounted时聚焦输入框
onMounted(() => {
  if (inputRef.value && props.replyToUserName) {
    inputRef.value.focus()
  }
})
</script>

<template>
  <div :class="[
    'comment-input-container transition-all duration-300 ease-out w-full',
    position === 'fixed' ? 
      'fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-lg transform translate-y-0 sm:static sm:p-0 sm:bg-transparent sm:border-none sm:shadow-none' : 
      'relative'
  ]">
    <div class="w-full">
      <!-- 回复信息 -->
      <div v-if="replyToUserName" 
           class="flex items-center justify-between mb-2 text-sm text-gray-500 dark:text-gray-400 px-4 sm:px-0">
        <span class="flex items-center space-x-1">
          <span>回复</span>
          <span class="text-blue-500 dark:text-blue-400">@{{ replyToUserName }}</span>
        </span>
        <button @click="handleCancel"
                class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
          取消回复
        </button>
      </div>

      <!-- 输入区域 -->
      <div class="relative rounded-2xl overflow-hidden bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm
                  border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ease-out
                  focus-within:border-blue-500/30 dark:focus-within:border-blue-500/30
                  focus-within:ring-2 focus-within:ring-blue-500/20 dark:focus-within:ring-blue-500/20">
        <textarea
          ref="inputRef"
          v-model="commentContent"
          :placeholder="placeholder"
          rows="2"
          @input="adjustHeight"
          @keydown="handleKeydown"
          class="w-full p-4 bg-transparent resize-none outline-none
                 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500
                 min-h-[80px] max-h-[300px] transition-all duration-300"
        />

        <!-- 工具栏 -->
        <div class="flex items-center justify-between px-4 py-3 bg-gray-100/50 dark:bg-gray-800/50">
          <div class="text-xs text-gray-400 dark:text-gray-500">
            按下 Cmd/Ctrl + Enter 发送
          </div>
          <button
            @click="handleSubmit"
            :disabled="!commentContent.trim() || isSubmitting"
            :class="[
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 transform',
              commentContent.trim() && !isSubmitting ?
                'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95' :
                'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            ]"
          >
            {{ isSubmitting ? '发送中...' : '发送' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-input-container {
  z-index: 10;
}

@media (max-width: 640px) {
  .comment-input-container[data-position="fixed"] {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>