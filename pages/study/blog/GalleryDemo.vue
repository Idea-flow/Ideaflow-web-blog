<script setup lang="ts">
import { ref } from 'vue'

// 示例图片数据
const galleryImages = ref([
  {
    id: 1,
    url: 'https://picsum.photos/800/600',
    title: '自然风光',
    description: '壮丽的山川河流，展现大自然的鬼斧神工',
    tags: ['风景', '自然', '山水']
  },
  {
    id: 2,
    url: 'https://picsum.photos/801/600',
    title: '城市建筑',
    description: '现代都市的标志性建筑，展现人类文明的成就',
    tags: ['建筑', '城市', '现代']
  },
  {
    id: 3,
    url: 'https://picsum.photos/802/600',
    title: '花卉特写',
    description: '绚丽多彩的花卉，记录大自然的精致之美',
    tags: ['花卉', '自然', '微距']
  },
  {
    id: 4,
    url: 'https://picsum.photos/803/600',
    title: '野生动物',
    description: '自然界中各种野生动物的精彩瞬间',
    tags: ['动物', '野生', '自然']
  },
  {
    id: 5,
    url: 'https://picsum.photos/804/600',
    title: '海洋世界',
    description: '神秘的海洋世界，展现水下生态的多样性',
    tags: ['海洋', '自然', '生态']
  },
  {
    id: 6,
    url: 'https://picsum.photos/805/600',
    title: '人文风情',
    description: '世界各地的人文风情，记录多彩的文化生活',
    tags: ['人文', '文化', '生活']
  }
])

// 当前选择的布局
const currentLayout = ref('breathing-grid')

// 布局选项
const layoutOptions = [
  { value: 'breathing-grid', label: '呼吸网格' },
  { value: 'eco-flow', label: '生态河流' },
  { value: 'folding-depth', label: '折叠景深' }
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- 页面标题和布局切换 -->
    <div class="mb-8 space-y-4">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
        图库展示组件
      </h1>
      <div class="flex space-x-4">
        <button v-for="option in layoutOptions"
                :key="option.value"
                @click="currentLayout = option.value"
                :class="[
                  'px-4 py-2 rounded-lg transition-all duration-300',
                  currentLayout === option.value
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                ]">
          {{ option.label }}
        </button>
      </div>
    </div>

    <!-- 图库组件 -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <Gallery
        :images="galleryImages"
        :layout="currentLayout"
        :show-tags="true"
        :enable-zoom="true"
      />
    </div>

    <!-- 使用说明 -->
    <div class="mt-8 prose dark:prose-invert max-w-none">
      <h2>组件使用说明</h2>
      <p>Gallery 组件支持以下属性配置：</p>
      <ul>
        <li><code>images</code>: 图片数据数组（必填）</li>
        <li><code>layout</code>: 布局方式，可选值：breathing-grid | eco-flow | folding-depth</li>
        <li><code>columns</code>: 网格列数，默认为3（仅用于breathing-grid布局）</li>
        <li><code>gapSize</code>: 网格间距，默认为20</li>
        <li><code>showTags</code>: 是否显示标签，默认为true</li>
        <li><code>enableZoom</code>: 是否启用图片放大预览，默认为true</li>
      </ul>

      <h3>图片数据格式</h3>
      <pre><code>interface GalleryImage {
  id: string | number     // 唯一标识
  url: string            // 图片URL
  title?: string         // 图片标题
  description?: string   // 图片描述
  tags?: string[]        // 图片标签
  width?: number         // 图片宽度（可选）
  height?: number        // 图片高度（可选）
}</code></pre>
    </div>
  </div>
</template>