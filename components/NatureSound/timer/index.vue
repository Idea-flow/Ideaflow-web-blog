<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

interface Props {
  onTimeEnd?: () => void
  defaultTime?: number // 默认时间（分钟）
  presetTimes?: number[] // 预设时间选项（分钟）
}

const props = withDefaults(defineProps<Props>(), {
  defaultTime: 30,
  presetTimes: () => [15, 30, 45, 60, 90],
  onTimeEnd: () => {}
})

const initialTime = ref(props.defaultTime * 60)
const remainingTime = ref(initialTime.value) // 剩余时间（秒）
const isRunning = ref(false)
const timer = ref<NodeJS.Timeout | null>(null)

// 格式化时间显示
const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60)
  const seconds = remainingTime.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

// 计算进度条角度
const progressDegree = computed(() => {
  const progress = remainingTime.value / initialTime.value
  return 360 * progress
})

// 开始计时
const startTimer = () => {
  if (isRunning.value) return
  isRunning.value = true
  timer.value = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      stopTimer()
      props.onTimeEnd()
    }
  }, 1000)
}

// 停止计时
const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
  isRunning.value = false
}

// 重置计时器
const resetTimer = (minutes: number = props.defaultTime) => {
  stopTimer()
  initialTime.value = minutes * 60
  remainingTime.value = initialTime.value
}

// 选择预设时间
const selectPresetTime = (minutes: number) => {
  resetTimer(minutes)
  startTimer()
}

// 组件销毁时清理定时器
onUnmounted(() => {
  stopTimer()
})

</script>

<template>
  <div class="flex flex-col items-center space-y-8 p-8 ">
    <!-- 圆形进度条 -->
    <div 
      class="relative w-48 h-48 md:w-56 md:h-56 cursor-pointer transform transition-transform hover:scale-105"
      @click="isRunning ? stopTimer() : startTimer()"
    >
      <div class="absolute inset-0">
        <svg class="w-full h-full" viewBox="0 0 200 200">
          <!-- 背景圆环 -->
          <circle
            cx="100"
            cy="100"
            r="90"
            class="fill-none stroke-[#cce3dd]/20 dark:stroke-[#1e2b29]/30"
            stroke-width="8"
          />
          <!-- 进度圆环 -->
          <circle
            cx="100"
            cy="100"
            r="90"
            class="fill-none stroke-[#a8dadc] dark:stroke-[#7fbcb3] transition-all duration-300 ease-in-out"
            :stroke-dasharray="`${Math.PI * 180} ${Math.PI * 180}`"
            :stroke-dashoffset="`${Math.PI * 180 * (1 - progressDegree / 360)}`"
            stroke-width="8"
            transform="rotate(-90 100 100)"
          />
        </svg>
      </div>
      <!-- 时间显示 -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#a8dadc] to-[#cce3dd] dark:from-[#7fbcb3] dark:to-[#1e2b29] bg-clip-text text-transparent">
          {{ formattedTime }}
        </div>
        <div class="mt-2 text-sm text-[#457b9d] dark:text-[#a8caca] opacity-90">
          {{ isRunning ? '点击暂停' : '点击开始' }}
        </div>
      </div>
    </div>

    <!-- 预设时间选项 -->
    <div class="flex flex-wrap justify-center gap-3">
      <button
        v-for="time in props.presetTimes"
        :key="time"
        class="px-4 py-2 rounded-full border-2 border-[#cce3dd]/30 dark:border-[#1e2b29]/40 text-[#457b9d] dark:text-[#a8caca] text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-[#a8dadc] hover:to-[#cce3dd] dark:hover:from-[#7fbcb3] dark:hover:to-[#1e2b29] hover:border-transparent hover:text-white focus:outline-none focus:ring-2 focus:ring-[#a8dadc]/50 dark:focus:ring-[#7fbcb3]/40"
        :class="{ 'bg-gradient-to-r from-[#a8dadc] to-[#cce3dd] dark:from-[#7fbcb3] dark:to-[#1e2b29] border-transparent text-white': time * 60 === remainingTime && isRunning }"
        @click="selectPresetTime(time)"
      >
        {{ time }}分钟
      </button>
    </div>
  </div>
</template>