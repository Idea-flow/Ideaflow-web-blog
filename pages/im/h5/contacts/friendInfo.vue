<script setup lang="ts">
import { computed, ref } from 'vue'
import { findFriendByFriendId, modifyFriend } from "~/remote/im/ImChatUserFriend";
import MyMessage from "~/components/Base/Message/MyMessage";

const imStore = useImStore()
const currentChat = computed(() => imStore.currentChat)
const friendInfo = ref(null)

async function updateFriendInfo() {
  // console.log("res:into--")
  // console.log("currentChat.value?.type",currentChat.value?.type)
  if (currentChat.value?.type === 'privateInfo') {
    const { data: res } = await findFriendByFriendId(currentChat.value.id)
    // console.log("res:",res.value.data)
    friendInfo.value = res.value.data
  }
}

watch(currentChat, updateFriendInfo, { immediate: true })

// 编辑状态和临时昵称
const isEditing = ref(false)
const tempNickName = ref('')

// 开始编辑
const startEdit = () => {
  tempNickName.value = friendInfo.value?.friendNickName || ''
  isEditing.value = true
}

// 处理昵称更新
const handleNickNameUpdate = async () => {
  if (!tempNickName.value.trim()) {
    return
  }
  try {
    const { data: modifyFriendRes } = await modifyFriend({
      friendId: friendInfo.value?.id,
      nickName: tempNickName.value.trim()
    })
    if (modifyFriendRes.value?.code === 0) {
      friendInfo.value.friendNickName = tempNickName.value.trim()
      MyMessage({
        message: '昵称更新成功',
        type: 'success',
        duration: 2000
      })
    } else {
      MyMessage({
        message: modifyFriendRes.value?.msg || '更新失败',
        type: 'error',
        duration: 2000
      })
    }
  } catch (error) {
    MyMessage({
      message: '更新失败，请稍后重试',
      type: 'error',
      duration: 2000
    })
  } finally {
    isEditing.value = false
  }
}

const genderIcon = computed(() => {
  switch (friendInfo.value?.gender) {
    case 1: return '女'
    case 2: return '男️'
    default: return '薛定谔的猫'
  }
})

const statusColor = computed(() => {
  const baseClasses = 'px-2 py-0.5 rounded text-sm'
  if (friendInfo.value?.friendStatus === 2) {
    return `${baseClasses} bg-red-500/30 text-red-700 dark:text-red-300`
  }
  return `${baseClasses} bg-green-500/30 text-green-700 dark:text-green-300`
})

const handleSendMessage = () => {
  const chat = {
    id: friendInfo.value?.id,
    type: 'private',
    name: friendInfo.value?.username,
    avatar: friendInfo.value?.avatar
  }
  imStore.setCurrentChat(chat)
  navigateTo(`/im/h5/chatP`)
}
</script>

<template>
  <div class="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
    <!-- 顶部导航栏 -->
    <div class="sticky top-0 z-10 px-4 py-3 bg-white dark:bg-gray-800 shadow-sm">
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-medium">好友信息</h1>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="flex-1 p-4 overflow-y-auto">
      <div class="space-y-6">
        <!-- 头像区域 -->
        <div class="flex justify-center">
          <div class="w-24 h-24 rounded-full overflow-hidden relative">
            <img 
              v-if="friendInfo?.avatar" 
              :src="friendInfo.avatar" 
              alt="avatar" 
              class="w-full h-full object-cover"
            >
            <div 
              v-else 
              class="w-full h-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white text-3xl font-medium"
            >
              {{ friendInfo?.name?.charAt(0) }}
            </div>
          </div>
        </div>

        <!-- 昵称编辑区域 -->
        <div class="text-center space-y-1">
          <div class="flex items-center justify-center gap-2">
            <template v-if="isEditing">
              <input
                v-model="tempNickName"
                type="text"
                class="w-48 bg-transparent border-b border-gray-300 dark:border-gray-600 px-2 py-1 text-center focus:outline-none focus:border-blue-500"
                @keyup.enter="handleNickNameUpdate"
                @blur="isEditing = false"
                ref="nickNameInput"
              >
            </template>
            <template v-else>
              <span class="text-xl font-medium">{{ friendInfo?.friendNickName }}</span>
              <button
                @click="startEdit"
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </template>
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">用户名：{{ friendInfo?.username }}</div>
        </div>

        <!-- 信息列表 -->
        <div class="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">性别</span>
            <span class="text-gray-800 dark:text-gray-100">{{ genderIcon }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">个性签名</span>
            <span class="text-gray-800 dark:text-gray-100">{{ friendInfo?.introduction || '这个人很懒，什么都没写' }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">在线状态</span>
            <span :class="statusColor">{{ friendInfo?.onlineStatus ? '在线' : '离线' }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">好友状态</span>
            <span :class="statusColor">{{ friendInfo?.friendStatus === 1 ? '正常' : '已拉黑' }}</span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="px-4">
          <button 
            @click="handleSendMessage" 
            class="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700 transition-colors"
          >
            发送消息
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>