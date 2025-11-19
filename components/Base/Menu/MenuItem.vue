<script setup lang="ts">
interface Props {
  icon?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <div
    class="menu-item"
    :class="{
      'menu-item-disabled': disabled
    }"
    @click="handleClick"
  >
    <slot name="icon">
      <i v-if="icon" :class="icon"></i>
    </slot>
    <span class="menu-item-content">
      <slot></slot>
    </span>
  </div>
</template>

<style scoped>
.menu-item {
  @apply flex items-center px-4 py-2 cursor-pointer text-text-base hover:bg-base-200 transition-colors rounded-lg;
}

.menu-item-disabled {
  @apply opacity-50 cursor-not-allowed hover:bg-transparent;
}

.menu-item-content {
  @apply ml-2;
}
</style>