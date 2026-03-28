<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">音频播放列表</h1>

      <BaseAudioM3u8PlayAudioGc3 :audio="selectedAudio"/>
      <!-- 音频播放列表组件 -->
      <BaseAudioCommonList
          :audio-list="audioData"
          @select="handleAudioSelect"
      />

      <!-- 显示选中的音频信息 -->
      <div
          v-if="selectedAudio"
          class="mt-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-white/50 dark:border-gray-700/50 p-4"
      >
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">当前选中音频</h2>
        <div class="text-gray-700 dark:text-gray-300">
          <p><span class="font-medium">标题:</span> {{ selectedAudio.title }}</p>
          <p><span class="font-medium">作者:</span> {{ selectedAudio.author || '未知' }}</p>
          <p><span class="font-medium">时长:</span> {{ selectedAudio.duration || '未知' }}</p>
          <p><span class="font-medium">大小:</span> {{ selectedAudio.size || '未知' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AudioList from '@/components/Base/Audio/Common/List.vue'

const audioData = ref([
  {
    id:1,
    src: 'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8',
    title: '测试',
    coverImage: '/logo.webp',
    author: '测试',
    duration: '29:40',
    size: '42.8MB'
  },
  {
    id:2,
    src: '/m3u8Test2/bhyphgn.m3u8',
    title: '把回忆拼好给你',
    coverImage: '/logo.webp',
    author: '二浪',
    duration: '29:40',
    size: '42.8MB'
  },
  {
    id:3,
    src: '/wanerTest/waner.m3u8',
    title: 'Waner Test Audio',
    coverImage: '/logo.webp',
    author: '婉儿别闹',
    duration: '29:40',
    size: '42.8MB'
  }
])
// 定义音频数据
const audioData1 = ref([
  {
    id: 1,
    src: 'https://example.com/audio1.mp3',
    title: 'Vue.js 入门教程',
    author: '张三',
    coverImage: 'https://picsum.photos/200/200?random=1',
    duration: '15:30',
    size: '22.5MB'
  },
  {
    id: 2,
    src: 'https://example.com/audio2.mp3',
    title: 'TypeScript 高级技巧',
    author: '李四',
    coverImage: 'https://picsum.photos/200/200?random=2',
    duration: '22:15',
    size: '31.2MB'
  },
  {
    id: 3,
    src: 'https://example.com/audio3.mp3',
    title: 'TailwindCSS 实战指南',
    author: '王五',
    coverImage: 'https://picsum.photos/200/200?random=3',
    duration: '18:45',
    size: '27.8MB'
  },
  {
    id: 4,
    src: 'https://example.com/audio4.mp3',
    title: 'Node.js 微服务架构',
    author: '赵六',
    coverImage: 'https://picsum.photos/200/200?random=4',
    duration: '32:10',
    size: '46.3MB'
  },
  {
    id: 5,
    src: 'https://example.com/audio5.mp3',
    title: 'React Hooks 深度解析',
    author: '钱七',
    coverImage: 'https://picsum.photos/200/200?random=5',
    duration: '25:40',
    size: '37.1MB'
  },
  {
    id: 6,
    src: 'https://example.com/audio6.mp3',
    title: '数据库设计优化',
    author: '孙八',
    coverImage: 'https://picsum.photos/200/200?random=6',
    duration: '19:25',
    size: '28.7MB'
  },
  {
    id: 7,
    src: 'https://example.com/audio7.mp3',
    title: 'Web 安全最佳实践',
    author: '周九',
    coverImage: 'https://picsum.photos/200/200?random=7',
    duration: '28:55',
    size: '41.9MB'
  },
  {
    id: 8,
    src: 'https://example.com/audio8.mp3',
    title: '移动应用性能优化',
    author: '吴十',
    coverImage: 'https://picsum.photos/200/200?random=8',
    duration: '21:30',
    size: '30.4MB'
  },
  {
    id: 9,
    src: 'https://example.com/audio9.mp3',
    title: 'DevOps 实践分享',
    author: '郑十一',
    coverImage: 'https://picsum.photos/200/200?random=9',
    duration: '35:20',
    size: '50.6MB'
  },
  {
    id: 10,
    src: 'https://example.com/audio10.mp3',
    title: '人工智能在前端的应用',
    author: '王十二',
    coverImage: 'https://picsum.photos/200/200?random=10',
    duration: '26:45',
    size: '38.2MB'
  },
  {
    id: 11,
    src: 'https://example.com/audio11.mp3',
    title: 'GraphQL 与 REST 对比',
    author: '李十三',
    coverImage: 'https://picsum.photos/200/200?random=11',
    duration: '23:15',
    size: '33.7MB'
  },
  {
    id: 12,
    src: 'https://example.com/audio12.mp3',
    title: '微前端架构探索',
    coverImage: 'https://picsum.photos/200/200?random=12',
    author: '张十四',
    duration: '29:40',
    size: '42.8MB'
  }
])

// 响应式变量存储选中的音频
const selectedAudio = ref<any>(audioData.value[0])

// 处理音频选择事件
const handleAudioSelect = (audio: any) => {
  selectedAudio.value = audio
  console.log('选中的音频:', audio)
  // 这里可以添加播放音频的逻辑
}
</script>
