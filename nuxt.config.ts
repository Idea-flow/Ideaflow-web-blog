// https://nuxt.com/docs/api/configuration/nuxt-config
const enableDevPwa = process.env.NUXT_ENABLE_DEV_PWA === 'true'
const enablePwa = process.env.NODE_ENV === 'production' || enableDevPwa

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          id: 'google-adsense-script',
          async: true,
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1870872898412136',
          crossorigin: 'anonymous'
        }
      ],
      meta: [
        ...(enablePwa
          ? [
              { name: 'application-name', content: 'IdeaFlow' },
              { name: 'apple-mobile-web-app-capable', content: 'yes' },
              { name: 'apple-mobile-web-app-title', content: 'IdeaFlow' },
              { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
              { name: 'mobile-web-app-capable', content: 'yes' },
              { name: 'theme-color', content: '#64B5F6', media: '(prefers-color-scheme: light)' },
              { name: 'theme-color', content: '#5C6BC0', media: '(prefers-color-scheme: dark)' }
            ]
          : [])
      ],
      link: [
        ...(enablePwa
          ? [
              { rel: 'manifest', href: '/manifest.webmanifest' },
              { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
              { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
            ]
          : [])
      ]
    }
  },
  modules: [// required
  '@nuxtjs/tailwindcss', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxtjs/color-mode',
    '@nuxt/icon'
  ],

  css: ['~/assets/css/main.css','~/assets/css/theme/theme.css','~/assets/css/theme/scrollbar.css'],
  icon: {
    customCollections: [
      {
        prefix: 'my',
        dir: './app/assets/myIcons'
      },
      {
        prefix: 'myVideo',
        dir: './app/assets/myIcons/video'
      },
      {
        prefix: 'myBase',
        dir: './app/assets/myIcons/base'
      },
      {
        prefix: 'myNatureSound',
        dir: './app/assets/myIcons/nature-sound'
      },
    ],
  },
  routeRules: {
    // '/im/h5/**': { ssr: false }, //只进行客户端渲染
    // '/im/web/**': { ssr: false }, //只进行客户端渲染
    '/im/**': { ssr: false }, //只进行客户端渲染
    '/study/nuxt/colorMode/**': { ssr: false }, // 颜色模式演示页仅在客户端渲染，避免开发态路由切换报错
    // '/article/**': { ssr: false }, //只进行客户端渲染
    '/login/socialLogin2': { ssr: false }, //只进行客户端渲染
    '/login/socialLogin': { ssr: false }, //只进行客户端渲染
    // '/hotSearch': { ssr: false }, //只进行客户端渲染

    // "/api/hotSearch/**": { cache: { maxAge: 20 } },

  },

  compatibilityDate: '2026-03-28',
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },
  devtools: { enabled: true },

  colorMode: {
    classSuffix: '',
    fallback: 'light',
    preference: 'system',
    dataValue: 'theme',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'

  },
  runtimeConfig: {
    public: {
      blogBaseURL:  process.env.NUXT_BLOG_BASE_API, // 从环境变量中获取API URL
      tenantId:  process.env.NUXT_BLOG_TENANT_ID, // 从环境变量中获取API URL
      appUrl: process.env.APP_URL, // 前端公开站点地址
      googleAdsenseClient: process.env.NUXT_PUBLIC_GOOGLE_ADSENSE_CLIENT || 'ca-pub-1870872898412136',
      googleAdsenseHomeSlot: process.env.NUXT_PUBLIC_GOOGLE_ADSENSE_HOME_SLOT || '9250379418',
      enableDevAdsense: process.env.NUXT_PUBLIC_ENABLE_DEV_ADSENSE === 'true',
      enableDevPwa,
    },
  },
  //
  vite: {
    optimizeDeps: {
      include: [
        'md-editor-v3',
        'xgplayer',
        'xgplayer-hls',
        'xgplayer/es/plugins/danmu',
      ]
    },
    server: {
      // 允许的主机名列表
      allowedHosts: [
        'local-blog.ideaflow.top',
        'mac-blog.ideaflow.top',
        'localhost',
        '127.0.0.1'
      ]
    }
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      }
    }
  }

})
