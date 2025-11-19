<script setup lang="ts">
import Tabs from '~/components/Base/Tabs/Tabs.vue'
import TabPane from '~/components/Base/Tabs/TabPane.vue'

const activeTab = ref(0)
const tabPosition = ref<'top' | 'bottom' | 'left' | 'right'>('top')

const positions = ['top', 'bottom', 'left', 'right']


</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">标签页组件示例</h1>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">基础用法</h2>
      <Tabs model-value = "">
        <TabPane label="标签1" class="bg-base-200 h-full">
          <div >
            <p>标签1的内容</p>
            <p>标签1的内容</p>
            <p>标签1的内容</p>
            <p>标签1的内容</p>
            <p>标签1的内容</p>
            <p>标签1的内容</p>
          </div>
        </TabPane>
        <TabPane label="标签2">
          <div class="bg-base-200">
            <p>标签2的内容</p>
          </div>
        </TabPane>
        <TabPane label="标签3" disabled>
          <div class="bg-base-200">
            <p>标签3的内容（禁用状态）</p>
          </div>
        </TabPane>
      </Tabs>
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">标签位置</h2>
      <div class="mb-4">
        <span class="mr-2">选择位置：</span>
        <select
          v-model="tabPosition"
          class="px-3 py-1 border rounded bg-base-100"
        >
          <option v-for="pos in positions" :key="pos" :value="pos">
            {{ pos }}
          </option>
        </select>
      </div>

      <Tabs v-model="activeTab" :tab-position="tabPosition">
        <TabPane label="标签1">
          <div class="bg-base-200">
            <p>标签1的内容</p>
            <p>标签1的内容</p>
            <p>标签1的内容</p>
            <p>标签1的内容</p>
            <p>标签1的内容</p>
            <p>标签1的内容</p>
          </div>
        </TabPane>
        <TabPane label="标签2">
          <div class="bg-base-200">
            <p>标签2的内容</p>
          </div>
        </TabPane>
        <TabPane label="标签3" disabled>
          <div class="bg-base-200">
            <p>标签3的内容（禁用状态）</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>