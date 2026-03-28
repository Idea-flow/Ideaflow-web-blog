<template>
  <div class="space-y-4 p-4">
    <!-- 基础示例 -->
    <div class="space-y-2">
      <h3 class="text-lg font-medium">基础示例</h3>
      <BaseButton class="btn btn-primary" @click="visible1 = true">打开抽屉</BaseButton>
      <BaseDrawer
        v-model="visible1"
        title="基础抽屉"
        placement="right"
        :width="400"
        @close="handleClose"
      >
        <div class="p-4">这是一个基础的抽屉示例，展示了最基本的使用方法。</div>
      </BaseDrawer>
    </div>

    <!-- 不同方向 -->
    <div class="space-y-2">
      <h3 class="text-lg font-medium">不同方向</h3>
      <div class="space-x-2">
        <BaseButton class="btn btn-primary" @click="visible2.left = true">左侧打开</BaseButton>
        <BaseButton class="btn btn-primary" @click="visible2.right = true">右侧打开</BaseButton>
        <BaseButton class="btn btn-primary" @click="visible2.top = true">顶部打开</BaseButton>
        <BaseButton class="btn btn-primary" @click="visible2.bottom = true">底部打开</BaseButton>
      </div>
      <!-- 左侧抽屉 -->
      <BaseDrawer
        v-model="visible2.left"
        title="左侧抽屉"
        placement="left"
        :width="300"
      >
        <div class="p-4">这是一个左侧打开的抽屉示例。</div>
      </BaseDrawer>
      <!-- 右侧抽屉 -->
      <BaseDrawer
        v-model="visible2.right"
        title="右侧抽屉"
        placement="right"
        :width="300"
      >
        <div class="p-4">这是一个右侧打开的抽屉示例。</div>
      </BaseDrawer>
      <!-- 顶部抽屉 -->
      <BaseDrawer
        v-model="visible2.top"
        title="顶部抽屉"
        placement="top"
        :height="200"
      >
        <div class="p-4">这是一个顶部打开的抽屉示例。</div>
      </BaseDrawer>
      <!-- 底部抽屉 -->
      <BaseDrawer
        v-model="visible2.bottom"
        title="底部抽屉"
        placement="bottom"
        :height="200"
      >
        <div class="p-4">这是一个底部打开的抽屉示例。</div>
      </BaseDrawer>
    </div>

    <!-- 自定义内容 -->
    <div class="space-y-2">
      <h3 class="text-lg font-medium">自定义内容</h3>
      <BaseButton class="btn btn-primary" @click="visible3 = true">打开自定义抽屉</BaseButton>
      <BaseDrawer
        v-model="visible3"
        title="自定义内容"
        placement="right"
        :width="500"
        custom-class="custom-drawer"
      >
        <div class="p-4 space-y-4">
          <div class="flex items-center space-x-4">
            <img src="/logo.webp" alt="Logo" class="w-16 h-16 rounded-full">
            <div>
              <h4 class="text-lg font-medium">自定义头像和描述</h4>
              <p class="text-gray-500">这里可以放置任意的自定义内容</p>
            </div>
          </div>
          <div class="border-t pt-4">
            <p>支持添加更复杂的内容结构，例如：</p>
            <ul class="list-disc list-inside mt-2">
              <li>表单内容</li>
              <li>图片预览</li>
              <li>详细信息展示</li>
            </ul>
          </div>
        </div>
      </BaseDrawer>
    </div>

    <!-- 交互控制 -->
    <div class="space-y-2">
      <h3 class="text-lg font-medium">交互控制</h3>
      <BaseButton class="btn btn-primary" @click="visible4 = true">打开控制抽屉</BaseButton>
      <BaseDrawer
        v-model="visible4"
        title="交互控制"
        placement="right"
        :width="400"
        :mask-closable="false"
        :show-close="false"
      >
        <div class="p-4 space-y-4">
          <p>该抽屉禁用了点击遮罩层关闭和关闭按钮。</p>
          <p>只能通过以下按钮关闭：</p>
          <BaseButton class="btn btn-primary" @click="visible4 = false">关闭抽屉</BaseButton>
        </div>
      </BaseDrawer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 基础示例
const visible1 = ref(false)

// 不同方向示例
const visible2 = ref({
  left: false,
  right: false,
  top: false,
  bottom: false
})

// 自定义内容示例
const visible3 = ref(false)

// 交互控制示例
const visible4 = ref(false)

const handleClose = () => {
  console.log('抽屉关闭')
}
</script>

<style scoped>
.custom-drawer {
  /* 可以添加自定义样式 */
}
</style>