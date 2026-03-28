<script setup lang="ts">
import Player from 'xgplayer';
import HlsPlugin from 'xgplayer-hls'


import 'xgplayer/dist/index.min.css';
import '~/assets/css/video/index.css';
//引入弹幕
import Danmu from 'xgplayer/es/plugins/danmu'
// import 'xgplayer/es/plugins/danmu/index.css'
import '~/assets/css/video/danmu.scss';

import MyPlayIcon from 'assets/myIcons/video/play.svg';
import playNext from 'assets/myIcons/video/play-next.svg';
import startPlay from 'assets/myIcons/video/start-play.svg';
import replay from 'assets/myIcons/video/replay.svg';
import MyPauseIcon from 'assets/myIcons/video/pause.svg';
import startPause from 'assets/myIcons/video/start-pause.svg';
import volumeLarge from 'assets/myIcons/video/volume-large.svg';
import volumeSmall from 'assets/myIcons/video/volume-small.svg';
import volumeMuted from 'assets/myIcons/video/volume-muted.svg';
import fullscreen from 'assets/myIcons/video/fullscreen.svg';
import exitFullscreen from 'assets/myIcons/video/exit-full-screen.svg';
import pipIcon from 'assets/myIcons/video/pip-icon.svg';
import pipIconExit from 'assets/myIcons/video/pip-icon-exit.svg';
import cssFullscreen from 'assets/myIcons/video/css-full-screen.svg';
import exitCssFullscreen from 'assets/myIcons/video/exit-css-full-screen.svg';
import loadingIcon from 'assets/myIcons/video/loading-icon.svg';
import openDanmu from 'assets/myIcons/video/open-danmu.svg';
import closeDanmu from 'assets/myIcons/video/close-danmu.svg';


import {onMounted} from "vue";
const player = ref<any>(null)
interface propsType {
  url: string
  poster: string
  danmuComments?: Array<{
    duration: number
    id: number | string
    start?: number
    prior?: boolean
    color?: boolean
    txt: string
    style?: {
      color?: string
      fontSize?: string
      padding?: string
    }
    mode?: string
  }>
}

const props = withDefaults(defineProps<propsType>(), {
  url: '',
  poster: '',
  danmuComments: () => []
})

onMounted(() => {
  init()
})
watch(
    () => props.url,
    () => {
      init()
    },
    { deep: true }
)



const init = async () => {
  // console.log("props:"+JSON.stringify(props))
  player.value = new Player({
    lang: 'zh',
    id: 'videoPlayerId',
    url: props.url,
    poster: props.poster || '',
    fluid: true, // 采用流试布局
    pip: true, //是否启用画中画
    playbackRate : playbackRate,
    plugins: await getPlugins(),
    controls: {
      mode: 'normal'
    },
    dynamicBg: {
      disable: false
    },
    playnext: {
      urlList: ['https://api.yujn.cn/api/zzxjj.php','https://api.yujn.cn/api/zzxjj.php','https://api.yujn.cn/api/zzxjj.php']
    },

    danmu: {
      comments: props.danmuComments || [],
      area:{ start: 0, end: 0.6},
      opacity: 0.8,
      closeDefaultBtn: false
      // panel: true ,
    },



    icons: {
      play: MyPlayIcon,
      playNext: playNext,
      replay: replay,
      startPlay: startPlay,
      pause: MyPauseIcon,
      startPause: startPause,
      volumeLarge:volumeLarge,
      volumeSmall:volumeSmall,
      volumeMuted:volumeMuted,
      fullscreen:fullscreen,
      exitFullscreen:exitFullscreen,
      cssFullscreen:cssFullscreen,
      exitCssFullscreen:exitCssFullscreen,
      pipIcon:pipIcon,
      pipIconExit:pipIconExit,
      loadingIcon:loadingIcon,
      openDanmu:closeDanmu,
      closeDanmu:openDanmu,
    },
    ignores: ['cssfullscreen']


  })
}

const playbackRate = {
  list: [{
    text: '0.5X',
    rate: 0.5
  },{
    text: '0.75X',
    rate: 0.75
  }, {
    text: '1X',
    // iconText: '<span style="background: linear-gradient(90deg, #ffd1dc, #e6e6fa, #b0e0e6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">倍速</span>',
    iconText: '1X',
    rate: 1
  }, {
    text: '1.5X',
    rate: 1.5
  }, {
    text: '2X',
    rate: 2
  }]
}



const getPlugins = () => {
  let plugins = []
  // if ( /\.m3u8($|\?)/i.test(props.url) || /\/manifest\.m3u8/i.test(props.url)){
  //   plugins = [HlsPlugin]
  // }
  if ( /\.m3u8($|\?)/i.test(props.url) || /\/manifest\.m3u8/i.test(props.url)
      || /s3ae\.amberwels\.sbs/i.test(props.url) || /index-f1-v1-a1.txt/i.test(props.url)
      || props.url.toLowerCase().endsWith('.txt'))
  {
    // console.log("getPlugins--props.url"+props.url)
    plugins = [HlsPlugin]
  }
  plugins.push(Danmu);
  // console.log("getPlugins--props.url"+props.url)
  return plugins
}


/**
 * 销毁播放器
 */
onUnmounted(() => {
  player.value.destroy()
})
</script>

<template>
  <div id="videoPlayerId" class="rounded-xl overflow-hidden">
  </div>
</template>

<style scoped>

</style>