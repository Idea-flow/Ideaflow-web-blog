<script setup lang="ts">
// http://localhost:3005/study/audio/test1
//https://www.ideaflow.top/study/audio/test1?src=https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8
const route = useRoute()

const srcQuery = route.query.src as string


const audioSources = [
  {
    src: 'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8',
    title: '测试',
    coverImage: '/logo.webp'
  },
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
</script>
<template>
  <div class="max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6">音频播放器</h1>
    <BaseAudioM3u8PlayAudio src="/m3u8Test2/bhyphgn.m3u8" />
    <BaseAudioM3u8PlayAudioGc :audio="audioSources[0]"/>


    <BaseAudioM3u8PlayAudioGc :audio="audioSources[1]"/>
    <BaseAudioM3u8PlayAudioGc2 :audio="audioSources[2]"/>
    <BaseAudioM3u8PlayAudioGc3 :audio="audioSources[2]"/>


<!--    <BaseAudioM3u8PlayAudio :src="srcQuery" />-->
<!--    <BaseAudioM3u8PlayAudio src="https://sxic.converteranalysis.cfd/v4/np/v1i6ll/index-f1-v1-a1.txt" />-->
<!--    <BaseAudioM3u8PlayAudio src="https://sxic.converteranalysis.cfd/v4/np/v1i6ll/index-f1-v1-a1.txt" />-->


    <br>
    <br>
    <br>

<!--    <BaseAudioCommonPlay src="/把回忆拼好给你.mp3" />-->
  </div>
</template>


<style scoped>

</style>