<script setup lang="ts">
/**
 * 首页信息流广告卡片组件。
 * 负责以文章卡片同级的布局渲染 Google AdSense 展示广告，并在开发环境回退为占位卡片。
 */
interface AdsbygoogleWindow extends Window {
  adsbygoogle?: unknown[]
}

const props = withDefaults(defineProps<{
  slot: string
  adClient?: string
  title?: string
}>(), {
  adClient: '',
  title: '赞助内容'
})

const runtimeConfig = useRuntimeConfig()
const isMounted = ref(false)
const isAdRequested = ref(false)
const isDev = import.meta.dev
const enableDevAdsense = computed(() => {
  return Boolean(runtimeConfig.public.enableDevAdsense)
})
const resolvedAdClient = computed(() => {
  return props.adClient || runtimeConfig.public.googleAdsenseClient
})
const shouldRenderRealAd = computed(() => {
  const allowRealAdsense = !isDev || enableDevAdsense.value
  return isMounted.value && allowRealAdsense && Boolean(resolvedAdClient.value) && Boolean(props.slot)
})

/**
 * 请求 Google AdSense 渲染广告位。
 * 仅在客户端挂载后执行一次，避免重复 push 导致广告脚本报错。
 */
const requestAdsense = async () => {
  if (!shouldRenderRealAd.value || isAdRequested.value || !import.meta.client) {
    return
  }

  try {
    await nextTick()
    const adsenseWindow = window as AdsbygoogleWindow
    adsenseWindow.adsbygoogle = adsenseWindow.adsbygoogle || []
    adsenseWindow.adsbygoogle.push({})
    isAdRequested.value = true
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`[Adsense] 广告位初始化失败: ${errorMessage}`)
  }
}

/**
 * 生成开发环境与广告未填充时的占位文案。
 * 方便本地调试列表插入位置与卡片视觉效果。
 */
const placeholderDescription = computed(() => {
  if (isDev && !enableDevAdsense.value) {
    return '开发环境默认不请求真实 Google 广告，这里展示的是占位卡片，用于确认插入位置和布局。'
  }

  return '广告脚本加载后会在这里展示横向响应式广告，若未填充则可能暂时留白。'
})

onMounted(async () => {
  isMounted.value = true
  await requestAdsense()
})
</script>

<template>
  <div
    class="group bg-base-100 backdrop-blur-sm rounded-xl transition-all duration-300 relative overflow-hidden card-scale-animation border border-primary/10">
    <div class="absolute top-0 left-0 bg-gradient-to-r from-amber-500/90 to-orange-400/90 text-white px-3 py-1.5 text-xs rounded-br-lg z-10">
      广告
    </div>
    <div
      v-if="isDev"
      class="absolute top-0 right-0 z-10 rounded-bl-lg bg-black/70 px-3 py-1.5 text-[11px] text-white">
      {{ enableDevAdsense ? '开发环境真实广告' : '开发环境占位广告' }}
    </div>

    <div class="h-56 sm:h-56 md:h-56 lg:h-60 xl:h-72 overflow-hidden relative rounded-2xl bg-gradient-to-br from-primary/10 via-white to-amber-50 dark:from-primary/15 dark:via-gray-800 dark:to-gray-700 p-5">
      <div class="flex h-full flex-col justify-between">
        <div class="space-y-3">
          <p class="text-sm font-medium tracking-wide text-primary/80 uppercase">{{ title }}</p>
          <h3 class="text-xl text-base-content">首页推荐广告位</h3>
          <p class="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {{ placeholderDescription }}
          </p>
        </div>

        <ClientOnly>
          <div class="w-full overflow-hidden rounded-xl bg-white/80 p-2 dark:bg-gray-900/70">
            <ins
              v-if="shouldRenderRealAd"
              class="adsbygoogle"
              style="display:block"
              :data-ad-client="resolvedAdClient"
              :data-ad-slot="slot"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            <div
              v-else
              class="flex min-h-[160px] w-full items-center justify-center rounded-lg border border-dashed border-primary/20 bg-gradient-to-br from-primary/5 to-amber-50 text-center text-sm text-gray-500 dark:from-primary/10 dark:to-gray-800 dark:text-gray-400">
              Google AdSense 展示广告占位区
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200 dark:from-amber-400 dark:via-orange-400 dark:to-yellow-400 group-hover:w-full group-hover:left-0 transition-all duration-300">
    </div>
  </div>
</template>

<style scoped>
.card-scale-animation {
  transition: all 0.3s ease-in-out;
}

.card-scale-animation:hover {
  transform: scale(1.02);
}
</style>
