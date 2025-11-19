<script setup lang="ts">
import { computed } from 'vue'

interface Tag {
  name: string
  count?: number
  color?: string
}

interface Props {
  tags: Tag[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '标签云',
  tags: () => []
})

// 预定义的渐变色方案 - 使用更柔和的色调组合
const gradientColors = [
  'from-blue-100 to-blue-200',
  'from-teal-100 to-teal-200',
  'from-purple-100 to-purple-200',
  'from-rose-100 to-rose-200',
  'from-amber-100 to-amber-200',
  'from-indigo-100 to-indigo-200',
  'from-green-100 to-green-200',
  'from-sky-100 to-sky-200',
  'from-gray-100 to-gray-200',
  'from-slate-100 to-slate-200'
]

// 为每个标签分配渐变色（使用固定索引替代随机数）
const tagStyles = computed(() => {
  return props.tags.map((tag, index) => ({
    ...tag,
    gradient: tag.color || gradientColors[index % gradientColors.length]
  }))
})

// 处理标签点击事件
const handleTagClick = (tag: any) => {
  navigateTo(`/tags/${tag.id}?name=${tag.name}`)
}
</script>

<template>
  <div class="tag-cloud-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/80 dark:to-gray-800/80 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl dark:shadow-gray-800/30">
    <!-- 毛玻璃背景效果 -->
    <div class="absolute inset-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl z-0"></div>
    
    <!-- 装饰性背景图案 -->
    <div class="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full blur-2xl"></div>
    <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 dark:from-green-400/10 dark:to-teal-400/10 rounded-full blur-2xl"></div>

    <!-- 内容区域 -->
    <div class="relative z-10">
      <!-- 标题 -->
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"></path>
        </svg>
        {{ title }}
      </h3>
      
      <!-- 标签云 -->
      <div class="flex flex-wrap gap-2">
        <div
          v-for="tag in tagStyles"
          :key="tag.name"
          class="group relative inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
          :class="`bg-gradient-to-r ${tag.gradient} text-gray-600 dark:text-gray-800 shadow-sm hover:shadow-lg`"
          @click="handleTagClick(tag)"
        >
          <span>{{ tag.name }}</span>
          <span
            v-if="tag.count !== undefined"
            class="ml-1.5 px-1.5 py-0.5 text-xs bg-gray-600/10 dark:bg-gray-800/10 rounded-full"
          >
            {{ tag.count }}
          </span>
          
          <!-- 悬浮效果 -->
          <div class="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag-cloud-card {
  max-width: 400px;
  margin: 2rem auto;
}

/* 添加卡片悬停时的光晕效果 */
.tag-cloud-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 50%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.tag-cloud-card:hover::before {
  opacity: 1;
}

/* 深色模式下的光晕效果 */
.dark .tag-cloud-card::before {
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 50%
  );
}
</style>