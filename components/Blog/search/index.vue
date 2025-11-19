<script setup lang="ts">
import { ref } from 'vue'
import { getArticlePage } from '~/remote/article'

// 文章列表数据
const articles = ref([])
const total = ref(0)

// 分页参数
const pageNo = ref(1)
const pageSize = ref(10)

// 搜索关键词
const keyword = ref('')

// 防抖定时器
let searchTimer: NodeJS.Timeout | null = null

// 获取文章列表数据
const fetchArticles = async () => {
  try {
    const { data } = await getArticlePage({
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value
    })

    if (data.value?.code === 0 && data.value?.data) {
      articles.value = data.value.data.list
      total.value = data.value.data.total
      // console.info('获取文章列表数据:',JSON.stringify( articles.value))
    }
  } catch (error) {
    console.error('获取文章列表失败:', error)
  }
}

// // 初始加载
// await fetchArticles()

// 搜索处理函数
const handleSearch = () => {
  if (keyword.value == '') {
    // console.log("keyword为空不搜索")
    return;
  }
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
  searchTimer = setTimeout(async () => {
    pageNo.value = 1 // 重置到第一页
    await fetchArticles()
  }, 300) // 300ms防抖
}

// 页码改变事件处理
const handlePageChange = async (page: number) => {
  pageNo.value = page
  await fetchArticles() // 获取新页面数据
}
</script>

<template>
  <div class="py-1 px-1 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto rounded-2xl p-1 animate-slide-up">
      <!-- 搜索框 -->
      <div class="relative mb-6">
        <input
          v-model="keyword"
          type="text"
          placeholder="搜索文章..."
          class="w-full px-4 py-2 pl-10 rounded-lg border dark:border-gray-700 bg-base-300 text-text-base focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          @keyup.enter="handleSearch"
          @keypress.enter="handleSearch"
          @blur="handleSearch"
        />
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <!-- 文章列表 -->
      <BlogArticleLayoutSearch :articles="articles" :show-view-count="false"  />
<!--       分页组件 -->
      <BasePagination
          v-if="total > pageSize"
          v-model="pageNo"
          :total-items="total"
          :items-per-page="pageSize"
          @change="handlePageChange"
          class="mt-8"
      />
    </div>
  </div>
</template>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>