<script setup >
import { useAppStore } from '~/stores/app'
const appStore = useAppStore()
const isMobile = computed(() => appStore.mobile)

// SEO优化
useHead({
  title: "IdeaFlow博客-技术分享与学习笔记",
  meta: [
    {name: 'description', content: "欢迎访问IdeaFlow的博客，这里分享Web开发、前端技术、编程心得等优质内容。"},
    {name: 'keywords', content: "博客,前端开发,Web开发,技术分享,编程学习,nuxt3"},
    {name: 'author', content: "IdeaFlow"},
    // Open Graph tags for social sharing
    {property: 'og:type', content: "website"},
    {property: 'og:site_name', content: "IdeaFlow"},
    // Twitter Card tags
    {name: 'twitter:card', content: "summary_large_image"},
    {name: 'twitter:title', content: "IdeaFlow - 技术分享与学习笔记"},
    {name: 'twitter:description', content: "欢迎访问IdeaFlow，这里分享Web开发、前端技术、编程心得等优质内容。"},
    // iOS设备配置
    // { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }, // 启用iOS全屏模式
    // { name: 'mobile-web-app-capable', content: 'yes' }, // 启用iOS全屏模式
    {name: 'apple-mobile-web-app-status-bar-style', content: 'linear-gradient(45deg, #64B5F6, #7E57C2, #5C6BC0)'}, // iOS状态栏渐变背景
    {name: 'apple-mobile-web-app-title', content: 'IdeaFlow'}, // iOS主屏幕应用名称
    // Safari浏览器主题色配置  设置浏览器地址栏或状态栏的颜色
    {
      name: 'theme-color',
      content: 'linear-gradient(45deg, #64B5F6, #7E57C2, #5C6BC0)',
      media: '(prefers-color-scheme: light)'
    }, // 浅色模式
    {
      name: 'theme-color',
      content: 'linear-gradient(45deg, #64B5F6, #7E57C2, #5C6BC0)',
      media: '(prefers-color-scheme: dark)'
    }, // 暗黑模式
    // iPad相关配置
    {name: 'apple-mobile-web-app-orientations', content: 'portrait landscape'}, // iPad支持横竖屏
    {name: 'apple-mobile-web-app-status-bar-style', content: 'default'}, // iPad状态栏样式
    {name: 'baidu-site-verification', content: 'codeva-ftjQW09hFk'}, // 百度站点添加,验证网站
    {name: 'msvalidate.01', content: '4091F5A160A6A3D322E150AC8C956A26'}, // bing站点添加,验证网站
  ],
  link: [
    {rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'canonical', href: 'https://blog.ideaflow.top' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }, // Safari固定标签页图标颜色
    { rel: 'apple-touch-startup-image', href: '/launch.webp' }, // Safari固定标签页图标颜色
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

            <div class="w-auto ">
<!--              <Adsbygoogle-->
<!--                  ad-format="auto"-->
<!--                  :include-query="true"-->
<!--                  :style="{ minWidth: '300px' }"-->
<!--                  ad-slot="9250379418"-->
<!--              />-->

              <Adsbygoogle
                  ad-format="auto"
                  :include-query="true"
                  :style="{ minWidth: '300px' }"
              />
            </div>
    </div>

    <!-- 右侧边栏区域 -->
    <div class="hidden md:block w-[24%] sticky top-24 h-fit">
      <BlogSidebar v-if="!isMobile" />
    </div>
  </div>
</template>

<style scoped>

</style>