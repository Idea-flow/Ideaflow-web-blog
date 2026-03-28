<script setup lang="ts">
import GroupList from '~/components/im/web/middle/GroupList.vue'
import FriendList from '~/components/im/web/middle/FriendList.vue'
import { useImStore } from '~/stores/ImStore'
import { computed } from 'vue'

const imStore = useImStore()
const activeNav = computed(() => imStore.activeNav)

// 选择聊天
const handleSelectChat = (chat: any) => {
  // 在移动端，选择聊天后可能需要跳转到聊天页面
  // TODO: 实现跳转逻辑
  // console.log('选择聊天:', chat)
  // console.log('选择聊天:chat.value?.type', chat.type)
  imStore.setCurrentChat(chat)
  if (chat.type === 'groupInfo') {
    navigateTo(`/im/h5/contacts/groupInfo`)
  }else {
    navigateTo(`/im/h5/contacts/friendInfo`)
  }

}
</script>

<template>
  <div class="h-full ">
    <div class="sticky top-0 z-10 px-4 py-3 ">
      <div class="text-lg font-semibold">通讯录</div>
    </div>

    <div class="px-4 py-2 space-y-4 overflow-y-auto">
      <!-- 群聊列表组件 -->
      <GroupList @select-chat="handleSelectChat" />
      <!-- 好友列表组件 -->
      <FriendList @select-chat="handleSelectChat" />
    </div>
  </div>
</template>

<style scoped>
/* 移动端触摸反馈样式 */
.active-feedback:active {
  background-color: rgba(0, 0, 0, 0.1);
}

/* 暗色模式下的触摸反馈 */
.dark .active-feedback:active {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>