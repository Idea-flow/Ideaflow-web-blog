<script setup lang="ts">
import { ref } from 'vue'
import { getAll } from '~/remote/friendLinks'

// http://localhost:3005/study/FriendLinksDemo
// 使用 useAsyncData 获取数据
// 友情链接数据
const friendLinksData = ref([])


const { data: friendLinksDataRes } = await getAll()
friendLinksData.value = friendLinksDataRes.value?.data
// console.log("friendLinksData.value:"+JSON.stringify(friendLinksData.value))
// const { data: friendLinksResponse } = await useAsyncData('friendLinks', () => getAll())
// console.log("friendLinksResponse:"+JSON.stringify(friendLinksResponse.value))
// // 当数据返回时，更新友情链接数据
// if (friendLinksResponse.value?.code === 0 && friendLinksResponse.value?.data) {
//   friendLinksData.value = friendLinksResponse.value.data
//
//   console.log("friendLinksData.value:"+JSON.stringify(friendLinksData.value))
// }

// 是否显示分类
const showCategory = ref(true)

// 切换分类显示
const toggleCategory = () => {
  showCategory.value = !showCategory.value
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-8 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
        友情链接展示
      </h1>
      <button
        @click="toggleCategory"
        class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600
               transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        {{ showCategory ? '隐藏分类' : '显示分类' }}
      </button>
    </div>

    <div class="space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          基本示例
        </h2>
        <FriendLinks
          :links="friendLinksData"
          :show-category="showCategory"
        />
      </div>
    </div>
  </div>
</template>