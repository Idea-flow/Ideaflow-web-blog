<script setup lang="ts">
import { getRecommendArticle } from '~/remote/article'
import { getTag } from '~/remote/tag'

const { data: recommendArticles } = await getRecommendArticle()
const { data: tagResponse } = await getTag()

// const techTags = tagResponse.value?.data || [] // 在setup里面需要加上.value才会有数据

</script>

<template>
  <BlogSidebarAuthorCard ></BlogSidebarAuthorCard>

  <BlogSidebarRandomBeautyVideo></BlogSidebarRandomBeautyVideo>
  <BlogSidebarRecommendCard :articles="recommendArticles?.data || []" />

  <BlogSidebarTagCloud :tags="tagResponse?.data || []" title="标签云"  />
</template>

<style scoped>

</style>