<template>
  <div
    class="dropdown-item mb-1 px-4 py-2 text-sm text-text-base cursor-pointer transition-all duration-300 flex items-center gap-2 rounded-lg  hover:bg-gradient-to-r hover:from-primary hover:to-white/30"
    :class="{
      'text-primary bg-gradient-to-r from-primary to-white/30': active,
      'opacity-50 cursor-not-allowed': disabled
    }"
    @click="!disabled && $emit('click', $event)"
  >
    <!-- 图标插槽 -->
    <slot name="icon"></slot>
    
    <!-- 默认内容插槽 -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>