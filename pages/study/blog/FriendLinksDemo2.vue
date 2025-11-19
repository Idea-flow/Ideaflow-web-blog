<script setup lang="ts">
import { ref } from 'vue'

// 示例数据
const friendLinksData = ref([
  {
    id: 1,
    name: '小明的博客',
    description: '一个专注于前端开发的技术博客，分享Vue、React等前端技术。',
    logo: 'https://picsum.photos/200',
    url: 'https://example.com/blog1',
    categoryName: '技术博客'
  },
  {
    id: 2,
    name: '设计师小张',
    description: 'UI/UX设计师，分享设计经验和作品集。',
    logo: 'https://picsum.photos/201',
    url: 'https://example.com/blog2',
    categoryName: '设计博客'
  },
  {
    id: 3,
    name: '后端开发日记',
    description: '专注于Node.js、Python等后端技术的分享。',
    logo: 'https://picsum.photos/202',
    url: 'https://example.com/blog3',
    categoryName: '技术博客'
  },
  {
    id: 4,
    name: '产品经理小李',
    description: '分享产品设计与管理经验。',
    logo: 'https://picsum.photos/203',
    url: 'https://example.com/blog4',
    categoryName: '产品博客'
  },
  {
    id: 5,
    name: '全栈工程师成长记',
    description: '记录全栈开发学习历程与心得。',
    logo: 'https://picsum.photos/204',
    url: 'https://example.com/blog5',
    categoryName: '技术博客'
  },
  {
    id: 6,
    name: '设计师小w',
    description: 'ww。',
    logo: 'https://picsum.photos/201',
    url: 'https://example.com/blog2',
    categoryName: '设计博客'
  },
])

// 是否显示分类
const showCategory = ref(true)

// 切换分类显示
const toggleCategory = () => {
  showCategory.value = !showCategory.value
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-8 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
        友情链接展示
      </h1>
      <button
        @click="toggleCategory"
        class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600
               transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        {{ showCategory ? '隐藏分类' : '显示分类' }}
      </button>
    </div>

    <div class="space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          基本示例
        </h2>
        <FriendLinks
          :links="friendLinksData"
          :show-category="showCategory"
        />
      </div>
    </div>
  </div>
</template>