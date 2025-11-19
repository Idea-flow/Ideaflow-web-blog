<script setup lang="ts">
import type { CommentApi } from '~/types/comment'

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

// 评论内容
const commentContent = ref('')
const isSubmitting = ref(false)

// 回复状态
const replyTo = ref<{
  parentId: number
  userName: string
  userId: number
  replyToUserId: number
} | null>(null)

// 提交评论
const handleSubmitComment = async () => {
  if (!commentContent.value.trim()) {
    return
  }

  try {
    isSubmitting.value = true
    emit('submit', 
      commentContent.value,
      replyTo.value?.parentId,
      replyTo.value?.replyToUserId
    )
  } catch (error) {
    console.error('提交评论失败：', error)
  } finally {
    isSubmitting.value = false
  }
}

// 提交成功的回调方法
const onSubmitSuccess = (comment: CommentApi) => {
  // 清空评论内容
  commentContent.value = ''
  // 处理评论数据
  if (!replyTo.value?.parentId) {
    // 直接评论，添加到主列表
    props.comments.unshift(comment)
    props.total++
  } else {
    // 回复评论，更新对应评论的回复列表
    const parentComment = props.comments.find(c => c.id === replyTo.value.parentId)
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
    replyTo.value = null;
}

// 暴露方法给父组件
defineExpose({
  onSubmitSuccess
})

// 处理回复按钮点击
const handleReply = (comment: CommentApi) => {
  // 如果是回复二级评论，parentId 使用原始评论的 id
  const parentId = comment.parentId > 0 ? comment.parentId : comment.id
  const replyToUserId = comment.commentUserInfo.userId
  replyTo.value = {
    parentId,
    userName: comment.commentUserInfo.userName,
    userId: comment.commentUserInfo.userId,
    replyToUserId: replyToUserId
  }
}

// 取消回复
const cancelReply = () => {
  replyTo.value = null
}

// 评论列表（按创建时间倒序）
const sortedComments = computed(() => { 
  return [...props.comments].sort((a, b) => b.createTime - a.createTime)
})

// 更新用户标识样式 - 适配暗黑模式
const userRoleStyle = {
  bg: 'bg-rose-50 dark:bg-rose-900/20',
  text: 'text-rose-600 dark:text-rose-400',
  border: 'border border-rose-100 dark:border-rose-800/50'
}

// 简化获取用户角色样式的函数
const getRoleStyle = () => userRoleStyle

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

</script>

<template>
  <div class="w-full space-y-6 transition-all duration-300 dark:dark:bg-black">
    <!-- 评论输入区域 -->
    <div class="backdrop-blur-lg bg-white/80 dark:bg-black rounded-xl p-6">
      <div v-if="isLoggedIn" class="space-y-4">
        <div v-if="replyTo" class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span class="flex items-center space-x-2">
            <span class="text-blue-500 dark:text-blue-400">回复</span>
            <span>@{{ replyTo.userName }}</span>
          </span>
          <button @click="cancelReply" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200">
            取消回复
          </button>
        </div>
        <div class="relative">
          <textarea
            v-model="commentContent"
            class="w-full min-h-[120px] p-4 border-2 rounded-xl resize-none transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   dark:bg-gray-700/50 dark:border-gray-600 dark:text-white
                   placeholder-gray-400 dark:placeholder-gray-500"
            :placeholder="replyTo ? `回复 @${replyTo.userName}...` : '写下你的评论...'"
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            :disabled="isSubmitting || !commentContent.trim()"
            :class="{
              'opacity-50 cursor-not-allowed': isSubmitting || !commentContent.trim(),
              'hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700': !isSubmitting && commentContent.trim()
            }"
            class="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                   transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            @click="handleSubmitComment"
          >
            {{ isSubmitting ? '提交中...' : (replyTo ? '回复' : '发表评论') }}
          </button>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400 space-y-4">
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
        </svg>
        <p>请先登录后发表评论</p>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="space-y-6 dark:bg-black">
      <div v-if="sortedComments.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-8">
        暂无评论，快来发表第一条评论吧！
      </div>
      <template v-else>
        <div v-for="comment in sortedComments" :key="comment.id" 
             class="group relative py-4 first:pt-0">
          <!-- 评论内容 -->
          <div class="flex space-x-3">
            <!-- 头像 -->
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-full overflow-hidden">
                <img v-if="comment.commentUserInfo.avatar" 
                     :src="comment.commentUserInfo.avatar" 
                     :alt="comment.commentUserInfo.userName"
                     class="w-full h-full object-cover">
                <div v-else
                     class="w-full h-full flex items-center justify-center text-white"
                     :style="{ background: generateAvatarGradient(comment.commentUserInfo.userName) }">
                  {{ getInitials(comment.commentUserInfo.userName) }}
                </div>
              </div>
            </div>

            <!-- 评论内容区域 -->
            <div class="flex-1">
              <!-- 用户信息 -->
              <div class="flex items-center space-x-2">
                <span class="text-gray-900 dark:text-white">{{ comment.commentUserInfo.userName }}</span>
                <span v-if="comment.commentUserInfo.role" 
                      :class="[
                        'px-2 py-0.5 text-xs rounded-full',
                        getRoleStyle().bg,
                        getRoleStyle().text,
                        getRoleStyle().border
                      ]">
                  {{ comment.commentUserInfo.role }}
                </span>
              </div>

              <!-- 评论内容 -->
              <div class="mt-1 text-gray-700 dark:text-gray-300" v-html="comment.content"></div>

              <!-- 主评论的时间和操作按钮 -->
              <div class="mt-2 flex items-center text-sm space-x-4">
                <span class="text-gray-600 dark:text-gray-400">
                  {{ new Date(comment.createTime).getFullYear() + '/' + String(new Date(comment.createTime).getMonth() + 1).padStart(2, '0') + '/' + String(new Date(comment.createTime).getDate()).padStart(2, '0') + ' ' + String(new Date(comment.createTime).getHours()).padStart(2, '0') + ':' + String(new Date(comment.createTime).getMinutes()).padStart(2, '0') + ':' + String(new Date(comment.createTime).getSeconds()).padStart(2, '0') }}
                </span>
                <div class="flex items-center space-x-4">
                  <!-- 点赞按钮 -->
                  <button class="group flex items-center space-x-1 transition-colors duration-200
                                 text-gray-500 hover:text-rose-500 dark:text-gray-400 dark:hover:text-rose-400">
                    <svg class="w-4 h-4" 
                         :class="{'text-rose-500 dark:text-rose-400': comment.likeCount > 0}"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{{ comment.likeCount }}</span>
                  </button>

                  <!-- 回复按钮 -->
                  <button @click="handleReply(comment)" 
                          class="group flex items-center space-x-1 transition-colors duration-200
                                 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                    <svg class="w-4 h-4" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span>回复</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 回复列表 -->
          <div v-if="comment.replies && comment.replies.total > 0" 
               class="mt-4 ml-13">
            <div class="relative rounded-xl overflow-hidden bg-gray-50/80 dark:bg-gray-800/60">
              <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gray-300/70 to-transparent
                            dark:from-gray-600/70 dark:to-transparent"></div>
              
              <!-- 回复列表内容 -->
              <div class="relative space-y-4 p-4">
                <div v-for="reply in comment.replies.list" :key="reply.id" 
                     class="group/reply relative p-2">
                  <div class="flex space-x-3">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 rounded-full overflow-hidden">
                        <img v-if="reply.commentUserInfo.avatar" 
                             :src="reply.commentUserInfo.avatar"
                             :alt="reply.commentUserInfo.userName"
                             class="w-full h-full object-cover">
                        <div v-else
                             class="w-full h-full flex items-center justify-center text-white"
                             :style="{ background: generateAvatarGradient(reply.commentUserInfo.userName) }">
                          {{ getInitials(reply.commentUserInfo.userName) }}
                        </div>
                      </div>
                    </div>

                    <!-- 内容区域 -->
                    <div class="flex-1">
                      <!-- 用户信息部分保持不变 -->
                      <div class="flex items-center space-x-2">
                        <span class="text-gray-900 dark:text-white">{{ reply.commentUserInfo.userName }}</span>
                        <span v-if="reply.commentUserInfo.role" 
                              :class="[
                                'px-2 py-0.5 text-xs rounded-full',
                                getRoleStyle().bg,
                                getRoleStyle().text,
                                getRoleStyle().border
                              ]">
                          {{ reply.commentUserInfo.role }}
                        </span>
                      </div>

                      <!-- 回复内容 -->
                      <div class="mt-2 space-y-2">
                        <!-- 回复对象 -->
                        <div v-if="reply.replyToUserInfo" 
                             class="text-sm text-gray-500/90 dark:text-gray-400/90">
                          回复 <span class="text-blue-500/90 dark:text-blue-400/90 
                                     hover:text-blue-600 dark:hover:text-blue-300 
                                     transition-colors cursor-pointer">
                            @{{ reply.replyToUserInfo.userName }}
                          </span>
                        </div>
                        
                        <!-- 评论内容 -->
                        <div class="text-gray-700/90 dark:text-gray-300/90" 
                             v-html="reply.content"></div>
                      </div>

                      <!-- 时间和操作按钮 -->
                      <div class="mt-3 flex items-center text-sm space-x-4">
                        <span class="text-gray-500/80 dark:text-gray-400/80">
                          {{ new Date(reply.createTime).getFullYear() + '/' + String(new Date(reply.createTime).getMonth() + 1).padStart(2, '0') + '/' + String(new Date(reply.createTime).getDate()).padStart(2, '0') + ' ' + String(new Date(reply.createTime).getHours()).padStart(2, '0') + ':' + String(new Date(reply.createTime).getMinutes()).padStart(2, '0') + ':' + String(new Date(reply.createTime).getSeconds()).padStart(2, '0') }}
                        </span>
                        <div class="flex items-center space-x-4 opacity-0 group-hover/reply:opacity-100 
                                    transition-opacity duration-200">
                          <!-- 点赞按钮 -->
                          <button class="group flex items-center space-x-1 
                                       text-gray-400 hover:text-rose-500 
                                       dark:text-gray-500 dark:hover:text-rose-400
                                       transition-colors duration-200">
                            <svg class="w-4 h-4 transition-transform duration-200 
                                      group-hover:scale-110" 
                                 :class="{'text-rose-500 dark:text-rose-400 animate-heart-beat': reply.likeCount > 0}"
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <span>{{ reply.likeCount }}</span>
                          </button>

                          <!-- 回复按钮 -->
                          <button @click="handleReply(reply)"
                                  class="group flex items-center space-x-1 
                                         text-gray-400 hover:text-blue-500 
                                         dark:text-gray-500 dark:hover:text-blue-400
                                         transition-colors duration-200">
                            <svg class="w-4 h-4 transition-transform duration-200 
                                      group-hover:scale-110 group-hover:rotate-[-8deg]" 
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            <span>回复</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* 简化波浪分隔线 */
.wave-divider {
  position: relative;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(243, 244, 246, 0.3) 25%,
    rgba(243, 244, 246, 0.5) 50%,
    rgba(243, 244, 246, 0.3) 75%,
    transparent 100%
  );
  animation: wave 8s linear infinite;
}

