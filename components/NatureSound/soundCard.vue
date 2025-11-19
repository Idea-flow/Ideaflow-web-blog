<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import {useNatureSoundStore} from "~/stores/natureSound";
import VolumeRange from "~/components/NatureSound/volumeRange/index.vue"
interface NatureSound {
  icon: string
  id: string
  label: string
  src: string
}

const props = defineProps<{
  sound: NatureSound
}>()

// 使变量在模板中可用
const { sound } = props

// 判断是否使用内置图标
const isInternalIcon = computed(() => sound.icon.includes('myNatureSound'))
const natureSoundStore = useNatureSoundStore()

const audio = ref<HTMLAudioElement | null>(null)
const isPlayingThis = ref(false)
const volume = ref(natureSoundStore.natureSounds[sound.id].volume)

// 监听 volume 的变化，自动更新 audio 元素的音量
watch(volume, (newVolume) => {
  // console.log('soundCard-监听音量变化:', newVolume)
  if (audio.value) {
    audio.value.volume = newVolume
  }
})
const isSelect = computed(() => natureSoundStore.natureSounds[sound.id].isSelected)

const isPlayingState = computed(() => natureSoundStore.isPlaying)

const enableVolumeControl = computed(() => natureSoundStore.enableVolumeControl)


const hasInitialized = ref(false)

// 延迟初始化音频
const initAudio = () => {
  if (!hasInitialized.value) {
    audio.value = new Audio(sound.src)
    audio.value.volume = volume.value
    audio.value.loop = true
    hasInitialized.value = true
  }
}

// 清理事件监听
onUnmounted(() => {
  if (audio.value) {
    audio.value.pause()
  }
})


// 切换选中状态
const toggle = () => {
  // 确保音频已初始化
  initAudio()
  // 根据当前选中状态执行相应的操作
  if (isSelect.value) {
    // console.log('unselectSound')
    unselectSound();
  } else{
    // console.log('selectSound')
    selectSound();
  }
}
function selectSound() {
  //选择
  natureSoundStore.actionToggleSelected(sound.id)
  natureSoundStore.actionPlay()
}
function unselectSound() {
  natureSoundStore.actionToggleUnSelected(sound.id);
  natureSoundStore.actionSetVolume(sound.id,0.5);
}

if (import.meta.client) {

// 监听选中状态和全局播放状态
  watch(
      [isSelect, isPlayingState],
      ([newIsSelect, newIsPlaying]) => {
        // console.log(sound.id+':isSelect',newIsSelect)
        // console.log(sound.id+':isPlayingState',newIsPlaying)

        if (!audio.value) return

        if (newIsSelect && newIsPlaying) {
          // 两个条件都为true时播放
          audio.value.play()
          isPlayingThis.value = true
        } else {
          // 任一条件为false时暂停
          audio.value.pause()
          isPlayingThis.value = false
        }
      },
      { immediate: true } // 立即执行一次
  )
}

const handleVolumeChange = (value: number) => {
  // 处理音量变化
  // console.log('soundCard-handleVolumeChange音量变化:', value)
  natureSoundStore.actionSetVolume(sound.id,value)
}
</script>

<template>
  <div
      class="relative h-44 w-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-4 group
          bg-gradient-to-br from-green-50 to-emerald-100
         dark:from-slate-800/90 dark:to-teal-900/80 dark:text-gray-300 dark:backdrop-blur-sm"

  >
    <!-- 选中状态指示器 -->
    <div 
      v-if="isSelect" 
      class="absolute top-2 right-2 z-10 transform transition-transform duration-300"
    >
      <Icon name="myNatureSound:base-selected" class="text-emerald-500 dark:text-emerald-400"></Icon>
<!--      <svg -->
<!--        xmlns="http://www.w3.org/2000/svg" -->
<!--        class="h-6 w-6 text-emerald-500 dark:text-emerald-400" -->
<!--        viewBox="0 0 20 20" -->
<!--        fill="currentColor"-->
<!--      >-->
<!--        <path -->
<!--          fill-rule="evenodd" -->
<!--          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" -->
<!--          clip-rule="evenodd" -->
<!--        />-->
<!--      </svg>-->
    </div>
    <!-- 图标和标题区域 -->
    <div class="flex flex-col items-center gap-2 mb-4 relative">
      <div class="relative flex items-center">
        <!-- 可点击的图标区域 -->
        <div class="relative">
          <icon
            v-if="isInternalIcon"
            :name="sound.icon"
            class="
      w-9 h-9
     sm:w-9 sm:h-9
     md:w-10 md:h-10
     lg:w-14 lg:h-14

            cursor-pointer transition-transform duration-300 hover:scale-105
                   dark:opacity-90 dark:hover:opacity-100"
            @click="toggle"
          />
          <img
            v-else
            :src="sound.icon"
            :alt="sound.label"
            class="
                   w-9 h-9
     sm:w-9 sm:h-9
     md:w-10 md:h-10
     lg:w-14 lg:h-14
            rounded-full cursor-pointer transition-transform duration-300 hover:scale-105
                   dark:opacity-90 dark:hover:opacity-100"
            @click="toggle"
          />
        </div>
        
        <!-- 播放状态指示器 -->
        <div 
          v-if="isPlayingThis"
          class="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center"
        >
<!--          <icon -->
<!--            name="myNatureSound:base-audio-playing"-->
<!--            class="w-10 h-10 "-->
<!--          />-->
<!--          123-->
          <icon
              name="myNatureSound:base-audio-test"
              class="w-10 h-10  text-emerald-500 dark:text-emerald-400"
          />
        </div>
      </div>
      <h3 class="text-lg font-medium opacity-90 dark:opacity-80 dark:text-gray-300">{{ sound.label }}</h3>
      <div v-if="enableVolumeControl">
            <VolumeRange
                v-model="volume"
                :min="0"
                :max="1"
                :step="0.1"
                @change="handleVolumeChange"
            />

      </div>
    </div>
  </div>
</template>

<style scoped>


</style>