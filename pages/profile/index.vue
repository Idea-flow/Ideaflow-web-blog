<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()

// 用户信息
const userInfo = computed(() => appStore.userInfo || {})

// 用户统计数据
const userStats = computed(() => ({
  articles: userInfo.value.articleCount || 0,
  comments: userInfo.value.commentCount || 0,
  likes: userInfo.value.likeCount || 0
}))
</script>

<template>
  <div class="min-h-screen bg-base-100 dark:bg-base-300 py-8 px-4 sm:px-6 lg:px-8">
    <!-- 个人信息卡片 -->
    <div class="max-w-4xl mx-auto">
      <div class="backdrop-blur-xl bg-white/30 dark:bg-black/30 rounded-2xl shadow-lg p-6 sm:p-8">
        <!-- 头像和基本信息 -->
        <div class="flex flex-col sm:flex-row items-center gap-6">
          <div class="relative">
            <img
              :src="userInfo.avatar || '/images/default-avatar.png'"
              :alt="userInfo.username"
              class="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-primary/20"
            />
            <div class="absolute -bottom-2 right-0 bg-primary text-white text-xs px-2 py-1 rounded-full">
              {{ userInfo.role || '访客' }}
            </div>
          </div>
          
          <div class="text-center sm:text-left">
            <h1 class="text-2xl sm:text-3xl font-bold text-base-content">
              {{ userInfo.username || '未设置昵称' }}
            </h1>
            <p class="mt-2 text-base-content/70">
              {{ userInfo.signature || '这个人很懒，什么都没写~' }}
            </p>
            <div class="mt-4 flex items-center justify-center sm:justify-start gap-4">
              <button class="btn btn-primary btn-sm">
                编辑资料
              </button>
              <button class="btn btn-ghost btn-sm">
                我的文章
              </button>
            </div>
          </div>
        </div>

        <!-- 数据统计 -->
        <div class="grid grid-cols-3 gap-4 mt-8 text-center">
          <div class="p-4 rounded-xl bg-base-200/50 dark:bg-base-200/20">
            <div class="text-2xl font-bold text-primary">{{ userStats.articles }}</div>
            <div class="text-sm text-base-content/70">文章</div>
          </div>
          <div class="p-4 rounded-xl bg-base-200/50 dark:bg-base-200/20">
            <div class="text-2xl font-bold text-primary">{{ userStats.comments }}</div>
            <div class="text-sm text-base-content/70">评论</div>
          </div>
          <div class="p-4 rounded-xl bg-base-200/50 dark:bg-base-200/20">
            <div class="text-2xl font-bold text-primary">{{ userStats.likes }}</div>
            <div class="text-sm text-base-content/70">获赞</div>
          </div>
        </div>
      </div>

      <!-- 最近活动 -->
      <div class="mt-8 backdrop-blur-xl bg-white/30 dark:bg-black/30 rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 class="text-xl font-bold text-base-content mb-6">最近活动</h2>
        <div class="text-base-content/70 text-center py-8">
          暂无活动记录
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95;
}
</style>