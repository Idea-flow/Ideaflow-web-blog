<script setup>
import { ref, defineProps, onMounted, watch, computed, onUnmounted } from 'vue'

const props = defineProps({
  // 容器ID
  containerId: {
    type: String,
    required: true
  },
  // 主题模式
  theme: {
    type: String,
    default: 'light'
  },
  // 主题色
  themeColor: {
    type: String,
    default: '#3b82f6'
  },
  // 是否折叠菜单
  collapsed: {
    type: Boolean,
    default: false
  }
})

// 目录数据
const catalog = ref([])



// 存储每个目录项的展开状态（使用布尔值数组替代Set）
const expandedItems = ref([])

// 初始化展开状态数组
const initializeExpandedItems = (collapsed = false) => {
  expandedItems.value = new Array(catalog.value.length).fill(!collapsed)
}

// 监听折叠属性变化
watch(() => props.collapsed, (newValue) => {
  expandedItems.value = new Array(catalog.value.length).fill(!newValue)
})

// 监听目录数据变化，更新展开状态数组
watch(() => catalog.value.length, (newLength) => {
  expandedItems.value = new Array(newLength).fill(!props.collapsed)
})

// 在组件挂载时初始化目录和展开状态
onMounted(() => {
  buildCatalog()
  initializeExpandedItems(props.collapsed)
})

// 当前活动的标题索引
const activeIndex = ref(-1)

// 切换展开/折叠状态
const toggleExpand = (index) => {
  expandedItems.value[index] = !expandedItems.value[index]
}

// 判断目录项是否有子项
const hasChildren = (index, level) => {
  if (index === catalog.value.length - 1) return false
  // 检查后续项是否有更深层级的标题
  let nextIndex = index + 1
  while (nextIndex < catalog.value.length && catalog.value[nextIndex].level > level) {
    if (catalog.value[nextIndex].level === level + 1) return true
    nextIndex++
  }
  return false
}

// 获取目录项的子项
const getChildren = (index, level) => {
  const children = []
  let i = index + 1
  while (i < catalog.value.length && catalog.value[i].level > level) {
    children.push(catalog.value[i])
    i++
  }
  return children
}

// 判断目录项是否应该显示
const shouldShowItem = (index, level) => {
  if (level === 1) return true
  
  // 查找所有上级目录项，确保它们都是展开状态
  let parentIndex = index - 1
  while (parentIndex >= 0) {
    const parentLevel = catalog.value[parentIndex].level
    if (parentLevel < level) {
      // 如果找到任何未展开的父级，则不显示当前项
      if (!expandedItems.value[parentIndex]) return false
      // 继续检查更高层级的父项
      level = parentLevel
    }
    parentIndex--
  }
  return true
}

// 点击目录项跳转到对应位置
const scrollToHeading = (text) => {
  const container = document.getElementById(props.containerId)
  if (!container) return

  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const targetHeading = Array.from(headings).find(heading => heading.textContent.trim() === text)

  if (targetHeading) {
    targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 获取标题级别
const getHeadingLevel = (tagName) => {
  return parseInt(tagName[1])
}

// 构建目录树
const buildCatalog = () => {
  const container = document.getElementById(props.containerId)
  if (!container) return

  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const catalogData = []
  
  // 使用 Set 来跟踪已添加的标题文本，避免重复
  const addedTitles = new Set()
  
  // 找出文章中最小的标题级别（最高级标题）
  let minLevel = 6
  Array.from(headings).forEach(heading => {
    const level = getHeadingLevel(heading.tagName.toLowerCase())
    minLevel = Math.min(minLevel, level)
  })

  Array.from(headings).forEach(heading => {
    const text = heading.textContent.trim()
    // 只有当标题文本未被添加过时才添加到目录中
    if (!addedTitles.has(text)) {
      addedTitles.add(text)
      const currentLevel = getHeadingLevel(heading.tagName.toLowerCase())
      catalogData.push({
        text,
        level: currentLevel,
        // 添加相对级别，用于计算缩进
        relativeLevel: currentLevel - minLevel + 1
      })
    }
  })

  catalog.value = catalogData
}

// 更新当前活动的标题和自动展开/折叠目录
const updateActiveHeading = () => {
  const container = document.getElementById(props.containerId)
  if (!container) return

  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const scrollTop = window.scrollY
  const containerTop = container.getBoundingClientRect().top + window.scrollY

  let currentHeading = null
  let minDistance = Infinity

  headings.forEach((heading) => {
    const distance = Math.abs(heading.getBoundingClientRect().top)
    if (distance < minDistance) {
      minDistance = distance
      currentHeading = heading
    }
  })

  if (currentHeading) {
    const headingText = currentHeading.textContent.trim()
    const newActiveIndex = catalog.value.findIndex(item => item.text === headingText)
    
    // 如果活动标题发生变化
    if (newActiveIndex !== activeIndex.value) {
      // 更新展开状态，确保活动标题的所有父级都展开
      if (newActiveIndex !== -1) {
        let currentIndex = newActiveIndex
        let currentLevel = catalog.value[currentIndex].level
        
        // 向上查找所有父级并展开
        for (let i = currentIndex - 1; i >= 0; i--) {
          if (catalog.value[i].level < currentLevel) {
            expandedItems.value[i] = true
            currentLevel = catalog.value[i].level
          }
        }
      }
      
      activeIndex.value = newActiveIndex
    }
  } else {
    activeIndex.value = -1
  }
}

// 节流函数
const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 在组件挂载后构建目录
onMounted(() => {
  // console.log("container-onMounted-")

  if (typeof window !== 'undefined') {
    // 初始化目录已在上面的 onMounted 中完成
    // 监听容器内容变化
    const container = document.getElementById(props.containerId)
    // console.log("container--"+props.containerId+container)
    if (container) {
      const observer = new MutationObserver(() => {
        buildCatalog()
      })
      observer.observe(container, { childList: true, subtree: true })

      // 添加滚动事件监听
      const throttledUpdateActiveHeading = throttle(updateActiveHeading, 100)
      window.addEventListener('scroll', throttledUpdateActiveHeading)
      // 初始化当前活动标题
      updateActiveHeading()
    }
  }
})

// 在组件卸载时移除事件监听
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', updateActiveHeading)
  }
})
</script>

