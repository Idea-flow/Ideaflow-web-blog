<script setup lang="ts">

import recentChatList from "~/components/im/web/middle/RecentChatList.vue";
import {computed} from "vue";
import {useImStore} from "~/stores/ImStore";
const imStore = useImStore()

const recentChats = computed(() => imStore.recentChatList)

// 选择聊天
// 当前选中的聊天
const selectedChat = ref<any>(null)

const selectChat = (chat: any) => {
  selectedChat.value = chat
  imStore.setCurrentChat(chat)
}

</script>

<template>
  <div class="w-[25%] p-4 bg-white/10    dark:bg-gray-800/20 h-full overflow-y-auto">
    <!-- 聊天列表 -->
    <recentChatList :chats="recentChats" :current-chat="selectedChat" @select-chat="selectChat" />

  </div>

  <ImWebRightChatArea />
</template>

<style scoped>

</style>