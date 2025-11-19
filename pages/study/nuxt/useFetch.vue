<script setup >
import { getArticlePage,getArticleById } from '~/remote/article.js'

// 调用文章列表接口
// const { data } = await getArticlePage()

// 解构接口返回值
// const { code, data, msg } = response.value as GetArticlePageRes

// console.log("response.value"+JSON.stringify(data.value))



const { data } = await getArticleById(1);
console.log("articleById.value"+JSON.stringify(data.value))
// // 分别打印接口返回的各个字段
// console.log('接口状态码:', code)
// console.log('接口返回数据:', data)
// console.log('接口返回消息:', msg)
//
// // 打印文章列表具体内容
// if (data && data.list) {
//   console.log('文章总数:', data.total)
//   console.log('文章列表:', data.list)
// }
</script>

<template>
<!--  useFetch-->
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">useFetch 示例</h1>
    <p>请查看控制台输出的文章列表数据</p>
  </div>
</template>

<style scoped>
</style>