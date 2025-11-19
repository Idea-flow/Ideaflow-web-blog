<script setup lang="ts">
import {computed} from "vue";

const appStore = useAppStore()
const userInfo = computed(() => appStore.userInfo)

</script>

<template>
  <div class="p-4">

    <div class=" rounded-lg shadow-sm  p-4 mb-6">
      <div class="flex items-center space-x-4">
        <img :src="userInfo?.avatar || '/images/im/defaultAvatar.webp'" alt="头像" class="w-16 h-16 rounded-full">
        <div class="flex-1">
          <h2 class="text-lg font-medium">{{ userInfo?.username }}</h2>
          <!--

                <p class="text-sm text-gray-500 dark:text-gray-400">账号：{{ userInfo?.account }}</p>-->
        </div>
        <div >
          <button @click="navigateTo('/')" class="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/30 active:scale-95 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" viewBox="0 0 24 24"><g fill="none" stroke="#837bc7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 13v-1h2l-9-9l-9 9h2v7a2 2 0 0 0 2 2h2.5"/><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-2 7l3-3l2 2l4-4"/><path d="M19 17h3v3"/></g></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div class=" rounded-lg shadow-sm ">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <Icon name="uil:setting" class="text-xl text-gray-600 dark:text-gray-400" />
            <span>设置</span>
          </div>
          <Icon name="uil:angle-right" class="text-xl text-gray-400" />
        </div>
      </div>

      <div class=" rounded-lg shadow-sm ">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <Icon name="uil:info-circle" class="text-xl text-gray-600 dark:text-gray-400" />
            <span>关于</span>
          </div>
          <Icon name="uil:angle-right" class="text-xl text-gray-400" />
        </div>
      </div>

      <BaseThemeSwitch placement="top">
        <div class="flex items-center justify-center p-3 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/30 active:scale-95 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 16 16" class="text-gray-600/70 dark:text-gray-400/70 group-hover:text-gray-700 dark:group-hover:text-gray-300"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m1.875 8l.686-2.743a1 1 0 0 1 .97-.757h10.938a1 1 0 0 1 .97 1.243l-.315 1.26M6 13.5H2.004A1.5 1.5 0 0 1 .5 12V3.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1" stroke-width="1"/><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4"><path stroke="currentColor" d="M12 21a9 9 0 0 1 0-18c4.97 0 9 3.582 9 8c0 1.06-.474 2.078-1.318 2.828S17.693 15 16.5 15H14a2 2 0 0 0-1 3.75A1.3 1.3 0 0 1 12 21" transform="matrix(.41667 0 0 .4167 6.75 6.747)"/><path stroke="currentColor" d="M7.5 10.5c0 1.333 2 1.333 2 0s-2-1.333-2 0" transform="matrix(.41667 0 0 .4167 6.75 6.747)"/><path stroke="currentColor" d="M11.5 7.5c0 1.333 2 1.333 2 0s-2-1.333-2 0" transform="matrix(.41667 0 0 .4167 6.75 6.747)"/><path stroke="currentColor" d="M15.5 10.5c0 1.333 2 1.333 2 0s-2-1.333-2 0" transform="matrix(.41667 0 0 .4167 6.75 6.747)"/></g></svg>
        </div>
      </BaseThemeSwitch>
    </div>
  </div>
</template>

<style scoped>
</style>