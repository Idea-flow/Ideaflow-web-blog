<script setup lang="ts">

</script>

<template>
<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8 text-center">学习示例导航</h1>
  
  <!-- Base 组件示例 -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Base 组件示例</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink to="/study/base/fixed-action-bar" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">fixed-action-bar示例</h3>
      </NuxtLink>
      <NuxtLink to="/study/base/affix-demo" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">affix示例</h3>
      </NuxtLink>
      <NuxtLink to="/study/base/DrawerDemo" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">Drawer 抽屉示例</h3>
      </NuxtLink>
      <NuxtLink to="/study/base/dialog" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">Dialog 示例</h3>
      </NuxtLink>
      <NuxtLink to="/study/base/tabs" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">tabs 示例</h3>
      </NuxtLink>
      <NuxtLink to="/study/base/DropdownDemo" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">Dropdown 下拉菜单示例</h3>
      </NuxtLink>
      <NuxtLink to="/study/base/MenuDemo" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">Menu 菜单示例</h3>
      </NuxtLink>
      <NuxtLink to="/study/base/SelectDemo" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">Select 选择器示例</h3>
      </NuxtLink>
      <NuxtLink to="/study/base/VideoPlayerDemo" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">视频播放器示例 1</h3>
      </NuxtLink>
      <NuxtLink to="/study/base/VideoPlayerDemo2" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">视频播放器示例 2</h3>
      </NuxtLink>
    </div>
  </div>

  <!-- Blog 组件示例 -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Blog 组件示例</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink to="/study/blog/FriendLinksDemo" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">友情链接示例 1</h3>
      </NuxtLink>
      <NuxtLink to="/study/blog/FriendLinksDemo2" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">友情链接示例 2</h3>
      </NuxtLink>
      <NuxtLink to="/study/blog/GalleryDemo" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">图库示例</h3>
      </NuxtLink>
      <NuxtLink to="/study/blog/RecommendCardDemo" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">推荐卡片示例</h3>
      </NuxtLink>
      <NuxtLink to="/study/blog/StarryDemo" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">星空示例</h3>
      </NuxtLink>
      <NuxtLink to="/study/blog/TagCloudDemo" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">标签云示例</h3>
      </NuxtLink>
    </div>
  </div>

  <!-- Nuxt 示例 -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Nuxt 示例</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink to="/study/nuxt/colorMode/base" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">主题模式</h3>
      </NuxtLink>
      <NuxtLink to="/study/nuxt/pinia" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">Pinia 状态管理</h3>
      </NuxtLink>
      <NuxtLink to="/study/nuxt/ssr" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">SSR 服务端渲染</h3>
      </NuxtLink>
      <NuxtLink to="/study/nuxt/useFetch" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">useFetch 数据获取</h3>
      </NuxtLink>
    </div>
  </div>

  <!-- Tailwind CSS 示例 -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Tailwind CSS 示例</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink to="/study/twcss" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-medium">Tailwind CSS 基础示例</h3>
      </NuxtLink>
    </div>
  </div>
</div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>