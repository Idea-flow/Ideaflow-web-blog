<script setup lang="ts">
import SoundCardCategory from "~/components/NatureSound/soundCardCategory.vue"
import PlayAndPause from "~/components/NatureSound/control/playAndPause.vue"
import Timer from "~/components/NatureSound/timer/index.vue"
import VolumeRange from "~/components/NatureSound/volumeRange/index.vue"
import {sounds} from "~/data/natureSound/data/sounds"
import {useNatureSoundStore} from "~/stores/natureSound";
import FixedActionBar from "~/components/Base/FixedActionBar/index.vue";
import {computed, ref} from "vue";


// SEO优化配置
useHead({
  title: '自然音效 - 放松心情的白噪音播放器',
  meta: [
    { name: 'description', content: '免费在线自然音效播放器，提供雨声、海浪、鸟鸣等多种白噪音。帮助您放松心情、提高专注力和工作效率。' },
    { name: 'keywords', content: '自然音效,白噪音,放松音乐,专注力,工作效率,雨声,海浪声,鸟鸣声,环境音效' },
    // Open Graph tags for social sharing
    { property: 'og:title', content: '自然音效 - 放松心情的白噪音播放器' },
    { property: 'og:description', content: '免费在线自然音效播放器，提供雨声、海浪、鸟鸣等多种白噪音。帮助您放松心情、提高专注力和工作效率。' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/natureSound/nature.png' },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '自然音效 - 放松心情的白噪音播放器' },
    { name: 'twitter:description', content: '免费在线自然音效播放器，提供雨声、海浪、鸟鸣等多种白噪音。帮助您放松心情、提高专注力和工作效率。' },
    { name: 'twitter:image', content: '/natureSound/nature.png' },
    // Additional SEO tags
    { name: 'author', content: 'Ideaflow' },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { 'http-equiv': 'Content-Language', content: 'zh-CN' },
  ],
  link: [
    { rel: 'canonical', href: 'https://ideaflow.com/natureSound' }
  ]
});

const natureSoundStore = useNatureSoundStore()

// 初始化音频状态
natureSoundStore.initNatureSounds(sounds)
// natureSoundStore.initStatus()

// 切换选中状态
const handleTimeEnd = () => {
  natureSoundStore.actionPause()
  // console.log('handleTimeEnd:时间结束')
}


const volume = ref(50)

const handleVolumeChange = (value: number) => {
  // 处理音量变化
  // console.log('handleVolumeChange音量变化:', value)
}


// 控制组件
const drawerVisible = ref(false)

//
const isControlDialogOpen = ref(false)
const toggleControlDialog = () => {
  isControlDialogOpen.value = !isControlDialogOpen.value
}


const timerClick = () => {
  isControlDialogOpen.value = !isControlDialogOpen.value
}
const isVolumeControlEnabled = computed(() => natureSoundStore.enableVolumeControl)

const handleVolumeControlToggle = (value: boolean) => {
  // console.log('音量控制已切换:', value)

  natureSoundStore.triggerVolumeControl()
  // 这里可根据实际需求加入控制逻辑
}
</script>

<template>



<div class="grid grid-cols-12 gap-4  bg-gradient-to-br from-teal-50 to-slate-100
        dark:from-slate-800/90 dark:to-teal-900/80 ">
<!--  //左侧区域-->
  <div class="hidden md:block md:col-span-2">


    <br>
    <br>


<!--    <VolumeRange-->
<!--        v-model="volume"-->
<!--        :min="0"-->
<!--        :max="100"-->

<!--        @change="handleVolumeChange"-->
<!--    />-->

    <br>

  </div>

  <main class="col-span-12 md:col-span-8  p-4 sm:p-6 lg:p-8 text-gray-800 dark:text-gray-100 space-y-8">
    <!-- 操作栏 -->
    <div class="relative w-2/5 mx-auto mb-8  shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] dark:shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] rounded-full p-4 flex justify-center items-center space-x-4 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.47)] dark:hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.4)] transition-shadow duration-300"
         :class="$colorMode.value === 'dark' ? 'dark:bg-base-100' : 'bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100'" >

      <a href="/" >
<!--        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 64 64">-->
<!--          <path fill="#faefde" d="M55 33L31 13 7 33 7 57 55 57z"></path><path fill="#efd8be" d="M31,13L7,33v1.7c0,1.1,0.9,2,2,2c0.5,0,0.9-0.2,1.3-0.5l20.1-16.7c0.4-0.3,0.9-0.3,1.3,0l20.1,16.7 c0.8,0.7,2.1,0.6,2.8-0.3c0.3-0.4,0.5-0.8,0.5-1.3V33L31,13z"></path><path fill="#f9dd8f" d="M7 47H55V57H7z"></path><path fill="#cda1a7" d="M31.6,13.5l25.7,21.1c0.4,0.3,1.1,0.3,1.4-0.1c0.1-0.2,0.2-0.4,0.2-0.6V31c0-0.6-0.3-1.2-0.7-1.5L32.3,8 c-0.7-0.6-1.8-0.6-2.5,0l-26,21.4C3.3,29.8,3,30.3,3,31v2.9c0,0.6,0.5,1,1,1c0.2,0,0.4-0.1,0.6-0.2l25.7-21.1 C30.7,13.2,31.3,13.2,31.6,13.5z"></path><path fill="#8d6c9f" d="M16 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1 .6 0 1-.4 1-1v-2C17 50.4 16.6 50 16 50zM11 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C12 50.4 11.6 50 11 50zM46 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C47 50.4 46.6 50 46 50zM51 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C52 50.4 51.6 50 51 50z"></path><path fill="#bbdef9" d="M31 20A4 4 0 1 0 31 28A4 4 0 1 0 31 20Z"></path><path fill="#8d6c9f" d="M31,19c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S33.8,19,31,19z M31,27.2c-1.8,0-3.2-1.4-3.2-3.2s1.4-3.2,3.2-3.2 c1.8,0,3.2,1.4,3.2,3.2v0C34.2,25.8,32.8,27.2,31,27.2z"></path><path fill="#ed7899" d="M25 37H37V57H25z"></path><path fill="#8d6c9f" d="M33,45c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1s1-0.4,1-1v-2C34,45.4,33.6,45,33,45z"></path><path fill="#8d6c9f" d="M56.7,35.4c0.9,0.7,2.1,0.6,2.8-0.3c0.3-0.4,0.5-0.8,0.5-1.3V31c0-0.9-0.4-1.8-1.1-2.3l-26-21.4 c-1.1-0.9-2.7-0.9-3.8,0L18,16.4v-3.3c0-0.6-0.4-1-1-1s-1,0.4-1,1v5l-2,1.6V9.1c0-0.6-0.4-1-1-1s-1,0.4-1,1v12c0,0.1,0,0.1,0,0.2 l-8.9,7.4C2.4,29.2,2,30.1,2,31v2.9c0,0.8,0.4,1.5,1.2,1.8c0.7,0.3,1.5,0.2,2.1-0.3L6,34.8V56H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h56 c0.6,0,1-0.4,1-1s-0.4-1-1-1h-3V34.8L56.7,35.4z M22,56h-2H8v-8h16v8H22z M26,56V38h10v18H26z M54,56H42h-2h-2v-8h16V56z M54,38v8 H38v-8c0-1.1-0.9-2-2-2H26c-1.1,0-2,0.9-2,2v8H8v-8v-4.8l23-18.9l23,18.9V38z M32.3,12.8c-0.7-0.6-1.8-0.6-2.5,0L4,33.9V31 c0-0.3,0.1-0.6,0.4-0.8l26-21.4c0.4-0.3,0.9-0.3,1.3,0l26,21.4c0.2,0.2,0.4,0.5,0.4,0.8v2.9L32.3,12.8z"></path><path fill="#8d6c9f" d="M21 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C22 50.4 21.6 50 21 50zM41 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C42 50.4 41.6 50 41 50z"></path>-->
<!--        </svg>-->
        <Icon name="myBase:home"  class="
        w-6 h-6
     sm:w-8 sm:h-8
     md:w-10 md:h-10
     lg:w-12 lg:h-12

        group relative transition-transform duration-300 hover:scale-110 hover:rotate-12"></Icon>
      </a>

      <BaseThemeSwitch >
<!--        <img class="-->

<!--        w-6 h-6-->
<!--     sm:w-8 sm:h-8-->
<!--     md:w-8 md:h-8-->
<!--     lg:w-10 lg:h-10-->

<!--        transition-transform duration-300 hover:scale-110 hover:rotate-45" src="data:image/png;base64,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" alt="paint-palette">-->

        <Icon name="myBase:theme2"  class="group relative transition-transform duration-300 hover:scale-110 hover:rotate-12

  w-6 h-6
     sm:w-8 sm:h-8
     md:w-8 md:h-8
     lg:w-10 lg:h-10
"></Icon>

      </BaseThemeSwitch>

      <BaseDropdown>
<!--        <img width="35px" height="35px" class="transition-transform duration-300 hover:scale-110 hover:rotate-45" src="data:image/png;base64,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" alt="settings-3">-->
        <Icon name="myBase:menu1"  class="
        w-6 h-6
     sm:w-8 sm:h-8
     md:w-10 md:h-10
     lg:w-12 lg:h-12
        group relative transition-transform duration-300 hover:scale-110 hover:rotate-12 "></Icon>

        <template #dropdown>
          <BaseDropdownItem >
            <div @click="timerClick"> 定时</div>
          </BaseDropdownItem>
          <BaseDropdownItem>
    <client-only>
<!--      nuxt3  在服务端渲染的时候 isVolumeControlEnabled会是false,-->

      <div class="flex items-center justify-between">
        <span>开启音量控制</span>
        <button
            @click="handleVolumeControlToggle(isVolumeControlEnabled)"
            class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300"
            :class="isVolumeControlEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
        >
      <span
          class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300"
          :class="isVolumeControlEnabled ? 'translate-x-6' : 'translate-x-1'"
      ></span>
        </button>
      </div>

    </client-only>
          </BaseDropdownItem>

        </template>
      </BaseDropdown>
      <!--      <div @click="toggleControlDialog">-->
<!--        <img width="35px" height="35px" class="transition-transform duration-300 hover:scale-110 hover:rotate-45" src="data:image/png;base64,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" alt="settings-3">-->
<!--        -->
<!--      </div>-->


    </div>


    <div class="flex gap-4">
      <div
          class="relative h-min-44 w-1/3 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-4 group
            bg-gradient-to-br from-green-50 to-emerald-100
           dark:from-slate-800/90 dark:to-teal-900/80 dark:text-gray-300 dark:backdrop-blur-sm"
      >
         <PlayAndPause></PlayAndPause>
      </div>

      <div
          class="relative h-min-44 w-2/3 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-4 group
            bg-gradient-to-br from-green-50 to-emerald-100
           dark:from-slate-800/90 dark:to-teal-900/80 dark:text-gray-300 dark:backdrop-blur-sm"
      >
       各种自然,音声,可以自由组合
        点击图标即可播放,暂停
      </div>
    </div>




<!--    结束-->
    <div v-for="category in sounds.categories" :key="category.title">
<!--      <h2 class="text-xl sm:text-2xl font-semibold mb-4">{{ category.title }}</h2>-->
      <SoundCardCategory
        :category="category"
        :maxRows="1"
        scrollDirection="horizontal"
      />
    </div>


  </main>

  <div class="hidden md:block md:col-span-2"></div>


<!--  <FixedActionBar position="right-bottom" :distance="0" :offsetX="-20" :offsetY="-80" class="md:hidden" v-if="!drawerVisible" @click="drawerVisible = true">-->
<!--    &lt;!&ndash;      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="#000" stroke-width="2" d="M5.5 18a2.5 2.5 0 1 0 0 5H22M3 20.5v-17A2.5 2.5 0 0 1 5.5 1H21v17.007H5.492M20.5 18a2.5 2.5 0 1 0 0 5"/></svg>&ndash;&gt;-->
<!--    &lt;!&ndash;      <icon name="myBase:category"></icon>&ndash;&gt;-->

<!--    <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="none" stroke="#f09393" stroke-width="2" d="M5.5 18a2.5 2.5 0 1 0 0 5H22M3 20.5v-17A2.5 2.5 0 0 1 5.5 1H21v17.007H5.492M20.5 18a2.5 2.5 0 1 0 0 5"/></svg>-->
<!--  </FixedActionBar>-->

  <BaseDrawer
      v-model="drawerVisible"
      placement="bottom"
      :height="400"
  >

    显示弹窗

  </BaseDrawer>

  <!-- 搜索对话框 -->
  <BaseDialog v-model="isControlDialogOpen" title="定时暂停播放" :show-footer="false">

    <Timer

        :default-time="1"
        :preset-times="[1,15, 30,60,90]"
        @time-end="handleTimeEnd"
    />

  </BaseDialog>
</div>
</template>

<style scoped>

</style>