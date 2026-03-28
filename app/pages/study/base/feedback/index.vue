<script setup lang="ts">
import Message from "~/components/Base/Message/Message.vue";
import { ref } from 'vue';

const messageRef = ref();

const showSuccess = () => {
  messageRef.value.success('操作成功！', 3000);
};

const showError = () => {
  messageRef.value.error('操作失败！', 4000);
};

const showWarning = () => {
  messageRef.value.warning('警告信息！', 5000);
};

const showInfo = () => {
  messageRef.value.info('提示信息');
};

const showCustomDuration = () => {
  messageRef.value.success('这条消息会显示 10 秒钟', 10000);
};
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

  <Message ref="messageRef" />
</template>

<style scoped>
</style>