<script setup lang="ts">
import PrivateChat from './PrivateChat.vue'
import GroupChat from './GroupChat.vue'
import FriendInfo from './info/FriendInfo.vue'
import GroupInfo from './info/GroupInfo.vue'
import {computed, watchEffect} from "vue";

const imStore = useImStore()
const currentChat = computed(() => imStore.currentChat)


</script>

<template>
  <template v-if="currentChat?.type === 'private'">
    <PrivateChat :currentChat="currentChat" />
  </template>
  <template v-else-if="currentChat?.type === 'group'">
    <GroupChat :currentChat="currentChat" />
  </template>
  <template v-else-if="currentChat?.type === 'privateInfo'">
<!--    <FriendInfo :currentChat="currentChat" />-->
    <FriendInfo  />
  </template>
  <template v-else-if="currentChat?.type === 'groupInfo'">
    <GroupInfo :currentChat="currentChat" />
  </template>
  <template v-else>
    <div class="flex-1 flex items-center justify-center text-text-base dark:text-gray-400">
      请选择一个聊天
    </div>
  </template>
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