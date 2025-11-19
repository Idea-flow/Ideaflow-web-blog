<script setup lang="ts">
import FixedActionBar from '~/components/Base/FixedActionBar/index.vue'
</script>

<template>
  <div class="min-h-screen p-4 relative">
    <h1 class="text-2xl font-bold mb-4">FixedActionBar 示例</h1>
    <!-- 右下角固定栏 -->
    <FixedActionBar position="right"  :offsetX="0" :offsetY="0">
      <div class="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
        右固定栏
      </div>
    </FixedActionBar>

    <!-- 右下角固定栏 -->
    <FixedActionBar position="right-bottom" :distance="0" :offsetX="-20" :offsetY="-80">
      <div class="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
        右下角固定栏
      </div>
    </FixedActionBar>

    <!-- 左上角固定栏 -->
    <FixedActionBar position="left-top" :distance="20" :offsetX="0" :offsetY="0">
      <div class="bg-green-500 text-white p-4 rounded-lg shadow-lg">
        左上角固定栏
      </div>
    </FixedActionBar>

    <!-- 右上角固定栏 -->
    <FixedActionBar position="right-top" :distance="20" :offsetX="0" :offsetY="0">
      <div class="bg-red-500 text-white p-4 rounded-lg shadow-lg">
        右上角固定栏
      </div>
    </FixedActionBar>

    <!-- 左下角固定栏 -->
    <FixedActionBar position="left-bottom" :distance="20" :offsetX="0" :offsetY="0">
      <div class="bg-purple-500 text-white p-4 rounded-lg shadow-lg">
        左下角固定栏
      </div>
    </FixedActionBar>

    <!-- 页面内容 -->
    <div class="mt-8">
      <p class="mb-4">这是一个展示FixedActionBar组件的示例页面。组件支持：</p>
      <ul class="list-disc pl-6">
        <li>通过position属性设置固定位置（支持left-top、left-bottom、right-top、right-bottom等组合位置）</li>
        <li>通过distance属性设置距离边界的百分比</li>
        <li>通过offsetX和offsetY属性微调位置</li>
        <li>支持自定义内容插槽</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>