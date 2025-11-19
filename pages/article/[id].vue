<script setup  lang="ts" >
// 获取路由参数
import {createMarkdownItImgNineLayoutPlugin} from "assets/js/markdown-it-plugin/img-nine-layout-plugin";
import Comment from '~/components/Blog/Article/CommentMy/Comment.vue'
import CryptoJS from 'crypto-js';

import { useAppStore } from '~/stores/app'
const route = useRoute()
const routeArticleId = Number(route.params.id)

// 获取用户状态
const userStore = useAppStore()

// 获取文章数据
const { data: articleData } = await getArticleById(routeArticleId)

// console.log("文章页面articleData:", JSON.stringify(articleData.value))

const isShowArticleInfoByPass = ref(articleData.value.code == 2000900001 ? false : true)
// console.log("文章页面articleData:isShowArticleInfoByPass:", isShowArticleInfoByPass.value)

const article = articleData.value?.data || {}

const isShowComment = ref(articleData.value?.data?.isComment == 1)

// 隐藏资源
const isHaveHidden = ref(articleData.value?.data?.isHaveHidden == 1)
const isArticleHiddenInfoUnlock = ref(articleData.value?.data?.articleHiddenInfo.isUnlock)
const articleHiddenInfoTips = ref(articleData.value?.data?.articleHiddenInfo.tips)
const articleHiddenInfoHiddenContent = ref(articleData.value?.data?.articleHiddenInfo.hiddenContent)

// 判断文章是否有目录（H1-H6标签）
const hasCatalog = computed(() => {
  if (!article?.content) return false;
  
  // 使用正则表达式检查是否包含H1-H6标签
  const headingRegex = /^#{1,6}\s.*/gm;
  let result = headingRegex.test(article.content);
  // console.log("article.content:", article.content)
  // console.log("文章目录hasCatalog:", result)
  return  result;
});

// console.log("isHaveHidden:"+isHaveHidden.value+"  isArticleHiddenInfoUnlock:"+isArticleHiddenInfoUnlock.value +"  articleHiddenInfoTips:"+articleHiddenInfoTips.value+"  articleHiddenInfoHiddenContent:"+articleHiddenInfoHiddenContent.value)

/*SEO配置*/
useHead({
  title: article?.title,
  meta: [
    { name: 'description', content: article?.summary },
    { name: 'keywords', content: article?.tags?.map(tag => tag.name).join(',') },
    { name: 'author', content: 'Blog Author' },
    { name: 'article:published_time', content: article?.createTime },
    { name: 'article:section', content: article?.categoryName },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: article?.title },
    { property: 'og:description', content: article?.summary },
    { property: 'og:image', content: article?.cover },
    { property: 'og:url', content: `${process.env.APP_URL}/article/${article?.id}` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: article?.title },
    { name: 'twitter:description', content: article?.summary },
    { name: 'twitter:image', content: article?.cover },
  ],
})

useSeoMeta({
  title: article?.title,
  description: article?.summary,
  keywords: article?.tags?.map(tag => tag.name).join(','),
  author: 'Blog Author',
  ogType: 'article',
  ogTitle: article?.title,
  ogDescription: article?.summary,
  ogImage: article?.cover,
  ogUrl: `${process.env.APP_URL}/article/${article?.id}`,
  twitterCard: 'summary_large_image',
  twitterTitle: article?.title,
  twitterDescription: article?.summary,
  twitterImage: article?.cover,
})


import { getArticleById } from '~/remote/article'

import { MdPreview, MdCatalog,config } from 'md-editor-v3';
import { createMarkdownItNewWindowPlugin } from '~/assets/js/markdown-it-plugin/a-new-window-plugin.js';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
import '~/assets/css/markdown/myMarkdown.css'
import '~/assets/css/markdown/content/img-nine-layout.css';
import {onMounted, ref} from "vue";
const previewId = 'preview-only';


config({
  markdownItConfig(mdit) {
    mdit.use(createMarkdownItNewWindowPlugin());
    mdit.use(createMarkdownItImgNineLayoutPlugin());
  }});

// markdown 相关
// 'dark' : 'light'"
const appStore = useAppStore()
const colorMode = useColorMode()
// const isDark = computed(() => appStore.isDark)
// const isDark = computed(() => colorMode.value )
// console.log("文章appStore.isDark:"+appStore.isDark)
// console.log("文章$colorMode.value:"+colorMode.value)
// console.log("文章$colorMode.value:"+colorMode.value )
const mdEditorPreview = ref({

  // default、github、vuepress、mk-cute、smart-blue、cyanosis,myCustom,myDefault
  previewTheme : 'myDefault',

  // 内置了atom、a11y、github、gradient、kimbie、paraiso、qtcreator、stackoverflow、代码主题
  codeTheme : 'github',
  catalogList: []
});



