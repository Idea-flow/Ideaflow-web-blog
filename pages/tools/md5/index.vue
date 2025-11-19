<script setup lang="ts">
import { ref } from 'vue';
import CryptoJS from 'crypto-js';

// SEO配置
useHead({
  title: 'MD5在线加密工具 - 32位大小写转换',
  meta: [
    { name: 'description', content: '免费在线MD5加密工具，支持32位大小写转换，快速计算文本的MD5哈希值，提供便捷的复制功能。' },
    { name: 'keywords', content: 'MD5加密,MD5在线工具,MD5转换,哈希计算,32位MD5' }
  ]
});

// 定义响应式变量
const inputText = ref('');
const md5Results = ref({
  lowercase: '',
  uppercase: ''
});
const isCalculated = ref(false);

// 计算MD5哈希值
const calculateMD5 = () => {
  if (!inputText.value) {
    md5Results.value = {
      lowercase: '',
      uppercase: ''
    };
    isCalculated.value = false;
    return;
  }

  try {
    // 使用crypto-js计算MD5
    const hashHex = CryptoJS.MD5(inputText.value).toString();

    // 设置结果
    md5Results.value = {
      lowercase: hashHex,
      uppercase: hashHex.toUpperCase()
    };
    isCalculated.value = true;
  } catch (error) {
    console.error('MD5计算错误:', error);
  }
};
import MyMessage from "~/components/Base/Message/MyMessage";
// 复制到剪贴板的函数
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      MyMessage({
        message: `已复制到剪贴板`,
        type: 'success',
        duration: 1000
      })
    })
    .catch(err => {
      MyMessage({
        message: `复制失败`+err,
        type: 'error',
        duration: 1000
      })
    });
};
</script>

<template>
  <div class="min-h-screen bg-base-100 p-6">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-text-base mb-6">MD5 加密工具</h1>

      <!-- 输入区域 -->
      <div class="mb-8">
        <div class="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-primary/10 to-accent/10 p-0.5 focus-within:ring-2 focus-within:ring-primary">
          <textarea
            v-model="inputText"
            placeholder="请输入需要加密的文本..."
            class="text-text-base w-full p-4 min-h-[120px] rounded-lg bg-base-100 focus:outline-none resize-none placeholder-text-placeholder"
          ></textarea>
        </div>

        <!-- 加密按钮 -->
        <div class="mt-4 flex justify-end">
          <BaseButton @click="calculateMD5">计算 MD5</BaseButton>
        </div>
      </div>

      <!-- 结果展示区域 -->
      <div v-if="isCalculated" class="space-y-6 bg-base-200 p-6 rounded-xl shadow-md mb-8">
        <h2 class="text-xl font-semibold text-text-base">MD5 加密结果</h2>

        <!-- 32位小写 -->
        <div class="bg-base-100 p-4 rounded-lg border border-border-base">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-text-muted">32位小写:</span>
            <button
              @click="copyToClipboard(md5Results.lowercase)"
              class="text-xs px-3 py-1.5 bg-secondary/20 hover:bg-secondary/30 active:bg-secondary/40 text-secondary rounded transition-colors"
            >
              复制
            </button>
          </div>
          <p class="font-mono text-text-base break-all">{{ md5Results.lowercase }}</p>
        </div>

        <!-- 32位大写 -->
        <div class="bg-base-100 p-4 rounded-lg border border-border-base">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-text-muted">32位大写:</span>
            <button
              @click="copyToClipboard(md5Results.uppercase)"
              class="text-xs px-3 py-1.5 bg-secondary/20 hover:bg-secondary/30 active:bg-secondary/40 text-secondary rounded transition-colors"
            >
              复制
            </button>
          </div>
          <p class="font-mono text-text-base break-all">{{ md5Results.uppercase }}</p>
        </div>
      </div>

      <!-- MD5介绍区域 -->
      <div class="bg-base-200 p-6 rounded-xl shadow-md space-y-4 border border-border-light">
        <h2 class="text-xl font-semibold text-text-base">关于 MD5</h2>
        
        <div class="space-y-4 text-text-base">
          <p class="leading-relaxed">
            MD5（Message-Digest Algorithm 5）是一种广泛使用的哈希函数，可以产生一个128位（16字节）的哈希值，通常用32位十六进制数字表示。
          </p>
          
          <div class="bg-base-300 p-4 rounded-lg">
            <h3 class="text-lg font-medium text-text-base mb-2">主要特点</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>固定长度输出：无论输入数据大小如何，始终生成32位的哈希值</li>
              <li>单向加密：无法从哈希值反推原始数据</li>
              <li>高效性：计算速度快，适用于大量数据处理</li>
              <li>唯一性：即使输入数据只有细微差别，产生的哈希值也会完全不同</li>
            </ul>
          </div>

          <div class="bg-base-300 p-4 rounded-lg">
            <h3 class="text-lg font-medium text-text-base mb-2">常见应用</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>文件完整性验证</li>
              <li>数字签名</li>
              <li>密码存储（与加盐配合使用）</li>
              <li>数据去重</li>
            </ul>
          </div>

          <p class="text-sm text-text-muted mt-4">
            注意：虽然MD5仍被广泛使用，但由于存在碰撞攻击风险，在安全性要求较高的场景下建议使用更安全的哈希算法（如SHA-256）。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 苹果风格的额外样式 */
textarea {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

button {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
}
</style>