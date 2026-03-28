<template>
  <div
    class=" relative inline-block "
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 触发器插槽 -->
    <div
      ref="triggerRef"
      @click="triggerType === 'click' && toggle()"
      class="cursor-pointer"
    >
      <slot></slot>
    </div>

    <!-- 下拉内容 -->
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="isVisible"
        ref="dropdownRef"
        :class="[
          'absolute z-50 min-w-[180px] rounded-xl overflow-hidden',
          'bg-base-200',
          'shadow-lg transition-shadow duration-300 hover:shadow-xl',
          'p-1 w-48 max-h-60 overflow-y-auto',
        
          placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
           isRightAligned ? 'right-0' : '' // 动态控制右对齐
        ]"
        @click.stop
      >
        <slot name="dropdown"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 定义组件属性
interface Props {
  triggerType?: 'hover' | 'click'
  placement?: 'top' | 'bottom'
  closeOnClickOutside?: boolean
  isRightAligned?: boolean // 新增右对齐控制参数
}

const props = withDefaults(defineProps<Props>(), {
  triggerType: 'hover',
  placement: 'bottom',
  closeOnClickOutside: true,
  isRightAligned: false // 默认不启用右对齐
})

// 状态管理
const isVisible = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)

// 显示/隐藏方法
const show = () => {
  isVisible.value = true
}

const hide = () => {
  isVisible.value = false
}

const toggle = () => {
  isVisible.value = !isVisible.value
}

// 处理鼠标事件
const handleMouseEnter = () => {
  if (props.triggerType === 'hover') {
    show()
  }
}

const handleMouseLeave = () => {
  if (props.triggerType === 'hover') {
    hide()
  }
}

// 处理点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  if (!props.closeOnClickOutside) return
  
  const target = event.target as Node
  const isClickInside = triggerRef.value?.contains(target) || dropdownRef.value?.contains(target)
  
  if (!isClickInside) {
    hide()
  }
}

// 生命周期钩子
onMounted(() => {
  if (props.closeOnClickOutside) {
    document.addEventListener('click', handleClickOutside, true)
  }
})

onUnmounted(() => {
  if (props.closeOnClickOutside) {
    document.removeEventListener('click', handleClickOutside, true)
  }
})
</script>

<style scoped>

</style>