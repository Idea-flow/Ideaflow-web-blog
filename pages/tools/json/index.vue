<template>
<!--  <div class="h-screen bg-white dark:bg-black p-2 sm:p-4 lg:p-6 flex justify-center">-->
<!--    <div class="w-full max-w-screen-2xl">-->
<!--      <JSONEditor-->
<!--          :initial-value="initialJSON"-->
<!--          :max-depth="5"-->
<!--          class="h-full"-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->

  <JSONEditor
      :initial-value="initialJSON"
      :max-depth="5"
      class="h-full"
  />
</template>

<script setup lang="ts">
import JSONEditor from '~/components/Tools/json/JSONEditor.vue'

// 示例 JSON 数据
const initialJSON = ``

// SEO配置
useHead({
  title: 'JSON在线工具 - 格式化、压缩、转换',
  meta: [
    { name: 'description', content: '在线JSON工具，提供JSON格式化、压缩、转换等功能，帮助开发者更高效地处理JSON数据。' },
    { name: 'keywords', content: 'JSON工具,JSON格式化,JSON压缩,JSON转换,在线工具' }
  ]
})
</script>