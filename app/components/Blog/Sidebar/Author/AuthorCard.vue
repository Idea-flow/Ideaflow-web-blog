<script setup lang="ts">
import { ref } from 'vue'

// 个人信息数据
const profile = ref({
  avatar: 'https://oss.ideaflow.top/configImg/default-avatar2.webp',
  name: 'Ideaflow',
  title: '',
  bio: '使用nuxt3,springboot生态系统的开发。喜欢分享技术经验~',
  location: '',
  social: [
    {
      name: 'bilibili',
      url: 'https://space.bilibili.com/3546832187688966',
      icon: '/images/hotSearchIcons/bilibili.png'
    },

    {
      name: 'youtube',
      url: 'https://youtube.com/',
      icon: 'myBase:social-youtube',
    },
    {
      name: '爱发电',
      url: 'https://ifdian.net/a/biliww',
      icon: 'https://static.afdiancdn.com/static/img/logo/logo.png'
    },
    // {
    //   name: 'GitHub',
    //   url: 'https://github.com',
    //   icon: 'myBase:social-github',
    // },
    // {
    //   name: '微博',
    //   url: 'https://weibo.com',
    //   icon: 'myBase:social-weibo'
    // },
    // {
    //   name: 'qq',
    //   url: 'https://qq.com/',
    //   icon: 'myBase:social-qq',
    // },
    // {
    //   name: 'weixin',
    //   url: 'https://qq.com/',
    //   icon: 'myBase:social-wx'
    // },


  ]
})

const appStore = useAppStore()
const sidebarConfig = computed(() => appStore.getConfigData?.sidebarConfig)

if (sidebarConfig.value?.authorCardInfo) {
  profile.value = JSON.parse(sidebarConfig.value.authorCardInfo);
}

// console.log("sidebarConfig:"+JSON.stringify(sidebarConfig.value?.authorCardInfo))
// console.log("AuthorCard:"+JSON.stringify(profile.value))
</script>

<template>
  <div class="profile-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/80 dark:to-gray-800/80 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl dark:shadow-gray-800/30">
    <!-- 毛玻璃背景效果 -->
    <div class="absolute inset-0 bg-white/40 dark:bg-gray-800/30 backdrop-blur-xl z-0"></div>
    
    <!-- 装饰性背景图案 -->
    <div class="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full blur-2xl"></div>
    <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 dark:from-green-400/10 dark:to-teal-400/10 rounded-full blur-2xl"></div>
    
    <!-- 内容区域 -->
    <div class="relative z-10">
      <!-- 头像区域 -->
      <div class="flex justify-center mb-6">
        <div class="relative group">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
          <div class="relative">
            <img 
              :src="profile.avatar" 
              :alt="profile.name"
              class="w-24 h-24 rounded-full object-cover  transition-transform duration-300 group-hover:scale-105"
            >
          </div>
        </div>
      </div>
      
      <!-- 个人信息区域 -->
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{{ profile.name }}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-2">{{ profile.title }}</p>
        <div class="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm" v-if="profile.location">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {{ profile.location }}
        </div>
      </div>
      
      <!-- 个人简介 -->
      <div class="mb-6">
        <p class="text-gray-600 dark:text-gray-300 text-center leading-relaxed">{{ profile.bio }}</p>
      </div>
      
      <!-- 社交媒体链接 -->
      <div class="flex flex-wrap justify-center gap-4 max-w-[300px] mx-auto">
        <a 
          v-for="social in profile.social" 
          :key="social.name"
          :href="social.url"
          :title="social.name"
          target="_blank"
          rel="noopener noreferrer"
          class="social-icon-link group"
        >
          <div class="social-icon-container">
            <template v-if="social.icon.startsWith('<svg')">
              <span v-html="social.icon" class="social-icon-svg" />
            </template>

            <template v-else-if="social.icon.startsWith('my')">
              <Icon
                  :name="social.icon"
                  class="social-icon-svg"
              />
            </template>

            <template v-else>
              <img :src="social.icon" :alt="social.name" class="social-icon-img" />
            </template>
          </div>
        </a>
      </div>


    </div>
  </div>
</template>

<style scoped>
.social-icon-link {
  @apply flex items-center justify-center transition-all duration-300;
  @apply hover:-translate-y-1 hover:scale-110;
  @apply dark:text-gray-200;
}

.social-icon-container {
  @apply w-7 h-7 flex items-center justify-center overflow-hidden;
}

.social-icon-svg {
  @apply w-full h-full;
}

.social-icon-svg :deep(svg) {
  @apply w-full h-full;
}

.social-icon-img {
  @apply w-full h-full object-contain;
}

.profile-card {
  max-width: 400px;
  margin: 0 auto;
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