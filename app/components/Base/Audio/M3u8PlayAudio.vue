
<script setup lang="ts">
import Hls from 'hls.js';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  src: { type: String, required: true }
});

const audioElement = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const volume = ref(0.7);
let hls: Hls | null = null;

// 初始化播放器
const initPlayer = () => {
  if (!audioElement.value) return;

  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(props.src);
    console.log('HLS is supported, attaching media source,',props.src);
    hls.attachMedia(audioElement.value);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      audioElement.value!.volume = volume.value;
    });
  } else if (audioElement.value.canPlayType('application/vnd.apple.mpegurl')) {
    audioElement.value.src = props.src;
  }
};

// 播放/暂停控制
const togglePlay = () => {
  if (!audioElement.value) return;

  if (isPlaying.value) {
    audioElement.value.pause();
  } else {
    audioElement.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

// 音量控制
watch(volume, (newVol) => {
  if (audioElement.value) audioElement.value.volume = newVol;
});

onMounted(initPlayer);
onBeforeUnmount(() => {
  if (hls) hls.destroy();
});
</script>
<template>

  <div class="bg-gray-100 p-4 rounded-lg">
    <audio ref="audioElement" controls class="w-full"></audio>
    <div class="mt-4 flex space-x-2">
      <button
          @click="togglePlay"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {{ isPlaying ? '暂停' : '播放' }}
      </button>
      <input
          type="range"
          v-model="volume"
          min="0" max="1" step="0.1"
          class="w-32"
      >
    </div>
  </div>
</template>
