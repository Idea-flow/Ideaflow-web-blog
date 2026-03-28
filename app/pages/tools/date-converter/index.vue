<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// SEO配置
useHead({
  title: '在线时间转换工具 - 时区转换、时间戳转换',
  meta: [
    { name: 'description', content: '在线时间转换工具，支持多时区转换、时间戳转换、格式化显示，提供丰富的时间格式预设，帮助开发者轻松处理时间转换问题。' },
    { name: 'keywords', content: '时间转换,时区转换,时间戳转换,日期格式化,在线工具' }
  ]
});

// 初始化 dayjs 插件，用于处理时区转换
dayjs.extend(utc)      // 添加 UTC 时间支持
dayjs.extend(timezone) // 添加时区支持

// 响应式状态声明
const inputTime = ref('')         // 输入的时间字符串
const sourceTimezone = ref('Asia/Shanghai') // 源时区
const targetTimezone = ref('Asia/Shanghai') // 目标时区
const convertedTime = ref('')     // 转换后的结果
const currentTimestamp = ref(Date.now()) // 当前时间戳

// 支持的时区列表
const timezones = reactive([
  { label: '北京 (UTC+8)', value: 'Asia/Shanghai' },
  { label: 'UTC', value: 'UTC' },
  { label: '纽约 (UTC-5)', value: 'America/New_York' },
  { label: '伦敦 (UTC+0)', value: 'Europe/London' },
  { label: '东京 (UTC+9)', value: 'Asia/Tokyo' },
])

// 时间格式预设
const formats = reactive([
  { label: 'ISO 8601', pattern: 'YYYY-MM-DDTHH:mm:ssZ' },  // 国际标准格式
  { label: 'RFC 3339', pattern: 'YYYY-MM-DD HH:mm:ss' },    // RFC 标准格式
  { label: '日期时间', pattern: 'YYYY-MM-DD HH:mm:ss' },     // 常用日期时间格式
  { label: '仅日期', pattern: 'YYYY-MM-DD' },               // 仅日期格式
])

// 监听输入和时区变化，实时转换时间
watch([inputTime, sourceTimezone, targetTimezone], () => {
  try {
    if (!inputTime.value) return
    convertedTime.value = convertTime(
      inputTime.value,
      sourceTimezone.value,
      targetTimezone.value
    )
  } catch (e) {
    convertedTime.value = '无效输入'
  }
}, { immediate: true })

// 实时更新当前时间戳
onMounted(() => {
  setInterval(() => {
    currentTimestamp.value = Date.now()
  }, 1000)
})

// 应用预设格式到输入框
const applyFormat = (format: { pattern: string }) => {
  const now = dayjs()
  inputTime.value = now.format(format.pattern)
}

// 复制单个结果到剪贴板
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

// 复制结果到剪贴板
const copyResult = () => {
  if (typeof convertedTime.value === 'object') {
    const result = `时间戳(秒): ${convertedTime.value.timestamp.seconds}\n时间戳(毫秒): ${convertedTime.value.timestamp.milliseconds}\n日期时间: ${convertedTime.value.datetime}\nISO: ${convertedTime.value.iso}\n时区: ${convertedTime.value.timezone}`
    navigator.clipboard.writeText(result)
  }
}

/**
 * 核心时间转换函数
 * @param input 输入的时间字符串或时间戳
 * @param fromTZ 源时区
 * @param toTZ 目标时区
 * @returns 包含多种格式的转换结果对象
 */
const convertTime = (input: string, fromTZ: string, toTZ: string): object => {
  let time: dayjs.Dayjs

  // 根据输入格式选择解析方式
  if (/^\d{10}$/.test(input)) {
    // 10位时间戳（秒）
    time = dayjs.unix(parseInt(input))
  } else if (/^\d{13}$/.test(input)) {
    // 13位时间戳（毫秒）
    time = dayjs(parseInt(input))
  } else {
    // 尝试解析日期字符串
    time = dayjs.tz(input, fromTZ)
  }

  if (!time.isValid()) {
    throw new Error('Invalid date')
  }

  // 转换到目标时区
  const converted = time.tz(toTZ)

  // 返回多种格式的结果
  return {
    timestamp: {
      seconds: converted.unix(),
      milliseconds: converted.valueOf()
    },
    datetime: converted.format('YYYY-MM-DD HH:mm:ss'),
    iso: converted.toISOString(),
    timezone: converted.format('Z')
  }
}
</script>

