<script setup lang="ts">
import {computed} from "vue";



const imStore = useImStore()
const activeNav = computed(() => imStore.activeNav)

const handleNavClick = (nav: string) => {
  imStore.setActiveNav(nav);
  if (activeNav.value == 'chat') {
    navigateTo('/im/web/chat')
  }

  if (activeNav.value == 'contacts') {
    navigateTo('/im/web/contacts')
  }

}
const appStore = useAppStore()
const userInfo = computed(() => appStore.userInfo)


const navigateToBlog = () => {
  navigateTo('/')
}
</script>

<template>

  <div class="w-16 relative h-full flex flex-col items-center ">
    <!-- 用户头像 -->
   <client-only>
     <div class="mb-6 mt-10">
       <img :src="userInfo.avatar" alt="用户头像" class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
     </div>
   </client-only>

    <!-- 主要功能按钮 -->
    <div class="flex-1 flex flex-col items-center space-y-4">
      <!-- 聊天按钮 -->
      <button
          @click="handleNavClick('chat')"
          :class="[
            'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300',
            activeNav === 'chat'
          ]">
        <template v-if="activeNav !== 'chat'">
          <div class="hover:bg-white/10 dark:hover:bg-gray-700/30 rounded-lg p-2 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24" ><g fill="none" stroke="#9ac4ec" stroke-linecap="round" stroke-width="2"><path stroke-linejoin="round" d="M14 19c3.771 0 5.657 0 6.828-1.172S22 14.771 22 11s0-5.657-1.172-6.828S17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172S2 7.229 2 11s0 5.657 1.172 6.828c.653.654 1.528.943 2.828 1.07"/><path d="M14 19c-1.236 0-2.598.5-3.841 1.145c-1.998 1.037-2.997 1.556-3.489 1.225s-.399-1.355-.212-3.404L6.5 17.5"/></g></svg>

          </div>

        </template>
        <template v-else>
          <div class="hover:bg-white/10 dark:hover:bg-gray-700/30 rounded-lg p-2 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><g fill="none" stroke="#9ac4ec" stroke-linecap="round" stroke-width="2"><path d="M15 11H9"/><path stroke-linejoin="round" d="M14 19c3.771 0 5.657 0 6.828-1.172S22 14.771 22 11s0-5.657-1.172-6.828S17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172S2 7.229 2 11s0 5.657 1.172 6.828c.653.654 1.528.943 2.828 1.07"/><path d="M14 19c-1.236 0-2.598.5-3.841 1.145c-1.998 1.037-2.997 1.556-3.489 1.225s-.399-1.355-.212-3.404L6.5 17.5"/></g></svg>

          </div>

        </template>
      </button>

      <!-- 通讯录按钮 -->
      <button
          @click="handleNavClick('contacts')"
          :class="[
            'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300',
            activeNav === 'contacts'
          ]">
        <template v-if="activeNav !== 'contacts'">

          <div class="hover:bg-white/10 dark:hover:bg-gray-700/30 rounded-lg p-2 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 48 48" ><path fill="#b7e5ee" d="M38 44H12V4h26c2.2 0 4 1.8 4 4v32c0 2.2-1.8 4-4 4"/><path fill="#9ac4ec" d="M10 4h2v40h-2c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4"/><g fill="#9ac4ec"><circle cx="26" cy="20" r="4"/><path d="M33 30s-1.9-4-7-4s-7 4-7 4v2h14z"/></g></svg>

          </div>


        </template>
        <template v-else>

          <div class="hover:bg-white/10 dark:hover:bg-gray-700/30 rounded-lg p-2 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 48 48"><path fill="#a8d5ff" d="M38 44H12V4h26c2.2 0 4 1.8 4 4v32c0 2.2-1.8 4-4 4"/><path fill="#89c1ff" d="M10 4h2v40h-2c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4"/><g fill="#6aa8ff"><circle cx="26" cy="20" r="4"/><path d="M33 30s-1.9-4-7-4s-7 4-7 4v2h14z"/></g></svg>

          </div>

        </template>
      </button>
    </div>

    <!-- 底部按钮组 -->
    <div class="flex flex-col items-center space-y-3 mb-4">
      <BaseThemeSwitch placement="top">
        <div class="hover:bg-white/10 dark:hover:bg-gray-700/30 rounded-lg p-2 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="text-gray-600/70 dark:text-gray-400/70 group-hover:text-gray-700 dark:group-hover:text-gray-300"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m1.875 8l.686-2.743a1 1 0 0 1 .97-.757h10.938a1 1 0 0 1 .97 1.243l-.315 1.26M6 13.5H2.004A1.5 1.5 0 0 1 .5 12V3.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1" stroke-width="1"/><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4"><path stroke="currentColor" d="M12 21a9 9 0 0 1 0-18c4.97 0 9 3.582 9 8c0 1.06-.474 2.078-1.318 2.828S17.693 15 16.5 15H14a2 2 0 0 0-1 3.75A1.3 1.3 0 0 1 12 21" transform="matrix(.41667 0 0 .4167 6.75 6.747)"/><path stroke="currentColor" d="M7.5 10.5c0 1.333 2 1.333 2 0s-2-1.333-2 0" transform="matrix(.41667 0 0 .4167 6.75 6.747)"/><path stroke="currentColor" d="M11.5 7.5c0 1.333 2 1.333 2 0s-2-1.333-2 0" transform="matrix(.41667 0 0 .4167 6.75 6.747)"/><path stroke="currentColor" d="M15.5 10.5c0 1.333 2 1.333 2 0s-2-1.333-2 0" transform="matrix(.41667 0 0 .4167 6.75 6.747)"/></g></svg>

        </div>

      </BaseThemeSwitch>
      <!-- 设置按钮 -->
      <button class="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group hover:bg-white/10 dark:hover:bg-gray-700/30">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" class="text-gray-600/70 dark:text-gray-400/70 group-hover:text-gray-700 dark:group-hover:text-gray-300"><g fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M5 5h14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="16;0"/></path><path d="M5 12h14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="16;0"/></path><path d="M5 19h14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="16;0"/></path></g></svg>
      
      </button>

      <!-- 返回博客按钮 -->
      <button @click="navigateToBlog" class="hover:bg-white/10 dark:hover:bg-gray-700/30 rounded-lg p-2 transition-all duration-300">
        
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" class="text-gray-600/70 dark:text-gray-400/70 hover:text-gray-700 dark:hover:text-gray-300"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M9 21v-6a2 2 0 0 1 2-2h2c.247 0 .484.045.702.127"/><path d="M19 12h2l-9-9l-9 9h2v7a2 2 0 0 0 2 2h5m4 1l5-5m0 4.5V17h-4.5"/></g></svg>
     
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>