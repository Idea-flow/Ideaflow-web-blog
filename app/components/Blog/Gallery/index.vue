<script setup lang="ts">
import { computed, ref } from 'vue'

// 定义图片数据接口
interface GalleryImage {
  id: string | number
  url: string
  title?: string
  description?: string
  tags?: string[]
  width?: number
  height?: number
}

// 定义布局类型
type LayoutType = 'breathing-grid' | 'eco-flow' | 'folding-depth'

// 定义组件属性
interface Props {
  images: GalleryImage[]
  layout?: LayoutType
  columns?: number
  gapSize?: number
  showTags?: boolean
  enableZoom?: boolean
  enableColorPicker?: boolean
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  layout: 'breathing-grid',
  columns: 3,
  gapSize: 20,
  showTags: true,
  enableZoom: true,
  enableColorPicker: false
})

// 当前激活的图片
const activeImage = ref<GalleryImage | null>(null)

// 计算斐波那契数列的前N个数
const fibonacciSequence = computed(() => {
  const sequence = [1, 1]
  for (let i = 2; i < 10; i++) {
    sequence[i] = sequence[i - 1] + sequence[i - 2]
  }
  return sequence
})

// 根据布局类型计算容器类名
const containerClass = computed(() => {
  const baseClasses = 'gallery-container relative w-full'
  switch (props.layout) {
    case 'eco-flow':
      return `${baseClasses} overflow-x-auto whitespace-nowrap`
    case 'folding-depth':
      return `${baseClasses} space-y-8`
    default:
      return `${baseClasses} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${props.columns} gap-${props.gapSize}`
  }
})

// 图片加载完成处理
const handleImageLoad = (image: GalleryImage) => {
  // 触发加载动画
}

// 图片点击处理
const handleImageClick = (image: GalleryImage) => {
  if (props.enableZoom) {
    activeImage.value = image
  }
}

// 关闭预览
const closePreview = () => {
  activeImage.value = null
}
</script>

<template>
  <div :class="containerClass">
    <!-- 呼吸网格布局 -->
    <template v-if="layout === 'breathing-grid'">
      <div v-for="(image, index) in images" 
           :key="image.id"
           class="gallery-item group relative overflow-hidden rounded-lg"
           :class="`h-[${fibonacciSequence[index % fibonacciSequence.length] * 100}px]`"
           @click="handleImageClick(image)">
        <img :src="image.url"
             :alt="image.title"
             class="w-full h-full object-cover transition-transform duration-500
                    group-hover:scale-110"
             @load="handleImageLoad(image)">
        
        <!-- 图片信息遮罩 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    flex flex-col justify-end p-4">
          <h3 class="text-white font-medium text-lg">{{ image.title }}</h3>
          <p class="text-white/80 text-sm">{{ image.description }}</p>
          
          <!-- 标签 -->
          <div v-if="showTags && image.tags?.length" class="flex flex-wrap gap-2 mt-2">
            <span v-for="tag in image.tags"
                  :key="tag"
                  class="px-2 py-1 rounded-full text-xs
                         bg-white/20 text-white backdrop-blur-sm">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </template>

    <!-- 生态河流布局 -->
    <template v-else-if="layout === 'eco-flow'">
      <div class="flex space-x-4 py-4 px-2 overflow-x-auto
                  scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600
                  scrollbar-track-transparent">
        <div v-for="image in images"
             :key="image.id"
             class="gallery-item flex-none relative overflow-hidden rounded-lg
                    w-72 h-48 group"
             @click="handleImageClick(image)">
          <img :src="image.url"
               :alt="image.title"
               class="w-full h-full object-cover transition-transform duration-500
                      group-hover:scale-110">
          
          <!-- 水波纹效果 -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- 图片信息 -->
          <div class="absolute bottom-0 left-0 right-0 p-4
                      bg-gradient-to-t from-black/60 to-transparent
                      transform translate-y-full group-hover:translate-y-0
                      transition-transform duration-300">
            <h3 class="text-white font-medium">{{ image.title }}</h3>
            <p class="text-white/80 text-sm line-clamp-2">{{ image.description }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- 折叠景深布局 -->
    <template v-else-if="layout === 'folding-depth'">
      <div v-for="(image, index) in images"
           :key="image.id"
           class="gallery-item relative overflow-hidden rounded-lg
                  transform transition-transform duration-500 hover:scale-[1.02]"
           :class="{
             'h-96': index === 0,
             'h-72': index !== 0
           }"
           @click="handleImageClick(image)">
        <img :src="image.url"
             :alt="image.title"
             :class="{
               'w-full h-full object-cover': true,
               'filter blur-none': index === 0,
               'filter blur-[2px]': index !== 0
             }">
        
        <!-- 折纸效果 -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        
        <!-- 图片信息 -->
        <div class="absolute bottom-0 left-0 right-0 p-6
                    bg-gradient-to-t from-black/60 to-transparent">
          <h3 class="text-white font-medium text-xl">{{ image.title }}</h3>
          <p class="text-white/80 mt-2">{{ image.description }}</p>
        </div>
      </div>
    </template>

    <!-- 图片预览模态框 -->
    <div v-if="activeImage"
         class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
         @click="closePreview">
      <img :src="activeImage.url"
           :alt="activeImage.title"
           class="max-w-[90vw] max-h-[90vh] object-contain">
      
      <!-- 关闭按钮 -->
      <button class="absolute top-4 right-4 text-white/80 hover:text-white
                     transition-colors duration-200"
              @click="closePreview">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery-item {
  animation: fadeInGrow 0.6s ease-out;
}

@keyframes fadeInGrow {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 暗黑模式适配 */
:deep(.dark) .gallery-item {
  @apply bg-gray-800;
}

/* 自定义滚动条样式 */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-gray-400 {
  scrollbar-color: #9ca3af transparent;
}

.dark .scrollbar-thumb-gray-600 {
  scrollbar-color: #4b5563 transparent;
}
</style>