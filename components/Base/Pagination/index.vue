<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// 定义组件属性
const props = defineProps({
  // 当前页码
  modelValue: {
    type: Number,
    default: 1
  },
  // 总条目数
  totalItems: {
    type: Number,
    required: true
  },
  // 每页显示条目数
  itemsPerPage: {
    type: Number,
    default: 10
  },
  // 显示的页码按钮数量
  maxVisibleButtons: {
    type: Number,
    default: 5
  },
  // 主题模式
  theme: {
    type: String,
    default: 'light'
  }
})

// 定义事件
const emit = defineEmits(['update:modelValue', 'change'])

// 响应式状态
const currentPage = ref(props.modelValue)
const inputPage = ref('')
const isInputVisible = ref(false)
const touchStartX = ref(0)
const isMobile = ref(false)

// 计算总页数
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

// 计算显示的页码范围
const paginationRange = computed(() => {
  const range = []
  const leftOffset = Math.floor(props.maxVisibleButtons / 2)
  const rightOffset = props.maxVisibleButtons - leftOffset - 1
  
  let start = currentPage.value - leftOffset
  let end = currentPage.value + rightOffset
  
  if (start < 1) {
    end = Math.min(props.maxVisibleButtons, totalPages.value)
    start = 1
  }
  
  if (end > totalPages.value) {
    start = Math.max(1, totalPages.value - props.maxVisibleButtons + 1)
    end = totalPages.value
  }
  
  // 添加页码和省略号
  if (start > 1) {
    range.push(1)
    if (start > 2) range.push('...')
  }
  
  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  
  if (end < totalPages.value) {
    if (end < totalPages.value - 1) range.push('...')
    range.push(totalPages.value)
  }
  
  return range
})

// 页码切换处理
const changePage = (page) => {
  if (page === '...') return
  if (page < 1 || page > totalPages.value) return
  
  currentPage.value = page
  emit('update:modelValue', page)
  emit('change', page)
}

// 键盘事件处理
const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    changePage(currentPage.value - 1)
  } else if (e.key === 'ArrowRight') {
    changePage(currentPage.value + 1)
  }
}

// 触摸事件处理
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchEnd = (e) => {
  const touchEndX = e.changedTouches[0].clientX
  const diff = touchEndX - touchStartX.value
  
  if (Math.abs(diff) > 50) { // 滑动距离阈值
    if (diff > 0) {
      changePage(currentPage.value - 1) // 右滑，上一页
    } else {
      changePage(currentPage.value + 1) // 左滑，下一页
    }
  }
}

// 检查设备类型
const checkDevice = () => {
  isMobile.value = window.innerWidth <= 768
}

// 组件生命周期钩子
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', checkDevice)
  checkDevice()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', checkDevice)
})

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  currentPage.value = newValue
})
</script>

<template>
  <div 
    class="pagination-container flex items-center justify-center space-x-3 p-4"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- 上一页按钮 -->
    <button
      class="prev-btn flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 transform hover:scale-110 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
      :class="{
        'text-gray-600 hover:text-gray-800': theme === 'light',
        'text-gray-400 hover:text-gray-200': theme === 'dark'
      }"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- 页码按钮 -->
    <div class="flex space-x-2 overflow-x-auto scrollbar-hide">
      <template v-for="page in paginationRange" :key="page">
        <button
          v-if="page !== '...'"
          class="page-btn w-6 h-6 rounded-full transition-all duration-500 transform hover:scale-110 active:scale-90  relative overflow-hidden"
          :class="{
            'text-white bg-primary': currentPage === page,
            'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200': currentPage !== page
          }"
          @click="changePage(page)"
          @dblclick="isInputVisible = true"
        >
          <span class="relative z-10">{{ page }}</span>
        </button>
        <span 
          v-else 
          class="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 my-auto"
        >
          {{ page }}
        </span>
      </template>
    </div>

    <!-- 下一页按钮 -->
    <button
      class="next-btn flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 transform hover:scale-110 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
      :class="{
        'text-gray-600 hover:text-gray-800': theme === 'light',
        'text-gray-400 hover:text-gray-200': theme === 'dark'
      }"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- 快速跳转输入框 -->
    <div v-if="isInputVisible" class="relative ml-4">
      <input
        v-model="inputPage"
        type="number"
        class="w-16 px-2 py-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 transition-all duration-300"
        min="1"
        :max="totalPages"
        @keyup.enter="changePage(parseInt(inputPage)); isInputVisible = false; inputPage = ''"
        @blur="isInputVisible = false; inputPage = ''"
      />
    </div>
  </div>
</template>

<style scoped>
.pagination-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
}

.page-btn {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-btn:active {
  transform: scale(0.95);
}

/* 隐藏滚动条但保持功能 */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* 移动端适配 */
@media (max-width: 640px) {
  .pagination-container {
    padding: 0.5rem;
    margin: 0 1rem;
  }

  .page-btn {
    width: 2.5rem;
    height: 2.5rem;
  }
}

/* 暗黑模式 */
.dark .pagination-container {
  box-shadow: none;
}
</style>