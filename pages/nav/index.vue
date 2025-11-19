<script setup lang="ts">
import { NAV_DATA } from '~/data/nav/data'
import { ref, onMounted, onUnmounted } from 'vue'
import FixedActionBar from '~/components/Base/FixedActionBar/index.vue'

const themes = [
  { bg: 'bg-pink-50 dark:bg-pink-900/20', text: 'text-pink-500 dark:text-pink-400', border: 'hover:border-pink-300 dark:hover:border-pink-600', hexColor: '#ec4899' },
  { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-500 dark:text-green-400', border: 'hover:border-green-300 dark:hover:border-green-600', hexColor: '#22c55e' },
  { bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-500 dark:text-sky-400', border: 'hover:border-sky-300 dark:hover:border-sky-600', hexColor: '#0ea5e9' },
  { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-500 dark:text-purple-400', border: 'hover:border-purple-300 dark:hover:border-purple-600', hexColor: '#a855f7' },
  { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-500 dark:text-amber-400', border: 'hover:border-amber-300 dark:hover:border-amber-600', hexColor: '#f59e0b' },
  { bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-500 dark:text-rose-400', border: 'hover:border-rose-300 dark:hover:border-rose-600', hexColor: '#f43f5e' }
]

const currentThemeIndex = ref(0)
const bgColor = ref(themes[0].bg)
const textColor = ref(themes[0].text)
const borderColor = ref(themes[0].border)
const themeColor = ref(themes[0].hexColor)

let themeInterval: NodeJS.Timeout

onMounted(() => {
  themeInterval = setInterval(() => {
    currentThemeIndex.value = (currentThemeIndex.value + 1) % themes.length
    bgColor.value = themes[currentThemeIndex.value].bg
    textColor.value = themes[currentThemeIndex.value].text
    borderColor.value = themes[currentThemeIndex.value].border
    themeColor.value = themes[currentThemeIndex.value].hexColor
  }, 10000)
})

onUnmounted(() => {
  clearInterval(themeInterval)
})



const drawerVisible = ref(false)
</script>

<template>
  <div id="catalogId" class="flex min-h-screen bg-base-100">
    <!-- 左侧导航内容区域 -->
    <div class="w-full md:w-4/5 p-6">
      <div v-for="(section, index) in NAV_DATA" :key="section.title" :id="section.title" class="mb-8">
        <h2 class="text-2xl  mb-4 text-text-base ">{{ section.title }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a v-for="item in section.items" :key="item.title" :href="item.link" target="_blank"
            :class="[borderColor, 'bg-base-200 p-4 rounded-lg transition-all duration-300 hover:shadow-lg border border-transparent']">
            <div class="flex items-center mb-2">
              <img v-if="item.icon" :src="item.icon" :alt="item.title" class="w-6 h-6 mr-2">
              <span class="text-text-base">{{ item.title }}</span>
            </div>
            <p v-if="item.desc" class="text-sm text-text-base  line-clamp-2">{{ item.desc }}</p>
          </a>
        </div>
      </div>
    </div>

    <!-- 右侧目录导航 -->
    <div class="hidden md:block w-1/5 p-6">
      <div class="sticky top-6">
        <BlogArticleCatalog containerId="catalogId" :theme="$colorMode.value == 'dark' ? 'dark' : 'light'" :collapsed="false" :theme-color="themeColor"/>
      </div>
    </div>

    <FixedActionBar position="right-bottom" :distance="0" :offsetX="-20" :offsetY="-80" class="md:hidden" v-if="!drawerVisible" @click="drawerVisible = true">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="none" stroke="#f09393" stroke-width="2" d="M5.5 18a2.5 2.5 0 1 0 0 5H22M3 20.5v-17A2.5 2.5 0 0 1 5.5 1H21v17.007H5.492M20.5 18a2.5 2.5 0 1 0 0 5"/></svg>
    </FixedActionBar>

    <BaseDrawer
        v-model="drawerVisible"
        placement="bottom"
        :height="400"
    >
      <BlogArticleCatalog containerId="catalogId" :theme="$colorMode.value == 'dark' ? 'dark' : 'light'" :collapsed="false" :theme-color="themeColor"/>

    </BaseDrawer>
  </div>
</template>

<style scoped>
</style>