<template>

  <NuxtPwaManifest />

  <NuxtLayout  v-if="isShow" :name="layoutName">
    <NuxtPage />
  </NuxtLayout>

</template>

<script setup>
useHead({
  meta: [
    {name: 'google-adsense-account', content: 'ca-pub-1870872898412136'}, // 百度站点添加,验证网站
  ]
})

import {useCookie} from "#app";

const isShow = ref(true)


import {getAllConfig} from "~/remote/blogConfig.js";
import {computed, ref} from "vue";

const appStore = useAppStore()

// 检测是否为移动端
const isMobile = ref(false)

// 监听窗口大小变化
if (import.meta.client) {
  onMounted(() => {
    // 初始化移动端状态
    isMobile.value = window.innerWidth <= 768
    appStore.setMobile(isMobile.value)
    const isMobileCookie = useCookie('isMobile', {
      maxAge: 3600 * 24 * 7, // 24小时 * 7
      path: '/',
    })
    isMobileCookie.value = isMobile.value
    // 添加resize事件监听
    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768
      appStore.setMobile(isMobile.value)
      isMobileCookie.value = isMobile.value

    }
    
    window.addEventListener('resize', handleResize)

    // 在生产环境下禁用开发者工具和右键菜单
    let isDev = process.env.NODE_ENV === "development";
    // if (!isDev) {
    //   // 禁用F12和其他开发者工具快捷键
    //   window.addEventListener('keydown', (e) => {
    //     if (
    //       e.key === 'F12' ||
    //       (e.ctrlKey && e.shiftKey && e.key === 'I') ||
    //       (e.ctrlKey && e.shiftKey && e.key === 'J') ||
    //       (e.ctrlKey && e.key === 'U')
    //     ) {
    //       e.preventDefault()
    //       return false
    //     }
    //   })
    //
    //   // 禁用右键菜单
    //   window.addEventListener('contextmenu', (e) => {
    //     e.preventDefault()
    //     return false
    //   })
    // }
    
    // 组件卸载时移除监听器
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
  })
}


const { data: configRes } = await getAllConfig()
// console.log("configRes.value?.data:"+JSON.stringify(configRes.value?.data))
// 将配置数据存储到store中
appStore.setConfigData(configRes.value?.data)


const route = useRoute()

// 动态计算布局名称
const layoutName = computed(() => {
  let name = 'default';
  if (route.path?.includes('/tools')){
    name = 'tools'
  }
  if (route.path?.includes('/im/web')){
    name = 'imweb'
  }
  if (route.path?.includes('/im/h5')){
    name = 'imh5'
  }
  if (route.path?.includes('/hotSearch')){
    name = 'hotsearch'
  }
  if (route.path?.includes('/natureSound')){
    name = 'naturesound'
  }
  return name;

})

// console.log("process . env . NUXT_PUBLIC_API_BASE:" +process . env . NUXT_BLOG_BASE_API)
// console.log("NUXT_HUB_PROJECT_KEY:" +process . env . NUXT_HUB_PROJECT_KEY)
// console.log("NUXT_HUB_2:" +process . env . NUXT_HUB_2)
//
// // 使用 useRuntimeConfig()
//  const { public : { blogBaseURL } } = useRuntimeConfig() ;
// console . log ( "blogBaseURL:"+blogBaseURL ) ;
// 输出当前环境对应的 API 地址
const userInfo = computed(() => appStore.userInfo)
if (typeof umami !== 'undefined' && import.meta.client && userInfo.value ) {
  // umami.track(props => ({ ...props, userId: userInfo.value.id,userName:userInfo.value.username,userEmail:userInfo.value.email }));
  umami.identify({ userId: userInfo.value.id,userName:userInfo.value.username,userEmail:userInfo.value.email });
}
// const currentUserId = ref(userInfo.value.id)
// console.log ( "userInfo:"+JSON.stringify (userInfo.value) ) ;
// if (import.meta.client  && userInfo.value){} {
//   umami.track(props => ({ ...props, userId: userInfo.value.id,userName:userInfo.value.username,userEmail:userInfo.value.email }));
// }

// umami.track('views', { userId: userInfo.value.id,userName:userInfo.value.username,userEmail:userInfo.value.email });

</script>
