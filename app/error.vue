<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    message?: string
  }
}>();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 overflow-hidden relative">
    <!-- 海浪动画效果 -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute w-full h-32 bottom-0 bg-gradient-to-t from-blue-200/30 to-transparent dark:from-blue-500/20 animate-wave"></div>
      <div class="absolute w-full h-24 bottom-0 bg-gradient-to-t from-blue-100/20 to-transparent dark:from-blue-400/10 animate-wave-delay"></div>
    </div>

    <!-- 装饰性元素 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- 椰树 -->
      <div class="absolute bottom-0 right-10 w-32 h-48 text-green-600 dark:text-green-400 transform -rotate-6 animate-palm-sway">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 160" fill="currentColor">
          <path d="M50 160c2-40 10-80 15-100 2-8 5-15 8-20 15-25 25 10 12 30-8 12-15 25-20 90M45 60c-10-30-25-40-30-40 20-5 35 15 30 40M55 50c10-25 28-30 35-30-20-5-40 10-35 30M42 80c-15-20-35-25-40-25 25 0 45 15 40 25M58 70c15-15 35-15 40-15-25-5-45 5-40 15"/>
        </svg>
      </div>
      <!-- 小岛 -->
      <div class="absolute bottom-4 left-10 w-48 h-16 bg-amber-200 dark:bg-amber-700 rounded-full transform skew-x-12"></div>
    </div>

    <div class="relative z-10 text-center px-4 transform hover:scale-105 transition-transform duration-500">
      <!-- 错误状态图标 -->
      <div class="mb-8 relative group">
        <div class="w-48 h-48 mx-auto bg-gradient-to-br from-teal-100 via-cyan-200 to-sky-300 dark:from-teal-700 dark:via-cyan-800 dark:to-sky-900 rounded-full shadow-xl transform-gpu transition-all duration-500 hover:rotate-12 group-hover:scale-110 overflow-hidden relative">
          <!-- 沙滩球纹理 -->
          <div class="absolute inset-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full">
              <defs>
                <pattern id="beach-ball-stripes" patternUnits="userSpaceOnUse" width="20" height="100" patternTransform="rotate(15)">
                  <rect width="10" height="100" fill="rgba(255,255,255,0.4)" />
                  <rect x="10" width="10" height="100" fill="rgba(255,255,255,0.1)" />
                </pattern>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#beach-ball-stripes)" />
              <circle cx="35" cy="35" r="8" fill="rgba(255,255,255,0.3)" class="animate-shine" />
            </svg>
          </div>
          <!-- 错误代码 -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div v-if="error.statusCode === 404" class="text-7xl font-bold text-white dark:text-white/90 animate-float drop-shadow-lg">404</div>
            <div v-else class="text-6xl font-bold text-white dark:text-white/90 animate-float drop-shadow-lg">{{ error.statusCode }}</div>
          </div>
          <!-- 光泽效果 -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-white/10 rounded-full animate-shine"></div>
        </div>
      </div>
      
      <!-- 错误信息 -->
      <p class="mb-8 text-xl text-teal-700 dark:text-teal-300 font-medium animate-fade-in">
        {{ error.statusCode === 404 ? '哎呀！这个页面正在海边度假呢~ 🏖️' : error.message || '看来服务器去冲浪了... 🏄‍♂️' }}
      </p>

      <!-- 返回按钮 -->
      <button
        class="px-8 py-3 text-white bg-gradient-to-r from-teal-400 to-cyan-400 dark:from-teal-500 dark:to-cyan-500 rounded-full font-medium shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 animate-fade-in-up"
        @click="handleError"
      >
        返回首页 🌊
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes wave {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-10px) translateX(-5px); }
}

@keyframes palm-sway {
  0%, 100% { transform: rotate(-6deg); }
  50% { transform: rotate(2deg); }
}

.animate-wave {
  animation: wave 8s ease-in-out infinite;
}

.animate-wave-delay {
  animation: wave 6s ease-in-out infinite;
  animation-delay: -3s;
}

.animate-palm-sway {
  animation: palm-sway 5s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shine {
  0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.5; transform: scale(1.02) rotate(15deg); }
}

.animate-shine {
  animation: shine 4s ease-in-out infinite;
}
</style>