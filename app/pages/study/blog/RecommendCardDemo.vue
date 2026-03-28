<script setup lang="ts">
import RecommendCard from '~/components/Blog/Sidebar/RecommendCard/RecommendCard.vue'

// 示例文章数据
const articles = [
  {
    id: 1,
    title: '深入理解 Vue3 Composition API',
    cover: 'https://oss.ideaflow.top/configImg/backgroundImg.jpg',
    createTime: '2024-01-15',
    order: 1
  },
  {
    id: 2,
    title: 'TailwindCSS 实战：构建现代化UI界面',
    cover: 'https://oss.ideaflow.top/configImg/backgroundImg.jpg',
    createTime: '2024-01-14',
    order: 2
  },
  {
    id: 3,
    title: 'TypeScript 高级特性详解',
    cover: 'https://oss.ideaflow.top/configImg/backgroundImg.jpg',
    createTime: '2024-01-13',
    order: 3
  }
]
</script>

<template>
  <div class="p-8 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">推荐文章卡片组件示例</h1>
    
    <!-- 基础用法 -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">基础用法</h2>
      <div class="max-w-2xl">
        <RecommendCard :articles="articles" />
      </div>
    </div>
    
    <!-- 自定义显示数量 -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">自定义显示数量（显示2条）</h2>
      <div class="max-w-2xl">
        <RecommendCard :articles="articles" :max-display="2" />
      </div>
    </div>
  </div>
</template>