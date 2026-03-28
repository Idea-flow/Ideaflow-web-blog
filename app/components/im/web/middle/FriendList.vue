<script setup lang="ts">
import { ref, computed } from 'vue'
import { useImStore } from '~/stores/ImStore'

const emit = defineEmits<{
  'select-chat': [value: any]
}>()

// 获取ImStore实例
const imStore = useImStore()



// 好友列表数据
const contactList = computed(() => [
  // {
  //   id: 'friend1',
  //   type: 'private',
  //   name: '张工',
  //   avatar: '/logo.webp',
  // },
  ...imStore.friendList
])

// 好友数量
const contactCount = computed(() => contactList.value.length)
// 控制好友列表的展开状态
const isContactListExpanded = ref(contactCount.value<=5)
// 选择好友
const selectChat = (contact: any) => {
  emit('select-chat', contact)
  // imStore.setCurrentChat(contact)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-2 cursor-pointer" 
         @click="isContactListExpanded = !isContactListExpanded">
      <div class="text-md font-medium text-text-base ">好友</div>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ contactCount }}个</span>
        <svg xmlns="http://www.w3.org/2000/svg" 
             class="h-4 w-4 transition-transform" 
             :class="isContactListExpanded ? 'rotate-180' : ''" 
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    <div v-show="isContactListExpanded" class="space-y-2 transition-all duration-300">
      <div v-for="contact in contactList" :key="contact.id" 
           class="p-4 rounded-lg hover:bg-white/20 dark:hover:bg-gray-700/30 cursor-pointer transition-colors"
           @click="selectChat(contact)">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div v-if="contact.avatar" class="w-12 h-12 rounded-full overflow-hidden">
              <img :src="contact.avatar" :alt="contact.name" class="w-full h-full object-cover">
            </div>
            <div v-else class="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-lg font-medium text-text-base">
              {{ contact.name.charAt(0) }}
            </div>
          </div>
          <div class="flex-1">
            <div class="font-medium text-text-base">{{ contact.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>