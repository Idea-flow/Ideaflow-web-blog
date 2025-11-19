<script setup lang="ts">
import {computed, ref} from 'vue'
import {imChatGroupMessageSend, imChatUserGroupMessageListGroupMessage} from "~/remote/im/ImChatGroupMessage";
import ChatInput from './ChatInput.vue'
import MessageDisplay from './MessageDisplay.vue'
import GroupMembersDrawer from './group/GroupMembersDrawer.vue'

// 控制群成员抽屉的显示状态
const isDrawerOpen = ref(false)

const props = defineProps<{
  currentChat: any
}>()



// 获取ImStore实例
const imStore = useImStore()
const appStore = useAppStore()
const userInfo = computed(() => appStore.userInfo)
const imGroupMessages = computed(() => imStore.imGroupMessages)

const currentUserId = ref(userInfo.value.id)
// 消息列表
const messages = computed(() => imGroupMessages.value[props.currentChat?.id] || [])

// 获取聊天记录
const loadMessages = async () => {
  if (!props.currentChat) return
  
  // 检查是否已有缓存的消息
  if (imGroupMessages.value[props.currentChat.id]) {
    return
  }
  // console.log("获取群聊聊天记录,调用后端方法:")
  try {
    const { data: listGroupMessageRes } = await imChatUserGroupMessageListGroupMessage({
      groupId: props.currentChat.id,
      pageNo: 1,
      pageSize: 40
    })
    
    if (listGroupMessageRes.value?.code === 0 && listGroupMessageRes.value?.data.list) {
      const messageList = listGroupMessageRes.value?.data.list.map(msg => ({
        id: msg.id,
        content: msg.content,
        type: msg.type, // 内容类型
        status: msg.status,
        sendId: msg.sendId,
        groupId: msg.groupId,
        sendTime: msg.sendTime,
        avatar: msg.avatar || '',
        username: msg.username || '未知用户',
        isSelf: msg.sendId == currentUserId.value
      }))
      
      // 更新消息缓存
      imStore.updateGroupMessages(props.currentChat.id, messageList)
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
  try {
    const { data: sendMessageRes } = await imChatGroupMessageSend({
      groupId: props.currentChat.id,
      content: content,
      type: type,
      sendAvatar: userInfo.value.avatar,
      sendUserName: userInfo.value.username
    })
    
    if (sendMessageRes.value?.code === 0 && sendMessageRes.value?.data) {
      // 构建消息对象
      const newMessage = {
        id: sendMessageRes.value.data.id,
        content: sendMessageRes.value.data.content,
        type: sendMessageRes.value.data.type,
        status: sendMessageRes.value.data.status,
        sendId: sendMessageRes.value.data.sendId,
        groupId: sendMessageRes.value.data.groupId,
        sendTime: sendMessageRes.value.data.createTime,
        avatar: sendMessageRes.value.data.sendAvatar || '',
        username: sendMessageRes.value.data.sendNickName,
        isSelf: sendMessageRes.value.data.sendId == currentUserId.value
      }
      
      // 更新imStore中的消息缓存
      const currentMessages = imGroupMessages.value[props.currentChat.id] || []
      imStore.updateGroupMessages(props.currentChat.id, [...currentMessages, newMessage])
      
      // 更新最近聊天列表
      imStore.updateGroupRecentChatList(props.currentChat.id, sendMessageRes.value.data.createTime, sendMessageRes.value.data.sendNickName+": "+sendMessageRes.value.data.content,sendMessageRes.value.data.type)
    }
  } catch (error) {
    console.error('发送消息失败:', error)
  }
}
</script>

<template>
  <div class="flex-1 flex flex-col  ">
    <!-- 聊天头部 -->
    <div class="h-[5%] p-4 border-b border-white/20 dark:border-gray-700/30 flex items-center justify-between bg-white/20 dark:bg-gray-800/20">
      <div class="flex items-center space-x-3 text-text-base">
        <div class="font-semibold">
          {{ currentChat?.name || '选择一个群聊' }}
          <span v-if="currentChat?.memberCount" class="text-sm text-gray-500 dark:text-gray-400 ml-2">({{ currentChat.memberCount }}人)</span>
        </div>
      </div>

      <!--  -->
      <button  @click="isDrawerOpen = true"  class="hover:bg-white/10 dark:hover:bg-gray-700/30 rounded-lg p-2 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <!-- 聊天内容区域 -->
    <MessageDisplay :messages="messages" :currentChat="currentChat" />
    
    <!-- 聊天输入框组件 -->
    <ChatInput @send="handleSend" />
    
    <!-- 群成员抽屉 -->
    <GroupMembersDrawer
      v-model:isOpen="isDrawerOpen"
      :currentChat="currentChat"
    />
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