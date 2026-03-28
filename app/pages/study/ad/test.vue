<script setup lang="ts">
// 这个页面用于演示广告位渲染效果。
// 这里改为使用本地广告组件，避免依赖 Nuxt 4 下不兼容的 Adsbygoogle 组件。
import GoogleFirst from '~/components/Ad/GoogleFirst.vue'
</script>

<template>
  广告1:
  <div class="page-layout">

  </div>
  <GoogleFirst
      ad-format="auto"
      :style="{ minWidth: '300px' }"
  />

</template>

<style scoped>
.content {
  flex: 1 1 auto;
  overflow-x: hidden;
}

.page-layout {
  display: flex;
  direction: row;
  gap: 36px;
  overflow: wrap;
}
</style>
