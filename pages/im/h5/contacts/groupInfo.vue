<script setup lang="ts">
import {computed, ref} from 'vue'
import {findGroupByGroupId} from "~/remote/im/ImChatGroup";

const imStore = useImStore()
const currentChat = computed(() => imStore.currentChat)
const groupInfo = ref(null)

async function updateGroupInfo() {
  // console.log("updateGroupInfo:into--")
  // console.log("currentChat.value?.type",currentChat.value?.type)
  if (currentChat.value?.type === 'groupInfo') {
    const { data: res } = await findGroupByGroupId(currentChat.value.id)
    groupInfo.value = res.value.data
  }
}

watch(currentChat, updateGroupInfo, { immediate: true })

const handleSendMessage = () => {
  const chat = {
    id: groupInfo.value?.id,
    type: 'group',
    name: groupInfo.value?.name,
    avatar: groupInfo.value?.headImage
  }
  imStore.setCurrentChat(chat) //有风险,这个时候返回页面就不能用了
  navigateTo(`/im/h5/chatG`)
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- 顶部信息区域 -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ groupInfo?.name || '群组信息' }}</div>
    </div>

    <!-- 主要内容区域 -->
    <div class="p-4 space-y-6">
      <!-- 群头像和基本信息 -->
      <div class="flex flex-col items-center">
        <div class="w-24 h-24 rounded-lg overflow-hidden shadow-lg mb-4">
          <img v-if="groupInfo?.headImage" :src="groupInfo.headImage" alt="群头像" class="w-full h-full object-cover">
          <div v-else class="w-full h-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white text-3xl font-medium">
            {{ groupInfo?.name?.charAt(0) }}
          </div>
        </div>
      </div>

      <!-- 群组基本信息 -->
      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">群组名称</div>
        <div class="text-base text-gray-900 dark:text-white mb-4">{{ groupInfo?.name }}</div>
        
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">成员数量</div>
        <div class="text-base text-gray-900 dark:text-white">{{ groupInfo?.memberCount || 0 }}人</div>
      </div>

      <!-- 群主信息 -->
      <div v-if="groupInfo?.groupOwnerInfo" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-3">群主</div>
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full overflow-hidden">
            <img v-if="groupInfo.groupOwnerInfo.ownerUserAvatar" :src="groupInfo.groupOwnerInfo.ownerUserAvatar" alt="群主头像" class="w-full h-full object-cover">
            <div v-else class="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white text-lg font-medium">
              {{ groupInfo.groupOwnerInfo.ownerUserName?.charAt(0) }}
            </div>
          </div>
          <div class="flex-1">
            <div class="text-base text-gray-900 dark:text-white">{{ groupInfo.groupOwnerInfo.ownerUserName }}</div>
          </div>
        </div>
      </div>

      <!-- 群公告 -->
      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-3">群公告</div>
        <div class="text-base text-gray-900 dark:text-white whitespace-pre-wrap">
          {{ groupInfo?.notice || '暂无群公告' }}
        </div>
      </div>

      <div class="flex flex-col items-center">
        <button @click="handleSendMessage" class="w-full max-w-xs py-2.5 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200">
          发送消息
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}
</style>