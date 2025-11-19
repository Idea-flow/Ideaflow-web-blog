<script setup lang="ts">
import { ref, computed } from 'vue'
import {getTag} from "~/remote/tag";
import {findChatList, getAllContactInfo} from "~/remote/imChat";

import RecentChatList from "~/components/im/web/middle/RecentChatList.vue";
import { useImStore } from '~/stores/ImStore'



const emit = defineEmits<{
  'select-chat': [value: any]
}>()

// 控制群聊和联系人列表的展开状态
const isGroupListExpanded = ref(false)
const isContactListExpanded = ref(false)

// 模拟群聊数据
const groupList = computed(() => [
  {
    id: 'group1',
    type: 'group',
    name: '技术研发群',
    avatar: '/logo.webp',
  },
  ...imStore.groupList
])

// 模拟好友数据
const contactList = computed(() => [
  {
    id: 'friend1',
    type: 'private',
    name: '张工',
    avatar: '/logo.webp',
  },
  ...imStore.friendList
])

// 获取ImStore实例
const imStore = useImStore()

const activeNav = computed(() => imStore.activeNav)
const isContactInfoLoadedComputed = computed(() => imStore.isContactInfoLoaded)

// console.log("JSON.stringify(imStore.hasContactInfo):"+JSON.stringify(imStore.hasContactInfo))
// console.log("JSON.stringify(imStore.hasContactInfo2):"+JSON.stringify(imStore.hasContactInfo2))

// 获取联系人信息
if (!imStore.isContactInfoLoaded) {
  const { data: allContactInfoRes } = await getAllContactInfo()
  // console.log("middleArea-JSON.stringify(allContactInfoRes):"+JSON.stringify(allContactInfoRes))
  const groupInfoList = allContactInfoRes.value?.data?.imContactGroupInfoList || []
  const friendInfoList = allContactInfoRes.value?.data?.imContactFriendInfoList || []

  // console.log("middleArea-imStore.isContactInfoLoaded:"+imStore.isContactInfoLoaded)
  // console.log("middleArea-imStore.isContactInfoLoadedComputed.value:"+isContactInfoLoadedComputed.value)
  // console.log("middleArea-imSsrStore.isContactInfoLoaded:"+imSsrStore.isContactInfoLoaded)
  imStore.setContactInfo(groupInfoList, friendInfoList)

}

// 更新本地列表
// 删除以下两行
// groupList.value = [...groupList.value, ...imStore.groupList]
// contactList.value = [...contactList.value, ...imStore.friendList]

const groupCount = computed(() => groupList.value.length)
const contactCount = computed(() => contactList.value.length)

// 最近聊天列表
// 获取聊天列表
if (!imStore.isChatListLoaded) {
  const { data: AppChatListRep } = await findChatList()
  // console.log("JSON.stringify(AppChatListRep.value):"+JSON.stringify(AppChatListRep.value))
  const chatList = AppChatListRep.value?.data || []
  imStore.setChatList(chatList)
}

const recentChats = computed(() => imStore.recentChatList)








// 选择聊天
// 当前选中的聊天
const selectedChat = ref<any>(null)

const selectChat = (chat: any) => {
  selectedChat.value = chat
  emit('select-chat', chat)
}
</script>

<template>
  <div class="w-[25%] p-4 bg-white/10    dark:bg-gray-800/20 h-full overflow-y-auto">
    <!-- 聊天列表 -->
    <div v-if="activeNav === 'chat'">
      <RecentChatList :chats="recentChats" :current-chat="selectedChat" @select-chat="selectChat" />
    </div>
    <div v-if="activeNav === 'contacts'">
      <ImWebMiddleContactList  @select-chat="selectChat" />
    </div>
    <!-- 通讯录 -->

  </div>
</template>