<script setup lang="ts">
import { navigateTo } from '#app'
import {useBlogStore} from "~/stores/blog";
import CryptoJS from 'crypto-js';
import {OpenWindowFeatures} from "#app/composables/router";
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
    isHaveVideo: number
    isHaveAuth: number
    videoUrl: string
    isStick: string
    createTime: string
  }>,
  showViewCount?: boolean
}>()

// 计算属性：文章列表
const articleList = computed(() => props.articles || [])

// console.log("card-my-articleList:", JSON.stringify(articleList.value))

const blogStore = useBlogStore()

const passwordAuth = ref('')
const passwordAuthDialog = ref(false)
const currentAuthId = ref(0)
// 跳转到文章详情页
const goToArticle = (id: number) => {

  if (props.articles) {
    const article = props.articles.find(a => a.id === id)
    if (article && article.isHaveAuth === 1) {
      currentAuthId.value = id
      // console.log("article.isHaveAuth:", article.isHaveAuth)
      const au = useCookie('au').value
      // useCookie('au').value = passwordAuth.value
      // const articlePass = blogStore.articleAuth[id]
      // console.log("au:", au)
      if (!au) {
        passwordAuthDialog.value = true
        // console.log("article.isHaveAuth没有授权:", article.isHaveAuth)
        return
      }
    }else {
      // console.log("article.isHaveAuth没有授权:", article.isHaveAuth)
    }
  }

  navigateTo(`/article/${id}`, { open: {
      target: '_blank' // 打开新窗口
    } })
}
function onPasswordSubmit(password: string) {
  // 处理密码，例如发请求校验
  // console.log('输入的密码：', password)
  passwordAuthDialog.value = false
  blogStore.setArticleAuth(CryptoJS.MD5(password).toString())

  navigateTo(`/article/${currentAuthId.value}`, { open:  {
      target: '_blank' // 打开新窗口
    } })
}

</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
    <div v-for="article in articleList" :key="article.id"
      @click="goToArticle(article.id)"
      class="group bg-base-100 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-700 card-scale-animation">
      <!-- 置顶标记 -->
      <div v-if="article.isStick === 1"
        class="absolute top-0 left-0 bg-gradient-to-r from-violet-500/90 to-purple-400/90 dark:from-violet-400/60 dark:to-purple-300/60 text-white px-3 py-1.5 text-xs rounded-br-lg z-10">
        置顶
      </div>

      <!-- 封面图片或默认背景 -->
      <div class="h-48 overflow-hidden relative group/image">
        <template v-if="article.cover">
          <img :src="article.cover" :alt="article.title"
            class="w-full h-full object-cover transform group-hover/image:scale-110 transition-all duration-500 ease-out filter group-hover/image:brightness-105 dark:brightness-75 dark:contrast-125" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
          <!-- 视频播放图标 -->
          <div v-if="article.isHaveVideo === 1"
               class="absolute inset-0 flex items-center justify-center group/play">
            <div class="w-16 h-16 bg-black/60 rounded-xl flex items-center justify-center
                        transform transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-black/60">
              <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24" class="transform transition-all duration-300 group-hover/play:scale-110">
                <path fill="rgba(229, 231, 235, 0.9)" d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
              </svg>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="w-full h-full bg-gradient-to-br from-blue-50 to-violet-50 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center p-4 transform group-hover/image:scale-105 transition-all duration-500 ease-out">
            <p class="text-gray-600 dark:text-gray-300 text-center font-title text-lg group-hover:text-primary transition-colors">遇事不决，可问春风</p>
          </div>
          <!-- 视频播放图标 -->
          <div v-if="article.isHaveVideo === 1"
               class="absolute inset-0 flex items-center justify-center group/play">
            <div class="w-16 h-16 bg-black/20 rounded-xl flex items-center justify-center
                        transform transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-black/60">
              <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24" class="transform transition-all duration-300 group-hover/play:scale-110">
                <path fill="rgba(229, 231, 235, 0.9)" d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
              </svg>
            </div>
          </div>
        </template>
      </div>

      <!-- 文章内容 -->
      <div class="p-5">
        <!-- 标题 -->
        <div class="relative group/tooltip">
          <h2 class="text-lg md:text-xl lg:text-xl text-base-content mb-3 truncate  transition-colors">
            {{ article.title }}
          </h2>
          <div class="absolute left-0 -top-2 w-max max-w-[600px] px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md
                      text-gray-800 dark:text-gray-200 text-sm rounded-lg shadow-xl border border-gray-100 dark:border-gray-700
                      opacity-0 group-hover/tooltip:opacity-100 -translate-y-full invisible group-hover/tooltip:visible
                      transition-all duration-300 ease-out z-20">
            {{ article.title }}
          </div>
        </div>

        <!-- 摘要 -->
        <div class="relative group/tooltip">
          <p class="font-body text-text-base text-sm mb-4 truncate">{{ article.summary }}</p>
        </div>

        <!-- 元信息 -->
        <div class="flex items-center text-xs text-gray-600 dark:text-gray-500 space-x-4 mb-4">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ new Date(article.createTime).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') }}</span>
          </div>
          <div class="flex items-center" v-if="props.showViewCount">
            <svg class="w-4 h-4 mr-1 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ article.viewCount }}</span>
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ article.categoryName }}</span>
          </div>
        </div>

        <!-- 标签 -->
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in article.tags" :key="tag.id"
            class="flex items-center px-2 py-1 text-xs text-gray-600  rounded-full hover:bg-primary/20 transition-colors cursor-pointer tag-pulse">
            <svg class="w-3 h-3 mr-1 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ tag.name }}
          </span>
        </div>
      </div>

      <!-- 底部装饰线 -->
      <div
        class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-200 via-cyan-200 to-blue-200 dark:from-green-400 dark:via-cyan-400 dark:to-blue-400 group-hover:w-full group-hover:left-0 transition-all duration-300">
      </div>
    </div>
  </div>



  <BaseDialog v-model="passwordAuthDialog" title="文章密码验证" :show-footer="false" height="40%">
    <BlogArticlePasswordAuth @submit="onPasswordSubmit" />
  </BaseDialog>


</template>

<style scoped>
.tag-pulse {
  animation: tagPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes tagPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.card-scale-animation {
  transition: all 0.3s ease-in-out;
}

.card-scale-animation:hover {
  transform: scale(1.02);
}
</style>