<script setup lang="ts">
import { NatureSoundCategory } from "~/types/natureSound"
import SoundCard from "~/components/NatureSound/soundCard.vue"
import { computed, onMounted, ref } from 'vue'

interface Props {
  category: NatureSoundCategory
  maxRows?: number
  scrollDirection?: 'vertical' | 'horizontal'
}

const props = withDefaults(defineProps<Props>(), {
  maxRows: 2,
  scrollDirection: 'vertical'
})

const scrollContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (scrollContainer.value && props.scrollDirection === 'horizontal') {
    scrollContainer.value.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault()
        scrollContainer.value!.scrollLeft += e.deltaY
      }
    }, { passive: false })
  }
})

// 计算容器样式
const containerStyle = computed(() => {
  const style = {
    display: 'grid',
    gap: '1rem',
    padding: '1rem',
    overflowX: props.scrollDirection === 'horizontal' ? 'auto' : 'hidden',
    overflowY: props.scrollDirection === 'vertical' ? 'auto' : 'hidden',
    maxHeight: props.scrollDirection === 'vertical' ? `${props.maxRows * 12}rem` : 'auto',
  }

  if (props.scrollDirection === 'horizontal') {
    return {
      ...style,
      gridAutoFlow: 'column',
      gridAutoColumns: 'minmax(16rem, 1fr)',
      gridTemplateRows: 'auto',
    }
  }

  return {
    ...style,
    gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
    gridAutoRows: 'minmax(12rem, auto)'
  }
})
</script>

<template>
  <div class="w-full space-y-4">
    <!-- 头部区域 -->
    <div class="flex items-center space-x-3 px-4">
      <div class="   w-9 h-9
     sm:w-9 sm:h-9
     md:w-10 md:h-10
     lg:w-14 lg:h-14


      flex items-center justify-center rounded-lg">
        <img v-if="!props.category.icon.includes('myNatureSound')" :src="props.category.icon" :alt="props.category.title" class="   w-9 h-9
     sm:w-9 sm:h-9
     md:w-10 md:h-10
     lg:w-14 lg:h-14
rounded-full cursor-pointer transition-transform duration-300 hover:scale-105
                   dark:opacity-90 dark:hover:opacity-100">
        <div v-else class="   w-9 h-9
     sm:w-9 sm:h-9
     md:w-10 md:h-10
     lg:w-14 lg:h-14 text-primary-500">
          <!-- 这里可以放置内置图标组件 -->
          <icon
              :name="props.category.icon"
              class="   w-9 h-9
     sm:w-9 sm:h-9
     md:w-10 md:h-10
     lg:w-14 lg:h-14


              cursor-pointer transition-transform duration-300 hover:scale-105
                   dark:opacity-90 dark:hover:opacity-100"
          />
        </div>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ props.category.title }}</h3>
    </div>

    <!-- 音频卡片网格 -->
    <div
      ref="scrollContainer"
      :style="containerStyle"
      class="hide-scrollbar overflow-x-auto"
    >
      <SoundCard
        v-for="sound in props.category.natureSounds"
        :key="sound.id"
        :sound="sound"
        class="w-full h-full"
      />
    </div>
  </div>
</template>

<style scoped>
</style>