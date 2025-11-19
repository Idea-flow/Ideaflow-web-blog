<script setup lang="ts">
import {useImStore} from "~/stores/ImStore";
import {computed} from "vue";
import {findChatList} from "~/remote/imChat";

const imStore = useImStore()
const groupList = computed(() => imStore.groupList)
const friendList = computed(() => imStore.friendList)





// 获取聊天列表
if (!imStore.isChatListLoaded) {
  const { data: AppChatListRep } = await findChatList()
  // console.log("JSON.stringify(AppChatListRep.value):"+JSON.stringify(AppChatListRep.value))
  const chatList = AppChatListRep.value?.data || []
  imStore.setChatList(chatList)
}

const chats = computed(() => imStore.recentChatList)

// 选择聊天
const selectChat = (chat: any) => {
  imStore.setCurrentChat(chat)
  // 根据聊天类型跳转到对应页面
  if (chat.type === 'private') {
    navigateTo(`/im/h5/chatP`)
  } else if (chat.type === 'group') {
    navigateTo(`/im/h5/chatG`)
  }
}

// 处理名字显示
const formatName = (name: string) => {
  if (name.length > 12) {
    return name.slice(0, 12) + '...'
  }
  return name
}

// 获取身份标识文本
const getIdentificationText = (chat: any) => {
  let identification = null

  if (chat.type === 'private') {
    const friend = friendList.value.find(f => f.id == chat.id)
    identification = friend?.identification
    
    switch (identification) {
      case 1: return '站长'
      case 2: return '练气境'
      case 3: return '筑基境'
      case 4: return '金丹境'
      case 5: return '元婴境'
      default: return ''
    }
  } else if (chat.type === 'group') {
    const group = groupList.value.find(g => g.id == chat.id)
    identification = group?.identification
    
    switch (identification) {
      case 1: return '官方群'
      case 2: return '个人群'
      default: return ''
    }
  }
  return ''
}

// 获取身份标识样式类
const getIdentificationClass = (chat: any) => {
  let identification = null
  
  if (chat.type === 'private') {
    const friend = friendList.value.find(f => f.id == chat.id)
    identification = friend?.identification
  } else if (chat.type === 'group') {
    const group = groupList.value.find(g => g.id == chat.id)
    identification = group?.identification
  }
  
  if (!identification) return ''
  
  const baseClass = 'ml-1 px-1 py-0.5 text-[10px] rounded backdrop-blur-sm'
  
  if (chat.type === 'private') {
    switch (identification) {
      case 1: return `${baseClass} bg-green-100/40 text-green-800 dark:text-green-200`
      case 2: return `${baseClass} bg-purple-500/30 text-purple-700 dark:text-purple-300`
      case 3: return `${baseClass} bg-purple-500/30 text-purple-700 dark:text-purple-300`
      case 4: return `${baseClass} bg-pink-500/30 text-pink-700 dark:text-pink-300`
      case 5: return `${baseClass} bg-red-500/30 text-red-700 dark:text-red-300`
      default: return ''
    }
  } else if (chat.type === 'group') {
    switch (identification) {
      case 1: return `${baseClass} bg-yellow-500/30 text-yellow-700 dark:text-yellow-300`
      case 2: return `${baseClass} bg-purple-500/30 text-purple-700 dark:text-purple-300`
      default: return ''
    }
  }
  return ''
}
</script>

<template>
  <div class="p-0  min-h-screen">
    <div class="px-4 py-3 text-xl font-bold text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800">消息列表</div>

      <div v-for="chat in chats" :key="chat.id"
           @click="selectChat(chat)"
           class="flex items-center px-4 py-3 active:bg-gray-50 dark:active:bg-gray-700 transition-colors duration-150">
        <div class="relative">
          <div v-if="chat.avatar" class="w-13 h-13 rounded-full overflow-hidden">
            <img :src="chat.avatar" :alt="chat.name" class="w-full h-full object-cover">
          </div>
          <div v-else class="w-13 h-13 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-lg ">
            {{ chat.name.charAt(0) }}
          </div>
          <!-- 未读消息提示 -->
          <span v-if="chat.unreadCount" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {{ chat.unreadCount > 99 ? '99+' : chat.unreadCount }}
          </span>
        </div>
        <div class="flex-1 min-w-0 ml-3 border-b bg-gradient-to-r from-transparent to-gray-200/10 dark:to-gray-700/10 pb-3">
          <div class="flex justify-between items-center mb-1">
            <div class="flex items-center space-x-1">
              <span class="font-medium text-gray-900 dark:text-gray-100">
                {{ formatName(chat.name) }}
              </span>
              <span v-if="getIdentificationText(chat)" :class="getIdentificationClass(chat)">
                {{ getIdentificationText(chat) }}
              </span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ chat.time }}</span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 truncate pr-4">{{ chat.lastMessage }}</p>
        </div>
      </div>

  </div>
</template>

<style scoped>
.w-13 {
  width: 3.25rem;
}
.h-13 {
  height: 3.25rem;
}
</style>