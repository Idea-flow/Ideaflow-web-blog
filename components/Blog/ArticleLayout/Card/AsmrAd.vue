<script setup lang="ts">
import { navigateTo } from '#app'
import {useBlogStore} from "~/stores/blog";
import CryptoJS from 'crypto-js';
import { idToCode, codeToId } from '~/utils/BvIdUtils';

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
    resourceDuration: string; // 可以为空
    resourceSize: string; // 可以为空
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

// 格式化时间显示
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  
  // 今天的日期
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // 传入日期
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  // 计算相差天数
  const diffTime = today.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0 || diffDays === -1) {
    return '今日';
  } else if (diffDays === 1) {
    return '昨日';
  } else if (diffDays <= 30) {
    return `${diffDays}天前`;
  } else if (diffDays <= 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths}个月前`;
  } else {
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears}年前`;
  }
}

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

  navigateTo(`/article/` + idToCode(id), { open: {
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
  <div class="px-4 md:px-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
    <template v-for="(article, index) in articleList" :key="article.id">
<!--      <div v-if="index === Math.floor(articleList.length / 2) && articleList.length > 1" -->
<!--           class="group bg-base-100 backdrop-blur-sm rounded-xl transition-all duration-300 relative overflow-hidden cursor-pointer card-scale-animation">-->
<!--        <AdAdsterraNativeBanner />-->
<!--      </div>-->
      <div
        @click="goToArticle(article.id)"
        class="group bg-base-100 backdrop-blur-sm rounded-xl transition-all duration-300 relative overflow-hidden cursor-pointer card-scale-animation">
        <!-- 置顶标记 -->
        <div v-if="article.isStick === 1"
             class="absolute top-0 left-0 bg-gradient-to-r from-violet-500/90 to-purple-400/90 dark:from-violet-400/60 dark:to-purple-300/60 text-white px-3 py-1.5 text-xs rounded-br-lg z-10">
          置顶
        </div>

        <!-- 封面图片或默认背景 -->
        <div class="h-56 sm:h-56 md:h-56 lg:h-60 xl:h-72 overflow-hidden relative group/image rounded-2xl">
          <template v-if="article.cover">
            <img :src="article.cover" :alt="article.title"
                 class="w-full h-full object-cover transform group-hover/image:scale-110 transition-all duration-500 ease-out filter group-hover/image:brightness-105 dark:brightness-75 dark:contrast-125 rounded-2xl" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

          </template>
          <template v-else>
            <div class="w-full h-full bg-gradient-to-br from-blue-50 to-violet-50 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center p-4 transform group-hover/image:scale-110 transition-all duration-500 ease-out rounded-2xl">
              <p class="text-gray-600 dark:text-gray-300 text-center font-title text-lg group-hover:text-primary transition-colors">遇事不决，可问春风</p>
            </div>

          </template>
          
          <!-- 左下角显示时间 -->
  <!--        <div class="absolute bottom-2 left-2 bg-black/50 dark:bg-black/70 text-white text-xs px-2 py-1 rounded">-->
  <!--          {{ formatTime(article.createTime) }}-->
  <!--        </div>-->
          
          <!-- 右下角显示时长 -->
          <div v-if="article.resourceDuration" class="absolute bottom-2 right-2 bg-black/50 dark:bg-black/70 text-white text-xs px-2 py-1 rounded">
            {{ article.resourceDuration }}
          </div>
        </div>

        <!-- 文章内容 -->
        <div class="p-5">
          <!-- 标题 -->
          <div class="relative group/tooltip">
            <h2 class="text-lg md:text-xl lg:text-xl text-base-content mb-3 truncate  transition-colors">
              {{ article.title }}
            </h2>
            <div class="absolute left-0 -top-2 w-max max-w-[600px] px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md
                        text-gray-800 dark:text-gray-200 text-sm rounded-lg shadow-xl
                        opacity-0 group-hover/tooltip:opacity-100 -translate-y-full invisible group-hover/tooltip:visible
                        transition-all duration-300 ease-out z-20">
              {{ article.title }}
            </div>
          </div>

          <!-- 摘要 -->
          <!--        <div class="relative group/tooltip">-->
          <!--          <p class="font-body text-text-base text-sm mb-4 truncate">{{ article.summary }}</p>-->
          <!--        </div>-->

          <!-- 分类和标签在同一行 -->
          <div class="flex flex-wrap items-center gap-3 mb-2 text-sm">
            <!-- 时间显示 -->
            <div class="flex items-center text-xs text-gray-600 dark:text-gray-400">
              <svg class="w-4 h-4 mr-1 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ formatTime(article.createTime) }}</span>
            </div>
            
            <!-- 分类 -->
            <div class="flex items-center text-xs text-gray-600 dark:text-gray-400">
              <svg class="w-4 h-4 mr-1 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ article.categoryName }}</span>
            </div>
            
            <!-- 标签 -->
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tag in article.tags" :key="tag.id"
                    class="flex items-center px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300  rounded-full hover:bg-primary/20 transition-colors cursor-pointer tag-pulse">
                <svg class="w-3 h-3 mr-1 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ tag.name }}
              </span>
            </div>

          </div>

        </div>

        <!-- 底部装饰线 -->
        <div
            class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-200 via-cyan-200 to-blue-200 dark:from-green-400 dark:via-cyan-400 dark:to-blue-400 group-hover:w-full group-hover:left-0 transition-all duration-300">
        </div>
      </div>
    </template>
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