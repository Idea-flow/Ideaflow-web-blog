<script setup lang="ts">
import { navigateTo } from '#app'

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

// 计算属性：文章列表
const articleList = computed(() => props.articles || [])

// 跳转到文章详情页
const goToArticle = (id: number) => {
  navigateTo(`/article/${id}`)
}

// 鼠标悬停状态
const hoveredArticle = ref<number | null>(null)
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
    <div v-for="article in articleList" :key="article.id"
      @click="goToArticle(article.id)"
      @mouseenter="hoveredArticle = article.id"
      @mouseleave="hoveredArticle = null"
      class="group relative transform-gpu transition-all duration-500 ease-out"
      :class="{
        'hover:scale-[1.02] hover:z-10': hoveredArticle !== article.id,
        'scale-[1.02] z-10': hoveredArticle === article.id
      }">
      <div class="relative h-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden
                  border border-gray-100 dark:border-gray-700 cursor-pointer
                  transition-all duration-500 ease-out transform-gpu perspective-1000
                  group-hover:shadow-2xl group-hover:shadow-primary/20 dark:group-hover:shadow-primary/10">
        <!-- 置顶标记 -->
        <div v-if="article.isStick === 1"
          class="absolute top-0 left-0 z-10 px-3 py-1.5 text-xs text-white
                 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-br-xl
                 transform-gpu transition-transform duration-300 group-hover:scale-110">
          置顶
        </div>

        <!-- 封面图片或默认背景 -->
        <div class="relative h-48 overflow-hidden group/image">
          <template v-if="article.cover">
            <img :src="article.cover" :alt="article.title"
              class="w-full h-full object-cover transition-all duration-700 ease-out
                     transform-gpu group-hover/image:scale-110 filter saturate-[0.9] contrast-[1.1]
                     group-hover/image:saturate-[1.1] group-hover/image:contrast-[1.2]
                     dark:brightness-75 dark:group-hover/image:brightness-90" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0
                        group-hover/image:opacity-100 transition-opacity duration-500"></div>
          </template>
          <template v-else>
            <div class="w-full h-full flex items-center justify-center p-4
                        bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5
                        dark:from-primary/20 dark:via-secondary/20 dark:to-primary/20
                        transition-all duration-500 ease-out transform-gpu group-hover:scale-105">
              <p class="text-gray-600 dark:text-gray-300 text-center font-title text-lg
                        bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary
                        transition-all duration-300 group-hover:tracking-wider">
                遇事不决，可问春风
              </p>
            </div>
          </template>
        </div>

        <!-- 文章内容 -->
        <div class="p-5 space-y-4">
          <!-- 标题 -->
          <div class="relative group/tooltip">
            <h2 class="text-lg md:text-xl font-medium mb-2 truncate transition-all duration-300
                       text-gray-800 dark:text-gray-200 group-hover:text-primary">
              {{ article.title }}
            </h2>
            <!-- 标题提示框 -->
            <div class="absolute left-0 -top-2 w-max max-w-[600px] px-4 py-2
                        bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl
                        text-gray-800 dark:text-gray-200 text-sm rounded-lg
                        shadow-xl border border-gray-100 dark:border-gray-700
                        opacity-0 -translate-y-2 invisible
                        group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0
                        group-hover/tooltip:visible
                        transition-all duration-300 ease-out z-20">
              {{ article.title }}
            </div>
          </div>

          <!-- 摘要 -->
          <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 transition-all duration-300
                    group-hover:text-gray-700 dark:group-hover:text-gray-300">
            {{ article.summary }}
          </p>

          <!-- 元信息 -->
          <div class="flex items-center text-xs text-gray-400 dark:text-gray-500 space-x-4">
            <div class="flex items-center transition-all duration-300 hover:text-primary">
              <svg class="w-4 h-4 mr-1 opacity-70" viewBox="0 0 24 24" fill="none">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ new Date(article.createTime).toLocaleDateString('zh-CN',
                { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') }}</span>
            </div>
            <div class="flex items-center transition-all duration-300 hover:text-primary">
              <svg class="w-4 h-4 mr-1 opacity-70" viewBox="0 0 24 24" fill="none">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ article.viewCount }}</span>
            </div>
            <div class="flex items-center transition-all duration-300 hover:text-primary">
              <svg class="w-4 h-4 mr-1 opacity-70" viewBox="0 0 24 24" fill="none">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ article.categoryName }}</span>
            </div>
          </div>

          <!-- 标签 -->
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in article.tags" :key="tag.id"
              class="flex items-center px-3 py-1 text-xs font-medium rounded-full
                     bg-primary/10 text-primary
                     transition-all duration-300 transform-gpu
                     hover:scale-105 hover:bg-primary/20
                     animate-pulse hover:animate-none
                     cursor-pointer">
              <svg class="w-3 h-3 mr-1 opacity-70" viewBox="0 0 24 24" fill="none">
                <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- 底部装饰线 -->
        <div class="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden">
          <div class="w-full h-full bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50
                      transform translate-x-[-100%] group-hover:translate-x-0
                      transition-transform duration-500 ease-out"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>