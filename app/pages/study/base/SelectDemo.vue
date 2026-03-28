<script setup lang="ts">
import { ref } from 'vue'

// 基础选择器数据
const basicValue = ref('')
const basicOptions = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
  { label: '禁用选项', value: 4, disabled: true }
]

// 多选选择器数据
const multipleValue = ref([])
const multipleOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
]

// 可搜索选择器数据
const searchValue = ref('')
const searchOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '南京', value: 'nanjing' },
  { label: '武汉', value: 'wuhan' },
  { label: '成都', value: 'chengdu' }
]

// 可清除选择器数据
const clearableValue = ref('')
const clearableOptions = [
  { label: '选项A', value: 'A' },
  { label: '选项B', value: 'B' },
  { label: '选项C', value: 'C' }
]
</script>

<template>
  <div class="min-h-screen bg-base-100 p-8">
    <h1 class="text-3xl font-bold mb-8">Select 选择器组件示例</h1>

    <!-- 基础用法 -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">基础用法</h2>
      <div class="w-64">
        <BaseSelect
          v-model="basicValue"
          :options="basicOptions"
          placeholder="请选择"
        />
      </div>
      <p class="mt-2 text-text-muted">选中值: {{ basicValue }}</p>
    </div>

    <!-- 多选模式 -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">多选模式</h2>
      <div class="w-64">
        <BaseSelect
          v-model="multipleValue"
          :options="multipleOptions"
          multiple
          placeholder="请选择水果"
        />
      </div>
      <p class="mt-2 text-text-muted">选中值: {{ multipleValue }}</p>
    </div>

    <!-- 可搜索 -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">可搜索</h2>
      <div class="w-64">
        <BaseSelect
          v-model="searchValue"
          :options="searchOptions"
          searchable
          placeholder="搜索城市"
        />
      </div>
      <p class="mt-2 text-text-muted">选中值: {{ searchValue }}</p>
    </div>

    <!-- 可清除 -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">可清除</h2>
      <div class="w-64">
        <BaseSelect
          v-model="clearableValue"
          :options="clearableOptions"
          clearable
          placeholder="可清除选择"
        />
      </div>
      <p class="mt-2 text-text-muted">选中值: {{ clearableValue }}</p>
    </div>

    <!-- 禁用状态 -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">禁用状态</h2>
      <div class="w-64">
        <BaseSelect
          v-model="basicValue"
          :options="basicOptions"
          disabled
          placeholder="禁用状态"
        />
      </div>
    </div>
  </div>
</template>