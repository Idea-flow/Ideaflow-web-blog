import {useCookie} from "#app";
import MyMessage from "~/components/Base/Message/MyMessage";
export default defineNuxtRouteMiddleware((to,from) => {

  // console.log("defineNuxtRouteMiddleware-iml路由中间件:to.path:",to.path )
  // 只对/im路径进行处理
  // if (import.meta.server && to.path === '/im') {
  if (to.path === '/im') { //只在客户端运行
    const token = useCookie('accessToken').value


    // console.log("defineNuxtRouteMiddleware-to.token.value:" ,token)
    // 如果token为空，重定向到登录页面
    if (!token) {
      MyMessage({
        message: '请登录才可以访问聊天室',
        type: 'error',
        duration: 1000
      })
      return navigateTo('/login')
    }else {
      const isMobile = useCookie('isMobile')
      const targetPath = isMobile.value ? '/im/h5' : '/im/web'

      // console.log("defineNuxtRouteMiddleware-to.accessTokenCookie.value:" ,isMobile.value)
      // console.log("defineNuxtRouteMiddleware-to.path:" ,to.path)

      return navigateTo(targetPath)
    }
    

  }
})