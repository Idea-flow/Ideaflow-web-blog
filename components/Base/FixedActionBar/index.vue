<script setup lang="ts">
interface Props {
  position?: 'top' | 'bottom' | 'left' | 'right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom'
  /** 设置组件距离边界的百分比距离，默认为20% */
  distance?: number
  /** 设置水平方向的偏移量，正值向右偏移，负值向左偏移，默认为0 */
  offsetX?: number
  /** 设置垂直方向的偏移量，正值向下偏移，负值向上偏移，默认为0 */
  offsetY?: number
}

const props = withDefaults(defineProps<Props>(), {
  position: 'right',
  distance: 20,
  offsetX: 0,
  offsetY: 0
})

const style = computed(() => {
  const baseStyle = {
    position: 'fixed'
  }

  switch (props.position) {
    case 'top':
      return {
        ...baseStyle,
        top: `${props.distance}%`,
        left: '50%',
        transform: `translate(calc(-50% + ${props.offsetX}px), ${props.offsetY}px)`
      }
    case 'bottom':
      return {
        ...baseStyle,
        bottom: `${props.distance}%`,
        left: '50%',
        transform: `translate(calc(-50% + ${props.offsetX}px), ${props.offsetY}px)`
      }
    case 'left':
      return {
        ...baseStyle,
        left: `${props.distance}%`,
        top: '50%',
        transform: `translate(${props.offsetX}px, calc(-50% + ${props.offsetY}px))`
      }
    case 'right':
      return {
        ...baseStyle,
        right: `${props.distance}%`,
        top: '50%',
        transform: `translate(${props.offsetX}px, calc(-50% + ${props.offsetY}px))`
      }
    case 'left-top':
      return {
        ...baseStyle,
        left: `${props.distance}%`,
        top: `${props.distance}%`,
        transform: `translate(${props.offsetX}px, ${props.offsetY}px)`
      }
    case 'left-bottom':
      return {
        ...baseStyle,
        left: `${props.distance}%`,
        bottom: `${props.distance}%`,
        transform: `translate(${props.offsetX}px, ${props.offsetY}px)`
      }
    case 'right-top':
      return {
        ...baseStyle,
        right: `${props.distance}%`,
        top: `${props.distance}%`,
        transform: `translate(${props.offsetX}px, ${props.offsetY}px)`
      }
    case 'right-bottom':
      return {
        ...baseStyle,
        right: `${props.distance}%`,
        bottom: `${props.distance}%`,
        transform: `translate(${props.offsetX}px, ${props.offsetY}px)`
      }
    default:
      return baseStyle
  }
})
</script>

<template>
  <div class="fixed-action-bar" :style="style">
    <slot></slot>
  </div>
</template>

<style scoped>
.fixed-action-bar {
  z-index: 100;
}
</style>