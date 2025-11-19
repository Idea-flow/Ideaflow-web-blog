<script setup lang="ts">
import {computed, ref} from 'vue'
import {findFriendByFriendId} from "~/remote/im/ImChatUserFriend";
import {findGroupByGroupId} from "~/remote/im/ImChatGroup";

const imStore = useImStore()
const currentChat = computed(() => imStore.currentChat)
const groupInfo = ref(null)

async function updateFriendInfo() {
  if (currentChat.value?.type === 'groupInfo') {
    const { data: res } = await findGroupByGroupId(currentChat.value.id)
    groupInfo.value = res.value.data
  }
}

watch(currentChat, updateFriendInfo, { immediate: true })


const handleSendMessage = () => {
  const chat = {
    id: groupInfo.value?.id,
    type: 'group',
    name: groupInfo.value?.name,
    avatar: groupInfo.value?.headImage
  }
  imStore.setCurrentChat(chat)
  imStore.setActiveNav('chat')
  navigateTo('/im/web/chat')
}
</script>

<template>
  <div class="flex-1 flex flex-col dark:bg-gray-800/10 text-text-base">
    <div class="h-[5%] p-4 border-b border-white/20 dark:border-gray-700/30 flex items-center justify-between bg-white/20 dark:bg-gray-800/20">
      <div class="flex items-center space-x-3">
        <div class="font-semibold text-text-base">{{ groupInfo?.name || '群组信息' }}</div>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto p-6">
      <div class="max-w-4xl mx-auto flex space-x-8">
        <!-- 左侧群头像 -->
        <div class="flex-shrink-0">
          <div class="w-40 h-40 rounded-lg overflow-hidden shadow-lg">
            <img v-if="groupInfo?.headImage" :src="groupInfo.headImage" alt="avatar" class="w-full h-full object-cover">
            <div v-else class="w-full h-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white text-4xl font-medium">
              {{ groupInfo?.name?.charAt(0) }}
            </div>
          </div>

          <button @click="handleSendMessage" class="mt-4 px-6 py-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 text-gray-800 dark:text-white rounded-lg shadow-lg hover:bg-white/20 dark:hover:bg-gray-700/30 transition-all duration-300 hover:shadow-xl hover:scale-105">发送消息</button>
        </div>

        <!-- 右侧信息区域 -->
        <div class="flex-1 space-y-6">
          <!-- 群组基本信息 -->
          <div class="pb-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold mb-2 text-text-base" >{{ groupInfo?.name }}</h2>
            <div class="text-base text-gray-600 dark:text-gray-400">成员数量：{{ groupInfo?.memberCount || 0 }}人</div>
          </div>

          <!-- 群主信息 -->
          <div v-if="groupInfo?.groupOwnerInfo" class="pb-6">
            <h3 class="text-lg font-semibold mb-4">群主信息</h3>
            <div class="flex items-center space-x-4  p-4 rounded-lg">
              <div class="w-12 h-12 rounded-full overflow-hidden shadow">
                <img v-if="groupInfo.groupOwnerInfo.ownerUserAvatar" :src="groupInfo.groupOwnerInfo.ownerUserAvatar" alt="owner avatar" class="w-full h-full object-cover">
                <div v-else class="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white text-lg font-medium">
                  {{ groupInfo.groupOwnerInfo.ownerUserName?.charAt(0) }}
                </div>
              </div>
              <div>
                <div class="font-medium">{{ groupInfo.groupOwnerInfo.ownerUserName }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">群主</div>
              </div>
            </div>
          </div>

          <!-- 群公告 -->
          <div>
            <h3 class="text-lg font-semibold mb-4">群公告</h3>
            <div class=" p-4 rounded-lg text-gray-900 dark:text-gray-400 whitespace-pre-wrap">
              {{ groupInfo?.notice || '暂无群公告' }}
            </div>
          </div>
        </div>
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