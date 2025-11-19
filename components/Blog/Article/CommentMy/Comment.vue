<script setup lang="ts">
import type { CommentApi } from '~/types/comment'
import CommentInput from './CommentInput.vue'

interface Props {
  comments: CommentApi[]
  total: number
}

const props = withDefaults(defineProps<Props>(), {
  comments: () => [],
  total: 0
})

const emit = defineEmits<{
  'submit': [content: string, parentId?: number, replyToUserId?: number]
  'submit-success': [comment: CommentApi]
}>()

const userStore = useAppStore()
const isLoggedIn = computed(() => userStore.userInfo !== null)

// 回复状态
const replyTo = ref<{
  commentId: number
  userName: string
  userId: number
}| null>(null)

// 提交评论
const handleSubmit = async (content: string, parentId?: number, replyToUserId?: number) => {
  emit('submit', content, parentId, replyToUserId)
}

// 提交成功的回调方法
const onSubmitSuccess = (comment: CommentApi) => {
  // console.log(" 提交成功的回调方法:"+JSON.stringify( comment))
  // 处理评论数据
  if (!comment.parentId) {
    // 直接评论，添加到主列表
    props.comments.unshift(comment)
  } else {
    // 回复评论，更新对应评论的回复列表
    const parentComment = props.comments.find(c => c.id === comment.parentId)
    if (parentComment) {
      if (!parentComment.replies) {
        parentComment.replies = {
          list: [],
          total: 0
        }
      }
      parentComment.replies.list.unshift(comment)
      parentComment.replies.total++
    }
  }
  // 清空回复状态
  replyTo.value = null
  // console.log(" props.comments:"+JSON.stringify( props.comments))
}

// 处理回复按钮点击
const handleReply = (comment: CommentApi) => {
  replyTo.value = {
    commentId: comment.id,
    userName: comment.commentUserInfo.userName,
    userId: comment.commentUserInfo.userId
  }
}

// 取消回复
const handleCancelReply = () => {
  replyTo.value = null
}

// 评论列表（按创建时间倒序）
const sortedComments = computed(() => {
  return [...props.comments].sort((a, b) => b.createTime - a.createTime)
})

// 生成头像渐变背景
const generateAvatarGradient = (name: string) => {
  const colors = [
    ['#FF6B6B', '#4ECDC4'],
    ['#A8E6CF', '#DCEDC1'],
    ['#FFD93D', '#FF6B6B'],
    ['#95E1D3', '#EAFFD0'],
    ['#6C5CE7', '#A8E6CF']
  ]
  const index = name.charCodeAt(0) % colors.length
  return `linear-gradient(135deg, ${colors[index][0]}, ${colors[index][1]})`
}

// 获取用户名首字母
const getInitials = (name: string) => {
  return name.charAt(0).toUpperCase()
}

// 格式化时间
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

// 暴露方法给父组件
defineExpose({
  onSubmitSuccess
})
</script>

