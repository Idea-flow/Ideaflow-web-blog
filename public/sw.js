/**
 * PWA 封面缓存 Service Worker。
 * 负责为前台封面图片提供轻量缓存能力，
 * 提升二次访问速度，但不接管页面、构建静态资源、接口与视频资源的离线缓存。
 */
const CACHE_VERSION = 'v2'
const COVER_CACHE_NAME = `blog-cover-cache-${CACHE_VERSION}`
const MAX_CACHE_ENTRIES = 200
const CACHE_NAME_PREFIXES = ['asmr-cover-cache-']

/**
 * Service Worker 安装阶段。
 * 当前版本无需预缓存资源，仅跳过等待以便新版本尽快生效。
 */
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

/**
 * Service Worker 激活阶段。
 * 负责清理旧版本缓存，并立即接管已打开页面。
 */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys()
    const activeCacheNames = new Set([COVER_CACHE_NAME])
    const staleCacheNames = cacheNames.filter((cacheName) => {
      return CACHE_NAME_PREFIXES.some((prefix) => cacheName.startsWith(prefix)) && !activeCacheNames.has(cacheName)
    })

    await Promise.all(staleCacheNames.map((cacheName) => caches.delete(cacheName)))
    await self.clients.claim()
  })())
})

/**
 * 统一拦截前台请求。
 * 仅对 GET 图片请求启用缓存，其余请求全部直通网络。
 */
self.addEventListener('fetch', (event) => {
  const { request } = event

  if (!shouldHandleImageRequest(request)) {
    return
  }

  event.respondWith(handleImageRequest(request))
})

/**
 * 判断当前请求是否应该进入图片缓存逻辑。
 * 仅处理 GET 方式且目标类型为 image 的请求。
 */
function shouldHandleImageRequest(request) {
  return request.method === 'GET' && request.destination === 'image'
}

/**
 * 处理图片缓存读取与回源逻辑。
 * 优先读取缓存，未命中时回源拉取并写入缓存。
 */
async function handleImageRequest(request) {
  const cache = await caches.open(COVER_CACHE_NAME)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)

    if (isCacheableResponse(networkResponse)) {
      await cache.put(request, networkResponse.clone())
      await trimCacheEntries(cache, MAX_CACHE_ENTRIES)
    }

    return networkResponse
  } catch (error) {
    return Response.error()
  }
}

/**
 * 判断图片响应是否适合写入缓存。
 * 需要兼容第三方封面图片的跨域场景，因此除同源 basic、可读 cors 外，
 * 也允许缓存浏览器返回的 opaque 响应，确保外链封面可以被离线命中。
 */
function isCacheableResponse(response) {
  if (response.type === 'opaque') {
    return true
  }

  return response.ok && (response.type === 'basic' || response.type === 'cors')
}

/**
 * 控制图片缓存总量，避免长期使用后缓存无限增长。
 * 当数量超过上限时，从最早写入的条目开始删除。
 */
async function trimCacheEntries(cache, maxEntries) {
  const keys = await cache.keys()

  if (keys.length <= maxEntries) {
    return
  }

  const overflowCount = keys.length - maxEntries
  const requestsToDelete = keys.slice(0, overflowCount)

  await Promise.all(requestsToDelete.map((request) => cache.delete(request)))
}
