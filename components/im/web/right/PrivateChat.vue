<script setup lang="ts">
import {computed, ref} from 'vue'
import {imChatPrivateMessageSend, listFriendMessage, type SendMessageRes} from "~/remote/im/ImChatUserMessage";
import ChatInput from './ChatInput.vue'
import MessageDisplay from './MessageDisplay.vue'

const props = defineProps<{
  currentChat: any
}>()
// 获取ImStore实例
const imStore = useImStore()
const appStore = useAppStore()

const userInfo = computed(() => appStore.userInfo)
const imPrivateMessages = computed(() => imStore.imPrivateMessages)

const currentUserId = ref(userInfo.value.id)
// console.log("currentUserId:", currentUserId.value)
// 消息列表
const messages = computed(() => imPrivateMessages.value[props.currentChat?.id] || [])

// 获取聊天记录
const loadMessages = async () => {
  if (!props.currentChat) return
  
  // 检查是否已有缓存的消息
  if (imPrivateMessages.value[props.currentChat.id]) {
    return
  }
  // console.log("调用后端方法:")
  try {
    const { data: listFriendMessageRes } = await listFriendMessage({
      toId: props.currentChat.id,
      pageNo: 1,
      pageSize: 40
    })
    if (listFriendMessageRes.value?.code === 0 && listFriendMessageRes.value?.data.list) {
      const messageList = listFriendMessageRes.value?.data.list.map(msg => ({
        id: msg.id,
        content: msg.content,
        type: msg.type, // 内容类型
        status: msg.status,
        sendId: msg.sendId,
        recvId: msg.recvId,
        sendTime: msg.sendTime,
        avatar: msg.avatar || '',
        isSelf: msg.sendId == currentUserId.value
      }))
      
      // 更新消息缓存
      imStore.updatePrivateMessages(props.currentChat.id, messageList)
    }
  } catch (error) {
    console.error('获取消息失败:', error)
  }
}

// 监听当前聊天变化
watch(() => props.currentChat, () => {
  loadMessages()
}, { immediate: true })

// 处理消息发送
const handleSend = async (content: string, type: number) => {
  // console.log("发送私聊消息:")
  try {
    const { data: sendMessageRes } = await imChatPrivateMessageSend({
      recvId: props.currentChat.id,
      content: content,
      type: type,
      sendAvatar: userInfo.value.avatar,
    })
    // console.log("发送私聊消息:res:",JSON.stringify(sendMessageRes.value))
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
      const currentMessages = imPrivateMessages.value[props.currentChat.id] || []
      imStore.updatePrivateMessages(props.currentChat.id, [...currentMessages, newMessage])
      
      //
      // console.log("更新最近聊天列表:sendMessageRes.value.data.type",sendMessageRes.value.data.type)
      imStore.updatePrivateRecentChatList(props.currentChat.id,sendMessageRes.value.data.sendTime,sendMessageRes.value.data.content,sendMessageRes.value.data.type)
    }
  } catch (error) {
    console.error('发送消息失败:', error)
  }
}
</script>

<template>
  <div class="flex-1 flex flex-col  dark:bg-gray-800/10">
    <!-- 聊天头部 -->
    <div class="h-[5%] p-4 border-b border-white/20 dark:border-gray-700/30 flex items-center justify-between bg-white/20 dark:bg-gray-800/20">
      <div class="flex items-center space-x-3 text-text-base" >
        <div class="font-semibold">
          {{ currentChat?.name || '选择一个聊天' }}
        </div>
      </div>
    </div>
    
    <!-- 聊天内容区域 -->
    <MessageDisplay :messages="messages" :currentChat="currentChat" />
    
    <!-- 聊天输入框组件 -->
    <ChatInput @send="handleSend" />
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