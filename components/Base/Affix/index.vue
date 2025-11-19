<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  offset: {
    type: Number,
    default: 0
  },
  position: {
    type: String,
    default: 'top',
    validator: (value: string) => ['top', 'bottom'].includes(value)
  },
  zIndex: {
    type: Number,
    default: 100
  }
})

const emit = defineEmits(['change'])

const affixed = ref(false)
const affixWrapper = ref<HTMLElement | null>(null)
const affixContent = ref<HTMLElement | null>(null)

const updatePosition = () => {
  if (!affixWrapper.value || !affixContent.value) return

  const rect = affixWrapper.value.getBoundingClientRect()
  const isTop = props.position === 'top'
  const shouldAffix = isTop
    ? rect.top <= props.offset
    : window.innerHeight - rect.bottom <= props.offset

  if (shouldAffix !== affixed.value) {
    affixed.value = shouldAffix
    emit('change', shouldAffix)
  }

  if (shouldAffix) {
    const style = {
      position: 'fixed',
      zIndex: props.zIndex,
      width: `${rect.width}px`,
      [props.position]: `${props.offset}px`
    }
    Object.assign(affixContent.value.style, style)
  } else {
    affixContent.value.style.cssText = ''
  }
}

onMounted(() => {
  window.addEventListener('scroll', updatePosition)
  window.addEventListener('resize', updatePosition)
  updatePosition()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition)
  window.removeEventListener('resize', updatePosition)
})
</script>

<template>
  <div ref="affixWrapper">
    <div ref="affixContent">
      <slot></slot>
    </div>
  </div>
</template>