<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface ImageItem {
  url: string
  title?: string
}

const props = defineProps<{
  images: ImageItem[]
}>()

const currentIndex = ref(0)
const isAnimating = ref(false)
const carouselRef = ref<HTMLElement | null>(null)
const showPreview = ref(false)
const previewIndex = ref(0)

const showPrevImage = () => {
  if (isAnimating.value || props.images.length <= 1) return
  isAnimating.value = true
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

const showNextImage = () => {
  if (isAnimating.value || props.images.length <= 1) return
  isAnimating.value = true
  currentIndex.value = (currentIndex.value + 1) % props.images.length
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

const handleWheel = (event: WheelEvent) => {
  // 检查是否在预览模式下
  if (showPreview.value) {
    if (event.deltaY > 0) {
      showNextPreview()
    } else {
      showPrevPreview()
    }
    return
  }
  
  // 检查鼠标是否在组件区域内
  if (!carouselRef.value?.contains(event.target as Node)) return
  
  if (event.deltaY > 0) {
    showNextImage()
  } else {
    showPrevImage()
  }
}

const openPreview = (index: number) => {
  previewIndex.value = index
  showPreview.value = true
}

const closePreview = () => {
  showPreview.value = false
}

const showPrevPreview = () => {
  if (isAnimating.value || props.images.length <= 1) return
  isAnimating.value = true
  previewIndex.value = (previewIndex.value - 1 + props.images.length) % props.images.length
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

const showNextPreview = () => {
  if (isAnimating.value || props.images.length <= 1) return
  isAnimating.value = true
  previewIndex.value = (previewIndex.value + 1) % props.images.length
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

onMounted(() => {
  window.addEventListener('wheel', handleWheel)
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
})
</script>

<template>
  <div ref="carouselRef" class="flip-carousel relative w-full h-[400px] overflow-visible">
    <!-- 图片容器 -->
    <div class="relative w-full h-full">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out cursor-pointer"
        :class="{
          'translate-x-0 scale-100 z-20': index === currentIndex,
          'translate-x-[85%] scale-90 z-10': index === (currentIndex + 1) % images.length,
          '-translate-x-[85%] scale-90 z-10': index === (currentIndex - 1 + images.length) % images.length,
          'translate-x-full scale-75 opacity-0': index !== (currentIndex + 1) % images.length && index > currentIndex,
          '-translate-x-full scale-75 opacity-0': index !== (currentIndex - 1 + images.length) % images.length && index < currentIndex
        }"
        @click="openPreview(index)"
      >
        <img
          :src="image.url"
          :alt="image.title || ''"
          class="w-full h-full object-cover rounded-3xl shadow-lg"
        >
        <div
          v-if="image.title"
          class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center rounded-b-3xl"
        >
          {{ image.title }}
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-4 rounded-full hover:bg-opacity-75 transition-all z-30 shadow-lg touch-manipulation text-xl font-bold min-w-[44px] min-h-[44px] flex items-center justify-center"
      @click="showPrevImage"
      :disabled="isAnimating"
    >
      ←
    </button>
    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-4 rounded-full hover:bg-opacity-75 transition-all z-30 shadow-lg touch-manipulation text-xl font-bold min-w-[44px] min-h-[44px] flex items-center justify-center"
      @click="showNextImage"
      :disabled="isAnimating"
    >
      →
    </button>
  </div>

  <!-- 预览模态框 -->
  <div v-if="showPreview" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300">
    <div class="relative w-full h-full flex items-center justify-center">
      <button
          class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors duration-200 z-50"
          @click="closePreview"
      >
        ×
      </button>

      <button
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-4 rounded-full hover:bg-opacity-75 transition-all z-50 shadow-lg touch-manipulation text-xl font-bold min-w-[44px] min-h-[44px] flex items-center justify-center"
          @click="showPrevPreview"
          :disabled="isAnimating"
      >
        ←
      </button>

      <div class="relative w-[90%] h-[90%] flex items-center justify-center">
        <img
            :src="images[previewIndex].url"
            :alt="images[previewIndex].title || ''"
            class="max-w-full max-h-full object-contain transition-transform duration-500 rounded-3xl"
        >
        <div
            v-if="images[previewIndex].title"
            class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center"
        >
          {{ images[previewIndex].title }}
        </div>
      </div>

      <button
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-4 rounded-full hover:bg-opacity-75 transition-all z-50 shadow-lg touch-manipulation text-xl font-bold min-w-[44px] min-h-[44px] flex items-center justify-center"
          @click="showNextPreview"
          :disabled="isAnimating"
      >
        →
      </button>
    </div>
  </div>


</template>

<style scoped>
.flip-carousel {
  perspective: 1000px;
}

.flip-carousel img {
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: all 0.5s ease-in-out;
}
</style>