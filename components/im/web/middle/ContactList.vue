<script setup lang="ts">
import GroupList from './GroupList.vue'
import FriendList from './FriendList.vue'
import { useImStore } from '~/stores/ImStore'
import {computed} from "vue";

const imStore = useImStore()
const activeNav = computed(() => imStore.activeNav)

const emit = defineEmits<{
  'select-chat': [value: any]
}>()


// 选择聊天
const handleSelectChat = (chat: any) => {
  emit('select-chat', chat)
}
</script>

<template>
  <div v-if="activeNav === 'contacts'" class="space-y-4">
    <div class="text-lg text-text-base mb-4">通讯录</div>
    <!-- 群聊列表组件 -->
    <GroupList @select-chat="handleSelectChat" />
    <!-- 好友列表组件 -->
    <FriendList @select-chat="handleSelectChat" />
  </div>
</template>