<script setup lang="ts">
import { ref } from 'vue'

const videoUrl = ref('https://api.yujn.cn/api/zzxjj.php')
const isLoading = ref(false)
const isPortrait = ref(false)
const shouldAutoPlay = ref(false)

//切换视频
async function nextVideo() {
  isLoading.value = true;
  shouldAutoPlay.value = true;
  videoUrl.value = videoUrl.value + "?temps=" + new Date().getTime();
}

// 检测视频方向并自动播放
async function onVideoLoad(event: Event) {
  const video = event.target as HTMLVideoElement;
  isPortrait.value = video.videoHeight > video.videoWidth;
  isLoading.value = false;
  
  if (shouldAutoPlay.value) {
    try {
      await video.play();
    } catch (error) {
      console.log('自动播放失败:', error);
    }
  }
}
</script>

<template>

 <ClientOnly>
   <div class="profile-card relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl dark:shadow-gray-800/30 ">
     <!-- 毛玻璃背景效果 -->
     <div class="absolute inset-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl z-0"></div>
     <!-- 装饰性背景图案 -->

     <div class="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full blur-2xl"></div>
     <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 dark:from-green-400/10 dark:to-teal-400/10 rounded-full blur-2xl"></div>


     <!-- 内容区域 -->
     <div class="relative z-10">
       <!-- 标题栏 -->
       <div class="flex items-center gap-2 mb-4">
         <svg class="h-6 w-6 text-primary-500" viewBox="0 0 24 24" fill="currentColor">
           <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
         </svg>
         <h3 class="text-xl font-semibold text-gray-900 dark:text-white">随机视频</h3>
       </div>

       <!-- 视频播放区域 -->
       <div class="relative overflow-hidden group" :class="{ 'h-[400px] rounded-[2rem]': isPortrait, 'aspect-video rounded-xl': !isPortrait }">
         <div class="absolute inset-0 flex items-center justify-center">
           <video
               v-if="videoUrl"
               :src="videoUrl"
               :class="[
              isPortrait ? 'h-full w-auto rounded-[1rem]' : 'w-full h-auto rounded-xl'
            ]"
               controls
               @loadedmetadata="onVideoLoad"
           ></video>
         </div>

         <!-- 控制按钮组 -->
         <div class="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
           <!-- 切换按钮 -->
           <button
               @click="nextVideo"
               class="p-2.5 rounded-full bg-black/50 backdrop-blur-sm text-white
                   opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-110
                   transform active:scale-95 focus:outline-none"
               :disabled="isLoading"
           >
             <svg class="w-6 h-6" :class="{ 'animate-spin': isLoading }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           </button>
         </div>
       </div>
     </div>
   </div>
 </ClientOnly>
</template>

<style scoped>
.profile-card {
  max-width: 300px;
  margin: 2rem auto;
}

/* 深色模式适配 */
:deep(.dark) .profile-card {
  --tw-shadow-color: rgba(0, 0, 0, 0.1);
}


</style>