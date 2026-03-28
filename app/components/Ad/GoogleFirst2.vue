<template>
  <!-- 添加 ref 引用以便直接获取DOM元素 -->
  <div class="ad-container" ref="adContainerRef">
    广告2
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// 创建DOM引用
const adContainerRef = ref(null)

onMounted(() => {
  // 创建第一个script标签
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  script1.crossOrigin = 'anonymous'

  // 先添加脚本标签
  document.head.appendChild(script1)

  // 脚本加载完成后再创建广告元素
  script1.onload = () => {
    try {
      // 使用ref直接访问DOM元素
      if (!adContainerRef.value) return

      const ins = document.createElement('ins')
      ins.className = 'adsbygoogle'
      ins.style.display = 'block'
      ins.setAttribute('data-ad-client', 'ca-pub-1870872898412136')
      ins.setAttribute('data-ad-slot', '9250379418')
      ins.setAttribute('data-ad-format', 'auto')
      ins.setAttribute('data-full-width-responsive', 'true')

      // 将广告容器添加到组件内部
      adContainerRef.value.appendChild(ins)

      // 确保window.adsbygoogle存在再推送广告
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      } else {
        console.error('AdSense尚未加载完成')
      }
    } catch (e) {
      console.error('AdSense加载错误:', e)
    }
  }
})
</script>

<style scoped>
.ad-container {
  width: 100%;
  min-height: 100px;
}
</style>