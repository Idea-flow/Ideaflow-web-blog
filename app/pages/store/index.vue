<script setup lang="ts">
import { ref } from 'vue'

const showArrow = ref(true)
const featuresRef = ref<HTMLElement | null>(null)

const scrollToFeatures = () => {
  showArrow.value = false
  featuresRef.value?.scrollIntoView({ behavior: 'smooth' })
}

import { ref, onMounted, onUnmounted } from 'vue'

const siteInfo = {
  name: 'Ideaflow',
  description: '一个现代化的、功能丰富的个人博客系统',
  originalPrice: '￥299',
  price: '￥199',
  version: 'v1.0.0',
  versionDesc: '当前版本包含博客基础功能、用户系统、评论系统等核心特性'
}

// 倒计时相关
const remainingTime = ref({
  hours: 24,
  minutes: 0,
  seconds: 0
})

let timer: NodeJS.Timeout | null = null

const updateTimer = () => {
  if (remainingTime.value.hours === 0 && 
      remainingTime.value.minutes === 0 && 
      remainingTime.value.seconds === 0) {
    if (timer) {
      clearInterval(timer)
    }
    return
  }

  if (remainingTime.value.seconds > 0) {
    remainingTime.value.seconds--
  } else if (remainingTime.value.minutes > 0) {
    remainingTime.value.minutes--
    remainingTime.value.seconds = 59
  } else if (remainingTime.value.hours > 0) {
    remainingTime.value.hours--
    remainingTime.value.minutes = 59
    remainingTime.value.seconds = 59
  }
}

onMounted(() => {
  timer = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const features = [
  {
    title: '博客文章管理',
    description: '支持Markdown编写，图片上传，分类标签等',
    link: '/article'
  },
  {
    title: '用户系统',
    description: '支持邮箱注册、社交账号登录、个人资料管理',
    link: '/login'
  },
  {
    title: '评论互动',
    description: '支持文章评论、回复、点赞等社交功能',
    link: '/article/1'
  },
  {
    title: '搜索功能',
    description: '支持全文搜索、按标签分类搜索',
    link: '/blog/search'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-blue-900/30">
    <!-- 顶部信息区域 -->
    <div class="container mx-auto px-4 min-h-screen flex flex-col justify-center relative">
      <!-- 下拉箭头 -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-300"
           :class="{ 'opacity-0': !showArrow }"
           @click="scrollToFeatures">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-purple-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      <div class="flex flex-wrap">
        <!-- 左侧信息 -->
        <div class="w-full lg:w-2/5 mb-8 lg:mb-0">
          <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(131,38,235,0.3)] border border-white/20 dark:bg-gray-800/50 dark:border-white/10 dark:text-white">
            <h1 class="text-4xl font-bold text-pink-600 mb-4">{{ siteInfo.name }}</h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">{{ siteInfo.description }}</p>
            <div class="mb-6 space-y-2">
              <div class="flex items-center gap-3">
                <div class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{{ siteInfo.price }}</div>
                <div class="text-lg text-gray-500 line-through">{{ siteInfo.originalPrice }}</div>
              </div>
              <div class="text-sm text-red-500 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                限时特惠倒计时：{{ remainingTime.hours.toString().padStart(2, '0') }}:{{ remainingTime.minutes.toString().padStart(2, '0') }}:{{ remainingTime.seconds.toString().padStart(2, '0') }}
              </div>
            </div>
            <button class="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full hover:from-pink-600 hover:to-purple-600 transition-colors duration-300">
              立即购买
            </button>
            <div class="mt-8 p-4 bg-pink-50 rounded-xl dark:bg-pink-900/20">
              <h3 class="text-lg font-semibold text-purple-700 mb-2">当前版本：{{ siteInfo.version }}</h3>
              <p class="text-gray-600 dark:text-gray-300">{{ siteInfo.versionDesc }}</p>
            </div>
          </div>
        </div>
        
        <!-- 右侧预留区域 -->
        <div class="w-full lg:w-3/5 pl-0 lg:pl-8">
          <!-- 预留空白 -->

          <BaseImgFlipCarousel :images="[
    { url: 'https://oss.ideaflow.top/articleCover/d9bab5be2791cefb1d7200d117ed75b51a25c98fab6db990a52e5a1378b4b8f5.webp', title: '第一张图片' },
    { url: 'https://oss.ideaflow.top/9da7b067e87ca59aad62049018406d570ab52494555571bc7702a4cbb0762dd9.png' },
    { url: 'https://bu.dusays.com/2023/11/10/654e2db0889fe.jpg', title: '第三张图片' }
  ]" />
        </div>
      </div>
    </div>

    <!-- 功能介绍区域 -->
    <div ref="featuresRef" class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center text-purple-700 mb-12">功能特性</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="feature in features" :key="feature.title" class="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg hover:shadow-[0_8px_40px_rgba(131,38,235,0.4)] border border-white/20 transition-all duration-300 hover:scale-105 dark:bg-gray-800/30 dark:border-white/10 dark:hover:bg-gray-800/50">
          <NuxtLink :to="feature.link" class="block">
            <h3 class="text-xl font-semibold text-pink-600 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 可以添加额外的自定义样式 */
</style>