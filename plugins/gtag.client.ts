export default defineNuxtPlugin((nuxtApp) => {
    // const MEASUREMENT_ID = 'G-NJ6472GBVK'
    const MEASUREMENT_ID = 'G-LHELTEKDPR'
    const isDev = process.env.NODE_ENV === "development"

    // 生产环境才执行
    if (!isDev) {
        console.warn("gtag 插件在开发环境中被禁用。")
        return
    }
    console.info('gtag 插件已启用。')

// 动态插入 gtag.js 脚本
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
    document.head.appendChild(script)

// 初始化 gtag

    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
        dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', MEASUREMENT_ID)
})