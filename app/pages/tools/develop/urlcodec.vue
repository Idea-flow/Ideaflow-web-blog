<script setup lang="ts">
import MyMessage from "~/components/Base/Message/MyMessage";

const sourceText = ref('')
const resultText = ref('')

const encode = () => {
  resultText.value = encodeURIComponent(sourceText.value)
}

const decode = () => {
  try {
    resultText.value = decodeURIComponent(sourceText.value)
  } catch (error) {
    // 使用项目已有的消息提示组件
    MyMessage({
      message: `解码失败`,
      type: 'error',
      duration: 2000
    });
  }
}
</script>

<template>
  <div class="p-6 bg-base-100">
    <h1 class="text-2xl font-bold mb-6 text-text-base">URL 编解码工具</h1>
    
    <div class="space-y-4">
      <div>
        <label class="block text-text-base mb-2">输入文本：</label>
        <textarea
          v-model="sourceText"
          class="w-full h-32 p-3 resize-none dark:border-border-base dark:focus:ring-primary rounded border border-base bg-base-100 text-text-base focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="请输入需要转换的文本"
        ></textarea>
      </div>

      <div class="flex justify-center space-x-4">
        <BaseButton @click="encode">编码</BaseButton>
        <BaseButton @click="decode">解码</BaseButton>
      </div>

      <div>
        <label class="block text-text-base mb-2">转换结果：</label>
        <textarea
          v-model="resultText"
          class="w-full h-48 p-3 resize-none dark:border-border-base dark:focus:ring-primary rounded border border-base bg-base-100 text-text-base focus:outline-none focus:ring-1 focus:ring-primary"
          readonly
          placeholder="转换结果将显示在这里"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>