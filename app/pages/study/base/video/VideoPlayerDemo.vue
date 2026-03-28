<script setup lang="ts">

import { ref } from 'vue'

// 示例视频源
const videoSources = [
  {
    name: '示例视频 1',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://picsum.photos/id/237/800/450'
  },
  {
    name: '示例视频 2',
    src: '/1.webm',
    poster: 'https://bu.dusays.com/2023/11/10/654e2d50015a9.jpg'
  },{
    name: '示例视频 3',
    src: '/按摩助眠2.webm',
    poster: 'https://bu.dusays.com/2023/11/10/654e2d50015a9.jpg'
  },  {
    name: '示例视频 4',
    src: 'https://oss.ideaflow.top/video/asmr/Yoonying%20%EF%BD%9C%20Kneels%20Down%20to%20Help%20You%20%EF%BD%9C%20ASMR%20%5BVFT2C9Cdbyk%5D.webm',
    poster: 'https://bu.dusays.com/2023/11/10/654e2d50015a9.jpg'
  },{
    name: 'm3u8示例视频 5',
    src: 'https://oss.ideaflow.top/m3u8Test2/IMG_2344.m3u8',
    poster: 'https://bu.dusays.com/2023/11/10/654e2d50015a9.jpg'
  },
  {
    name: 'moonvideo',
    src: 'https://filemoon.to/e/wxlr053zzglg',
    poster: 'https://bu.dusays.com/2023/11/10/654e2d50015a9.jpg'
  },
  {
    name: 'upvideo',
    src: 'https://s3ae.amberwels.sbs/v4/vz1/3vnzbb/index-f1-v1-a1.txt',
    poster: 'https://bu.dusays.com/2023/11/10/654e2d50015a9.jpg'
  },

]

const currentVideoIndex = ref(5)
const currentVideo = ref(videoSources[currentVideoIndex.value])

const changeVideo = (index: number) => {
  currentVideoIndex.value = index
  currentVideo.value = videoSources[index]
}




</script>

<template>


<client-only>

  <div class="max-w-6xl mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">视频播放器组件示例</h1>

    <!-- 基础用法 -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">基础用法</h2>
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div class="mb-4">
          <div class="flex flex-wrap gap-2 mb-4">
            <button
                v-for="(source, index) in videoSources"
                :key="index"
                @click="changeVideo(index)"
                class="px-4 py-2 rounded-lg transition-colors"
                :class="currentVideoIndex === index ?
                'bg-primary text-white' :
                'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'"
            >
              {{ source.name }}
            </button>
          </div>
        </div>

        <BaseVideoPlayer
            :url="currentVideo.src"
            :poster="currentVideo.poster"
        />

        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>基础视频播放器，支持播放/暂停、进度条拖动、音量控制等功能。</p>
        </div>
      </div>
    </section>


    <iframe src="https://filemoon.to/e/wxlr053zzglg" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>





  </div>
</client-only>



</template>