<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  src: string
}>()

const audio = ref<HTMLAudioElement>()
const isPlaying = ref(false)
const currentTime = ref('00:00')
const duration = ref('00:00')
const progress = ref(0)

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const togglePlay = () => {
  if (!audio.value) return

  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const updateProgress = () => {
  if (!audio.value) return

  const { currentTime: current, duration: total } = audio.value
  progress.value = (current / total) * 100
  currentTime.value = formatTime(current)
}

const setProgress = (event: MouseEvent) => {
  if (!audio.value) return

  const progressBar = event.currentTarget as HTMLDivElement
  const clickPosition = event.offsetX
  const progressWidth = progressBar.offsetWidth
  const newProgress = (clickPosition / progressWidth)
  progress.value = newProgress * 100
  audio.value.currentTime = newProgress * audio.value.duration
}

onMounted(() => {
  audio.value = new Audio(props.src)

  audio.value.addEventListener('timeupdate', updateProgress)
  audio.value.addEventListener('loadedmetadata', () => {
    duration.value = formatTime(audio.value?.duration || 0)
  })
  audio.value.addEventListener('ended', () => {
    isPlaying.value = false
  })
})

onUnmounted(() => {
  if (!audio.value) return

  audio.value.removeEventListener('timeupdate', updateProgress)
  audio.value.pause()
  audio.value = undefined
})
</script>

<template>
  <div class="max-w-md mx-auto bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-4 backdrop-blur-sm">
    <div class="flex items-center justify-between space-x-4">
      <!-- 播放/暂停按钮 -->
      <button
        @click="togglePlay"
        class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <svg
          v-if="!isPlaying"
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 9v6m4-6v6"
          />
        </svg>
      </button>

      <div class="flex-1">
        <!-- 进度条 -->
        <div
          @click="setProgress"
          class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer relative overflow-hidden"
        >
          <div
            class="h-full bg-blue-500 transition-all duration-150"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>

        <!-- 时间显示 -->
        <div class="flex justify-between mt-1 text-sm text-gray-500 dark:text-gray-400">
          <span>{{ currentTime }}</span>
          <span>{{ duration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

