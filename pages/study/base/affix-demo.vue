<script setup lang="ts">
import { ref } from 'vue'
import Affix from '~/components/Base/Affix/index.vue'

const isAffixed = ref(false)

const handleAffixChange = (value: boolean) => {
  isAffixed.value = value
}
</script>

<template>
  <div class="min-h-screen p-4">
    <h1 class="text-2xl font-bold mb-8">Affix 固定区域组件示例</h1>

    <!-- 顶部固定示例 -->
    <div class="mb-16">
      <h2 class="text-xl font-semibold mb-4">顶部固定示例</h2>
      <Affix :offset="20" position="top" @change="handleAffixChange">
        <div :class="[
          'p-4 transition-colors duration-300',
          isAffixed ? 'bg-blue-500 text-white' : 'bg-gray-200'
        ]">
          我会在距离顶部20px时固定
        </div>
      </Affix>
    </div>



    <!-- 填充内容，用于测试滚动效果 -->
    <div class="space-y-4">
      <p v-for="i in 20" :key="i" class="p-4 bg-gray-100">
        这是第 {{ i }} 段测试文本，用于创建滚动效果。
      </p>
    </div>
  </div>

  <!-- 底部固定示例 -->
  <div class="mb-16">
    <h2 class="text-xl font-semibold mb-4">底部固定示例</h2>
    <Affix :offset="20" position="bottom">
      <div class="p-4 bg-green-500 text-white">
        我会在距离底部20px时固定
      </div>
    </Affix>
  </div>
</template>