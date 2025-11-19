<script setup lang="ts">
// 选择聊天
// 当前选中的聊天
import {useImStore} from "~/stores/ImStore";
const imStore = useImStore()
const selectedChat = ref<any>(null)

const selectChat = (chat: any) => {
  selectedChat.value = chat
  imStore.setCurrentChat(chat)
}
</script>

<template>
  <div class="w-[25%] p-4 bg-white/10    dark:bg-gray-800/20 h-full overflow-y-auto">
    <ImWebMiddleContactList  @select-chat="selectChat" />
  </div>

  <ImWebRightChatArea />

</template>

<style scoped>

</style>