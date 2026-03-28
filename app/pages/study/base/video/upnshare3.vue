<script setup lang="ts">

///Users/wangpenglong/ideaProject/myCode/IdeaFlowMini/Ideaflow-web/pages/study/base/video/upnshare.vue


// /study/base/video/upnshare

import { ref, onMounted } from 'vue'

const url = ref('https://6667000oss.dpdns.org/#miadrx&api=all')
const player = ref<HTMLIFrameElement | null>(null)

const playerOrigin = ref('')

onMounted(() => {
  console.log('player.value:', player.value)
  if (player.value) {

    playerOrigin.value = new URL(player.value.src).origin

    window.addEventListener('message', (e) => {
      if (e.origin !== playerOrigin.value) return

      // 播放器准备好后，自动跳转到第10秒
      if (e.data.playerStatus === 'Ready') {
        console.log('播放状态已准备好:', e.data.playerStatus)
        player.value?.contentWindow?.postMessage({ command: 'seek', value: 10 }, playerOrigin.value)
      }
      // 获取当前播放时间
      if (e.data.currentTime !== undefined) {
        console.log('当前播放时间:', e.data.currentTime)
      }
      // 获取视频总时长
      if (e.data.duration !== undefined) {
        console.log('视频总时长:', e.data.duration)
      }
    })
  }
})

// 示例：发送播放、暂停等命令
function play() {
  player.value?.contentWindow?.postMessage({ command: 'play' }, playerOrigin.value)
}
function pause() {
  player.value?.contentWindow?.postMessage({ command: 'pause' }, playerOrigin.value)
}
function seekTo20() {
  player.value?.contentWindow?.postMessage({ command: 'seek', value: 20 }, playerOrigin.value)
}
</script>

<template>

  <div>
    <iframe
        id="playerIframeId"
        ref="player"
        :src="url"
        style="width: 600px; height: 340px; border: 1px solid #ccc;"
        allowfullscreen
    ></iframe>
    <div style="margin-top: 16px;">
      <button @click="play">播放</button>
      <button @click="pause">暂停</button>
      <button @click="seekTo20">跳转到20秒</button>
    </div>
  </div>
</template>

<style scoped>

</style>