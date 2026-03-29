/**
 * PWA 客户端注册插件。
 * 负责在浏览器环境注册 Service Worker。
 * 当前策略仅在非开发环境启用注册，避免本地调试时被缓存干扰页面行为。
 */
export default defineNuxtPlugin(() => {
  if (import.meta.server) {
    return
  }

  const runtimeConfig = useRuntimeConfig()
  const enableDevPwa = Boolean(runtimeConfig.public.enableDevPwa)

  /**
   * 开发环境主动注销历史 Service Worker，并清理相关 Cache Storage。
   * 避免浏览器继续沿用之前已注册的缓存脚本，导致本地调试资源被旧缓存拦截。
   */
  async function unregisterDevelopmentServiceWorkers() {
    if (!('serviceWorker' in navigator)) {
      console.info('[PWA] 开发环境已跳过 Service Worker 注册，当前浏览器不支持 Service Worker')
      return
    }

    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map((registration) => registration.unregister()))

    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
    }

    if (!registrations.length) {
      console.info('[PWA] 开发环境已跳过 Service Worker 注册，且没有历史注册记录')
      return
    }

    console.info(`[PWA] 开发环境已注销 ${registrations.length} 个历史 Service Worker，并清理站点缓存`)
  }

  if (import.meta.dev && !enableDevPwa) {
    void unregisterDevelopmentServiceWorkers()
    return
  }

  if (!('serviceWorker' in navigator)) {
    return
  }

  /**
   * 在页面完成首次加载后注册 Service Worker。
   * 这样可以减少对首屏渲染时机的影响，并让浏览器更稳定地完成接管。
   */
  async function registerServiceWorker() {
    if (navigator.serviceWorker.controller) {
      return
    }

    navigator.serviceWorker.register('/sw.js').catch((error) => {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`[PWA] Service Worker 注册失败: ${errorMessage}`)
    })
  }

  /**
   * 兼容插件初始化晚于 window load 的情况。
   * 如果页面已经完成加载则立即注册，否则再等待 load 事件触发。
   */
  if (document.readyState === 'complete') {
    void registerServiceWorker()
    return
  }

  window.addEventListener('load', () => {
    void registerServiceWorker()
  }, { once: true })
})
