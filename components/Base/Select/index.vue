<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface Option {
  label: string
  value: any
  disabled?: boolean
}

const props = defineProps<{
  modelValue: any | any[]
  options: Option[]
  placeholder?: string
  multiple?: boolean
  disabled?: boolean
  clearable?: boolean
  searchable?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

// 状态管理
const isOpen = ref(false)
const searchQuery = ref('')
const selectRef = ref<HTMLElement | null>(null)

// 处理点击外部关闭下拉框
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (selectRef.value && !selectRef.value.contains(target)) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

// 组件挂载时添加点击事件监听器
onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
})

// 组件卸载时移除点击事件监听器
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true)
})

// 选中值的展示文本
const selectedLabel = computed(() => {
  if (props.multiple) {
    const selected = props.options.filter(opt => 
      Array.isArray(props.modelValue) && props.modelValue.includes(opt.value)
    )
    return selected.map(opt => opt.label).join(', ')
  } else {
    const selected = props.options.find(opt => opt.value === props.modelValue)
    return selected?.label || ''
  }
})

// 过滤后的选项
const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  return props.options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 处理选项选择
const handleSelect = (option: Option) => {
  if (option.disabled) return
  
  if (props.multiple) {
    const newValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = newValue.indexOf(option.value)
    
    if (index === -1) {
      newValue.push(option.value)
    } else {
      newValue.splice(index, 1)
    }
    
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', option.value)
    isOpen.value = false
  }
}

// 清除选择
const clearSelection = () => {
  emit('update:modelValue', props.multiple ? [] : undefined)
}


// 监听搜索框变化
watch(isOpen, async (newVal) => {
  if (!newVal) {
    await nextTick()
    searchQuery.value = ''
  }
})
</script>

<template>
  <div
    ref="selectRef"
    class="relative w-full"
  >
    <!-- 选择框 -->
    <div
      @click="!disabled && (isOpen = !isOpen)"
      class="w-full px-4 py-2 flex items-center justify-between rounded-lg border transition-colors duration-200 cursor-pointer select-none"
      :class="{
        'border-primary ring-2 ring-primary ring-opacity-20': isOpen,
        'border-border-base hover:border-primary': !isOpen && !disabled,
        'bg-base-200 cursor-not-allowed': disabled,
        'border-border-light': disabled
      }"
    >
      <!-- 选中内容/占位符 -->
      <div class="flex-1 truncate">
        <span
          v-if="selectedLabel"
          class="text-text-base"
        >
          {{ selectedLabel }}
        </span>
        <span
          v-else
          class="text-text-placeholder"
        >
          {{ placeholder || '请选择' }}
        </span>
      </div>

      <!-- 清除按钮 -->
      <button
        v-if="clearable && (multiple ? modelValue.length : modelValue) && !disabled"
        @click.stop="clearSelection"
        class="ml-2 text-text-muted hover:text-primary p-1 rounded-full hover:bg-base-200 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- 箭头图标 -->
      <div
        class="ml-2 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-text-muted" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <!-- 下拉面板 -->
    <div
      v-show="isOpen"
      class="absolute z-50 w-full mt-1 py-1 bg-base-100 rounded-lg border border-border-base shadow-lg max-h-60 overflow-auto"
    >
      <!-- 搜索框 -->
      <div
        v-if="searchable"
        class="sticky top-0 px-2 py-1 bg-base-100"
      >
        <input
          v-model="searchQuery"
          type="text"
          class="w-full px-3 py-1 rounded border border-border-base focus:outline-none focus:border-primary text-sm"
          placeholder="搜索..."
          @click.stop
        >
      </div>

      <!-- 选项列表 -->
      <template v-if="filteredOptions.length">
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          @click.stop="handleSelect(option)"
          class="px-4 py-2 flex items-center cursor-pointer select-none transition-colors"
          :class="{
            'text-text-disabled cursor-not-allowed': option.disabled,
            'hover:bg-base-200': !option.disabled,
            'text-primary font-medium': multiple ? 
              (Array.isArray(modelValue) && modelValue.includes(option.value)) : 
              modelValue === option.value
          }"
        >
          <!-- 多选复选框 -->
          <div
            v-if="multiple"
            class="mr-2 w-4 h-4 rounded border transition-colors flex items-center justify-center"
            :class="{
              'border-primary bg-primary': Array.isArray(modelValue) && modelValue.includes(option.value),
              'border-border-base': !(Array.isArray(modelValue) && modelValue.includes(option.value))
            }"
          >
            <svg
              v-if="Array.isArray(modelValue) && modelValue.includes(option.value)"
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          {{ option.label }}
        </div>
      </template>
      
      <!-- 无匹配选项 -->
      <div
        v-else
        class="px-4 py-2 text-text-muted text-center"
      >
        无匹配选项
      </div>
    </div>
  </div>
</template>