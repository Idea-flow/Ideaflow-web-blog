<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  placement?: 'top' | 'right' | 'bottom' | 'left'
  width?: string | number
  height?: string | number
  showClose?: boolean
  maskClosable?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  placement: 'right',
  width: '30%',
  height: '30%',
  showClose: true,
  maskClosable: true,
  customClass: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleClose = () => {
  visible.value = false
  emit('close')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

const drawerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.placement === 'left' || props.placement === 'right') {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  } else {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})
</script>

<template>
  <Teleport to="body">
    <Transition
      :enter-active-class="`transition-all duration-300 ease-in-out ${
        placement === 'left' ? 'translate-x-[-100%]' :
        placement === 'right' ? 'translate-x-[100%]' :
        placement === 'top' ? 'translate-y-[-100%]' :
        'translate-y-[100%]'
      }`"
      :leave-active-class="`transition-all duration-300 ease-in-out ${
        placement === 'left' ? 'translate-x-[-100%]' :
        placement === 'right' ? 'translate-x-[100%]' :
        placement === 'top' ? 'translate-y-[-100%]' :
        'translate-y-[100%]'
      }`"
      :enter-from-class="`${
        placement === 'left' ? 'translate-x-[-100%]' :
        placement === 'right' ? 'translate-x-[100%]' :
        placement === 'top' ? 'translate-y-[-100%]' :
        'translate-y-[100%]'
      }`"
      :leave-to-class="`${
        placement === 'left' ? 'translate-x-[-100%]' :
        placement === 'right' ? 'translate-x-[100%]' :
        placement === 'top' ? 'translate-y-[-100%]' :
        'translate-y-[100%]'
      }`"
    >
      <div
        v-if="visible"
        :class="[
          'fixed bg-base-100 shadow-lg z-50',
          placement === 'left' && 'left-0 top-0 h-full',
          placement === 'right' && 'right-0 top-0 h-full',
          placement === 'top' && 'top-0 left-0 w-full',
          placement === 'bottom' && 'bottom-0 left-0 w-full',
          customClass
        ]"
        :style="drawerStyle"
      >
        <!-- 标题栏 -->
        <div
          v-if="title "
          class="flex items-center justify-between px-4 py-3 border-b border-border-base"
        >
          <span v-if="title" class="text-lg font-medium text-text-base"> {{ title }}</span>
          <button
            v-if="showClose"
            class="p-1 hover:bg-base-200 rounded-full transition-colors"
            @click="handleClose"
          >
            <svg
              class="w-5 h-5 text-text-base"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- 内容区域 -->
        <div >
          <slot />
        </div>
      </div>
    </Transition>
    <!-- 遮罩层 -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="fixed inset-0 bg-black/50 z-40"
        @click="handleMaskClick"
      />
    </Transition>
  </Teleport>
</template>