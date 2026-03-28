<script setup lang="ts">
import UploadImg from '~/components/Base/upload/uploadImg.vue'
</script>

<template>
  <div class="p-8">
    <h2 class="text-2xl font-semibold mb-6">图片上传组件示例</h2>
    
    <div class="space-y-8">
      <!-- 基础用法 -->
      <div class="space-y-2">
        <h3 class="text-lg font-medium">基础用法</h3>
        <UploadImg prefix="basic" />
      </div>

      <!-- 自定义样式 -->
      <div class="space-y-2">
        <h3 class="text-lg font-medium">自定义样式</h3>
        <UploadImg
          prefix="custom"
          class="w-40 h-40 bg-gray-50"
        />
      </div>
    </div>
  </div>
</template>