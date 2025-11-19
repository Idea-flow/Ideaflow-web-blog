<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '~/stores/app'
import { login, register, getVerificationCode, socialAuthRedirect } from '~/remote/auth'
import GithubIcon from '~/assets/myIcons/github.svg'
import GoogleIcon from '~/assets/myIcons/google.svg'
import MyMessage from "~/components/Base/Message/MyMessage";

const props = defineProps<{
  redirect?: string
}>()

const router = useRouter()
const appStore = useAppStore()

const activeTab = ref('login') // 'login' | 'register'
const loginType = ref('password') // 'password' | 'code'
const loading = ref(false)
const countdown = ref(0)
const showPassword = ref(false)
const socialLoading = ref(false)
let isDev = process.env.NODE_ENV === "development";
const redirect = ref<string>(props.redirect || '/')
const socialRedirect = ref<string>('')

// 社交登录处理函数
const handleSocialLogin = async (type: number) => {
  if (false){
    MyMessage.success("暂不支持,请更换登录方式", 2000);
    return
  }
  if (socialLoading.value) return

  socialLoading.value = true
  try {
    const redirectUri =
        location.origin +
        '/login/socialLogin?' +
        encodeURIComponent(`type=${type}&redirect=${encodeURIComponent(redirect.value)}`)

    const {data} = await socialAuthRedirect(type, encodeURIComponent(redirectUri))
    // console.log("socialAuthRedirect:data,",JSON.stringify(data.value))
    if (data.value?.code === 0 || data.value?.code === 200) {
      // console.log("socialAuthRedirect:data2-window,",JSON.stringify(data.value))
      // 显示加载遮罩
      const loadingOverlay = document.createElement('div')
      loadingOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'
      loadingOverlay.innerHTML = `
        <div class="bg-base-100 rounded-lg p-6 flex flex-col items-center space-y-4">
          <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p class="text-text-base">正在跳转到社交登录页面...</p>
        </div>
      `
      document.body.appendChild(loadingOverlay)
      
      // 打开社交登录页面
      window.open(data.value.data, '_self')
      
      // 检查网络状态并在超时后提供反馈
      setTimeout(() => {
        if (document.body.contains(loadingOverlay)) {
          // 获取网络连接信息
          const connection = (navigator as any).connection || 
                           (navigator as any).mozConnection || 
                           (navigator as any).webkitConnection;
          
          let networkMessage = '社交登录跳转超时,请检查你的网络是否可以访问目标网站';
          
          if (connection) {
            if (!connection.downlink) {
              networkMessage = '网络连接似乎已断开，请检查网络设置后重试';
            } else if (connection.downlink < 1) {
              networkMessage = '当前网络较慢，请耐心等待或切换网络后重试';
            }
          }
          
          document.body.removeChild(loadingOverlay);
          MyMessage.warning(networkMessage, 5000);
        }
      }, 5000)
      // window.location.href = data.value.data;
    } else {
      MyMessage.error(data.value?.msg || '获取授权链接失败',3000)
    }
  } catch (error: any) {
    emailError.value = error.message || '社交登录失败，请稍后重试'
  } finally {
    socialLoading.value = false
  }
}
// 表单数据
const loginForm = ref({
  username: '',
  email: isDev? '843145936@qq.com' : '',
  password: isDev? '123' : '',
  code: ''
})

// 表单验证
const emailError = ref('')
const passwordError = ref('')
const codeError = ref('')
const usernameError = ref('')

// 验证邮箱格式
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 密码强度检测
const passwordStrength = computed(() => {
  const password = loginForm.value.password
  if (!password) return ''
  
  let strength = 0
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  return strength === 0 ? '弱'
    : strength <= 2 ? '中'
    : '强'
})

