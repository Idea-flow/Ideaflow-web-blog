<script setup lang="ts">
import BottomNavigation from '~/components/im/h5/BottomNavigation.vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const showBottomNav = computed(() => {
  const path = route.path
  return !path.startsWith('/im/h5/chatP') && !path.startsWith('/im/h5/chatG')
})
</script>

<template>
<!--  <div class="min-h-screen flex flex-col bg-gradient-to-b from-blue-200/30 via-blue-100/20 to-transparent dark:from-blue-900/30 dark:via-blue-800/20 dark:to-transparent">-->
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-200/30 via-blue-100/20 to-transparent dark:bg-black">
    <div class="flex-grow">
      <slot />
    </div>
    <BottomNavigation v-if="showBottomNav" />
  </div>
</template>

<style scoped>

</style>