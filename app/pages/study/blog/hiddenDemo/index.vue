<script setup lang="ts">
import { ref } from 'vue'

// 模拟用户权限状态
const isPaidUser = ref(false)
const hasCommented = ref(false)
const content = ref(" <div class=\"prose dark:prose-invert\">\n" +
    "            <h3 style=\"color: red\">互动奖励内容</h3>\n" +
    "            <p>感谢您的评论！这是一些额外的精彩内容：</p>\n" +
    "            <blockquote>\n" +
    "              <p>知识是通过分享才能获得提升。您的每一个想法都很珍贵。</p>\n" +
    "            </blockquote>\n" +
    "          </div>")

// 切换用户状态
const togglePaidStatus = () => {
  isPaidUser.value = !isPaidUser.value
}

const toggleCommentStatus = () => {
  hasCommented.value = !hasCommented.value
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">隐藏内容组件示例</h1>

    <!-- 付费内容示例 -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">付费内容示例</h2>
      <div class="space-y-4">
        <button
          @click="togglePaidStatus"
          class="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          {{ isPaidUser ? '模拟取消付费' : '模拟付费' }}
        </button>

        <ArticleHiddenContent
          :is-allowed="isPaidUser"
          tip-text="付费会员可见"
        >
          <div class="prose dark:prose-invert">
            <h3>高级教程内容</h3>
            <p>这是一段需要付费才能查看的专业内容。包含了详细的技术讲解和最佳实践指南。</p>
            <ul>
              <li>高级特性解析</li>
              <li>性能优化技巧</li>
              <li>实战案例分析</li>
            </ul>
          </div>
        </ArticleHiddenContent>
      </div>
    </section>

    <!-- 评论可见示例 -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">评论可见示例</h2>
      <div class="space-y-4">
        <button
          @click="toggleCommentStatus"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {{ hasCommented ? '模拟取消评论' : '模拟评论' }}
        </button>

        <ArticleHiddenContent
          :is-allowed="hasCommented"
          tip-text="评论后可见"
          :content="content"
        >


        </ArticleHiddenContent>
      </div>
    </section>

    <!-- 自定义提示文本示例 -->
    <section>
      <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">自定义提示示例</h2>
      <ArticleHiddenContent
        :is-allowed="false"
        tip-text="关注公众号后可见"
      >
        <div class="prose dark:prose-invert">
          <h3>独家内容</h3>
          <p>这里有一些只有关注了公众号才能查看的独家内容。包含第一手的技术资讯和深度分析。</p>
        </div>
      </ArticleHiddenContent>
    </section>

    <section>
      <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">自定义提示示例2</h2>
      <ArticleHiddenContent
          :is-allowed="true"
          tip-text="关注公众号后可见"
          content="自定义提示示例2的内容"
      >
      </ArticleHiddenContent>
    </section>
  </div>
</template>