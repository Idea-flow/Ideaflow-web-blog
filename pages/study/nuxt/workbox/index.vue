<script setup lang="ts">
const isNotificationSupported = 'Notification' in window
const notificationPermission = ref(isNotificationSupported ? Notification.permission : 'unsupported')

async function requestPermission() {
  if (!isNotificationSupported) {
    alert('您的浏览器不支持通知功能')
    return
  }

  try {
    const permission = await Notification.requestPermission()
    notificationPermission.value = permission
  } catch (error) {
    console.error('请求通知权限失败:', error)
  }
}

function showNotification() {
  if (!isNotificationSupported || notificationPermission.value !== 'granted') {
    alert('请先获取通知权限')
    return
  }

  try {
    const notification = new Notification('Workbox 通知示例', {
      body: '这是一条测试通知消息',
      icon: '/logo.webp',
      badge: '/logo.webp',
      tag: 'test-notification',
      data: { url: '/study/workbox' },
      actions: [
        { action: 'confirm', title: '确认' },
        { action: 'cancel', title: '取消' }
      ]
    })

    notification.onclick = (event) => {
      event.preventDefault()
      window.focus()
      notification.close()
    }

    notification.onaction = (event) => {
      if (event.action === 'confirm') {
        console.log('用户点击了确认')
      } else if (event.action === 'cancel') {
        console.log('用户点击了取消')
      }
      notification.close()
    }
  } catch (error) {
    console.error('显示通知失败:', error)
  }
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Workbox 通知示例</h2>
    
    <div class="space-y-4">
      <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <p class="mb-2">通知支持状态：{{ isNotificationSupported ? '支持' : '不支持' }}</p>
        <p class="mb-2">当前权限状态：{{ notificationPermission }}</p>
      </div>

      <div class="space-x-4">
        <button
          @click="requestPermission"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          :disabled="!isNotificationSupported || notificationPermission === 'granted'"
        >
          请求通知权限
        </button>

        <button
          @click="showNotification"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          :disabled="!isNotificationSupported || notificationPermission !== 'granted'"
        >
          发送测试通知
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>