<script setup lang="ts">
// 定义组件属性
interface Props {
  src?: string // 背景图片地址
  isRipple?: boolean // 是否显示底部波浪效果
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  src: '',
  isRipple: false
})

const appStore = useAppStore()
// 示例：如何使用配置数据
const webBaseConfig = computed(() => appStore.getConfigData?.webBaseConfig)

// 从homeImgUrl数组中随机获取一张图片
const randomBackgroundImage = computed(() => {
  const images = webBaseConfig.value?.homeImgUrl || []
  if (images.length === 0) return 'https://oss.ideaflow.top/configImg/backgroundImg.jpg'
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
})


// 计算背景图片
const backgroundImage = computed(() => {
  const imgSrc = props.src || randomBackgroundImage.value
  return `url(${imgSrc})`
})
</script>

<template>
  <div>
    <!-- 大图背景区域 -->
<!--    <div class="overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] relative bg-cover bg-center after:content-[''] "-->
<!--    <div class="relative w-full h-[60vh] min-h-[400px] overflow-hidden  absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"-->
    <div class="relative w-full h-[60vh] min-h-[400px] overflow-hidden  absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
         :style="{ backgroundImage }">
      <!-- 暗色遮罩层 -->
      <div class="absolute inset-0 bg-black/1 dark:bg-black/30 transition-opacity duration-300"></div>
      <!-- 底部渐变效果 -->
      <div class="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-white/60 to-transparent dark:from-gray-800/60 z-0"></div>

      <!-- 插槽内容 -->
      <slot></slot>
    </div>

    <!-- 波浪效果组件 -->
    <BlogRipple v-if="isRipple" />
  </div>
</template>