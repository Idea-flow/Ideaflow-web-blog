<script setup lang="ts">
import { ref } from 'vue'
import Menu from '~/components/Base/Menu/Menu.vue'
import MenuItem from '~/components/Base/Menu/MenuItem.vue'
import SubMenu from '~/components/Base/Menu/SubMenu.vue'

const theme = ref('light')
const mode = ref('vertical')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const toggleMode = () => {
  mode.value = mode.value === 'vertical' ? 'horizontal' : 'vertical'
}

const handleClick = (item: string) => {
  console.log('点击了:', item)
}
</script>

<template>
  <div class="p-6 min-h-screen" :class="theme === 'dark' ? 'bg-neutral' : 'bg-base-100'">
    <div class="mb-6 space-x-4">
      <button
        class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
        @click="toggleTheme"
      >
        切换主题: {{ theme }}
      </button>
      <button
        class="px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary-hover transition-colors"
        @click="toggleMode"
      >
        切换方向: {{ mode }}
      </button>
    </div>

    <Menu :mode="mode" :theme="theme" class="border border-border-light rounded-xl overflow-hidden">
      <MenuItem @click="handleClick('首页')">
        <template #icon>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </template>
        首页
      </MenuItem>

      <SubMenu title="用户中心">
        <template #icon>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </template>
        <MenuItem @click="handleClick('个人信息')">个人信息</MenuItem>
        <MenuItem @click="handleClick('账号设置')">账号设置</MenuItem>
      </SubMenu>

      <SubMenu title="系统管理">
        <template #icon>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </template>
        <MenuItem @click="handleClick('用户管理')">用户管理</MenuItem>
        <MenuItem @click="handleClick('角色管理')">角色管理</MenuItem>
        <MenuItem @click="handleClick('权限管理')">权限管理</MenuItem>
      </SubMenu>

      <MenuItem  @click="handleClick('帮助中心')">
        <template #icon>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </template>
        帮助中心
      </MenuItem>
    </Menu>
  </div>
</template>