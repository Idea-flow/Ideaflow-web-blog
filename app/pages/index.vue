<script setup >
// 这个页面是博客首页，负责展示首页内容、SEO 信息和广告位。

import { useAppStore } from '~/stores/app'
const appStore = useAppStore()
const isMobile = computed(() => appStore.mobile)

// SEO优化
useHead({
  title: "IdeaFlow博客-技术分享与学习笔记",
  meta: [
    {name: 'description', content: "欢迎访问IdeaFlow的博客，这里分享Web开发、前端技术、编程心得等优质内容。"},
    {name: 'keywords', content: "博客,前端开发,Web开发,技术分享,编程学习,nuxt4"},
    {name: 'author', content: "IdeaFlow"},
    // Open Graph tags for social sharing
    {property: 'og:type', content: "website"},
    {property: 'og:site_name', content: "IdeaFlow"},
    // Twitter Card tags
    {name: 'twitter:card', content: "summary_large_image"},
    {name: 'twitter:title', content: "IdeaFlow - 技术分享与学习笔记"},
    {name: 'twitter:description', content: "欢迎访问IdeaFlow，这里分享Web开发、前端技术、编程心得等优质内容。"},
    {name: 'baidu-site-verification', content: 'codeva-ftjQW09hFk'}, // 百度站点添加,验证网站
    {name: 'msvalidate.01', content: '4091F5A160A6A3D322E150AC8C956A26'}, // bing站点添加,验证网站
  ],
  link: [
    { rel: 'canonical', href: 'https://blog.ideaflow.top' },
  ]
})

</script>

<template>
  <!-- 头部大图区域 -->
  <BlogImgBackground :isRipple="true">
    <!-- 星空效果 -->
    <BlogStarry />
  </BlogImgBackground>
  <div id="articles" class="relative flex justify-center w-full mx-auto mt-10">
    <!-- 左侧边栏区域 -->
    <div class="hidden md:block w-[1%] sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
      <!-- 这里可以添加左侧边栏的内容 -->

    </div>

    <!-- 中间内容区域 -->
    <div class="w-full md:w-[75%] max-w-6xl mx-2 md:mx-4 flex flex-col items-center">


      <BlogArticleLayout class="w-full" />
    </div>

    <!-- 右侧边栏区域 -->
    <div class="hidden md:block w-[24%] sticky top-24 h-fit">
      <BlogSidebar />
    </div>
  </div>
</template>

<style scoped>

</style>
