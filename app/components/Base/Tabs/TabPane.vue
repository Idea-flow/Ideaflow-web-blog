<script setup lang="ts">
import { inject } from 'vue'

interface Props {
  label: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const activeTab = inject('activeTab') as any
const isActive = computed(() => activeTab.value === props.label)
</script>

<template>
  <div v-show="isActive" class="tab-pane">
    <slot></slot>
  </div>
</template>

<style scoped>
.tab-pane {
  @apply w-full h-full;
}
</style>