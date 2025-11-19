<script setup lang="ts">
import { ref } from 'vue'

const selectedItem = ref('选项1')
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">下拉菜单组件示例</h1>

    <!-- 基础用法 -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">基础用法</h2>
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <BaseDropdown>
            点击打开菜单
          <template #dropdown>
            <BaseDropdownItem @click="selectedItem = '选项1'">
              <NuxtLink to="/tools/json" >
                json
              </NuxtLink>
            </BaseDropdownItem>
            <BaseDropdownItem @click="selectedItem = '选项2'">选项2</BaseDropdownItem>
            <BaseDropdownItem @click="selectedItem = '选项3'">选项3</BaseDropdownItem>
          </template>
        </BaseDropdown>
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">当前选中：{{ selectedItem }}</p>
      </div>
    </section>

  </div>
</template>