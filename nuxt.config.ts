// https://nuxt.com/docs/api/configuration/nuxt-config

const sw =  true;
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        // {
        //   async: true,
        //   src: 'https://www.googletagmanager.com/gtag/js?id=G-LHELTEKDPR'
        // },
        // {
        //   innerHTML: `
        //     window.dataLayer = window.dataLayer || [];
        //     function gtag(){dataLayer.push(arguments);}
        //     gtag('js', new Date());
        //     gtag('config', 'G-LHELTEKDPR');
        //   `,
        //   type: 'text/javascript'
        // },
        //   谷歌广告
        // {
        //   async: true,
        //   src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1870872898412136',
        //   crossorigin: 'anonymous'
        // },
      ]
    }
  },
  modules: [// required
  '@nuxtjs/tailwindcss', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxtjs/color-mode','@nuxthub/core',
    '@nuxt/icon',
    '@vite-pwa/nuxt',
    '@nuxtjs/seo',
      '@nuxtjs/google-adsense'
  ],

  googleAdsense: {
    id: 'ca-pub-1870872898412136'
  },

  css: ['~/assets/css/main.css','~/assets/css/theme/theme.css','~/assets/css/theme/scrollbar.css'],
  icon: {
    customCollections: [
      {
        prefix: 'my',
        dir: './assets/myIcons'
      },
      {
        prefix: 'myVideo',
        dir: './assets/myIcons/video'
      },
      {
        prefix: 'myBase',
        dir: './assets/myIcons/base'
      },
      {
        prefix: 'myNatureSound',
        dir: './assets/myIcons/nature-sound'
      },
    ],
  },
  routeRules: {
    // '/im/h5/**': { ssr: false }, //只进行客户端渲染
    // '/im/web/**': { ssr: false }, //只进行客户端渲染
    '/im/**': { ssr: false }, //只进行客户端渲染
    // '/article/**': { ssr: false }, //只进行客户端渲染
    '/login/socialLogin2': { ssr: false }, //只进行客户端渲染
    '/login/socialLogin': { ssr: false }, //只进行客户端渲染
    // '/hotSearch': { ssr: false }, //只进行客户端渲染

    // "/api/hotSearch/**": { cache: { maxAge: 20 } },

  },

  compatibilityDate: '2024-11-01',
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
    },
  },
  pwa: {
    registerType: 'autoUpdate', // 注册 service worker 自动更新
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    // PWA 配置
    manifest: {
      name: 'IdeaFlow博客', // 应用名称
      short_name: 'IdeaFlow博客', // 短名称
      description: '欢迎访问IdeaFlow的博客，这里分享Web开发、前端技术、编程心得等优质内容', // 描述
      lang: 'zh-CN', // 语言
      display: 'standalone', // 显示方式  'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'
      background_color: '#000000', // 背景色
      theme_color: '#000000', // 主题色
      // start_url: '/', // 启动时的 URL
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icon-192-maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },

        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },

        {
          src: 'icon-512-maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
      shortcuts: [
        {
          name: "素笺存忆",
          short_name: "素笺存忆",
          description: "素笺存忆",
          url: "/archive",
          icons: [
            {
              src: '/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            }
          ]
        }
      ],
      screenshots: [
        {
          src: "/icon-512.png",
          sizes: '512x512',
          type: "image/png",
          form_factor: "wide"
        },
        {
          src: "/icon-512.png",
          sizes: '512x512',
          type: "image/png",
          form_factor: "wide"
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webp,mp3}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/pagead2\.googlesyndication\.com\/.*/,
          handler: 'NetworkOnly', // 确保广告脚本不被缓存
        },
        {
          urlPattern: /^https:\/\/googleads\.g\.doubleclick\.net\/.*/,
          handler: 'NetworkOnly',
        },
        {
          // 匹配以 `https://oss.ideaflow.top/` 开头的 MP3 文件
          urlPattern: ({ request, url }) =>
              request.destination === 'audio' &&
              url.host === 'oss.ideaflow.top' &&
              url.pathname.endsWith('.mp3'),
          handler: 'CacheFirst', //
          options: {
            cacheName: 'ideaflow-mp3-cache', // 缓存名称
            // 缓存过期配置（可选）
            expiration: {
              maxAgeSeconds: 7 * 24 * 60 * 60, // 缓存有效期 7 天
              maxEntries: 100, // 最多缓存 50 个文件
            }
          }

        }
      ],
      // 排除广告脚本
      globIgnores: [
        '**/adsbygoogle.js*',   // 匹配所有变体
      ],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
  //
  vite: {
    server: {
      // 允许的主机名列表
      allowedHosts: [
        'local-blog.ideaflow.top',
        'mac-blog.ideaflow.top',
        'localhost',
        '127.0.0.1'
      ]
    }
  }




  ,

  //seo模块
  ogImage: {
    enabled: false
  },
  sitemap: {
    enabled: true,
    sources: [
      '/api/__sitemap__/urls',

      // 'https://www.douyin.com/sitemap.xml',
    ]
  },
  robots: {
    enabled: true,
    disallow: ["/study/","/study"]
  },
  seo: { // seo utils
    enabled: false
  },
  schemaOrg: {
    enabled: false
  },
  linkChecker: {
    enabled: false
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      }
    }
  }

})