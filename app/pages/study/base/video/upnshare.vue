<script setup lang="ts">

///Users/wangpenglong/ideaProject/myCode/IdeaFlowMini/Ideaflow-web/pages/study/base/video/upnshare.vue


// /study/base/video/upnshare
const route = useRoute()
const  url = ref('')
onMounted(() => {
  const rawUrl = route.query.url as string || ''
  url.value = rawUrl ? decodeURIComponent(rawUrl) : ''

  console.log('upnshare url:', rawUrl)


})

</script>

<template>
  <client-only>
    <div style="width: 100%; position: relative; padding-bottom: 56.25%; /* 16:9 比例 */" v-if="url">
      <iframe
          :src="url"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 10px;"
          allowfullscreen
      ></iframe>
    </div>

    <div v-else class="text-center text-gray-500 mt-10">
      <p>视频链接未提供或无效</p>
    </div>
  </client-only>

</template>

<style scoped>

</style>