<script setup lang="ts">

// console.log("测试页面是否只在客户端渲染")
import {computed, ref} from 'vue'
import {imChatPrivateMessageSend, listFriendMessage} from "~/remote/im/ImChatUserMessage";
import ChatInput from '~/components/im/web/right/ChatInput.vue'
import MessageDisplay from '~/components/im/web/right/MessageDisplay.vue'

// 获取ImStore实例
const imStore = useImStore()
const appStore = useAppStore()

const userInfo = computed(() => appStore.userInfo)
const imPrivateMessages = computed(() => imStore.imPrivateMessages)
const currentChat = computed(() => imStore.currentChat)

const currentUserId = ref(userInfo.value.id)
// 消息列表
const messages = computed(() => imPrivateMessages.value[currentChat.value?.id] || [])

// 获取聊天记录
const loadMessages = async () => {
  if (!currentChat.value) return

  // 检查是否已有缓存的消息
  if (imPrivateMessages.value[currentChat.value.id]) {
    // console.log("已经存在当前消息列表的内容,不再从后端获取currentChat.value.id:",currentChat.value.id)
    return
  }
  try {
    const { data: listFriendMessageRes } = await listFriendMessage({
      toId: currentChat.value.id,
      pageNo: 1,
      pageSize: 40
    })
    if (listFriendMessageRes.value?.code === 0 && listFriendMessageRes.value?.data.list) {
      const messageList = listFriendMessageRes.value?.data.list.map(msg => ({
        id: msg.id,
        content: msg.content,
        type: msg.type,
        status: msg.status,
        sendId: msg.sendId,
        recvId: msg.recvId,
        sendTime: msg.sendTime,
        avatar: msg.avatar || '',
        isSelf: msg.sendId == currentUserId.value
      }))

      // 更新消息缓存
      imStore.updatePrivateMessages(currentChat.value.id, messageList)
    }
  } catch (error) {
    console.error('获取消息失败:', error)
  }
}

// 监听当前聊天变化
watch(() => currentChat.value, () => {
  loadMessages()
}, { immediate: true })

// 处理消息发送
const handleSend = async (content: string, type: number) => {
  try {
    // console.log("h5-发送私聊消息-:",content)
    const { data: sendMessageRes } = await imChatPrivateMessageSend({
      recvId: currentChat.value.id,
      content: content,
      type: type,
      sendAvatar: userInfo.value.avatar,
    })
    if (sendMessageRes.value?.code === 0 && sendMessageRes.value?.data) {
      // 构建消息对象
      const newMessage = {
        id: sendMessageRes.value.data.id,
        content: sendMessageRes.value.data.content,
        type: sendMessageRes.value.data.type,
        status: sendMessageRes.value.data.status,
        sendId: sendMessageRes.value.data.sendId,
        recvId: sendMessageRes.value.data.recvId,
        sendTime: sendMessageRes.value.data.sendTime,
        avatar: sendMessageRes.value.data.sendAvatar || '',
        isSelf: sendMessageRes.value.data.sendId == currentUserId.value
      }

      // 更新imStore中的消息缓存
      const currentMessages = imPrivateMessages.value[currentChat.value.id] || []
      imStore.updatePrivateMessages(currentChat.value.id, [...currentMessages, newMessage])

      // 更新最近聊天列表
      imStore.updatePrivateRecentChatList(currentChat.value.id,sendMessageRes.value.data.sendTime,sendMessageRes.value.data.content,sendMessageRes.value.data.type)
    }
  } catch (error) {
    console.error('发送消息失败:', error)
  }
}
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-100 dark:bg-gray-800/10">
    <!-- 聊天头部 -->
    <div class="h-12 px-4 border-b border-gray-200/10 dark:border-gray-700/30 flex items-center justify-between backdrop-blur-md bg-white/70 dark:bg-gray-800/70 fixed top-0 left-0 right-0 z-10 shadow-sm">
      <div class="flex items-center space-x-4">
        <button @click="navigateTo('/im/h5')" class="p-1.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512" class="text-gray-600 dark:text-gray-300">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/>
          </svg>
        </button>
        <span class="text-gray-800 dark:text-gray-200">{{ currentChat?.name }}</span>
      </div>
    </div>

    <!-- 聊天内容区域 -->
    <!-- 聊天内容区域 -->
    <MessageDisplay :messages="messages" :currentChat="currentChat" />

    <!-- 聊天输入框组件 -->
    <ChatInput @send="handleSend" />
  </div>
</template>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}
</style>