/**
 * 这个插件用于在开发环境定位路由切换异常。
 * 它只记录可序列化的错误信息，不改变原有业务逻辑。
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.dev) {
    return
  }

  /**
   * 将未知错误转换为稳定字符串，避免调试日志再次触发序列化问题。
   */
  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}`
    }

    return String(error)
  }

  /**
   * 记录客户端路由导航失败的目标路径与错误信息。
   */
  nuxtApp.$router.onError((error, to, from) => {
    console.error(
      `[router-debug] navigation error | from=${from.fullPath} | to=${to.fullPath} | message=${getErrorMessage(error)}`
    )
  })

  /**
   * 记录未捕获的 Promise 异常，辅助定位懒加载或组件初始化失败。
   */
  window.addEventListener('unhandledrejection', (event) => {
    console.error(
      `[router-debug] unhandledrejection | message=${getErrorMessage(event.reason)}`
    )
  })

  /**
   * 记录浏览器级错误，辅助判断是否是资源加载或运行时异常。
   */
  window.addEventListener('error', (event) => {
    console.error(
      `[router-debug] window error | message=${event.message || getErrorMessage(event.error)} | source=${event.filename || 'unknown'}`
    )
  })
})
