<template>
  <div class="json-input-wrapper h-full flex flex-col">
    <div class="json-input-content flex-grow relative" :class="{ 'pl-12': showLineNumbers, 'pl-0': !showLineNumbers }">
      <textarea
        ref="textareaRef"
        v-model="localValue"
        class="w-full h-full p-6  text-[15px] leading-[1.6] tracking-wide resize-none focus:outline-none bg-white dark:bg-black  text-text-base transition-colors  whitespace-pre-wrap break-all overflow-wrap-anywhere word-wrap-break-word"
        placeholder="在此输入 JSON 数据..."
        spellcheck="false"
        @input="onInput"
      ></textarea>
      
      <!-- 行号显示 -->
      <div v-if="showLineNumbers" class="absolute left-0 top-0 p-6 pointer-events-none font-mono text-[14px] leading-[1.6] text-gray-400 dark:text-gray-600 select-none border-r border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 font-[Consolas,Monaco,'Courier_New',monospace]">
        <div v-for="i in lineCount" :key="i" class="h-[1.6rem] text-right pr-3">{{ i }}</div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  showLineNumbers: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

// 监听 props 变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== localValue.value) {
    localValue.value = newValue
  }
}, { immediate: true })

// 计算行数
const lineCount = computed(() => {
  return (localValue.value.match(/\n/g) || []).length + 1
})

// 输入处理
const onInput = () => {
  emit('update:modelValue', localValue.value)
}

// 清空输入
const clearInput = () => {
  localValue.value = ''
  emit('update:modelValue', '')
  textareaRef.value?.focus()
}

// 从剪贴板粘贴
const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    localValue.value = text
    emit('update:modelValue', text)
  } catch (err) {
    console.error('无法从剪贴板读取:', err)
  }
}

// 设置 Tab 键行为
onMounted(() => {
  if (textareaRef.value) {
    textareaRef.value.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        
        const start = textareaRef.value!.selectionStart
        const end = textareaRef.value!.selectionEnd
        
        // 在光标位置插入两个空格
        localValue.value = localValue.value.substring(0, start) + '  ' + localValue.value.substring(end)
        
        // 将光标移动到插入空格后的位置
        textareaRef.value!.selectionStart = textareaRef.value!.selectionEnd = start + 2
        
        emit('update:modelValue', localValue.value)
      }
    })
  }
})
</script>

<style scoped>
.json-input-content {
  position: relative;
}
</style>