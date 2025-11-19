<script setup lang="ts">
const props = defineProps<{
  audioList?: Array<{
    id: number;
    src: string;
    title: string;
    author: string; //可以为空
    coverImage: string; // 可以为空
    duration: string; // 可以为空
    size: string; // 可以为空
  }>
}>()

const emit = defineEmits<{
  (e: 'select', audio: {
    id: number;
    src: string;
    title: string;
    author: string;
    coverImage: string;
    duration: string;
    size: string;
  }): void
}>()

const handleSelect = (audio: any) => {
  emit('select', audio)
}

const formatInfo = (audio: any) => {
  const infoParts = []
  if (audio.duration) infoParts.push(audio.duration)
  if (audio.size) infoParts.push(audio.size)
  if (audio.author) infoParts.push(audio.author)
  return infoParts.join(' . ')
}
</script>

<template>
  <div class="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-xl p-4 max-h-[400px] overflow-y-auto">
    <div v-if="audioList && audioList.length > 0" class="space-y-3">
      <div
        v-for="(audio, index) in audioList.slice(0, 10)"
        :key="audio.id || index"
        @click="handleSelect(audio)"
        class="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10"
      >
        <!-- 左侧封面图像 -->
        <div class="flex-shrink-0">
          <img 
            :src="audio.coverImage || '/default-audio-cover.png'" 
            :alt="audio.title"
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-white/50 dark:border-gray-700/50 shadow-sm"
          >
        </div>
        
        <!-- 右侧内容 -->
        <div class="flex-1 min-w-0">
          <!-- 标题 -->
          <div class="font-medium text-gray-800 dark:text-gray-100 truncate text-sm sm:text-base">
            {{ audio.title }}
          </div>
          
          <!-- 信息行 -->
          <div 
            v-if="audio.duration || audio.size || audio.author" 
            class="text-xs text-gray-600 dark:text-gray-400 truncate mt-1"
          >
            {{ formatInfo(audio) }}
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
      暂无音频列表
    </div>
  </div>
</template>

<style scoped>
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.8);
}

/* 暗黑模式下的滚动条 */
.dark ::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 0.8);
}
</style>