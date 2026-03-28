<script setup lang="ts">
// const appStore = useAppStore()
// // 示例：如何使用配置数据
// const webBaseConfig = computed(() => appStore.getConfigData?.webBaseConfig)
//
// // 从homeImgUrl数组中随机获取一张图片
// const randomBackgroundImage = computed(() => {
//   const images = webBaseConfig.value?.homeImgUrl || []
//   if (images.length === 0) return 'https://oss.ideaflow.top/backgroundPicture.avif'
//   const randomIndex = Math.floor(Math.random() * images.length)
//   return images[randomIndex]
// })
</script>

<template>
<!--  &lt;!&ndash; 大型头图区域 &ndash;&gt;-->
<!--  <div class="relative w-full h-[60vh] min-h-[400px] overflow-hidden">-->
<!--    &lt;!&ndash; 背景图片 &ndash;&gt;-->
<!--    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"-->
<!--         :style="{ backgroundImage: `url('${randomBackgroundImage}')` }">-->
<!--      &lt;!&ndash; 暗黑模式遮罩层 &ndash;&gt;-->
<!--      <div class="absolute inset-0 bg-black/1 dark:bg-black/30 transition-opacity duration-300"></div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <Ripple></Ripple>-->

  <!-- 头部大图区域 -->
  <BlogImgBackground :isRipple="true">
    <!-- 星空效果 -->
    <BlogStarry />
  </BlogImgBackground>
</template>

<style scoped>

</style>