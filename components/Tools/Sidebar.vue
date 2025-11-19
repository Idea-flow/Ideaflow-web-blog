<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '~/stores/app'
import {logout} from "~/remote/auth";
import {useToolsStore} from "~/stores/tools";


const toolsStore = useToolsStore();
//
const isCollapsed  = computed(() => toolsStore.getSidebarIsCollapsed())

const appStore = useAppStore()
// const isCollapsed = computed(() => appStore.getToolsIsCollapsed)
const emit = defineEmits(['toggle'])

const userInfo = computed(() => appStore.userInfo)

const toggleSidebar = () => {
  // appStore.setToolsIsCollapsed(!isCollapsed.value)
  toolsStore.setSidebarIsCollapsed(!isCollapsed.value)
  emit('toggle', isCollapsed.value)
}

const handleLogout = () => {
  appStore.clearUserInfo()
  logout()
  navigateTo('/login')
}
</script>

<template>
  <!-- 遮罩层 -->
  <div
    v-show="!isCollapsed"
    class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    @click="toggleSidebar"
  ></div>

  <div
    class="fixed top-0 left-0 h-full transition-all duration-300 ease-in-out bg-base-100 border-r border-border-light z-50"
    :class="[
      isCollapsed ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100',
      'w-[60%] lg:w-[20%]'
    ]"
  >
    <!-- 渐变背景顶部区域 -->
    <div class="h-[10%] bg-gradient-to-r from-primary to-secondary flex items-center justify-between px-4">
      <h1 class="text-xl font-bold text-white">
        <NuxtLink to="/tools" >
          Tools工具站
        </NuxtLink>
      </h1>
      <button
        @click="toggleSidebar"
        class="text-white hover:text-neutral-hover transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- 侧边栏内容区域 -->
    <div class="p-4 h-[80%] overflow-y-auto">
      <slot></slot>
    </div>

    <!-- 底部功能区域 -->
    <div class="h-[10%] border-t border-border-light px-4 flex items-center justify-between">
      <!-- 登录状态/提示 -->
      <template v-if="userInfo">
        <BaseDropdown placement="top">
          <div class="flex items-center cursor-pointer">
            <img :src="userInfo?.avatar || 'https://oss.ideaflow.top/configImg/default-avatar.webp'" alt="用户头像" class="w-8 h-8 rounded-full mr-2">
            <span class="text-sm text-text-base">{{ userInfo.username }}</span>
          </div>
          <template #dropdown>
            <BaseDropdownItem>
              <NuxtLink to="/profile" class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>个人中心</span>
              </NuxtLink>
            </BaseDropdownItem>
            <BaseDropdownItem>
              <button @click="handleLogout" class="w-full text-left flex items-center space-x-2 text-red-600 dark:text-red-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>退出登录</span>
              </button>
            </BaseDropdownItem>
          </template>
        </BaseDropdown>
      </template>
<!--      <NuxtLink v-else to="/login" class="text-sm text-primary hover:text-primary-hover transition-colors">-->
<!--        请登录-->
<!--      </NuxtLink>-->

      <!-- 博客首页导航 -->
      <NuxtLink to="/" class="text-sm text-text-base hover:text-primary transition-colors">
        博客
      </NuxtLink>

      <BaseThemeSwitch placement="top"></BaseThemeSwitch>

    </div>
  </div>

  <!-- 展开按钮 -->
  <button
    v-show="isCollapsed"
    @click="toggleSidebar"
    class="fixed top-4 left-4 z-50 p-2 rounded-full bg-primary hover:bg-primary-hover text-white transition-colors"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
  </button>
</template>

<style scoped>
</style>