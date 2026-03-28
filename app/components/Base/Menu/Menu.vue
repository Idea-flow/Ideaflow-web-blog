<script setup lang="ts">
interface Props {
  mode?: 'horizontal' | 'vertical'
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical',
})
</script>

<template>
  <div
    class="menu"
    :class="[
      `menu-${mode}`,
      mode === 'horizontal' ? 'flex items-center' : 'flex flex-col'
    ]"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.menu {
  @apply min-w-[200px] text-text-base;
}

.menu-horizontal {
  @apply h-12 gap-1;
}

.menu-vertical {
  @apply py-2 gap-0.5;
}

</style>