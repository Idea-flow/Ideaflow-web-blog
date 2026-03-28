<template>
  <div class="space-y-4">
    <div v-for="(item, index) in articleList" :key="item.id" class="relative overflow-hidden flex h-[190px] md:h-60 lg:h-52 xl:h-60 bg-black dark:bg-gray-900 rounded-lg">
      <!-- 左侧图片 (偶数索引) -->
      <div
        v-if="index % 2 === 0"
        class="hidden sm:block relative min-w-[45%] bg-cover bg-no-repeat bg-center transform scale-100 hover:scale-125 transition-all duration-500 z-10"
        :style="{
          clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)',
          backgroundImage: `url(${item.cover || defaultCover})`
        }"
      >
        <!-- 分类标签容器 -->
        <div class="absolute top-3 left-3 z-20">
          <div class="px-3 py-1.5 rounded-full backdrop-blur-md bg-white/20 dark:bg-gray-800/40 shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <span class="text-sm font-medium text-white">{{ item.categoryName }}</span>
          </div>
        </div>
      </div>

      <!-- 文章信息区域 -->
      <div class="relative w-full sm:w-[65%] py-5 px-5 sm:px-10 lg:px-5 xl:px-10 z-20">
        <NuxtLink :to="`/article/${item.id}`" class="flex flex-col justify-between h-full text-center sm:text-start">
          <div>
            <h3 class="overflow-hidden relative w-full my-2.5 text-white hover:text-primary-500 text-lg md:text-xl lg:text-[22px] xl:text-2xl transition-colors line-clamp-1">
              {{ item.title }}
            </h3>
            <p class="text-gray-300 text-sm sm:text-[15px] leading-7 sm:indent-8 line-clamp-2 xl:line-clamp-3">
              {{ item.summary }}
            </p>
          </div>

          <!-- 文章元信息 -->
          <div :class="['flex justify-center items-center flex-wrap gap-2 pt-5 space-x-4 sm:space-x-8', index % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end']">
            <!-- 发布时间 -->
            <div class="flex items-center text-xs text-white">
              <span class="p-1 mt-[-2px] mr-[3px] text-[23px] text-white rounded-full bg-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
              </span>
              <span>{{ formatDate(item.createTime) }}</span>
            </div>
            <!-- 浏览量 -->
            <div class="flex items-center text-xs text-white">
              <span class="p-1 mt-[-2px] mr-[3px] text-[23px] text-white rounded-full bg-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
                </svg>
              </span>
              <span>{{ item.viewCount }}</span>
            </div>
            <!-- 标签列表 -->
            <div class="flex items-center gap-2">
                <span class="p-1 mt-[-2px] mr-[3px] text-[23px] text-white rounded-full bg-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
              </span>

<!--              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">-->
<!--                <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />-->
<!--              </svg>-->
              <span
                v-for="tag in item.tags"
                :key="tag.id"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105"
              >
                #{{ tag.name }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- 模糊背景 -->
      <div
        class="absolute w-full h-60 bg-cover bg-center"
        :style="{
          filter: 'blur(2.5rem) brightness(0.6)',
          backgroundImage: `url(${item.cover || defaultCover})`
        }"
      />

      <!-- 右侧图片 (奇数索引) -->
      <div
        v-if="index % 2 !== 0"
        class="relative min-w-[45%] bg-cover bg-no-repeat bg-center transform scale-100 hover:scale-125 transition-all duration-500 z-10 hidden sm:block"
        :style="{
          clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)',
          backgroundImage: `url(${item.cover || defaultCover})`
        }"
      >
        <!-- 分类标签容器 -->
        <div class="absolute top-3 right-3 z-20">
          <div class="px-3 py-1.5 rounded-full backdrop-blur-md bg-white/20 dark:bg-gray-800/40 shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <span class="text-sm font-medium text-white">{{ item.categoryName }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态展示 -->
    <div v-if="!articleList?.length" class="text-center py-10 text-gray-500 dark:text-gray-400">
      暂无文章
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'

// 定义 props
const props = defineProps<{
  articles?: Array<{
    id: number
    userId: number
    categoryId: number
    categoryName: string
    tags: Array<{
      id: number
      name: string
    }>
    cover: string
    title: string
    summary: string
    viewCount: number
    likeCount: number
    videoUrl: string
    isStick: string
    createTime: string
  }>
}>()

// 默认封面图
const defaultCover = 'https://oss.ideaflow.top/configImg/default-avatar.webp'

// 格式化日期
const formatDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-')
}

// console.log("props.articles:",JSON.stringify(props))

// 计算属性：文章列表
const articleList = computed(() => props.articles || [])
</script>