@keyframes wave {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

/* 移除粒子扩散效果相关样式 */
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  transition: all 0.2s ease-out;
}

/* 更新动画效果 */
@keyframes heart-beat {
  0% { transform: scale(1); }
  25% { transform: scale(1.2); }
  50% { transform: scale(0.95); }
  75% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.animate-heart-beat {
  animation: heart-beat 0.5s ease-in-out;
}

/* 点击波纹效果 */
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: currentColor;
  opacity: 0.2;
  border-radius: 50%;
  transform: scale(0);
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.ripple:active::after {
  transform: scale(2);
  opacity: 0;
}

/* 暗黑模式过渡 */
.dark-transition {
  transition: background-color 0.3s ease-in-out,
              border-color 0.3s ease-in-out,
              color 0.3s ease-in-out;
}

/* 悬浮光晕效果 */
.hover-glow {
  position: relative;
}

.hover-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: inherit;
  filter: blur(4px);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.hover-glow:hover::before {
  opacity: 0.5;
}

/* 响应式布局 */
@media (max-width: 640px) {
  .ml-13 {
    margin-left: 1rem;
  }
}

/* 添加渐变色过渡效果 */
[class*="from-"] {
  transition: all 0.3s ease-out;
  background-size: 200% auto;
}

[class*="from-"]:hover {
  background-position: right center;
}

/* 渐变色过渡效果 */
[class*="bg-gradient"] {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-out;
}

[class*="bg-gradient"]::before {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

[class*="bg-gradient"]:hover::before {
  opacity: 0.7;
}

/* 用户标识动画效果 */
@keyframes glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.active-user::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: inherit;
  opacity: 0;
  animation: glow 2s ease-in-out infinite;
}

/* 深色模式适配 */
:root[class~='dark'] [class*='from-'] {
  --tw-gradient-from-position: 0%;
  --tw-gradient-to-position: 100%;
  --tw-gradient-stops: var(--tw-gradient-from) 0%,
                      var(--tw-gradient-via) 50%,
                      var(--tw-gradient-to) 100%;
}
</style>