<script setup lang="ts">
import {socialLogin} from "~/remote/auth";
import {useAppStore} from "~/stores/app";
import {navigateTo} from "#app";
import MyMessage from "~/components/Base/Message/MyMessage";
const appStore = useAppStore()
const route = useRoute()
const loading = ref(false)

function getUrlValue(key: string): string {
  const url = new URL(decodeURIComponent(location.href))
  return url.searchParams.get(key) ?? ''
}
// http://localhost:3005/login/socialLogin?type=100&code=64e014f1254e01b9e946&state=c3afa32a014a6db1d341ec9d6cf9c692
// 尝试登录: 当账号已经绑定，socialLogin会直接获得token
const tryLogin = async () => {
  if (loading.value) return
  loading.value = true

  try {
    const type = getUrlValue('type')
    const redirect = getUrlValue('redirect')
    const code = route.query.code as string
    const state = route.query.state as string

    if (!code || !state) {
      throw new Error('缺少必要的登录参数')
    }

    // 打印所有参数和完整URL
    console.log('tryLogin parameters:', {
      type,
      redirect,
      code,
      state,
      fullUrl: route.fullPath
    })
  //   {type: '', redirect: '', code: '98cf79572bb30cff7c57', state: '2abf765e6da00c5ba0e7ea32ada03ceb', fullUrl: '/login/socialLogin?code=98cf79572bb30cff7c57&state=2abf765e6da00c5ba0e7ea32ada03ceb'}
  // {type: '100', redirect: '/', code: '43a7133803a566f7e4c2', state: 'b53bef5bcd32fd8592109e68a37c3e57', fullUrl: '/login/socialLogin?type=100%26redirect=/&code=43a7…a566f7e4c2&state=b53bef5bcd32fd8592109e68a37c3e57'}

    const { data } = await socialLogin({
      type: type,
      code: code,
      state: state,
    }) // 这里有坑,需要客户端渲染才可以获取到数据, 如果不是,在客户端渲染后获取不到数据,猜测,应为useFetch的原因


    // console.log("socialLogindata:",JSON.stringify(data.value))
    if (data.value?.code === 0 || data.value?.code === 200) {
      // 存储用户信息和令牌
      appStore.setUserInfo(data.value.data)
      appStore.setToken({
        accessToken: data.value.data.accessToken,
        refreshToken: data.value.data.refreshToken
      })

      // 跳转到首页
      navigateTo(redirect || '/' )
    } else {
      // 登录失败
      MyMessage.error(data.value?.msg || '社交登录失败，请稍后重试', 2000)
    }
  } catch (err: any) {
    console.error('Social login error:', err)
    MyMessage.error(err?.message || '社交登录失败，请稍后重试', 3000)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  tryLogin()
})

</script>

<template>
  <div class="relative min-h-screen">
    <!-- 加载遮罩层 -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center space-y-4">
        <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p class="text-gray-700 dark:text-gray-300">登录中...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>