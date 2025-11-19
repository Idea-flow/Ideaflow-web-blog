<script setup lang="ts">

import Naturesound from "~/components/NatureSound/soundCard.vue";
import {ref} from "vue";

const sound = ref({
  icon: 'myNatureSound:river',
  id: 'wind',
  label: '水声',
  // src: 'https://oss.ideaflow.top/natureSound/sounds/nature/wind.mp3'
  src: 'https://oss.ideaflow.top/natureSound/sounds/nature/river.mp3'
})



</script>

<template>
<!--  <Naturesound :sound = sound></Naturesound>-->
  
  <br>
  
  <img src="https://oss.ideaflow.top/configImg/default-avatar.webp">
</template>



<style scoped>

</style>