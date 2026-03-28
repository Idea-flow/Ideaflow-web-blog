<script setup lang="ts">
import { ref } from 'vue'

// 主题模式（light/dark）
const theme = ref('light')
// 是否折叠目录
const isCollapsed = ref(false)

// 切换主题
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// 切换折叠状态
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-end space-x-4 mb-4">
      <button 
        class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        @click="toggleTheme"
      >
        切换主题
      </button>
      <button 
        class="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
        @click="toggleCollapse"
      >
        {{ isCollapsed ? '展开目录' : '折叠目录' }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- 文章内容区域 -->
      <div class="lg:col-span-3" id="article-content">
        <div class="prose dark:prose-invert max-w-none">
          <h1>Vue3 组件开发指南</h1>
          
          <h2>1. 组件基础</h2>
          <p>Vue3 组件是 Vue 应用程序的基本构建块。组件可以将界面分成独立可重用的部分，每个部分都可以独立维护和开发。</p>
          
          <h3>1.1 组件注册</h3>
          <p>在 Vue3 中，我们可以使用 defineComponent 函数来定义组件，这提供了更好的类型推导。</p>
          
          <h3>1.2 组件通信</h3>
          <p>组件之间的通信是构建应用程序的重要部分，Vue3 提供了多种通信方式。</p>
          
          <h2>2. 组合式 API</h2>
          <p>组合式 API 是 Vue3 中最重要的特性之一，它提供了更灵活的逻辑组织方式。</p>
          
          <h3>2.1 响应式系统</h3>
          <p>Vue3 的响应式系统使用 Proxy 来实现，这带来了更好的性能和更强大的功能。</p>
          
          <h4>2.1.1 ref 和 reactive</h4>
          <p>ref 和 reactive 是两个最基本的响应式 API，它们用于创建响应式数据。</p>
          
          <h3>2.2 生命周期钩子</h3>
          <p>组合式 API 提供了一套新的生命周期钩子，它们都以 on 开头。</p>
          
          <h2>3. 性能优化</h2>
          <p>Vue3 提供了多种性能优化的方式，包括更好的 Tree-shaking 支持和更高效的响应式系统。</p>
          
          <h3>3.1 编译优化</h3>
          <p>Vue3 的编译器能够生成更优化的代码，减少运行时开销。</p>
          
          <h3>3.2 渲染优化</h3>
          <p>虚拟 DOM 的优化和 Fragment 的支持使得渲染性能得到了显著提升。</p>
        </div>
      </div>

      <!-- 目录区域 -->
      <div class="lg:col-span-1">
        <div class="sticky top-4">
          <BlogArticleCatalog
            containerId="article-content"
            :theme="theme"
            :collapsed="isCollapsed"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose {
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.dark .prose {
  background-color: rgb(31, 41, 55);
  color-scheme: dark;
}
</style>