<script setup lang="ts">
import { ref, watch } from "vue";
import { useNatureSoundStore } from "~/stores/natureSound";
import MyMessage from "~/components/Base/Message/MyMessage";

const natureSoundStore = useNatureSoundStore()
const isPlaying = ref(false)



const hasSelectedSound = computed(() => natureSoundStore.hasSelectedSound())

// 监听全局播放状态和选中状态
watch(
    [() => natureSoundStore.isPlaying, () => !hasSelectedSound.value],
    ([isPlayingNew, noSelected]) => {
      isPlaying.value = isPlayingNew
      // 当正在播放但没有选中声音时，自动暂停
      if (isPlayingNew && noSelected) {
        natureSoundStore.pause = true
        natureSoundStore.isPlaying = false
      }
    }
)



// 处理播放/暂停点击
const handlePlayPause = () => {
  if (!isPlaying.value) {
    // 播放前检查是否有选中的音频
    // console.log('playAndPause--hasSelectedSound:',hasSelectedSound.value)
    if (!hasSelectedSound.value) {
      // console.log('playAndPause--请选择至少一个音频播放:')
      MyMessage({
        message: '请选择至少一个音频播放',
        type: 'error',
        duration: 1000
      })
      // alert('请选择至少一个音频播放')
      return
    }
    natureSoundStore.actionPlay()
  } else {
    // console.log('playAndPause--播放状态变化-暂停')
    natureSoundStore.pause = true
    natureSoundStore.isPlaying = false
  }
}
</script>

<template>
  <button
    @click="handlePlayPause"
    class="w-12 h-12 rounded-full flex items-center justify-center
           bg-gradient-to-br from-emerald-400 to-teal-500
           hover:from-emerald-500 hover:to-teal-600
           active:from-emerald-600 active:to-teal-700
           text-white shadow-lg hover:shadow-xl
           transform transition-all duration-200 hover:scale-105
           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
  >
    <!-- 暂停图标 -->
    <svg
      v-if="isPlaying"
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>

    <!-- 播放图标 -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        d="M8 5v14l11-7z"
      />
    </svg>
  </button>
</template>