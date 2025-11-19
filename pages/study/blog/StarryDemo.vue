<script setup lang="ts">
import { ref } from 'vue'

const showFullScreen = ref(false)

const toggleView = () => {
  showFullScreen.value = !showFullScreen.value
}
</script>

<template>
  <div class="min-h-screen w-full bg-gray-900 p-8">
    <h1 class="text-3xl font-bold text-white mb-8 text-center">星空背景组件展示</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <!-- 大尺寸卡片 -->
      <div class="col-span-1 md:col-span-2 relative h-[300px] overflow-hidden rounded-xl bg-gray-800/50">
        <BlogStarry  />
        <div class="relative z-10 h-full flex items-center justify-center p-6">
          <div class="text-center text-white">
            <h2 class="text-2xl font-bold mb-4">大型展示区域</h2>
            <p class="text-gray-300 mb-4">适合用作页面主要内容区域的背景</p>
            <button class="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300">
              了解更多
            </button>
          </div>
        </div>
      </div>

      <!-- 中等尺寸卡片 -->
      <div class="relative h-[250px] overflow-hidden rounded-xl bg-gray-800/50">
        <BlogStarry  />
        <div class="relative z-10 h-full flex items-center justify-center p-6">
          <div class="text-center text-white">
            <h2 class="text-xl font-semibold mb-2">中型卡片</h2>
            <p class="text-sm text-gray-300">适合展示重要信息或功能区块</p>
          </div>
        </div>
      </div>

      <!-- 小尺寸卡片 -->
      <div class="relative h-[200px] overflow-hidden rounded-xl bg-gray-800/50">
        <BlogStarry  />
        <div class="relative z-10 h-full flex items-center justify-center p-6">
          <div class="text-center text-white">
            <h2 class="text-xl font-semibold mb-2">小型卡片</h2>
            <p class="text-sm text-gray-300">适合用作装饰元素</p>
          </div>
        </div>
      </div>

      <!-- 超小尺寸卡片 -->
      <div class="col-span-1 md:col-span-2 max-w-md mx-auto relative h-[150px] overflow-hidden rounded-xl bg-gray-800/50">
        <BlogStarry  />
        <div class="relative z-10 h-full flex items-center justify-center p-4">
          <div class="text-center text-white">
            <h2 class="text-lg font-semibold mb-1">迷你卡片</h2>
            <p class="text-xs text-gray-300">点缀式使用</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>