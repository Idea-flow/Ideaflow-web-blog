<template>
  <div class="relative overflow-hidden group" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
    <!-- 轮播图容器 -->
    <div class="relative w-full" :style="{ height: height }">
      <TransitionGroup
        tag="div"
        class="relative w-full h-full"
        :name="transition"
        :duration="300"
      >
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          v-show="currentIndex === index"
          class="absolute top-0 left-0 w-full h-full transition-opacity duration-300"
        >
          <img
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <!-- 标题和描述 -->
          <div class="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
            <h3 class="text-lg md:text-xl font-semibold mb-2">{{ slide.title }}</h3>
            <p class="text-sm md:text-base line-clamp-2">{{ slide.description }}</p>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- 左右切换按钮 -->
    <button
      @click="prev"
      class="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/40"
      aria-label="Previous slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      @click="next"
      class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/40"
      aria-label="Next slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- 指示器 -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'w-2 h-2 rounded-full transition-all duration-300',
          currentIndex === index
            ? 'bg-white w-4'
            : 'bg-white/50 hover:bg-white/70'
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface Slide {
  id: number
  image: string
  title: string
  description: string
}

interface Props {
  slides: Slide[]
  autoPlay?: boolean
  interval?: number
  height?: string
  transition?: 'slide' | 'fade'
}

const props = withDefaults(defineProps<Props>(), {
  autoPlay: true,
  interval: 5000,
  height: '400px',
  transition: 'fade'
})

const currentIndex = ref(0)
let autoPlayTimer: NodeJS.Timeout | null = null
let isPaused = ref(false)

// 切换到下一张
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

// 切换到上一张
const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

// 跳转到指定幻灯片
const goToSlide = (index: number) => {
  currentIndex.value = index
}

// 开始自动播放
const startAutoPlay = () => {
  if (props.autoPlay && !isPaused.value) {
    autoPlayTimer = setInterval(() => {
      next()
    }, props.interval)
  }
}

// 暂停自动播放
const pauseAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
  isPaused.value = true
}

// 恢复自动播放
const resumeAutoPlay = () => {
  isPaused.value = false
  startAutoPlay()
}

// 监听自动播放属性变化
watch(() => props.autoPlay, (newValue) => {
  if (newValue) {
    startAutoPlay()
  } else {
    pauseAutoPlay()
  }
})

// 组件挂载时启动自动播放
onMounted(() => {
  startAutoPlay()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

/* 移动端适配 */
@media (max-width: 640px) {
  .group:hover button {
    opacity: 1;
  }
}
</style>