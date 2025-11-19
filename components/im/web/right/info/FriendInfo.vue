<script setup lang="ts">
import { computed, ref } from 'vue'
import {findFriendByFriendId, modifyFriend} from "~/remote/im/ImChatUserFriend";
import MyMessage from "~/components/Base/Message/MyMessage";

// const props = defineProps<{
//   currentChat: any
// }>()

// console.log("frindInfo--:currentChat--",JSON.stringify(props.currentChat))
const imStore = useImStore()

const currentChat = computed(() => imStore.currentChat)

const friendInfo = ref(null)

async function updateFriendInfo() {
  // console.log("updateFriendInfo-执行")
  if (currentChat.value?.type === 'privateInfo') {
    const { data: res } = await findFriendByFriendId(currentChat.value.id)
    friendInfo.value = res.value.data
    // console.log("friendInfo.value-res:",JSON.stringify(res.value))
    // console.log("friendInfo.value:",JSON.stringify(friendInfo.value))
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
      friendInfo.value.friendNickName =tempNickName.value.trim()
      // 重新获取好友信息
      MyMessage({
        message: '昵称更新成功',
        type: 'success',
        duration: 2000
      })
    } else {
      MyMessage({
        message: modifyFriendRes.value?.msg || '更新失败',
        type: 'success',
        duration: 2000
      })
    }
  } catch (error) {
    MyMessage({
      message: '更新失败，请稍后重试',
      type: 'success',
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
  const baseClasses = 'px-2 py-0.5 rounded backdrop-blur-sm transition-all duration-300'
  if (friendInfo.value?.friendStatus === 2) {
    return `${baseClasses} bg-red-500/30 dark:bg-red-500/40 text-red-700 dark:text-red-300 font-medium`
  }
  return `${baseClasses} bg-green-500/30 dark:bg-green-500/40 text-green-700 dark:text-green-300 font-medium`
})


const handleSendMessage = () => {
  const chat = {
    id: friendInfo.value?.id,
    type: 'private',
    name: friendInfo.value?.username,
    avatar: friendInfo.value?.avatar
  }
  imStore.setCurrentChat(chat)
  imStore.setActiveNav('chat')
  navigateTo('/im/web/chat')
}


// 删除好友
</script>

<template>
  <div class="flex-1 flex flex-col dark:bg-gray-800/10 text-text-base">
    <!-- 聊天头部 -->
    <div class="h-[5%] p-4 border-b border-white/20 dark:border-gray-700/30 flex items-center justify-between bg-white/20 dark:bg-gray-800/20">
      <div class="flex items-center space-x-3">
        <div class="font-semibold">
          好友信息 {{currentChat.id}}
        </div>
      </div>
    </div>

    <div class="w-full p-8 max-w-2xl mx-auto">
      <div class="flex flex-col items-center space-y-6">
        <div class="w-32 h-32 rounded-full overflow-hidden relative group">
          <img v-if="friendInfo?.avatar" :src="friendInfo.avatar" alt="avatar" class="w-full h-full object-cover transition-all duration-300 group-hover:scale-110">
          <div v-else class="w-full h-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white text-4xl font-medium">
            {{ friendInfo?.name?.charAt(0) }}
          </div>
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        </div>
        <div class="text-center space-y-2">
          <div class="text-2xl font-semibold flex items-center justify-center gap-2">
            <template v-if="isEditing">
              <input
                v-model="tempNickName"
                type="text"
                class="bg-transparent border-b border-gray-300 dark:border-gray-600 px-2 py-1 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-center"
                @keyup.enter="handleNickNameUpdate"
                @blur="isEditing = false"
                ref="nickNameInput"
              >
            </template>
            <template v-else>
              {{ friendInfo?.friendNickName }}
              <button
                @click="startEdit"
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </template>
          </div>
          <div class="text-lg text-gray-500 dark:text-gray-400">用户名：{{ friendInfo?.username }}</div>
          <div class="text-lg text-gray-500 dark:text-gray-400">性别：{{ genderIcon }} </div>
          <div class="text-lg text-gray-500 dark:text-gray-400">个性签名：{{ friendInfo?.introduction || '该用户还没有签名' }}</div>
          <div class="text-lg text-gray-500 dark:text-gray-400">在线状态：<span :class="statusColor">{{ friendInfo?.onlineStatus ? '在线' : '离线' }}</span></div>
          <div class="text-lg text-gray-500 dark:text-gray-400">好友状态：<span :class="statusColor">{{ friendInfo?.friendStatus === 1 ? '正常' : '已拉黑' }}</span></div>
          <button @click="handleSendMessage" class="mt-4 px-6 py-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 text-gray-800 dark:text-white rounded-lg shadow-lg hover:bg-white/20 dark:hover:bg-gray-700/30 transition-all duration-300 hover:shadow-xl hover:scale-105">发送消息</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>