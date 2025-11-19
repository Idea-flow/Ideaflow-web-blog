<script setup lang="ts">
import type { CommentApi } from '~/types/comment'
import CommentList from '~/components/Blog/Article/CommentMy/Comment.vue'

// 模拟评论数据
const comments = ref<CommentApi[]>([
  {
    id: 1,
    content: '这是一条测试评论，展示评论组件的基本功能。',
    createTime: Date.now(),
    commentUserInfo: {
      userId: 1,
      userName: '测试用户',
      role: '管理员',
      avatar: ''
    },
    replies: {
      total: 1,
      list: [
        {
          id: 2,
          parentId: 1,
          content: '这是一条回复评论，测试回复功能。',
          createTime: Date.now() - 1000 * 60,
          commentUserInfo: {
            userId: 2,
            userName: '回复用户',
            avatar: ''
          },
          replyToUserInfo: {
            userId: 1,
            userName: '测试用户'
          }
        }
      ]
    }
  }
])

// 处理评论提交
const handleSubmit = async (content: string, parentId?: number, replyToUserId?: number) => {
  // 模拟评论提交
  const newComment: CommentApi = {
    id: Date.now(),
    parentId,
    content,
    createTime: Date.now(),
    commentUserInfo: {
      userId: 999,
      userName: '当前用户',
      avatar: ''
    }
  }

  if (replyToUserId) {
    const parentComment = comments.value.find(c => c.id === parentId)
    if (parentComment) {
      newComment.replyToUserInfo = {
        userId: replyToUserId,
        userName: parentComment.commentUserInfo.userName
      }
    }
  }

  // 模拟异步操作
  await new Promise(resolve => setTimeout(resolve, 500))

  // 提交成功后的处理
  commentListRef.value?.onSubmitSuccess(newComment)
}

// 评论列表组件引用
const commentListRef = ref()
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 space-y-8">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
      评论组件示例
    </h1>

<!--    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">-->
<!--    -->
<!--    </div>-->

    <CommentList
        ref="commentListRef"
        :comments="comments"
        :total="comments.length"
        @submit="handleSubmit"
    />
  </div>
</template>