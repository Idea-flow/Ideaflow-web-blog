<script setup lang="ts">
import { ref } from 'vue'
import MyMessage from "~/components/Base/Message/MyMessage"

const base64Input = ref('')
const previewUrl = ref('')
const fileType = ref('png')
const errorMessage = ref('')
const isLoading = ref(false)
const svgCode = ref('')

const validateBase64 = (input: string) => {
  try {
    // 检查是否是有效的Base64格式
    if (!input.startsWith('data:')) {
      throw new Error('无效的Base64格式，请确保包含data URI前缀')
    }
    // 如果是SVG格式，提取SVG代码
    if (fileType.value === 'svg' && input.includes('data:image/svg+xml;base64,')) {
      const base64Content = input.split('base64,')[1]
      svgCode.value = atob(base64Content)
    } else {
      svgCode.value = ''
    }
    return true
  } catch (error) {
    errorMessage.value = error.message
    return false
  }
}

const handlePreview = () => {
  errorMessage.value = ''
  if (!base64Input.value) {
    errorMessage.value = '请输入Base64字符串'
    return
  }
  if (validateBase64(base64Input.value)) {
    previewUrl.value = base64Input.value
  }
}

const downloadImage = () => {
  if (!previewUrl.value) {
    errorMessage.value = '请先预览图片'
    return
  }
  
  const link = document.createElement('a')
  link.href = previewUrl.value
  link.download = `image.${fileType.value}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <textarea
          v-model="base64Input"
          class="w-full h-48 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-base-100 dark:border-border-base dark:focus:ring-primary"
          placeholder="请输入Base64字符串..."
        />
        <div class="flex space-x-2">
          <select
            v-model="fileType"
            class="px-4 py-2 border dark:border-border-base dark:focus:ring-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-base-100 text-text-base"
          >
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
            <option value="svg">SVG</option>
          </select>
          <button
            @click="handlePreview"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="isLoading"
          >
            预览
          </button>
          <button
            @click="downloadImage"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            :disabled="!previewUrl || isLoading"
          >
            下载
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      </div>
      
      <!-- 预览区域 -->
      <div class="border dark:border-border-base rounded-lg p-4 flex flex-col space-y-4 min-h-[300px] bg-gray-50 dark:bg-base-100">
        <div v-if="isLoading" class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p class="mt-2 text-gray-600">加载中...</p>
        </div>
        <div v-else-if="!previewUrl" class="text-center text-gray-500 dark:bg-base-100">
          预览区域
        </div>
        <template v-else>
          <!-- SVG代码展示区域 -->
          <div v-if="fileType === 'svg' && svgCode" class="w-full">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium">SVG代码：</span>
              <button
                @click="() => {
                  navigator.clipboard.writeText(svgCode);
                  MyMessage({
                    message: '复制成功',
                    type: 'success',
                    duration: 2000
                  });
                }"
                class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                复制代码
              </button>
            </div>
            <pre class="bg-gray-100 p-4 rounded overflow-x-auto"><code class="text-sm">{{ svgCode }}</code></pre>
          </div>
          <!-- 图片预览区域 -->
          <div class="flex items-center justify-center">
            <img
              v-if="fileType !== 'svg'"
              :src="previewUrl"
              class="max-w-full max-h-[300px] object-contain"
              alt="预览图片"
            />
            <div
              v-else
              v-html="previewUrl"
              class="max-w-full max-h-[300px]"
            ></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 4rem);
}
</style>