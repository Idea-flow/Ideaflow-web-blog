<script setup lang="ts">
import { ref, provide, useSlots, computed, watch } from 'vue'

interface Props {
  modelValue?: string
  tabPosition?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  tabPosition: 'top'
})

const emit = defineEmits(['update:modelValue'])
const slots = useSlots()

const getTabs = () => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return []
  
  return defaultSlot.map((vnode: any) => ({
    label: vnode.props?.label || '',
    disabled: vnode.props?.disabled || false
  }))
}

const tabs = computed(() => getTabs())
const activeTab = ref(props.modelValue || '')

// 在组件挂载时，如果没有设置modelValue，则默认激活第一个标签
onMounted(() => {
  if (!activeTab.value && tabs.value.length > 0) {
    const firstTab = tabs.value[0]
    activeTab.value = firstTab.label
    emit('update:modelValue', firstTab.label)
  }
})

watch(() => props.modelValue, (newVal) => {
  activeTab.value = newVal || ''
})

const updateActiveTab = (label: string) => {
  const tab = tabs.value.find(t => t.label === label)
  if (tab?.disabled) return
  activeTab.value = label
  emit('update:modelValue', label)
}

provide('activeTab', activeTab)
</script>

<template>
  <div class="tabs" :class="`tabs-${tabPosition}`">
    <div class="tabs-nav" :class="`tabs-nav-${tabPosition}`">
      <div :class="{
        'flex': tabPosition === 'top' || tabPosition === 'bottom',
        'flex-col': tabPosition === 'left' || tabPosition === 'right'
      }">
        <div
          v-for="tab in tabs"
          :key="tab.label"
          @click="updateActiveTab(tab.label)"
          class="px-4 py-2 cursor-pointer transition-colors"
          :class="{
            'text-primary border-b-2 border-primary': activeTab === tab.label && (tabPosition === 'top' || tabPosition === 'bottom'),
            'text-primary border-r-2 border-primary': activeTab === tab.label && tabPosition === 'left',
            'text-primary border-l-2 border-primary': activeTab === tab.label && tabPosition === 'right',
            'hover:text-primary-hover': !tab.disabled && activeTab !== tab.label,
            'cursor-not-allowed opacity-50': tab.disabled
          }"
        >
          {{ tab.label }}
        </div>
      </div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  @apply w-full;
}

.tabs-top {
  @apply flex flex-col;
}

.tabs-bottom {
  @apply flex flex-col-reverse;
}

.tabs-left {
  @apply flex flex-row;
}

.tabs-right {
  @apply flex flex-row-reverse;
}

.tabs-nav {
  @apply flex bg-base-100;
}

.tabs-nav-top, .tabs-nav-bottom {
  @apply flex-row;
}

.tabs-nav-left, .tabs-nav-right {
  @apply flex-col;
}



.tabs-content {
  @apply flex-1 p-1;
}
</style>