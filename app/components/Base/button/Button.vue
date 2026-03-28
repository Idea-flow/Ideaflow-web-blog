<script setup lang="ts">
interface Props {
  text?: string
}

defineProps<Props>()
</script>

<template>
  <button
    class="px-6 py-2.5 bg-primary text-text-base  text-sm rounded-lg
           shadow-md hover:bg-primary-hover hover:shadow-lg hover:scale-[1.02] 
           active:bg-primary-active active:scale-[0.98] active:shadow-sm
           transition-all duration-200 ease-out
           focus:outline-none focus:ring-2 ring-primary ring-opacity-50"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<style scoped>
</style>