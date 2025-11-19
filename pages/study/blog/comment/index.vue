<script setup lang="ts">
import type { CommentApi } from '~/types/comment'
import { getCommentPage, createComment } from '~/remote/comment'

// 分页参数
const pageNo = ref(1)
const pageSize = ref(10)
const sortType = ref<1 | 2 | 3>(1)

// 评论数据
const comments = ref<CommentApi[]>([])
const total = ref(0)
const articleIdReq = ref(21)

// 获取评论数据
const fetchComments = async () => {
  try {
    const { data } = await getCommentPage({
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      articleId: articleIdReq.value, // 示例文章ID
      sortType: sortType.value
    })
    return data
  } catch (error) {
    console.error('获取评论列表失败：', error)
    return null
  }
}

// 使用 useAsyncData 进行数据获取
const { data: commentData } = await useAsyncData('comments', fetchComments)

// 监听数据变化并更新本地状态
watchEffect(() => {
  if (commentData.value?.code === 0 && commentData.value?.data) {
    comments.value = commentData.value.data.list
    total.value = commentData.value.data.total
  }
})

// 监听排序方式变化
watch(sortType, async () => {
  pageNo.value = 1
  await refreshNuxtData('comments')
})

// 评论组件引用
const commentComponent = ref()

// 处理评论提交
const handleCommentSubmit = async (content: string, parentId?: number, replyToUserId?: number) => {
  try {
    const { data } = await createComment({
      articleId: articleIdReq.value, // 示例文章ID
      content,
      parentId,
      replyToUserId
    })
    if (data.value?.code === 0 && data.value?.data) {
      // 调用评论组件的提交成功回调
      commentComponent.value?.onSubmitSuccess(data.value?.data)
    }
  } catch (error) {
    console.error('提交评论失败：', error)
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 space-y-8">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h1 class="text-2xl font-bold mb-4 dark:text-white">评论组件示例</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        这是一个评论组件的示例页面，展示了评论组件的主要功能，包括：
      </p>
      <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
        <li>评论列表展示</li>
        <li>评论排序功能（最新、最热、精选）</li>
        <li>评论回复功能</li>
        <li>评论点赞功能</li>
        <li>登录状态判断</li>
        <li>黑暗模式适配</li>
      </ul>
    </div>

    <!-- 评论组件 -->
    <ArticleComment
      ref="commentComponent"
      :comments="comments"
      :total="total"
      :sort-type="sortType"
      @update:sort-type="sortType = $event"
      @submit="handleCommentSubmit"
    />
  </div>
</template>