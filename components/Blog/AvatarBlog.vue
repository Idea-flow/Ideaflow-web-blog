<!--头像组件-->

<template>
  <div class="relative inline-block mr-4 group">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      loading="lazy"
      class="w-10 h-10 rounded-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 dark:ring-2 dark:ring-offset-2 dark:ring-offset-black dark:ring-primary-400 cursor-pointer active:scale-95"
      @error="handleImageError"
    />
    <div
      v-else
      class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer active:scale-95"
    >
      <svg
        class="w-6 h-6 text-gray-400 dark:text-gray-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    
    <!-- 悬浮提示 -->
<!--    <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">-->
<!--      <div class="bg-gray-800 dark:bg-gray-700 text-white text-sm py-1 px-2 rounded shadow-lg whitespace-nowrap">-->
<!--        {{ tooltipText }}-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src?: string
  alt?: string
  tooltipText?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: '用户头像',
  tooltipText: '用户头像'
})

const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.src = 'https://oss.ideaflow.top/configImg/default-avatar.webp' // 设置默认头像路径
  }
}
</script>