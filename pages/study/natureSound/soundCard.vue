<script setup lang="ts">
//http://localhost:3005/study/natureSound/soundCard
import { NatureSoundCategory } from "~/types/natureSound"
import Naturesound from "~/components/NatureSound/soundCard.vue"
import SoundCardCategory from "~/components/NatureSound/soundCardCategory.vue"
import { ref } from "vue"

const sound = ref({
  icon: 'myNatureSound:river',
  id: 'wind',
  label: '水声',
  // src: 'https://oss.ideaflow.top/natureSound/sounds/nature/wind.mp3'
  src: 'https://oss.ideaflow.top/natureSound/sounds/nature/river.mp3'
})

const sound2 = ref({
  icon: '/favicon.ico',
  id: 'wind',
  label: '风声',
  src: 'https://oss.ideaflow.top/natureSound/sounds/nature/wind.mp3'
})

const sound3 = ref({
  icon: '/favicon.ico',
  id: 'wind2',
  label: '风声2',
  src: 'https://oss.ideaflow.top/natureSound/sounds/nature/wind.mp3'
})

const sound4 = ref({
  icon: '/favicon.ico',
  id: 'wind3',
  label: '风声3',
  src: 'https://oss.ideaflow.top/natureSound/sounds/nature/wind.mp3'
})
const sound5 = ref({
  icon: '/favicon.ico',
  id: 'wind5',
  label: '风声5',
  src: 'https://oss.ideaflow.top/natureSound/sounds/nature/wind.mp3'
})
const sound6 = ref({
  icon: '/favicon.ico',
  id: 'wind6',
  label: '风声6',
  src: 'https://oss.ideaflow.top/natureSound/sounds/nature/wind.mp3'
})

const categoryData = ref<NatureSoundCategory>({
  id: 'nature',
  title: '自然音效',
  icon: 'myNatureSound:river',
  natureSounds: [
    sound.value,
    sound2.value,
    sound3.value,
    sound4.value,
    sound5.value,
    sound6.value,

  ]
})
</script>

<template>
  <Naturesound :sound = sound></Naturesound>
  <Naturesound :sound = sound2></Naturesound>

  <br>
  <br>
  <br>

  <SoundCardCategory
      :category="categoryData"
      :itemsPerRow="1"
      :maxRows="2"
      scrollDirection="vertical"
  />
</template>

<style scoped>

</style>