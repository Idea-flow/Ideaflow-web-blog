<script setup lang="ts">
if (import.meta.server) {
  console.log('这是服务端渲染！');
}else {

  console.log('这是客户端渲染！');
}

</script>

<template>

</template>

<style scoped>

</style>