<script setup lang="ts">
import Hls from 'hls.js';
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';

const props = defineProps({
  audio: { 
    type: Object as PropType<{
      src: string;
      title: string;
      coverImage: string;
    }>,
    required: true
  }
});

const audioElement = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const volume = ref(0.7);
const currentTime = ref(0);
const duration = ref(0);
const bufferedRanges = ref<{start: number, end: number}[]>([]);
const isSeeking = ref(false);
const playbackRate = ref(1.0);
const showVolumeControl = ref(false);
const showPlaybackRateControl = ref(false);
let hls: Hls | null = null;

// 音量控制面板的鼠标事件处理
let volumeTimeout: number | null = null;
const handleVolumeMouseEnter = () => {
  if (volumeTimeout) {
    clearTimeout(volumeTimeout);
    volumeTimeout = null;
  }
  showVolumeControl.value = true;
};

const handleVolumeMouseLeave = () => {
  volumeTimeout = setTimeout(() => {
    showVolumeControl.value = false;
  }, 100); // 延迟100ms隐藏，避免鼠标在按钮和面板之间移动时面板消失
};

// 倍速控制面板的鼠标事件处理
let playbackRateTimeout: number | null = null;
const handlePlaybackRateMouseEnter = () => {
  if (playbackRateTimeout) {
    clearTimeout(playbackRateTimeout);
    playbackRateTimeout = null;
  }
  showPlaybackRateControl.value = true;
};

const handlePlaybackRateMouseLeave = () => {
  playbackRateTimeout = setTimeout(() => {
    showPlaybackRateControl.value = false;
  }, 100); // 延迟100ms隐藏
};

// 初始化播放器
const initPlayer = () => {
  if (!audioElement.value) return;

  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(props.audio.src);
    hls.attachMedia(audioElement.value);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      audioElement.value!.volume = volume.value;
      audioElement.value!.playbackRate = playbackRate.value; // 设置初始倍速
    });
  } else if (audioElement.value.canPlayType('application/vnd.apple.mpegurl')) {
    audioElement.value.src = props.audio.src;
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

// 倍速控制
watch(playbackRate, (newRate) => {
  if (audioElement.value) audioElement.value.playbackRate = newRate;
});

// 时间更新
const updateTime = () => {
  if (audioElement.value && !isSeeking.value) {
    currentTime.value = audioElement.value.currentTime;
    duration.value = audioElement.value.duration || 0;
  }
};

// 缓冲更新
const updateBuffer = () => {
  if (audioElement.value) {
    const bufferedTime = audioElement.value.buffered;
    const ranges = [];
    for (let i = 0; i < bufferedTime.length; i++) {
      ranges.push({
        start: bufferedTime.start(i),
        end: bufferedTime.end(i)
      });
    }
    // 合并相邻或重叠的缓冲区
    const mergedRanges = mergeBufferedRanges(ranges);
    bufferedRanges.value = mergedRanges;
  }
};

// 合并相邻或重叠的缓冲区
const mergeBufferedRanges = (ranges: {start: number, end: number}[]) => {
  if (ranges.length <= 1) return ranges;
  
  // 按起始时间排序
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged = [sorted[0]];
  
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];
    
    // 如果当前区域与上一个区域重叠或相邻(阈值0.1秒)
    if (current.start <= last.end + 0.1) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }
  
  return merged;
};

// 格式化时间显示
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 计算点击位置的百分比
const getSeekPercent = (event: MouseEvent, progressBar: HTMLDivElement) => {
  const rect = progressBar.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  return Math.max(0, Math.min(1, percent));
};

// 设置音频时间
const setAudioTime = (percent: number) => {
  if (!audioElement.value) return;
  const newTime = percent * duration.value;
  audioElement.value.currentTime = newTime;
  currentTime.value = newTime;
};

// 处理点击进度条
const handleClick = (event: MouseEvent) => {
  if (!audioElement.value || isSeeking.value) return;
  
  const progressBar = event.currentTarget as HTMLDivElement;
  const percent = getSeekPercent(event, progressBar);
  setAudioTime(percent);
};

// 开始拖拽
const startDrag = (event: MouseEvent) => {
  if (!audioElement.value) return;
  
  isSeeking.value = true;
  const progressBar = event.currentTarget as HTMLDivElement;
  const percent = getSeekPercent(event, progressBar);
  currentTime.value = percent * duration.value;
};

