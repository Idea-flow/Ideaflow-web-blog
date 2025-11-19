<script setup lang="ts">
import MyMessage from "~/components/Base/Message/MyMessage";



MyMessage({
  message: '操作server成功MyMessage！',
  type: 'success',
  duration: 3000
})


const showSuccess = () => {
  MyMessage({
    message: '操作成功MyMessage！',
    type: 'success',
    duration: 3000
  })
}

const showError = () => {

  MyMessage({
    message: '操作失败！',
    type: 'error',
    duration: 4000
  })

}

const showWarning = () => {
  MyMessage({
    message: 'warning！',
    type: 'warning',
    duration: 4000
  })
}

const showInfo = () => {
  MyMessage({
    message: '提示信息！',
    type: 'info',
    duration: 4000
  })
}

const showCustomDuration = () => {
  MyMessage({
    message: '这条消息会显示 10 秒钟',
    type: 'success',
    duration: 10000
  })
}
</script>

<template>
  <div class="p-6 space-y-8">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">消息提示示例</h2>
    
    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">基础用法</h3>
        <div class="flex flex-wrap gap-4">
          <button
            @click="showSuccess"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            成功提示
          </button>
          
          <button
            @click="showError"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            错误提示
          </button>
          
          <button
            @click="showWarning"
            class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            警告提示
          </button>
          
          <button
            @click="showInfo"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            信息提示
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">自定义显示时长</h3>
        <button
          @click="showCustomDuration"
          class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          显示 10 秒消息
        </button>
      </div>
    </div>
  </div>
</template>