<script setup lang="ts">
import { ref } from 'vue'
import { getArticlePage } from '~/remote/article'

// 文章列表数据
const articles = ref([])
const total = ref(0)

// 分页参数
const pageNo = ref(1)
const pageSize = ref(9)

// 获取文章列表数据
const fetchArticles = async () => {
  try {
    const { data } = await getArticlePage({
      pageNo: pageNo.value,
      pageSize: pageSize.value
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

// 初始加载
await fetchArticles()

// 页码改变事件处理
const handlePageChange = async (page: number) => {
  pageNo.value = page
  await fetchArticles() // 获取新页面数据
  // 平滑滚动到文章列表顶部
  window.scrollTo({
    // top: document.getElementById('articles')?.offsetTop || 0,
    top:  0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div>
<!--    <ArticleLayoutClassics :articles="articles" />-->
<!--    <BlogArticleLayoutCard :articles="articles" />-->
<!--    <BlogArticleLayoutCardMy :articles="articles" :show-view-count="false"/>-->
    <BlogArticleLayoutCardAsmrAd :articles="articles" :show-view-count="false"/>

    <BasePagination
        v-if="total > pageSize"
        v-model="pageNo"
        :total-items="total"
        :items-per-page="pageSize"
        @change="handlePageChange"
        class="mt-8"
    />
  </div>
</template>

<style scoped>


</style>