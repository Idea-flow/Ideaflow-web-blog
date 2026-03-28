<script setup lang="ts">
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const loading = ref(false)

const handleConfirm = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-medium">基础对话框</h2>
      <button
        class="px-4 py-2 text-sm rounded-lg bg-primary hover:bg-primary-hover text-base-100"
        @click="visible1 = true"
      >
        打开对话框
      </button>
      <BaseDialog v-model="visible1" title="基础对话框" :show-footer="false">
        <p>这是一个基础对话框的内容区域</p>
      </BaseDialog>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-medium">自定义内容对话框</h2>
      <button
        class="px-4 py-2 text-sm rounded-lg bg-primary hover:bg-primary-hover text-base-100"
        @click="visible2 = true"
      >
        打开对话框
      </button>
      <BaseDialog
        v-model="visible2"
        title="自定义内容对话框"
        :loading="loading"
        @confirm="handleConfirm"
      >
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <span class="text-text-base">用户名：</span>
            <input
              type="text"
              class="flex-1 px-3 py-2 rounded-lg border border-border-base focus:outline-none focus:border-primary"
              placeholder="请输入用户名"
            >
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-text-base">密码：</span>
            <input
              type="password"
              class="flex-1 px-3 py-2 rounded-lg border border-border-base focus:outline-none focus:border-primary"
              placeholder="请输入密码"
            >
          </div>
        </div>
      </BaseDialog>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-medium">可拖拽对话框</h2>
      <button
        class="px-4 py-2 text-sm rounded-lg bg-primary hover:bg-primary-hover text-base-100"
        @click="visible3 = true"
      >
        打开对话框
      </button>
      <BaseDialog
        v-model="visible3"
        title="可拖拽对话框"
        draggable
      >
        <p>点击标题栏拖动对话框</p>
      </BaseDialog>
    </div>
  </div>
</template>