<template>
  <div class="p-6 min-h-screen transition-colors duration-300 bg-base-100 text-base-content">
    <!-- 主题切换 -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">主题切换</h2>
      <!-- 主题切换按钮组 -->
      <div class="flex justify-end mb-8 space-x-4">
        <button
            v-for="theme in themes"
            :key="theme.value"
            class="px-4 py-2 rounded-lg bg-neutral hover:bg-neutral-hover transition-colors duration-300"
            :class="{ 'ring-2 ring-primary': $colorMode.preference === theme.value }"
            @click="() => setTheme(theme.value)"
        >
          {{ theme.icon }} {{ theme.label }}
        </button>
      </div>
    </div>

    <!-- 卡片示例 -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">卡片示例</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 rounded-lg shadow-md transition-colors duration-300 bg-base-100">
          <h3 class="text-xl font-semibold mb-2">基础卡片</h3>
          <p class="opacity-75">这是一个基础卡片示例，展示了不同主题下的样式效果。</p>
        </div>
        <div class="p-6 rounded-lg shadow-md transition-colors duration-300 bg-base-200">
          <h3 class="text-xl font-semibold mb-2">强调卡片</h3>
          <p class="opacity-75">这是一个带有强调色的卡片示例。</p>
        </div>
      </div>
    </div>

    <!-- 按钮示例 -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">按钮示例</h2>
      <div class="flex flex-wrap gap-4">
        <button class="px-4 py-2 rounded-lg transition-colors duration-300 bg-primary hover:bg-primary-hover text-white">
          主要按钮
        </button>
        <button class="px-4 py-2 rounded-lg border transition-colors duration-300 border-base hover:bg-base-200">
          次要按钮
        </button>
        <button class="px-4 py-2 rounded-lg transition-colors duration-300 bg-error hover:bg-error text-error-content">
          危险按钮
        </button>
      </div>
    </div>

    <!-- 提示示例 -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">提示示例</h2>
      <div class="space-y-4">
        <div class="p-4 rounded-lg transition-colors duration-300 bg-info text-info-content">
          这是一条信息提示
        </div>
        <div class="p-4 rounded-lg transition-colors duration-300 bg-success text-success-content">
          这是一条成功提示
        </div>
        <div class="p-4 rounded-lg transition-colors duration-300 bg-warning text-warning-content">
          这是一条警告提示
        </div>
        <div class="p-4 rounded-lg transition-colors duration-300 bg-error text-error-content">
          这是一条错误提示
        </div>
      </div>
    </div>

    <!-- 表单示例 -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">表单示例</h2>
      <div class="max-w-md space-y-4">
        <div>
          <label class="block mb-2 font-medium">输入框</label>
          <input type="text" placeholder="请输入内容"
            class="w-full px-4 py-2 rounded-lg border border-base-300 bg-base-100 text-base-content transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block mb-2 font-medium">选择框</label>
          <select class="w-full px-4 py-2 rounded-lg border border-base-300 bg-base-100 text-base-content transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary">
            <option>选项1</option>
            <option>选项2</option>
            <option>选项3</option>
          </select>
        </div>
        <div>
          <label class="block mb-2 font-medium">文本域</label>
          <textarea placeholder="请输入内容" rows="4"
            class="w-full px-4 py-2 rounded-lg border border-base-300 bg-base-100 text-base-content transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary">
          </textarea>
        </div>
      </div>
    </div>

    <!-- 分隔线示例 -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">分隔线示例</h2>
      <div class="space-y-8">
        <hr class="border-base transition-colors duration-300">
        <div class="flex items-center">
          <div class="flex-1 h-px bg-base-300 transition-colors duration-300"></div>
          <span class="px-4 text-sm opacity-75">带文字的分隔线</span>
          <div class="flex-1 h-px bg-base-300 transition-colors duration-300"></div>
        </div>
        <div class="border-l-4 border-primary pl-4 transition-colors duration-300">
          这是一个带有强调色的分隔线
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const themes = [
  { value: 'light', label: '亮色主题', icon: '🌞' },
  { value: 'dark', label: '暗色主题', icon: '🌙' },
  { value: 'ocean', label: '海洋主题', icon: '🌊' },
  { value: 'myCustom', label: '自定义主题', icon: '🎨' }
]

const setTheme = (theme: string) => {
  colorMode.preference = theme
}
</script>