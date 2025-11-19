<script setup lang="ts">
import { computed } from 'vue'
import { navigateTo } from '#app'

interface Article {
  id: string | number
  title: string
  cover: string
  createTime: string
  order?: number
}

interface Props {
  articles: Article[]
  maxDisplay?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxDisplay: 4,
  articles: () => []
})

// 格式化时间
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 处理展示的文章列表
const displayArticles = computed(() => {
  return props.articles.slice(0, props.maxDisplay).map((article, index) => ({
    ...article,
    order: article.order || index + 1
  }))
})

// 获取序号标签的样式
const getOrderTagStyle = (order: number) => {
  const styles = [
    'from-blue-500 to-indigo-500',
    'from-green-500 to-teal-500',
    'from-purple-500 to-pink-500',
    'from-amber-500 to-orange-500',
    'from-rose-500 to-red-500'
  ]
  return styles[(order - 1) % styles.length]
}

// 处理文章点击事件
const handleArticleClick = async (articleId: number) => {
  await navigateTo(`/article/${articleId}`)
}
</script>

<template>

  <div class="profile-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/80 dark:to-gray-800/80 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl dark:shadow-gray-800/30 mt-8">
    <!-- 毛玻璃背景效果 -->
    <div class="absolute inset-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl z-0"></div>
    
    <!-- 装饰性背景图案 -->

    <div class="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full blur-2xl"></div>
    <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 dark:from-green-400/10 dark:to-teal-400/10 rounded-full blur-2xl"></div>


    <!-- 内容区域 -->
    <div class="relative z-10">
      <!-- 标题栏 -->
      <div class="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">推荐文章</h2>
      </div>

      <!-- 文章列表 -->
      <div class="space-y-2">
        <div
          v-for="article in displayArticles"
          :key="article.id"
          class="group relative overflow-hidden rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/10 transition-all duration-300 cursor-pointer"
          @click="() => handleArticleClick(article.id)"
        >
          <div class="relative z-10 flex items-center p-3 gap-3  ">
            <!-- 封面图片区域 -->
            <div class="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden">
              <!-- 序号标签 -->
              <div 
                class="absolute left-1 top-1 w-5 h-5 rounded-lg bg-gradient-to-r backdrop-blur-sm flex items-center justify-center text-black font-medium z-10 text-sm shadow-lg"
                :class="getOrderTagStyle(article.order)"
              >
                {{ article.order }}
              </div>
              
              <!-- 封面图片 -->
              <img
                :src="article.cover || '/logo.webp'"
                :alt="article.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              >
            </div>

            <!-- 文章信息 -->
            <div class="flex-grow min-w-0">
              <h3 class="text-base font-medium text-gray-900 dark:text-white truncate mb-1">
                {{ article.title }}
              </h3>
              <time class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatDate(article.createTime) }}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-card {
  max-width: 400px;
  margin: 2rem auto;
}

/* 深色模式适配 */
:deep(.dark) .profile-card {
  --tw-shadow-color: rgba(0, 0, 0, 0.1);
}

/* 添加卡片悬停时的光晕效果 */
.profile-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 50%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.profile-card:hover::before {
  opacity: 1;
}

/* 深色模式下的光晕效果 */
.dark .profile-card::before {
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 50%
  );
}
</style>