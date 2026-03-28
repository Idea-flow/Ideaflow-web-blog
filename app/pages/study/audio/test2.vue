<script setup lang="ts">
// http://localhost:3005/study/audio/test2
//https://www.ideaflow.top/study/audio/test1?src=https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8
const route = useRoute()

const srcQuery = route.query.src as string

// 定义音频源信息数组
const audioSources = [
  {
    src: '/m3u8Test2/bhyphgn.m3u8',
    title: '把回忆拼好给你',
    coverImage: '/logo.webp'
  },
  {
    src: '/wanerTest/waner.m3u8',
    title: 'Waner Test Audio',
    coverImage: '/logo.webp'
  }
]

// 当前选中的音频源索引
const currentSourceIndex = ref(0)

// 当前音频源信息
const currentSource = computed(() => audioSources[currentSourceIndex.value])

// 切换音频源
const switchAudioSource = () => {
  currentSourceIndex.value = (currentSourceIndex.value + 1) % audioSources.length
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6">音频播放器</h1>

    <!-- 切换按钮 -->
    <div class="mb-4">
      <button
          @click="switchAudioSource"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        切换到 {{ currentSourceIndex === 0 ? audioSources[1].title : audioSources[0].title }}
      </button>
    </div>

    <!-- 音频播放器 -->
    <BaseAudioM3u8PlayAudioGc
        :audio="currentSource"
    />
  </div>
</template>

<style scoped>

</style>