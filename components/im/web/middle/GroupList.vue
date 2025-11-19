<script setup lang="ts">
import { ref, computed } from 'vue'
import { useImStore } from '~/stores/ImStore'

const emit = defineEmits<{
  'select-chat': [value: any]
}>()

// 获取ImStore实例
const imStore = useImStore()



// 群聊列表数据
const groupList = computed(() => [
  // {
  //   id: 'group1',
  //   type: 'group',
  //   name: '技术研发群',
  //   avatar: '/logo.webp',
  // },
  ...imStore.groupList
])

// 群聊数量
const groupCount = computed(() => groupList.value.length)

// 控制群聊列表的展开状态
const isGroupListExpanded = ref(groupCount.value <= 5)

// 选择群聊
const selectChat = (group: any) => {
  emit('select-chat', group)
  imStore.setCurrentChat(group)
}
</script>

<template>
  <div class="mb-6">
    <div class="flex items-center justify-between mb-2 cursor-pointer" 
         @click="isGroupListExpanded = !isGroupListExpanded">
      <div class="text-md font-medium text-text-base ">群聊</div>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ groupCount }}个</span>
        <svg xmlns="http://www.w3.org/2000/svg" 
             class="h-4 w-4 transition-transform" 
             :class="isGroupListExpanded ? 'rotate-180' : ''" 
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    <div v-show="isGroupListExpanded" class="space-y-2 transition-all duration-300">
      <div v-for="group in groupList" :key="group.id" 
           class="p-4 rounded-lg hover:bg-white/20 dark:hover:bg-gray-700/30 cursor-pointer transition-colors"
           @click="selectChat(group)">
        <div class="flex items-center space-x-3">
          <div v-if="group.avatar" class="w-12 h-12 rounded-full overflow-hidden">
            <img :src="group.avatar" :alt="group.name" class="w-full h-full object-cover">
          </div>
          <div v-else class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-lg font-medium">
            {{ group.name.charAt(0) }}
          </div>
          <div class="flex-1">
            <div class="font-medium flex items-center text-text-base">
              <span>{{ group.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>