<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from '#imports'

const route = useRoute()
const router = useRouter()

const activeTab = computed(() => {
  const path = route.path
  if (path.includes('/')) return ''
  if (path.includes('/contacts')) return 'contacts'
  if (path.includes('/profile')) return 'profile'
  return ''
})

const tabs = [
  {
    id: '',
    label: '消息',
    icon: 'uil:comment',
    unread: 2
  },
  {
    id: 'contacts',
    label: '通讯录',
    icon: 'uil:users-alt'
  },
  {
    id: 'profile',
    label: '我的',
    icon: 'uil:user'
  }
]

const switchTab = (tabId: string) => {
  router.push(`/im/h5/${tabId}`)
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-t border-gray-200/20 dark:border-gray-700/20 transition-all duration-300">
    <div class="flex justify-around items-center h-16 px-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="flex flex-col items-center justify-center flex-1 h-full relative group transition-all duration-300"
        :class="{
          'text-blue-500 dark:text-blue-400': activeTab === tab.id,
          'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200': activeTab !== tab.id
        }"
        @click="switchTab(tab.id)"
      >
        <div class="relative transform group-hover:scale-105 transition-all duration-300">
          <Icon :name="tab.icon" class="text-2xl" />
<!--          <span-->
<!--            v-if="tab.unread"-->
<!--            class="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-xs font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 transform scale-90 shadow-sm"-->
<!--          >-->
<!--            {{ tab.unread }}-->
<!--          </span>-->
        </div>
        <span class="text-xs mt-1.5 font-medium opacity-90">{{ tab.label }}</span>
     
      </button>
    </div>
  </nav>
</template>

<style scoped>
</style>