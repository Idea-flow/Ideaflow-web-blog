<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside, onKeyStroke } from '@vueuse/core'

const props = defineProps<{
  isOpen: boolean
  currentChat: any
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

// 抽屉容器引用
const drawerRef = ref<HTMLElement | null>(null)

import { findGroupMembers } from '~/remote/im/ImChatGroup'

// 群成员数据
const members = ref([])

// 获取群成员数据
const fetchGroupMembers = async () => {
  try {
    const { data: response }  = await findGroupMembers(props.currentChat.id)
    if (response.value.code === 0 && response.value.data) {
      members.value = response.value.data
      // console.log("JSON.stringify(members.value)",JSON.stringify(members.value))
    }
  } catch (error) {
    console.error('获取群成员失败:', error)
  }
}

// 监听抽屉打开状态
watch(() => props.isOpen, (newValue) => {
  // console.log("监听props.isOpen:状态改变",newValue)
  if (newValue && props.currentChat?.id) {
    // console.log("fetchGroupMembers发起调用--")
    fetchGroupMembers()
  }
});

// 点击外部关闭
onClickOutside(drawerRef, () => {
  emit('update:isOpen', false)
})

// ESC键关闭
onKeyStroke('Escape', () => {
  emit('update:isOpen', false)
})

// 角色标签样式
const getRoleStyle = (role: string) => {
  // console.log("role:", role)
  switch (role) {
    case 1:
      return 'bg-yellow-500/20 text-yellow-500'
    // case 'admin':
    //   return 'bg-blue-500/20 text-blue-500'
    default:
      return 'bg-gray-500/20 text-gray-500'
  }
}

// 角色显示文本
const getRoleText = (role: string) => {
  switch (role) {
    case 1:
      return '群主'
    // case 'admin':
    //   return '管理员'
    default:
      return '成员'
  }
}

const appStore = useAppStore()
const drawerWidth = computed(() => appStore.mobile ? 'w-[70%]' : 'w-[20%]')
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-300 transform-gpu will-change-transform"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition ease-in duration-200 transform-gpu will-change-transform"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="isOpen"
      ref="drawerRef"
      :class="[drawerWidth, 'fixed right-0 top-0 h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl border-l border-white/20 dark:border-gray-700/30 z-50 transform-gpu will-change-transform']"
    >
      <!-- 抽屉头部 -->
      <div class="p-4 border-b border-white/20 dark:border-gray-700/30 flex items-center justify-between">
        <h3 class="text-lg font-semibold">群成员 ({{ members.length }})</h3>
        <button
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-full transition-colors"
          @click="emit('update:isOpen', false)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- 成员列表 -->
      <div class="p-4 space-y-4 overflow-y-auto h-[calc(100%-4rem)]">
        <div
          v-for="member in members"
          :key="member.userId"
          class="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <img
            :src="member.headImage"
            :alt="member.userName"
            class="w-10 h-10 rounded-full object-cover"
          >
          <div class="flex-1">
            <div class="font-medium">{{ member.userName }}</div>
          </div>
          <span
            :class="[getRoleStyle(member.adminFlag), 'px-2 py-1 rounded-full text-xs']"
          >{{ getRoleText(member.adminFlag) }}</span>
        </div>
      </div>
    </div>
  </Transition>
</template>