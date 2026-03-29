<script setup lang="ts">
/**
 * 这个页面负责处理 /im/web 的默认入口。
 * 进入 IM Web 端根路径时，自动跳转到默认聊天页，避免父级 NuxtPage 没有子页面可渲染。
 */
await navigateTo('/im/web/chat', { replace: true })
</script>

<template>
  <div />
</template>
