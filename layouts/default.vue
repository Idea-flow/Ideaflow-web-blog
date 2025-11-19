<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const isHotSearchPage = computed(() => route.path.startsWith('/hotSearch'))
const isShowFooter = computed(() => route.path.startsWith('/hotSearch') || route.path.startsWith('/store'))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-black">
    <AppHeader v-if="!isHotSearchPage" />
    <div class="flex-grow">
      <slot />
    </div>
    <AppFooter v-if="!isShowFooter" />
  </div>
</template>

<style scoped>

</style>