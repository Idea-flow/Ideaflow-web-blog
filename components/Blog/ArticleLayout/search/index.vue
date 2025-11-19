<script setup lang="ts">
defineProps<{
  articles: Array<{
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
    isHaveVideo: number
    videoUrl: string
    isStick: string
    createTime: string
  }>
  showViewCount?: boolean // 添加新属性，可选，默认为 true
}>()
</script>

<template>
  <!-- 空状态提示 -->
  <div v-if="articles.length === 0" class="flex flex-col items-center justify-center py-12">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 10l-3 3m0 0l-3-3m3 3V4" />
    </svg>
    <p class="text-lg text-gray-600 dark:text-gray-400">暂无搜索结果</p>
    <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">试试其他关键词吧</p>
  </div>
  <!-- 文章列表 -->
  <div v-else class="space-y-1 sm:space-y-2">
    <div v-for="article in articles" :key="article.id"
         class="group relative bg-base-300 backdrop-blur-sm rounded-xl p-3 sm:p-5
                border border-gray-100 dark:border-gray-700 shadow-sm
                hover:shadow-lg hover:border-blue-200 dark:hover:border-primary-hover
                transform transition-all duration-300 hover:scale-[1.02]
                overflow-hidden cursor-pointer">

      <div class="flex items-start justify-between gap-3 sm:gap-6">
        <div class="flex-grow">
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <NuxtLink :to="`/article/${article.id}`" target="_blank"  class="relative group/title inline-block flex-grow" >

              <div class="text-lg sm:text-xl font-medium
                           transition-all duration-300 leading-relaxed" v-html="article.title">

              </div>
            </NuxtLink>
            <time class="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400
                           group-hover:text-primary
                           transition-colors duration-300 ml-2 sm:ml-4 shrink-0">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 opacity-70" viewBox="0 0 24 24" fill="none">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ new Date(article.createTime).toLocaleDateString('zh-CN',
                  { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') }}
            </time>
          </div>

          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2 sm:mb-3
                    group-hover:text-gray-800 dark:group-hover:text-gray-300
                    transition-colors duration-300 line-clamp-3">
            {{ article.summary }}
          </p>

          <div class="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center hover:text-primary
                       transition-colors duration-300">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 opacity-70" viewBox="0 0 24 24" fill="none">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ article.categoryName }}
            </div>

            <div class="flex items-center gap-1 sm:gap-2 flex-wrap">
              <span v-for="tag in article.tags" :key="tag.id"
                    class="flex items-center
                           transform transition-all duration-300 hover:text-primary">
                <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 opacity-70" viewBox="0 0 24 24" fill="none">
                  <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ tag.name }}
              </span>
            </div>

            <div v-if="showViewCount !== false"
                 class="flex items-center ml-auto group-hover:text-primary
                       transition-colors duration-300">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 opacity-70" viewBox="0 0 24 24" fill="none">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ article.viewCount }}
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r
                  from-green-200 via-cyan-200 to-blue-200
                  dark:from-green-400 dark:via-cyan-400 dark:to-blue-400
                  group-hover:w-full group-hover:left-0
                  transition-all duration-300">
      </div>
    </div>
  </div>
</template>