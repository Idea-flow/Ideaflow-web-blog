<template>
  <div class="space-y-4">
    <div v-for="(item, index) in articleList" :key="item.id" class="relative overflow-hidden flex h-[190px] md:h-60 lg:h-52 xl:h-60  sm:bg-black dark:bg-gray-900 rounded-lg">
      <!-- 左侧图片 (偶数索引) -->
      <div
        v-if="index % 2 === 0"
        class="hidden sm:block relative min-w-[45%] bg-cover bg-no-repeat bg-center transform scale-100 hover:scale-125 transition-all duration-500 z-10"
        :style="{
          clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)',
          backgroundImage: `url(${item.cover || defaultCover})`
        }"
      />

      <!-- 文章信息区域 -->
      <div class="relative w-full sm:w-[65%] py-5 px-5 sm:px-10 lg:px-5 xl:px-10 z-20">
        <NuxtLink :to="`/article/${item.id}`" class="flex flex-col justify-between h-full text-center sm:text-start">
          <div>
            <h3 class="overflow-hidden relative w-full mb-2 text-white hover:text-primary-500 text-lg md:text-xl lg:text-[22px] xl:text-2xl transition-colors line-clamp-1">
              {{ item.title }}
            </h3>

            <p class="text-gray-300 text-sm sm:text-[15px] leading-7 sm:indent-8 line-clamp-2 xl:line-clamp-3">
              {{ item.summary }}
            </p>
          </div>

          <!-- 文章元信息 -->
          <div class="flex justify-center items-center flex-wrap gap-2 pt-5 space-x-4">

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
            <div class="flex items-center text-xs text-white" v-if="props.showViewCount">
              <span class="p-1 mt-[-2px] mr-[3px] text-[23px] text-white rounded-full bg-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
                </svg>
              </span>
              <span>{{ item.viewCount }}</span>
            </div>
            <!-- 分类名称或标签列表 -->
            <template v-if="!props.showTags">
              <div class="flex items-center text-xs text-white">
                <span class="p-1 mt-[-2px] mr-[3px] text-[23px] text-white rounded-full bg-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                </span>
                <span>{{ item.categoryName }}</span>
              </div>
            </template>
            <template v-else>
              <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                <template v-if="item.tags && item.tags.length > 0">
                  <div 
                    v-for="tag in item.tags" 
                    :key="tag.id"
                    class="flex items-center px-2 py-1 text-xs text-white bg-opacity-20 bg-white rounded-full hover:bg-opacity-30 transition-all duration-300 whitespace-nowrap"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 transition-colors duration-300 text-blue-400 dark:text-violet-300 hover:text-indigo-500 dark:hover:text-violet-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ tag.name }}</span>
                  </div>
                </template>
                <template v-else>
                  <div class="text-xs text-gray-400">暂无标签</div>
                </template>
              </div>
            </template>

          </div>
        </NuxtLink>
      </div>

      <!-- 模糊背景 -->
      <div
        class="absolute w-full h-60 bg-cover bg-center sm:blur-[2.5rem]  sm:brightness-[0.6] brightness-[0.8] dark:brightness-[0.5]"
        :style="{
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
      />
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
  showTags?: boolean
  showViewCount?: boolean
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