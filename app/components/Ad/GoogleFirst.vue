<template>
  <div v-if="loaded" ref="adContainer">
    广告位置
  </div>
</template>

<script setup>
const props = defineProps({
  adSlot: {
    type: String,
    default:'9250379418' // 默认广告位ID
  },
  adFormat: {
    type: String,
    default: 'auto'
  },
  fullWidth: {
    type: Boolean,
    default: true
  }
})

const adContainer = ref(null)
const loaded = ref(false)

// 加载广告脚本
const loadAdsenseScript = () => {
  if (process.server) return

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1870872898412136'
  script.crossorigin = 'anonymous'

  script.onload = () => {
    loaded.value = true
    renderAd()
  }

  document.head.appendChild(script)
}

// 渲染广告
const renderAd = () => {
  if (!adContainer.value || !window.adsbygoogle) return

  const ins = document.createElement('ins')
  ins.className = 'adsbygoogle'
  ins.style.display = 'block'
  ins.dataset.adClient = 'ca-pub-1870872898412136'
  ins.dataset.adSlot = props.adSlot
  ins.dataset.adFormat = props.adFormat

  if (props.fullWidth) {
    ins.dataset.fullWidthResponsive = 'true'
  }

  adContainer.value.appendChild(ins)

  // 触发广告加载
  window.adsbygoogle.push({})
}

// 组件挂载后加载广告
onMounted(() => {
  if (window.adsbygoogle) {
    loaded.value = true
    renderAd()
  } else {
    loadAdsenseScript()
  }
})
</script>