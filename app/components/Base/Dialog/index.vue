<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  width?: string | number
  height?: string | number
  draggable?: boolean
  showClose?: boolean
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: '70%',
  height: '90%',
  draggable: false,
  showClose: true,
  showFooter: true,
  confirmText: '确定',
  cancelText: '取消',
  loading: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const visible = ref(props.modelValue)
const dialogRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)

// 监听modelValue变化
watch(() => props.modelValue, (val) => {
  visible.value = val
})

// 拖拽相关
let isDragging = false
let startX = 0
let startY = 0
let initialX = 0
let initialY = 0

const handleMouseDown = (e: MouseEvent) => {
  if (!props.draggable || !dialogRef.value) return
  isDragging = true
  startX = e.clientX
  startY = e.clientY
  const rect = dialogRef.value.getBoundingClientRect()
  initialX = rect.left
  initialY = rect.top
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging || !dialogRef.value) return
  const deltaX = e.clientX - startX
  const deltaY = e.clientY - startY
  dialogRef.value.style.left = `${initialX + deltaX}px`
  dialogRef.value.style.top = `${initialY + deltaY}px`
}

const handleMouseUp = () => {
  isDragging = false
}

// 添加全局事件监听
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
}

// 关闭对话框
const handleClose = () => {
  emit('update:modelValue', false)
  emit('cancel')
}

// 确认
const handleConfirm = () => {
  emit('confirm')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- 遮罩层 -->
      <div class="absolute inset-0 bg-black/50" @click="handleClose"></div>
      
      <!-- 对话框 -->
      <div
        ref="dialogRef"
        class="relative bg-base-100 rounded-lg shadow-lg overflow-hidden flex flex-col"
        :style="{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          maxHeight: '90vh'
        }"
        :class="{ 'cursor-move': draggable }"
      >
        <!-- 标题栏 -->
        <div
          ref="headerRef"
          class="flex items-center justify-between px-6 py-4 shrink-0"
          @mousedown="handleMouseDown"
        >
          <h3 class="text-lg font-medium text-text-base">{{ title }}</h3>
          <icon name="myBase:close" v-if="showClose" @click="handleClose" class="hover:bg-primary"></icon>
        </div>

        <!-- 内容区域 -->
        <div class="px-6 py-4 overflow-y-auto flex-grow">
          <slot></slot>
        </div>

        <!-- 底部按钮 -->
        <div v-if="showFooter" class="flex justify-end px-6 py-4 space-x-2 shrink-0">
          <button
            class="px-4 py-2 text-sm rounded-lg bg-warning hover:bg-error text-base-100"
            @click="handleClose"
          >
            {{ cancelText }}
          </button>
          <button
            class="px-4 py-2 text-sm rounded-lg bg-primary hover:bg-primary-hover text-base-100"
            :class="{ 'opacity-75 cursor-not-allowed': loading }"
            :disabled="loading"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>