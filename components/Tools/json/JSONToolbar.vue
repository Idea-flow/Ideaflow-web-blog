<template>
  <div class="json-toolbar p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <!-- 左侧按钮组 -->
      <div class="flex flex-wrap items-center gap-2">
        <button 
          @click="$emit('toggle-expand')"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValid"
          :title="isExpanded ? '折叠所有节点' : '展开所有节点'"
        >
          <svg class="w-4 h-4" :class="{ 'rotate-90': isExpanded }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
          <span class="hidden sm:inline">{{ isExpanded ? '折叠' : '展开' }}</span>
        </button>
        
        <button 
          @click="$emit('format')"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValid"
          title="格式化 JSON"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <span class="hidden sm:inline">格式化</span>
        </button>
        
        <button 
          @click="$emit('minify')"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValid"
          title="压缩 JSON"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8" />
          </svg>
          <span class="hidden sm:inline">压缩</span>
        </button>
        
        <button 
          @click="$emit('copy')"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValid"
          title="复制到剪贴板"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          <span class="hidden sm:inline">复制</span>
        </button>
        
<!--        <button -->
<!--          @click="$emit('toggle-mode')"-->
<!--          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"-->
<!--          :disabled="!isValid"-->
<!--          title="比较模式"-->
<!--        >-->
<!--          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />-->
<!--          </svg>-->
<!--          <span class="hidden sm:inline">比较</span>-->
<!--        </button>-->
      </div>
      
      <!-- 右侧统计信息 -->
      <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <div v-if="stats.nodes > 0" class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>{{ stats.nodes }} 节点</span>
        </div>
        
        <div v-if="stats.depth > 0" class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <span>深度 {{ stats.depth }}</span>
        </div>
        
        <div v-if="stats.size > 0" class="hidden sm:flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
          <span>{{ formatSize(stats.size) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isValid: {
    type: Boolean,
    default: false
  },
  isExpanded: {
    type: Boolean,
    default: false
  },
  stats: {
    type: Object,
    default: () => ({ nodes: 0, depth: 0, size: 0 })
  }
})

defineEmits(['toggle-expand', 'format', 'minify', 'copy', 'toggle-mode'])

// 格式化文件大小
const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
</script>

<style scoped>
.toolbar-button {
  @apply flex items-center space-x-1 px-2 py-1.5 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors;
}

.toolbar-button svg {
  @apply transition-transform duration-200;
}
</style>