<template>
  <div v-if="catalog.length > 0" class="catalog-container relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl dark:shadow-gray-800/30">
    <!-- 毛玻璃背景效果 -->
    <div class="absolute inset-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl z-0"></div>
    
    <!-- 装饰性背景图案 -->
<!--    <div class="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>-->
<!--    <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-2xl"></div>-->

    <div class="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full blur-2xl"></div>
    <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 dark:from-green-400/10 dark:to-teal-400/10 rounded-full blur-2xl"></div>


    <!-- 内容区域 -->
    <div class="relative z-10">
      <!-- 目录标题 -->
      <div class="catalog-title mb-0 px-4 flex items-center justify-between border-b border-gray-200/50 dark:border-gray-700/50 pb-2">
        <span class="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          📚 目录
        </span>
      </div>
      
        <template v-for="(item, index) in catalog" :key="index">
        <div 
          v-if="shouldShowItem(index, item.level)"
          class="catalog-item group relative rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100/70 dark:hover:bg-gray-800/70"
          :class="{ 'active': index === activeIndex }"
          :style="{ paddingLeft: `${(item.relativeLevel - 1) * 1.5}rem` }"
        >
          <div class="item-header py-2 px-3">
            <!-- 折叠指示器 -->
            <div 
              v-if="hasChildren(index, item.level)"
              class="w-4 h-4 mr-2 flex items-center justify-center cursor-pointer text-gray-400 dark:text-gray-500 hover:text-primary-500 dark:hover:text-primary-400"
              @click="toggleExpand(index)"
            >
              <svg 
                class="w-3 h-3 transform transition-transform duration-300 ease-in-out"
                :class="{ 'rotate-90': expandedItems[index] }"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path 
                  fill-rule="evenodd" 
                  d="M7.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z" 
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            
            <!-- 层级指示器 -->
            <div v-else class="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
            
            <!-- 标题文本 -->
            <span 
              class="item-text font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transform transition-all duration-300 ease-in-out hover:translate-x-1 cursor-pointer"
              @click="scrollToHeading(item.text)"
            >
              {{ item.text }}
            </span>
            
            <!-- 悬停时显示的装饰线 -->
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-primary-500/50 transition-all duration-300 ease-in-out group-hover:h-full rounded-full"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.catalog-container {
  width: 100%;
  height: 500px;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  font-size: 0.9rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-shadow: 0 8px 32px -4px rgba(0, 0, 0, 0.1);
}

.catalog-title {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.catalog-title h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.02em;
}

.catalog-item {
  position: relative;
  overflow: hidden;
  margin: 0.25rem 0;
}

.item-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.item-text {
  position: relative;
  z-index: 1;
  display: block;
  font-size: 0.95rem;
  line-height: 1.5;
  letter-spacing: -0.01em;
  font-weight: 450;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 活动状态样式 */
.catalog-item.active {
  background-color: v-bind('`${props.themeColor}14`');
  backdrop-filter: blur(4px);
}

.catalog-item.active .item-text {
  color: v-bind('props.themeColor');
  font-weight: 500;
  transform: translateX(0.25rem);
}

.dark .catalog-item.active {
  background-color: v-bind('`${props.themeColor}14`');
}

.dark .catalog-item.active .item-text {
  color: v-bind('props.themeColor');
}

/* 添加滚动条样式 */
.catalog-container::-webkit-scrollbar {
  width: 6px;
}

.catalog-container::-webkit-scrollbar-track {
  background: transparent;
}

.catalog-container::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.2);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.catalog-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.4);
}

/* 深色模式滚动条 */
.dark .catalog-container::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.2);
}

.dark .catalog-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(75, 85, 99, 0.4);
}

/* 深色主题样式 */
.dark {
  color: #e5e7eb;
}

.dark .item-text:hover {
  color: v-bind('props.themeColor');
}

/* 浅色主题样式 */
.light {
  color: #374151;
}

.light .item-text:hover {
  color: v-bind('props.themeColor');
}
</style>