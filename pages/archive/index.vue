<script setup lang="ts">
import {archive} from "~/remote/article";
import {ref} from "vue";
import {getAll} from "~/remote/friendLinks";




// 处理分类点击
const handleCategoryClick = (category: any) => {
  navigateTo(`/category/${category.id}?name=${category.name}`)
}

// 处理标签点击
const handleTagClick = (tag: any) => {
  navigateTo(`/tags/${tag.id}?name=${tag.name}`)
}

const { data: archiveDataRes } = await archive()

let categoriesData = ref([])
let tagsData = ref([])

categoriesData.value = archiveDataRes.value?.data.categoryArchiveList
tagsData.value = archiveDataRes.value?.data.tagArchiveList


// console.log("categoriesData.value:",JSON.stringify(categoriesData.value))



</script>

<template>
  <!-- 顶部大图区域 -->
  <div class="relative h-[300px] overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-sky-400 dark:from-emerald-600/80 dark:to-sky-600/80">
      <!-- 装饰元素 -->
      <div class="absolute inset-0 opacity-10">
        <!-- 左上角装饰 -->
        <div class="absolute top-8 left-1/4 w-24 h-24 bg-white transform rotate-45" style="clip-path: path('M12 3.5c2.3 0 4 1.9 4 4.2 0 3.2-4 5.6-4 5.6s-4-2.4-4-5.6c0-2.3 1.7-4.2 4-4.2zm0 6.8c1.3 0 2.4-1.1 2.4-2.5s-1.1-2.5-2.4-2.5-2.4 1.1-2.4 2.5 1.1 2.5 2.4 2.5z')"></div>
        <div class="absolute top-16 left-1/3 w-16 h-16 bg-white/80" style="clip-path: path('M8 0c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm0 2c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z M12 8c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z')"></div>
        <!-- 右上角装饰 -->
        <div class="absolute top-12 right-1/4 w-20 h-20 bg-white transform -rotate-12" style="clip-path: path('M10 0c5.5 0 10 4.5 10 10s-4.5 10-10 10S0 15.5 0 10 4.5 0 10 0zm0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z M15 10c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5z')"></div>
        <div class="absolute top-24 right-1/3 w-28 h-28 bg-white/60" style="clip-path: path('M14 0c7.7 0 14 6.3 14 14s-6.3 14-14 14S0 21.7 0 14 6.3 0 14 0zm0 2C7.4 2 2 7.4 2 14s5.4 12 12 12 12-5.4 12-12S20.6 2 14 2z M21 14c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7 7 3.1 7 7z')"></div>
        <!-- 中间装饰 -->
        <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-white/40 transform -translate-y-1/2" style="clip-path: path('M16 0c8.8 0 16 7.2 16 16s-7.2 16-16 16S0 24.8 0 16 7.2 0 16 0zm0 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2z M24 16c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z')"></div>
        <!-- 底部装饰 -->
        <div class="absolute bottom-8 left-1/3 w-24 h-24 bg-white/70" style="clip-path: path('M12 0c6.6 0 12 5.4 12 12s-5.4 12-12 12S0 18.6 0 12 5.4 0 12 0zm0 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z M18 12c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6z')"></div>
        <div class="absolute bottom-16 right-1/4 w-20 h-20 bg-white/50" style="clip-path: path('M10 0c5.5 0 10 4.5 10 10s-4.5 10-10 10S0 15.5 0 10 4.5 0 10 0zm0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z M15 10c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5z')"></div>
      </div>
      <!-- 磨砂玻璃效果 -->
      <div class="absolute inset-0 backdrop-blur-[2px] bg-white/5 dark:bg-gray-900/5"></div>
    </div>
    <div class="relative h-full flex items-center justify-center">
      <h1 class="text-4xl font-bold text-white tracking-wider drop-shadow-lg">素笺存忆</h1>
    </div>
  </div>

  <!-- 内容区域 -->
  <div class="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4 py-12">
    <div class="flex gap-4">
      <!-- 主要内容区域 -->
      <div class="flex-1">
        <!-- 统一的卡片容器 -->
        <div class="p-8 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.24)] border border-white/20 dark:border-gray-700/30">
          <!-- 分类展示区域 -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 tracking-tight">分类列表</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                v-for="category in categoriesData"
                :key="category.id"
                @click="handleCategoryClick(category)"
                class="group relative backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-xl
                       shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer
                       hover:scale-[1.02] hover:-translate-y-0.5"
              >
                <div class="p-6">
                  <div class="flex items-center justify-between">
                    <div class="relative">
                      <span class="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {{ category.name }}
                      </span>
                      <!-- 底部渐变边框 -->
                      <div class="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent
                                scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                    </div>
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100/70 dark:bg-gray-700/30
                               px-2.5 py-1 rounded-full">
                      {{ category.count }} 篇文章
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 优雅的分隔线 -->
          <div class="relative my-8">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-violet-300/50 dark:border-violet-500/40"></div>
            </div>
            <div class="relative flex justify-center">
              <img src="/images/rose_l.png" alt="rose divider" class="w-6 h-auto transform rotate-90  dark:opacity-70 transition-opacity duration-300 hover:opacity-100" />
            </div>
          </div>

          <!-- 标签列表区域 -->
          <div>
            <h2 class="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 tracking-tight">标签列表</h2>
            <div class="flex flex-wrap gap-3 md:gap-4">
              <div
                v-for="tag in tagsData"
                :key="tag.id"
                @click="handleTagClick(tag)"
                class="group relative backdrop-blur-lg bg-white/90 dark:bg-gray-800/90
                       px-4 py-2.5 rounded-xl cursor-pointer shadow-sm
                       hover:shadow-md transition-all duration-300
                       hover:scale-[1.02] hover:-translate-y-0.5"
              >
                <div class="flex items-center space-x-2">
                  <!-- 标签图标 -->
                  <span class="text-lg">🔖</span>
                  <div class="relative">
                    <span class="text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium">
                      {{ tag.name }}
                      <span class="text-sm text-gray-500 dark:text-gray-400 ml-1.5 font-normal">({{ tag.count }})</span>
                    </span>
                    <!-- 底部渐变边框 -->
                    <div class="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
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

<style scoped>
</style>