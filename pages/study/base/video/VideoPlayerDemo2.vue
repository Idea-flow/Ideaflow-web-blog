<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 示例视频源
const videoSources = [
  {
    name: '示例视频 1',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://picsum.photos/id/237/800/450'
  },
  {
    name: '示例视频 2',
    src: 'https://oss.ideaflow.top/video/asmr/Yoonying%20%EF%BD%9C%20Kneels%20Down%20to%20Help%20You%20%EF%BD%9C%20ASMR%20%5BVFT2C9Cdbyk%5D.webm',
    poster: 'https://bu.dusays.com/2023/11/10/654e2d50015a9.jpg'
  },
]

import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import MyPlayIcon from 'assets/myIcons/video/play.svg';
import MyPauseIcon from 'assets/myIcons/video/pause.svg';

if(import.meta.client) {
  onMounted(() => {
    let player = new Player({
      id: 'mse',
      // url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      // url: '/按摩助眠2.webm',
      url: 'https://api.yujn.cn/api/zzxjj.php',
      poster: 'https://bu.dusays.com/2023/11/10/654e2d50015a9.jpg',
      cssFullscreen: true,
      playbackRate: [0.5, 0.75, 1, 1.25, 1.5, 2],
      fluid: true, // 采用流试布局
      pip: true, //是否启用画中画
      icons: {
        play: MyPlayIcon,
        pause: MyPauseIcon
      }
      // skin: 'custom',
      // commonStyle:{
      //   // 进度条底色
      //   // progressColor: '#23d5ab',
      //   // 播放完成部分进度条底色
      //   playedColor: '#23d5ab',
      //   // 缓存部分进度条底色
      //   // cachedColor: 'oklch(27% 0.105 12.094)',
      //   cachedColor: '',
      //   // 进度条滑块样式
      //   sliderBtnStyle: {
      //     width: '16px',       // 滑块的宽度
      //     height: '16px',      // 滑块的高度
      //     backgroundColor: '#FF9E9E', // 滑块的背景颜色
      //     borderRadius: '50%', // 滑块的边框圆角
      //     border: '2px solid #fff'   // 滑块的边框样式
      //   },
      //   // 音量颜色
      //   volumeColor: '#23d5ab'
      // },
    });

  })
}
import 'assets/css/video/index.css';
</script>

<template>
  <div id="mse" class="rounded-xl overflow-hidden w-full aspect-video">
  </div>
</template>

<style >

</style>