let scrollElement = ref();
let isClient = ref(false);
if (import.meta.server) {
  // console.log('这是服务端渲染！');
  scrollElement.value = "body"
}else {
  isClient.value = true;
  // console.log('这是客户端渲染！');
  scrollElement.value = document.documentElement;
}

// markdown 结束



 /*评论组件开始*/
// 评论组件引用
import type { CommentApi } from '~/types/comment'
import { getCommentPage, createComment } from '~/remote/comment'
import CommentList from "~/components/Blog/Article/CommentMy/Comment.vue";
import FixedActionBar from "~/components/Base/FixedActionBar/index.vue";
import {navigateTo} from "#app";
import {useBlogStore} from "~/stores/blog";

// 分页参数
const pageNo = ref(1)
const pageSize = ref(10)
const articleCommentsSortType = ref<1 | 2 | 3>(1)

// 评论数据
const articleComments = ref<CommentApi[]>([])
const articleCommentsTotal = ref(0)

const commentComponent = ref()

// 获取评论数据
const { data:commentData } = await getCommentPage({
  pageNo: pageNo.value,
  pageSize: pageSize.value,
  articleId: routeArticleId,
  sortType: articleCommentsSortType.value
})

articleComments.value = commentData.value?.data.list
articleCommentsTotal.value = commentData.value?.data.total

// console.log("commentData:"+JSON.stringify(commentData.value))

// 评论列表组件引用
const commentRef = ref()
// 处理评论提交
const handleSubmit = async (content: string, parentId?: number, replyToUserId?: number) => {

  try {
    const { data } = await createComment({
      articleId: routeArticleId, // 示例文章ID
      content,
      parentId,
      replyToUserId
    })
    if (data.value?.code === 0 && data.value?.data) {
      // 调用评论组件的提交成功回调
      // console.info('提交评论chenggon ：'+JSON.stringify(data.value?.data))
      commentRef.value?.onSubmitSuccess(data.value?.data)
    }
  } catch (error) {
    console.error('提交评论失败：', error)
  }
}



