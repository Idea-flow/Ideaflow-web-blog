import { UseFetchOptions } from '#app'
import MyMessage from '~/components/Base/Message/MyMessage'
import { useAppStore } from '~/stores/app'

interface RequestOptions<T = any> extends UseFetchOptions<T> {
  immediate?: boolean
}

let isDev = import.meta.dev
const requestTimeMap: Record<string, number> = {}

/**
 * 生成请求默认配置。
 * 统一从 runtimeConfig 中读取公开业务配置，避免直接依赖 process.env 业务变量。
 */
const createDefaultOptions = (): RequestOptions => {
  const { public: { blogBaseURL, tenantId } } = useRuntimeConfig()

  return {
    baseURL: blogBaseURL,
    immediate: true,
    onRequest({ request, options }) {
      if (tenantId) {
        options.headers.set('tenant-id', String(tenantId))
      }

      if (isDev && request) {
        const requestStr = typeof request === 'string' ? request : request.toString()

        if (requestStr) {
          const urlPath = requestStr.split('?')[0]
          console.log(`[请求开始] ${requestStr}`)
          requestTimeMap[urlPath] = Date.now()
        }
      }

      const token = useCookie('accessToken').value
      if (token) {
        options.headers.set('Authorization', `Bearer ${token}`)
      }

      const au = useCookie('au').value
      if (au) {
        options.headers.set('au', au)
      }
    },
    onResponse({ response }) {
      if (isDev && response?.url) {
        const urlPath = new URL(response.url).pathname
        const start = requestTimeMap[urlPath]

        if (start) {
          const cost = Date.now() - start
          console.log(`[请求耗时] ${urlPath}: ${cost}ms`)
          delete requestTimeMap[urlPath]
        }
      }

      const message = response?._data?.msg || 'Unknown error'
      const code = response?._data?.code
      const appStore = useAppStore()

      if (import.meta.client && code !== 0 && code !== 2000900002 && code !== 2000900001) {
        if (isDev) {
          MyMessage({
            message: `[${response.url}][${code}] ${message}`,
            type: 'error',
            duration: 2000
          })
          console.error(`[${response.url}][${code}] ${message}`)
        } else {
          MyMessage({
            message: ` ${message}`,
            type: 'error',
            duration: 1000
          })
        }

        if (code === 401 && appStore.userInfo) {
          // appStore.clearUserInfo()
        }
      }

      return response._data
    },
    onResponseError({ response }) {
      const status = response?.status || 'Unknown'
      const message = response?._data?.msg || 'Unknown error'

      if (import.meta.client) {
        MyMessage({
          message: `[${status}] ${message}`,
          type: 'error',
          duration: 2000
        })
        console.error(`[${status}] ${message}`)
      }

      return Promise.reject(new Error(message))
    }
  }
}

/**
 * 应用层统一请求工具。
 * 对 GET/POST 请求进行统一封装，复用默认 headers、错误处理与开发日志。
 */
export const request = {
  /**
   * 发起 GET 请求。
   * @param url 请求地址
   * @param params 查询参数
   * @param options useFetch 额外配置
   */
  get: <T = any>(url: string, params?: any, options: RequestOptions<T> = {}) => {
    return useFetch<T>(url, {
      ...createDefaultOptions(),
      ...options,
      method: 'GET',
      params
    })
  },
  /**
   * 发起 POST 请求。
   * @param url 请求地址
   * @param body 请求体
   * @param options useFetch 额外配置
   */
  post: <T = any>(url: string, body?: any, options: RequestOptions<T> = {}) => {
    return useFetch<T>(url, {
      ...createDefaultOptions(),
      ...options,
      method: 'POST',
      body
    })
  }
}