<template>
  <div class="w-full space-y-6 mt-4">
    <!-- 主评论输入框 -->

    <CommentInput
        placeholder="写下你的评论..."
        @submit="handleSubmit"
    />

    <!-- 评论列表 -->
    <div v-if="sortedComments.length === 0" 
         class="flex flex-col items-center justify-center py-12 space-y-4 text-gray-400 dark:text-gray-500">
      <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <p class="text-lg">暂无评论，来发表第一条评论吧！</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="comment in sortedComments" :key="comment.id"
           class="group relative bg-white dark:bg-gray-800/30 rounded-2xl p-4 backdrop-blur-sm
                  border border-gray-100 dark:border-gray-700/50 transition-all duration-300
                  hover:border-gray-200 dark:hover:border-gray-600/50">
        <!-- 主评论 -->
        <div class="flex space-x-4">
          <!-- 头像 -->
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-full overflow-hidden shadow-inner">
              <img v-if="comment.commentUserInfo.avatar"
                   :src="comment.commentUserInfo.avatar"
                   :alt="comment.commentUserInfo.userName"
                   class="w-full h-full object-cover">
              <div v-else
                   class="w-full h-full flex items-center justify-center text-white text-lg font-medium"
                   :style="{ background: generateAvatarGradient(comment.commentUserInfo.userName) }">
                {{ getInitials(comment.commentUserInfo.userName) }}
              </div>
            </div>
          </div>

          <!-- 评论内容 -->
          <div class="flex-1 space-y-2">
            <div class="flex items-center space-x-2">
              <span class="font-medium text-gray-900 dark:text-white">
                {{ comment.commentUserInfo.userName }}
              </span>
              <span v-if="comment.commentUserInfo.role"
                    class="px-2 py-0.5 text-xs rounded-full bg-blue-50 dark:bg-blue-900/20
                           text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                {{ comment.commentUserInfo.role }}
              </span>
            </div>

            <div class="text-gray-700 dark:text-gray-300" v-html="comment.content"></div>

            <!-- 评论操作 -->
            <div class="flex items-center space-x-4 text-sm">
              <span class="text-gray-400 dark:text-gray-500">{{ formatTime(comment.createTime) }}</span>
              
              <button @click="handleReply(comment)"
                      class="flex items-center space-x-1 text-gray-400 hover:text-blue-500
                             dark:text-gray-500 dark:hover:text-blue-400 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span>回复</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 回复评论框 -->
        <div v-if="replyTo?.commentId === comment.id"
             class="mt-4 ml-14 transform transition-all duration-300 ease-out">
          <CommentInput
            :placeholder="`回复 @${replyTo.userName}...`"
            :parent-id="comment.id"
            :reply-to-user-id="replyTo.userId"
            :reply-to-user-name="replyTo.userName"
            @submit="handleSubmit"
            @cancel="handleCancelReply"
          />
        </div>

        <!-- 回复列表 -->
        <div v-if="comment.replies && comment.replies.total > 0"
             class="mt-4 ml-14 space-y-4">
          <div v-for="reply in comment.replies.list" :key="reply.id"
               class="group relative bg-gray-50/80 dark:bg-gray-800/30 rounded-xl p-3
                      border border-gray-100/50 dark:border-gray-700/30 transition-all duration-300
                      hover:border-gray-200/50 dark:hover:border-gray-600/30">
            <div class="flex space-x-3">
              <!-- 回复者头像 -->
              <div class="flex-shrink-0">
                <div class="w-8 h-8 rounded-full overflow-hidden shadow-inner">
                  <img v-if="reply.commentUserInfo.avatar"
                       :src="reply.commentUserInfo.avatar"
                       :alt="reply.commentUserInfo.userName"
                       class="w-full h-full object-cover">
                  <div v-else
                       class="w-full h-full flex items-center justify-center text-white text-sm font-medium"
                       :style="{ background: generateAvatarGradient(reply.commentUserInfo.userName) }">
                    {{ getInitials(reply.commentUserInfo.userName) }}
                  </div>
                </div>
              </div>

              <!-- 回复内容 -->
              <div class="flex-1 space-y-2">
                <div class="flex items-center space-x-2">
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ reply.commentUserInfo.userName }}
                  </span>
                </div>

                <div v-if="reply.replyToUserInfo"
                     class="text-sm text-gray-500 dark:text-gray-400">
                  回复 <span class="text-blue-500 dark:text-blue-400">@{{ reply.replyToUserInfo.userName }}</span>
                </div>

                <div class="text-gray-700 dark:text-gray-300" v-html="reply.content"></div>

                <!-- 回复操作 -->
                <div class="flex items-center space-x-4 text-sm">
                  <span class="text-gray-400 dark:text-gray-500">{{ formatTime(reply.createTime) }}</span>
                  
                  <button @click="handleReply(reply)"
                          class="flex items-center space-x-1 text-gray-400 hover:text-blue-500
                                 dark:text-gray-500 dark:hover:text-blue-400 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span>回复</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- 二级评论的回复框 -->
            <div v-if="replyTo?.commentId === reply.id"
                 class="mt-4 ml-10 transform transition-all duration-300 ease-out">
              <CommentInput
                :placeholder="`回复 @${replyTo.userName}...`"
                :parent-id="comment.id"
                :reply-to-user-id="replyTo.userId"
                :reply-to-user-name="replyTo.userName"
                @submit="handleSubmit"
                @cancel="handleCancelReply"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 动画效果 */
.group {
  transition: transform 0.2s ease-out;
}

.group:hover {
  transform: translateY(-1px);
}

/* 阴影效果 */
.shadow-inner {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .ml-14 {
    margin-left: 3rem;
  }
}
</style>