// 处理评论提交
const handleCommentSubmit = async (content: string, parentId?: number, replyToUserId?: number) => {
  try {
    const { data } = await createComment({
      articleId: routeArticleId, // 示例文章ID
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

/*评论组件结束*/


/* 隐藏资源*/


/* 隐藏资源结束*/

/*
视频组件
* */


const drawerVisible = ref(false)



const blogStore = useBlogStore()

const passwordAuthDialog = ref(articleData.value.code == 2000900001 ? true : false)
const authLoginDialog = ref(articleData.value.code == 2000900002 ? true : false)
// console.log("passwordAuthDialog:"+passwordAuthDialog.value)
// console.log("authLoginDialog:"+authLoginDialog.value)

function onPasswordSubmit(password: string) {
  // 处理密码，例如发请求校验
  // console.log('文章页面输入的密码：', password)
  passwordAuthDialog.value = false
  blogStore.setArticleAuth(CryptoJS.MD5(password).toString())
  //重新调用 刷新页面
  // console.log('文章页面输入的密码route.fullPath：', route.fullPath)
  // navigateTo(route.fullPath + '?refresh=' + Date.now())
  window.location.reload()
}
</script>

<template>
  <!-- 文章头图区域 -->
  <!-- 头部大图区域 -->
  <BlogImgBackground :src="article?.cover || 'https://oss.ideaflow.top/configImg/backgroundImg.jpg' " >
    <!-- 星空效果 -->
    <BlogStarry />
    <!-- 文章信息区域 -->
    <div class="absolute inset-x-0 bottom-0 flex items-end justify-start px-8 pb-8">
      <div class="w-full max-w-4xl">
        <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4 line-clamp-2 drop-shadow-lg">{{ article?.title }}</h1>
        <div class="flex flex-wrap items-center gap-4 text-white/90">
          <!-- 作者信息 -->
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="url(#authorGradient)" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="authorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#FF6B6B" />
                  <stop offset="100%" style="stop-color:#FF8E53" />
                </linearGradient>
              </defs>
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="drop-shadow-md">{{ article?.author || 'Blog Author' }}</span>
          </div>
          <!-- 发布时间 -->
          <div class="flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-purple-400"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
              <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
              />
            </svg>
            <span class="drop-shadow-md">{{ new Date(article.createTime).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') }}</span>

          </div>
          <!-- 观看量 -->
<!--          <div class="flex items-center gap-2">-->
<!--            <svg-->
<!--                xmlns="http://www.w3.org/2000/svg"-->
<!--                class="h-5 w-5 text-green-400"-->
<!--                viewBox="0 0 20 20"-->
<!--                fill="currentColor"-->
<!--            >-->
<!--              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />-->
<!--              <path-->
<!--                  fill-rule="evenodd"-->
<!--                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"-->
<!--                  clip-rule="evenodd"-->
<!--              />-->
<!--            </svg>-->
<!--            <span class="drop-shadow-md">{{ article?.viewCount || 0 }} 次浏览</span>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </BlogImgBackground>


  <div class="relative flex justify-center w-full mx-auto mt-5" v-if="isShowArticleInfoByPass">
    <!-- 左侧边栏区域 -->
    <div class="hidden xl:block w-[10%] sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
<!--      左边-->

    </div>

    <!-- 文章内容区域 -->
    <div class="w-full xl:w-[70%] max-w-6xl mx-4 px-2 flex flex-col items-center">

      <client-only>
        <template v-if="article?.videoUrl">
          <div v-if="!userStore.userInfo" class="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            <div class="text-center">
              <div class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">登录后即可观看视频</div>
              <NuxtLink to="/login" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                立即登录
              </NuxtLink>
            </div>
          </div>
          <BaseVideoPlayer v-else
              :url="article?.videoUrl"
              :poster="article?.cover || '' "
              :danmu-comments="article?.danmuCommentVoList"
          />
        </template>
      </client-only>

      <MdPreview
          :id="previewId"
          :modelValue="article?.content"
          :theme="$colorMode.value == 'dark' ? 'dark' : 'light'"
          :previewTheme="mdEditorPreview.previewTheme"
          :codeTheme="mdEditorPreview.codeTheme"
      />

      <BlogArticleHiddenContent
          v-if="isHaveHidden"
          :is-allowed = "isArticleHiddenInfoUnlock"
          :content="articleHiddenInfoHiddenContent"
          :tip-text="articleHiddenInfoTips"
      />


      <!-- 标签区域 -->
      <div class="flex flex-col items-start w-full mt-8 px-4">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <div class="flex flex-row flex-wrap gap-2">
            <BlogArticleTag
                v-for="tag in article?.tags"
                :key="tag.id"
                :text="tag.name"
                :to="`/tags/${tag.id}/?name=${tag.name}`"
                :useRandomColor = "true"
                :blank = "true"
                size="md"
                theme="programming"
                class="transform transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
      <!-- 标签区域结束 -->
<!--      评论区域-->

      <!-- 评论组件 -->
      <Comment
          v-if="isShowComment"
          ref="commentRef"
          :comments="articleComments"
          :total="articleCommentsTotal"
          @submit="handleSubmit"
      />


    </div>


    <!-- 右侧目录区域 -->
    <div class="hidden xl:block w-[20%] sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto" >
      <BlogArticleCatalog :containerId="previewId" :theme="$colorMode.value == 'dark' ? 'dark' : 'light'" :collapsed="false"/>
<!--      <MdCatalog :editorId="previewId" :scrollElement="scrollElement" :theme="mdEditorPreview.cateLogTheme"/>-->
    </div>

    <FixedActionBar position="right-bottom" :distance="0" :offsetX="-20" :offsetY="-80" class="md:hidden" v-if="!drawerVisible && hasCatalog" @click="drawerVisible = true">
      <!--        <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="none" stroke="#f09393" stroke-width="2" d="M5.5 18a2.5 2.5 0 1 0 0 5H22M3 20.5v-17A2.5 2.5 0 0 1 5.5 1H21v17.007H5.492M20.5 18a2.5 2.5 0 1 0 0 5"/></svg>-->

      <Icon
          name="mingcute:menu-fill"
          class="w-6 h-6 transition-colors duration-200 text-primary"
      />
    </FixedActionBar>


<!--手机端目录实现-->
    <BaseDrawer
        v-model="drawerVisible"
        placement="bottom"
        :height="400"
        v-if="hasCatalog"
    >
      <BlogArticleCatalog :containerId="previewId" :theme="$colorMode.value == 'dark' ? 'dark' : 'light'" :collapsed="false" />

    </BaseDrawer>





  </div>

  <BaseDialog v-model="passwordAuthDialog" title="密码验证" :show-footer="false" height="35%">
    <BlogArticlePasswordAuth @submit="onPasswordSubmit" />
  </BaseDialog>


  <BaseDialog v-model=" authLoginDialog" title="登陆验证" :show-footer="false" height="35%">
    <div class="flex flex-col items-center justify-center py-6">
      <div class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
        本内容需要登录才可查看
      </div>
      <a
          :href="`/login?redirect=/article/${routeArticleId}`"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center px-5 py-2 rounded bg-primary text-white font-medium shadow hover:bg-primary-focus transition-colors"
      >
        点击登录
      </a>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-3">
        登录后刷新页面即可查看
      </div>
    </div>
  </BaseDialog>

</template>

<style scoped>
/* 为 MdPreview 组件内的所有文本应用自定义字体 */
 :deep(.md-editor-preview) {
  font-family: 'blog-font', sans-serif !important;
}
</style>