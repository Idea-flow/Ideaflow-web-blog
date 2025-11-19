<script setup lang="ts">
import { ref } from 'vue'
import { getArticlePage } from '~/remote/article'

// 获取路由参数
const route = useRoute()
const routeTagId = route.params.id
const tagName = route.query.name || "标签"
// 文章列表数据
const articles = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 获取文章列表
const fetchArticles = async (page = 1) => {
  try {
    const { data } = await getArticlePage({
      pageNo: page,
      pageSize: pageSize.value,
      tagId: routeTagId
    })
    if (data.value?.code === 0 && data.value?.data) {
      articles.value = data.value.data.list
      total.value = data.value.data.total
    }
  } catch (error) {
    console.error('获取文章列表失败:', error)
  }
}

// 页码改变处理
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchArticles(page)
}

// 初始化加载
fetchArticles()
</script>

<template>
  <div class="min-h-screen">
    <!-- 头部大图区域 -->
    <BlogImgBackground>
      <!-- 星空效果 -->
      <BlogStarry />
      <!-- 分类标题 -->
      <div class="absolute inset-0 flex items-center justify-center text-center z-10">
        <div>
          <h1 class="text-4xl font-bold text-white mb-4 animate-fade-in">
            {{ tagName }} ~ 共计{{ total }}篇文章
          </h1>
<!--          <div class="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>-->
        </div>
      </div>
    </BlogImgBackground>

    <!-- 文章列表区域 -->
    <div class="py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto rounded-2xl  p-6 animate-slide-up">
        <BlogArticleLayoutCategoryClassics :articles="articles" :showTags="true" :show-view-count="false"/>

        <!-- 分页组件 -->
        <BasePagination
            v-if="total > pageSize"
            v-model="currentPage"
            :total-items="total"
            :items-per-page="pageSize"
            @change="handlePageChange"
        />

      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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