// 获取验证码
const sendVerificationCode = async () => {
  if (!validateEmail(loginForm.value.email)) {
    emailError.value = '请输入有效的邮箱地址'
    return
  }
  
  if (countdown.value > 0) return
  
  loading.value = true
  try {
    const type = activeTab.value === 'register' ? 'register' : 'login'
    await getVerificationCode({
      email: loginForm.value.email,
      type
    })
    
    // 发送成功后启动倒计时
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (error: any) {
    // 显示错误信息
    emailError.value = error.message || '验证码发送失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 切换标签
const switchTab = (tab: string) => {
  activeTab.value = tab
  resetForm()
}

// 切换登录方式
const switchLoginType = (type: string) => {
  loginType.value = type
  resetForm()
}

// 重置表单
const resetForm = () => {
  loginForm.value = {
    username: '',
    email: '',
    password: '',
    code: ''
  }
  emailError.value = ''
  passwordError.value = ''
  codeError.value = ''
  usernameError.value = ''
}

// 提交表单
const handleSubmit = async () => {
  // 重置错误信息
  emailError.value = ''
  passwordError.value = ''
  codeError.value = ''
  usernameError.value = ''

  // 表单验证
  if (!validateEmail(loginForm.value.email)) {
    emailError.value = '请输入有效的邮箱地址'
    return
  }
  
  if (activeTab.value === 'login') {
    if (loginType.value === 'password' && !loginForm.value.password) {
      passwordError.value = '请输入密码'
      return
    }
    if (loginType.value === 'code' && !loginForm.value.code) {
      codeError.value = '请输入验证码'
      return
    }
  } else {
    // 注册表单验证
    if (!loginForm.value.username) {
      usernameError.value = '请输入用户名'
      return
    }
    if (!loginForm.value.password) {
      passwordError.value = '请设置密码'
      return
    }
    if (!loginForm.value.code) {
      codeError.value = '请输入验证码'
      return
    }
  }
  
  loading.value = true
  try {
    if (activeTab.value === 'register') {
      // 调用注册接口
      const { data } = await register({
        username: loginForm.value.username,
        password: loginForm.value.password,
        email: loginForm.value.email,
        code: loginForm.value.code
      })

      if (data.value?.code === 0 || data.value?.code === 200) {
        // 存储用户信息和令牌
        appStore.setUserInfo(data.value.data)
        appStore.setToken({
          accessToken: data.value.data.accessToken,
          refreshToken: data.value.data.refreshToken
        })
        
        // 跳转到首页或指定页面
        await router.push(redirect.value)
      } else {
        // 注册失败
        throw new Error(data.value?.msg || '注册失败')
      }
    } else {
      // 实现登录逻辑
      const { data } = await login({
        account: loginForm.value.email,
        password: loginForm.value.password
      })

      if (data.value?.code === 0 || data.value?.code === 200) {
        // 存储用户信息和令牌
        appStore.setUserInfo(data.value.data)
        appStore.setToken({
          accessToken: data.value.data.accessToken,
          refreshToken: data.value.data.refreshToken
        })
        
        // 跳转到首页或指定页面
        await router.push(redirect.value)
      } else {
        // 登录失败
        throw new Error(data.value?.msg || '登录失败')
      }
    }
  } catch (error: any) {
    // 显示错误信息
    if (error.response?.data?.msg) {
      emailError.value = error.response.data.msg
    } else {
      emailError.value = error.message || '操作失败，请稍后重试'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md mx-auto bg-base-100 rounded-xl shadow-lg p-8">

    <!-- 表单容器 -->
    <div class="w-full">
      <!-- 登录表单 -->
      <div v-if="!activeTab || activeTab === 'login'" class="space-y-6">
        <h3 class="text-xl font-bold text-center text-text-base">欢迎回来</h3>
        
        <!-- 登录方式切换 -->
        <div class="flex justify-center space-x-4 text-sm">
          <button 
            @click="switchLoginType('password')"
            :class="loginType === 'password' ? 'text-primary border-b-2 border-primary' : 'text-text-muted'"
            class="pb-1 transition-all duration-200"
          >
            密码登录
          </button>
          <button 
            @click="switchLoginType('code')"
            :class="loginType === 'code' ? 'text-primary border-b-2 border-primary' : 'text-text-muted'"
            class="pb-1 transition-all duration-200"
          >
            验证码登录
          </button>
        </div>

        <!-- 邮箱输入框 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-base">邮箱</label>
          <input
            type="email"
            v-model="loginForm.email"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-primary outline-none transition-all bg-base-100 text-text-base"
            :class="emailError ? 'border-error' : 'border-gray-300 dark:border-gray-600'"
            placeholder="请输入邮箱地址"
          >
          <p v-if="emailError" class="text-sm text-red-500">{{ emailError }}</p>
        </div>

        <!-- 密码登录 -->
        <template v-if="loginType === 'password'">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-text-base">密码</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="loginForm.password"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-primary outline-none transition-all bg-base-100 text-text-base"
                :class="passwordError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
                placeholder="请输入密码"
              >
              <button
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted"
              >
                {{ showPassword ? '隐藏' : '显示' }}
              </button>
            </div>
            <p v-if="passwordError" class="text-sm text-red-500">{{ passwordError }}</p>
          </div>

          <div class="flex items-center justify-end">
            <button class="text-sm text-primary hover:text-primary-hover">
              忘记密码？
            </button>
          </div>
        </template>

        <!-- 验证码登录 -->
        <template v-if="loginType === 'code'">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-text-base">验证码</label>
            <div class="flex space-x-2">
              <input
                type="text"
                v-model="loginForm.code"
                class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 ring-primary outline-none transition-all bg-base-100 text-text-base"
                :class="codeError ? 'border-error' : 'border-gray-300 dark:border-gray-600'"
                placeholder="请输入验证码"
                maxlength="6"
              >
              <button
                @click="sendVerificationCode"
                :disabled="countdown > 0"
                class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
              >
                {{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
              </button>
            </div>
            <p v-if="codeError" class="text-sm text-red-500">{{ codeError }}</p>
          </div>
        </template>

        <!-- 登录按钮 -->
        <button
          @click="handleSubmit"
          :disabled="loading"
          class="w-full py-2 text-white bg-primary rounded-lg hover:bg-primary-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform active:scale-95"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <!-- 注册引导 -->
        <div class="text-center text-sm">
          <span class="text-text-muted">还没有账号？</span>
          <button 
            @click="switchTab('register')"
            class="text-primary hover:text-primary-hover font-medium ml-1"
          >
            立即注册
          </button>
        </div>

        <!-- 社交登录 -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-base"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 text-text-muted bg-base-100">社交账号登录</span>
          </div>
        </div>

        <div class="flex justify-center space-x-4">
<!--          <button -->
<!--            @click="handleSocialLogin(100)"-->
<!--            :disabled="socialLoading"-->
<!--            class="p-2 text-text-muted hover:text-primary transition-colors duration-200 flex items-center gap-2"-->
<!--          >-->
<!--            <Icon name="uil:github" class="w-6 h-6" />-->
<!--            GitHub-->
<!--          </button>-->
          <button 
            @click="handleSocialLogin(101)"
            :disabled="socialLoading"
            class="p-2 text-text-muted hover:text-primary transition-colors duration-200 flex items-center gap-2"
          >
            <Icon name="mdi:google" class="w-6 h-6" />
            Google
          </button>
        </div>
      </div>

      <!-- 注册表单 -->
      <div v-if="activeTab === 'register'" class="space-y-6">
        <h3 class="text-xl font-bold text-center text-text-base">创建新账号</h3>

        <!-- 用户名输入框 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-base">用户名</label>
          <input
            type="text"
            v-model="loginForm.username"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-primary outline-none transition-all bg-base-100 text-text-base"
            :class="usernameError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
            placeholder="请输入用户名"
          >
          <p v-if="usernameError" class="text-sm text-red-500">{{ usernameError }}</p>
        </div>

        <!-- 邮箱输入框 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-base">邮箱</label>
          <input
            type="email"
            v-model="loginForm.email"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-primary outline-none transition-all bg-base-100 text-text-base"
            :class="emailError ? 'border-error' : 'border-gray-300 dark:border-gray-600'"
            placeholder="请输入邮箱地址"
          >
          <p v-if="emailError" class="text-sm text-red-500">{{ emailError }}</p>
        </div>

        <!-- 验证码 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-base">验证码</label>
          <div class="flex space-x-2">
            <input
              type="text"
              v-model="loginForm.code"
              class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 ring-primary outline-none transition-all bg-base-100 text-text-base"
              :class="codeError ? 'border-error' : 'border-gray-300 dark:border-gray-600'"
              placeholder="请输入验证码"
              maxlength="6"
            >
            <button
              @click="sendVerificationCode"
              :disabled="countdown > 0"
              class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
            >
              {{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
            </button>
          </div>
          <p v-if="codeError" class="text-sm text-red-500">{{ codeError }}</p>
        </div>

        <!-- 密码设置 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-base">设置密码</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="loginForm.password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-primary outline-none transition-all bg-base-100 text-text-base"
              :class="passwordError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
              placeholder="请设置密码"
            >
            <button
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted"
            >
              {{ showPassword ? '隐藏' : '显示' }}
            </button>
          </div>
          <p v-if="passwordError" class="text-sm text-red-500">{{ passwordError }}</p>
          
          <!-- 密码强度指示器 -->
          <div v-if="loginForm.password" class="mt-2">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">密码强度: {{ passwordStrength }}</div>
            <div class="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full transition-all duration-300"
                :class="{
                  'w-1/3 bg-red-500': passwordStrength === '弱',
                  'w-2/3 bg-yellow-500': passwordStrength === '中',
                  'w-full bg-green-500': passwordStrength === '强'
                }"
              ></div>
            </div>
          </div>
        </div>

        <!-- 注册按钮 -->
        <button
          @click="handleSubmit"
          :disabled="loading"
          class="w-full py-2 text-white bg-primary rounded-lg hover:bg-primary-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform active:scale-95"
        >
          {{ loading ? '注册中...' : '注册' }}
        </button>

        <!-- 登录引导 -->
        <div class="text-center text-sm">
          <span class="text-gray-600 dark:text-gray-400">已有账号？</span>
          <button 
            @click="switchTab('login')"
            class="text-primary hover:text-primary-hover font-medium ml-1"
          >
            立即登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 添加过渡动画 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* 密码强度指示器 */
.strength-indicator {
  height: 4px;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* 社交登录按钮悬停效果 */
.social-login-button:hover {
  transform: translateY(-2px);
}
</style>