<template>
  <div class="min-h-screen bg-base-100 dark:bg-base-100 p-6">
    <!-- 标题和说明 -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-text-base dark:text-text-base mb-2">日期时间转换器</h1>
      <p class="text-text-muted text-sm">支持时间戳（10位秒/13位毫秒）、标准日期时间字符串的转换，可在不同时区间转换。</p>
    </div>
    
    <!-- 主内容区 -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- 输入区 -->
      <div class="bg-base-200 p-6 rounded-xl shadow-sm">
        <div class="mb-2">
          <label class="text-sm text-text-muted">输入时间：</label>
          <p class="text-xs text-text-muted mb-2">支持格式：时间戳(1699000000/1699000000000)、日期字符串(2023-11-03 12:00:00)</p>
        </div>
        <input 
          v-model="inputTime" 
          class="w-full p-3 border-border-base border rounded-lg mb-4 bg-base-300 text-text-base placeholder:text-text-placeholder focus:outline-none focus:ring-2 ring-primary ring-opacity-50"
          placeholder="输入时间戳或日期..."
        />
        
        <!-- 时区选择 -->
        <div class="mb-2">
          <label class="text-sm text-text-muted">选择时区：</label>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="text-xs text-text-muted mb-1 block">源时区</label>
            <BaseSelect
              v-model="sourceTimezone"
              :options="timezones"
              option-label="label"
              option-value="value"
              class="w-full"
              placeholder="选择源时区"
            />
          </div>
          <div>
            <label class="text-xs text-text-muted mb-1 block">目标时区</label>
            <BaseSelect
              v-model="targetTimezone"
              :options="timezones"
              option-label="label"
              option-value="value"
              class="w-full"
              placeholder="选择目标时区"
            />
          </div>
        </div>

        <!-- 格式预设按钮 -->
        <div class="mb-2">
          <label class="text-sm text-text-muted">快速输入当前时间：</label>
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          <BaseButton
            v-for="format in formats"
            :key="format.pattern"
            @click="applyFormat(format)"
            variant="secondary"
            size="sm"
          >
            {{ format.label }}
          </BaseButton>
        </div>
      </div>

      <!-- 输出区 -->
      <div class="bg-base-300 p-6 rounded-xl shadow-sm">
        <div class="p-4 bg-base-300 rounded-lg mb-4">
          <p class="text-text-muted mb-2">转换结果：</p>
          <template v-if="typeof convertedTime === 'object'">
            <div class="space-y-2 font-mono text-sm">
              <div class="flex items-center justify-between group">
                <p class="text-text-base">时间戳(秒): {{ convertedTime.timestamp.seconds }}</p>
                <button 
                  @click="copyToClipboard(convertedTime.timestamp.seconds.toString())"
                  class="p-1 hover:text-primary"
                  title="复制"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div class="flex items-center justify-between group">
                <p class="text-text-base">时间戳(毫秒): {{ convertedTime.timestamp.milliseconds }}</p>
                <button 
                  @click="copyToClipboard(convertedTime.timestamp.milliseconds.toString())"
                  class="p-1 hover:text-primary"
                  title="复制"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div class="flex items-center justify-between group">
                <p class="text-text-base">日期时间: {{ convertedTime.datetime }}</p>
                <button 
                  @click="copyToClipboard(convertedTime.datetime)"
                  class="p-1 hover:text-primary"
                  title="复制"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div class="flex items-center justify-between group">
                <p class="text-text-base">ISO: {{ convertedTime.iso }}</p>
                <button 
                  @click="copyToClipboard(convertedTime.iso)"
                  class="p-1 hover:text-primary"
                  title="复制"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div class="flex items-center justify-between group">
                <p class="text-text-base">时区: {{ convertedTime.timezone }}</p>
                <button 
                  @click="copyToClipboard(convertedTime.timezone)"
                  class="p-1 hover:text-primary"
                  title="复制"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </template>
          <p v-else class="text-xl font-mono text-text-base">{{ convertedTime }}</p>
        </div>
        
      </div>
    </div>

    <!-- 当前时间 -->
    <div class="mt-6 text-text-muted flex items-center gap-2">
      <span>当前时间戳: {{ currentTimestamp }}</span>
      <button 
        @click="copyToClipboard(currentTimestamp.toString())"
        class="p-1 hover:text-primary"
        title="复制"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>