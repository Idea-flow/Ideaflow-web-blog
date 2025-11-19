<script setup lang="ts">
import { proxyPicture } from '~/utils/proxyPicture';

interface HotSearchItem {
  id: string
  title: string // 标题
  hot: string  //热度
  tag: string //标题后面的标签 新 爆等
  tagColor: string
  url: string  //跳转地址
  extra: {
    icon: string //标题后面的图标
  }
}


interface Props {
  items: HotSearchItem[];
  platformIcon?: string;
  platformName: string;
  themeColor?: string;
  updateTime?: string;
}

const props = withDefaults(defineProps<Props>(), {
  themeColor: '#FFB3C8',
  updateTime: '刚刚更新',
  platformIcon: ''
})

const emit = defineEmits<{
  refresh: []
}>()

const handleRefresh = () => {
  emit('refresh')
}
</script>

<template>
  <div class="relative h-[50vh] w-full overflow-hidden rounded-2xl bg-base-100 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl" :style="{ '--card-color': themeColor, '--card-color-rgb': themeColor.replace(/^#/, '').match(/.{2}/g)?.map(x => parseInt(x, 16)).join(',') }">
    <div class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[var(--card-color)] to-white opacity-30"></div>
    
    <div class="mb-5 flex items-center">
      <img v-if="platformIcon" :src="platformIcon" :alt="platformName" class="mr-3 h-10 w-10 rounded-full  p-2 ">
      <div class="flex-1">
        <div class="font-semibold tracking-wide text-gray-700">{{ platformName }}</div>
        <div class="text-sm text-gray-500">{{ updateTime }}</div>
      </div>
      <div class="h-6 w-6 cursor-pointer text-gray-500 transition-transform duration-300 hover:text-[var(--card-color)] " @click="handleRefresh">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <div class="bg-base-100 h-[calc(50vh-5rem)]  overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-track]:bg-black/5 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-[var(--card-color)]    dark:[&::-webkit-scrollbar]:w-1.5 dark:[&::-webkit-scrollbar-track]:rounded dark:[&::-webkit-scrollbar-track]:bg-black/5 dark:[&::-webkit-scrollbar-thumb]:rounded dark:[&::-webkit-scrollbar-thumb]:bg-[var(--card-color)]">
      <a v-for="(item, index) in items" :key="item.id" :href="item.url" target="_blank" class="group mb-2 flex items-center rounded-lg bg-white/60 dark:bg-base-200/20 p-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-[rgba(var(--card-color-rgb),0.1)] hover:to-white/90 dark:hover:to-gray-800/30">
        <div class="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--card-color)] text-sm font-medium text-white">
          {{ index + 1 }}
        </div>
        <div class="flex min-w-0 items-center space-x-1 ">
          <div class="flex-1 break-words text-gray-700">{{ item.title }}</div>
          <img v-if="item.extra?.icon" :src="item.extra.icon" :alt="item.title"  class=" h-4 flex-shrink-0 rounded object-contain">
          <div v-else-if="item.tag" class="h-4 flex-shrink-0 rounded flex items-center px-1 text-white text-xs" :style="{ backgroundColor: item.tagColor }">
            {{ item.tag }}
          </div>
        </div>
      </a>
      <!-- 空状态 -->
      <div v-if="!items.length" class="py-8 text-center text-gray-500">
        暂无热搜数据
      </div>
    </div>
  </div>
</template>