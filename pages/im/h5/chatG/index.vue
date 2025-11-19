<script setup lang="ts">
import {computed, ref} from 'vue'
import {imChatGroupMessageSend, imChatUserGroupMessageListGroupMessage} from "~/remote/im/ImChatGroupMessage";
import ChatInput from '~/components/im/web/right/ChatInput.vue'
import MessageDisplay from '~/components/im/web/right/MessageDisplay.vue'
import GroupMembersDrawer from '~/components/im/web/right/group/GroupMembersDrawer.vue'

// 控制群成员抽屉的显示状态
const isDrawerOpen = ref(false)

// 获取ImStore实例
const imStore = useImStore()
const appStore = useAppStore()
const userInfo = computed(() => appStore.userInfo)
const imGroupMessages = computed(() => imStore.imGroupMessages)
const currentChat = computed(() => imStore.currentChat)

const currentUserId = ref(userInfo.value.id)
// 消息列表
const messages = computed(() => imGroupMessages.value[currentChat.value?.id] || [])

// 获取聊天记录
const loadMessages = async () => {
  if (!currentChat.value) return
  
  // 检查是否已有缓存的消息
  if (imGroupMessages.value[currentChat.value.id]) {
    return
  }
  try {
    const { data: listGroupMessageRes } = await imChatUserGroupMessageListGroupMessage({
      groupId: currentChat.value.id,
      pageNo: 1,
      pageSize: 40
    })
    
    if (listGroupMessageRes.value?.code === 0 && listGroupMessageRes.value?.data.list) {
      const messageList = listGroupMessageRes.value?.data.list.map(msg => ({
        id: msg.id,
        content: msg.content,
        type: msg.type,
        status: msg.status,
        sendId: msg.sendId,
        groupId: msg.groupId,
        sendTime: msg.sendTime,
        avatar: msg.avatar || '',
        username: msg.username || '未知用户',
        isSelf: msg.sendId == currentUserId.value
      }))
      
      // 更新消息缓存
      imStore.updateGroupMessages(currentChat.value.id, messageList)
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
    const { data: sendMessageRes } = await imChatGroupMessageSend({
      groupId: currentChat.value.id,
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
      const currentMessages = imGroupMessages.value[currentChat.value.id] || []
      imStore.updateGroupMessages(currentChat.value.id, [...currentMessages, newMessage])
      
      // 更新最近聊天列表
      imStore.updateGroupRecentChatList(currentChat.value.id, sendMessageRes.value.data.createTime, sendMessageRes.value.data.sendNickName+": "+sendMessageRes.value.data.content,sendMessageRes.value.data.type)
    }
  } catch (error) {
    console.error('发送消息失败:', error)
  }
}
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-100 dark:bg-gray-800/10">
    <!-- 聊天头部 - 移动端优化高度和样式 -->
    <div class="h-14 px-4 border-b border-gray-200 dark:border-gray-700/30 flex items-center justify-between bg-white dark:bg-gray-800/20 fixed top-0 left-0 right-0 z-10">
      <div class="flex items-center space-x-4">
        <button @click="navigateTo('/im/h5')" class="p-1.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512" class="text-gray-600 dark:text-gray-300">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/>
          </svg>
        </button>
        {{ currentChat?.name  }}
        <span v-if="currentChat?.memberCount" class="text-sm text-gray-500 dark:text-gray-400 ml-1">({{ currentChat.memberCount }})</span>

      </div>

      <button @click="isDrawerOpen = true" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <!-- 聊天内容区域 - 适配移动端滚动和间距 -->
<!--    <div class="flex-1 overflow-y-auto pt-14 pb-16">-->
<!--     -->
<!--    </div>-->
    <MessageDisplay :messages="messages" :currentChat="currentChat" />
    <ChatInput @send="handleSend" />
    
<!--    &lt;!&ndash; 聊天输入框组件 - 固定在底部 &ndash;&gt;-->
<!--    <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800/20 border-t border-gray-200 dark:border-gray-700/30">-->
<!--  -->
<!--    </div>-->

    
    <!-- 群成员抽屉 - 移动端全屏显示 -->
    <GroupMembersDrawer
      v-model:isOpen="isDrawerOpen"
      :currentChat="currentChat"
    />
  </div>
</template>

<style scoped>
/* 移动端滚动优化 */
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

/* 禁用双击缩放 */
.h-screen {
  touch-action: manipulation;
}
</style>