// 拖拽过程中更新
const updateSeek = (event: MouseEvent) => {
  if (!isSeeking.value || !audioElement.value) return;
  
  const progressBar = document.querySelector('.progress-bar') as HTMLDivElement;
  if (!progressBar) return;
  
  const percent = getSeekPercent(event, progressBar);
  currentTime.value = percent * duration.value;
};

// 结束拖拽
const stopDrag = () => {
  if (!isSeeking.value || !audioElement.value) return;
  
  isSeeking.value = false;
  const percent = currentTime.value / duration.value;
  setAudioTime(percent);
};

// 计算进度百分比
const progressPercentage = computed(() => {
  if (duration.value <= 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

// 计算缓冲百分比范围
const bufferedPercentages = computed(() => {
  if (duration.value <= 0) return [];
  return bufferedRanges.value.map(range => ({
    start: (range.start / duration.value) * 100,
    end: (range.end / duration.value) * 100
  }));
});

// 封面图片
const coverImageUrl = computed(() => {
  return props.audio.coverImage || '/default-audio-cover.png';
});

// 监听audio.src变化，重新初始化播放器
watch(() => props.audio.src, (newSrc, oldSrc) => {
  if (newSrc !== oldSrc) {
    // 销毁现有的hls实例
    if (hls) {
      hls.destroy();
      hls = null;
    }
    
    // 重置状态
    isPlaying.value = false;
    currentTime.value = 0;
    duration.value = 0;
    bufferedRanges.value = [];
    
    // 重新初始化
    initPlayer();
  }
});

// 倍速选项
const playbackRates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

onMounted(() => {
  initPlayer();
  if (audioElement.value) {
    audioElement.value.addEventListener('timeupdate', updateTime);
    audioElement.value.addEventListener('progress', updateBuffer);
    audioElement.value.addEventListener('loadedmetadata', updateTime);
  }
  
  // 添加鼠标事件监听器
  window.addEventListener('mousemove', updateSeek);
  window.addEventListener('mouseup', stopDrag);
});

onBeforeUnmount(() => {
  // 清理定时器
  if (volumeTimeout) {
    clearTimeout(volumeTimeout);
  }
  if (playbackRateTimeout) {
    clearTimeout(playbackRateTimeout);
  }
  
  if (hls) hls.destroy();
  if (audioElement.value) {
    audioElement.value.removeEventListener('timeupdate', updateTime);
    audioElement.value.removeEventListener('progress', updateBuffer);
    audioElement.value.removeEventListener('loadedmetadata', updateTime);
  }
  
  // 移除鼠标事件监听器
  window.removeEventListener('mousemove', updateSeek);
  window.removeEventListener('mouseup', stopDrag);
});
</script>

<template>
  <div class="bg-purple-50 dark:bg-gray-700 p-3 sm:p-4 rounded-xl flex flex-row gap-3 sm:gap-4 relative overflow-hidden">
    <!-- 手绘风格装饰元素 -->
    <div class="absolute top-2 left-2 w-3 h-3 rounded-full bg-pink-300 dark:bg-pink-500 opacity-70"></div>
    <div class="absolute top-2 right-2 w-3 h-3 rounded-full bg-blue-300 dark:bg-blue-500 opacity-70"></div>
    <div class="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-yellow-300 dark:bg-yellow-500 opacity-70"></div>
    <div class="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-green-300 dark:bg-green-500 opacity-70"></div>
    
    <!-- 左侧封面和播放控制区域 -->
    <div class="relative w-1/3 flex items-center justify-center">
      <div class="relative w-full aspect-square max-w-[180px] sm:max-w-xs">
        <img 
          :src="coverImageUrl" 
          alt="音频封面" 
          class="w-full h-full object-cover rounded-xl shadow-md border-2 border-purple-200 dark:border-gray-600"
        >
        <div 
          class="absolute inset-0 flex items-center justify-center cursor-pointer"
          @click="togglePlay"
        >
          <!-- 播放图标（未播放时显示） -->
          <svg 
            v-if="!isPlaying" 
            class="w-12 h-12 sm:w-16 sm:h-16 text-purple-700 dark:text-purple-300 opacity-90 drop-shadow-lg" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            style="filter: url(#scribble-filter)"
          >
            <path d="M8 5v14l11-7z" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          
          <!-- 暂停图标（播放时显示在右下角） -->
          <div v-else class="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-purple-500 dark:bg-purple-600 bg-opacity-70 rounded-full p-1">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 右侧音频信息和控制区域 -->
    <div class="flex-1 flex flex-col justify-between">
      <!-- 音频标题 -->
      <div class="mb-3 sm:mb-4">
        <h3 class="text-lg sm:text-xl font-bold text-purple-800 dark:text-purple-200 truncate">{{ audio.title }}</h3>
      </div>
      
      <!-- 进度条和时间信息 -->
      <div class="space-y-2">
        <div 
          class="progress-bar w-full h-1.5 sm:h-2 bg-purple-200 dark:bg-gray-600 rounded-full cursor-pointer relative"
          @click="handleClick"
          @mousedown="startDrag"
        >
          <!-- 缓冲进度条容器 -->
          <div class="absolute inset-0 rounded-full overflow-hidden">
            <!-- 缓冲进度条 -->
            <div 
              v-for="(range, index) in bufferedPercentages"
              :key="index"
              class="absolute top-0 left-0 h-full bg-purple-300 dark:bg-gray-500"
              :style="{ 
                left: range.start + '%',
                width: (range.end - range.start) + '%' 
              }"
            ></div>
          </div>
          
          <!-- 播放进度条 -->
          <div 
            class="relative h-full bg-purple-600 dark:bg-purple-400 rounded-full transition-all duration-300 ease-out" 
            :style="{ width: progressPercentage + '%' }"
          >
            <!-- 拖拽点 -->
            <div class="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-purple-600 dark:bg-purple-400 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200 shadow-md"></div>
          </div>
        </div>
        
        <div class="flex justify-between text-xs sm:text-sm text-purple-700 dark:text-purple-300">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>
      
      <!-- 控制按钮区域 -->
      <div class="mt-3 sm:mt-4 flex items-center space-x-2 sm:space-x-3 relative">
        <!-- 音量控制按钮 -->
        <div class="relative"
             @mouseleave="handleVolumeMouseLeave"
             @mouseenter="handleVolumeMouseEnter">
          <button 
            @click="showVolumeControl = !showVolumeControl"
            class="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-gray-600 focus:outline-none border border-purple-200 dark:border-gray-600"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-purple-700 dark:text-purple-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <!-- 音量控制面板 -->
          <div 
            v-show="showVolumeControl" 
            @mouseenter="showVolumeControl = true"
            @mouseleave="showVolumeControl = false"
            class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg w-32 border border-purple-200 dark:border-gray-600"
          >
            <input
              type="range"
              v-model="volume"
              min="0" max="1" step="0.01"
              class="w-full accent-purple-600 dark:accent-purple-400"
              orient="vertical"
            >
            <div class="text-center text-xs text-purple-700 dark:text-purple-300 mt-1">{{ Math.round(volume * 100) }}%</div>
          </div>
        </div>
        
        <!-- 倍速控制按钮 -->
        <div class="relative"
             @mouseleave="handlePlaybackRateMouseLeave"
             @mouseenter="handlePlaybackRateMouseEnter">
          <button 
            @click="showPlaybackRateControl = !showPlaybackRateControl"
            class="px-2 py-1 rounded hover:bg-purple-100 dark:hover:bg-gray-600 focus:outline-none text-sm sm:text-base border border-purple-200 dark:border-gray-600 text-purple-700 dark:text-purple-300"
          >
            {{ playbackRate }}x
          </button>
          
          <!-- 倍速控制面板 -->
          <div 
            v-show="showPlaybackRateControl" 
            ref="playbackRatePanelRef"
            class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg w-32 border border-purple-200 dark:border-gray-600"
          >
            <div class="grid grid-cols-2 gap-1">
              <button
                v-for="rate in playbackRates"
                :key="rate"
                @click="playbackRate = rate"
                class="px-2 py-1 text-sm rounded hover:bg-purple-100 dark:hover:bg-gray-700"
                :class="{ 'bg-purple-500 dark:bg-purple-600 text-white': playbackRate === rate }"
              >
                {{ rate }}x
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <audio ref="audioElement" class="hidden"></audio>
    </div>
    
    <!-- 手绘滤镜定义 -->
    <svg class="absolute -z-10" width="0" height="0">
      <filter id="scribble-filter" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </svg>
  </div>
</template>