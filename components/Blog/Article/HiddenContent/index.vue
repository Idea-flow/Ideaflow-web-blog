<script setup lang="ts">
interface Props {
  isAllowed: boolean
  content?: string
  tipText?: string
}

const props = withDefaults(defineProps<Props>(), {
  isAllowed: false,
  content: '',
  tipText: '付费可见'
})
</script>

<template>
  <div class="relative my-6 p-5 rounded-lg border border-dashed border-indigo-300 dark:border-indigo-600 overflow-hidden
              bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-900
              backdrop-blur-sm transition-all duration-300
              hover:shadow-lg hover:border-indigo-400 dark:hover:border-indigo-500
              w-full max-w-4xl mx-auto min-h-[120px]">
    <!-- 允许查看时显示实际内容 -->
    <div v-if="isAllowed" class="prose dark:prose-invert max-w-none transition-all duration-300 dark:text-gray-200">
      <!-- 解锁成功图标 -->
      <div class="absolute top-3 right-3 w-6 h-6 transform transition-all duration-500 ease-out animate-fade-in
                  opacity-90 hover:opacity-100 hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-green-500 dark:stroke-green-400 hover:stroke-green-600 dark:hover:stroke-green-300 transition-colors">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      </div>
      <slot>{{ content }}</slot>
    </div>
    
    <!-- 不允许查看时显示提示区域 -->
    <div v-else class="relative">
      
      <!-- 提示信息层 -->
      <div class="absolute inset-0 flex flex-col items-center justify-center mt-8
                  bg-gradient-to-b from-transparent via-white/60 to-white/60
                  dark:via-gray-900/60 dark:to-gray-900/60
                  backdrop-blur-[2px]">
        <div class="text-2xl text-indigo-500 dark:text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-0.5">
          {{ tipText }}
        </h3>
        <p class="text-sm text-indigo-400 dark:text-indigo-300">
          解锁精彩内容
        </p>
      </div>
    </div>
    
    <!-- 装饰元素 - 仅在未解锁状态显示 -->
    <div v-if="!isAllowed" class="absolute top-3 right-3 w-6 h-6 text-indigo-400 dark:text-indigo-500 opacity-60">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    </div>
  </div>
</template>

<style scoped>

</style>