/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import {CacheFirst, NetworkOnly} from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

// Cache static assets with CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'font',
  new CacheFirst({
    cacheName: 'static-resources',
  })
)

// Cache mp3 resources from oss.ideaflow.top
registerRoute(
    ({ request, url }) => {
        return url.hostname === 'oss.ideaflow.top' && url.pathname.endsWith('.mp3')
    },
    new CacheFirst({
        cacheName: 'oss-audio-cache',
    })
)


// Cache image resources from oss.ideaflow.top
registerRoute(
  ({ request, url }) => {
    return url.hostname === 'oss.ideaflow.top' && /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname)
  },
  new CacheFirst({
    cacheName: 'oss-image-cache',
  })
)

// Cache image resources
registerRoute(
  ({ request, url }) => {
    // Check if URL ends with image extensions
    return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname)
  },
  new CacheFirst({
    cacheName: 'image-cache',
  })
)


self.skipWaiting()
clientsClaim()
