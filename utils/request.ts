import { UseFetchOptions } from "#app";
import MyMessage from "~/components/Base/Message/MyMessage";
import { useAppStore } from "~/stores/app";

interface RequestOptions<T = any> extends UseFetchOptions<T> {
  immediate?: boolean
}

let isDev = process.env.NODE_ENV === "development";
// isDev = false
const BASE_URL = isDev ? "http://localhost:48080" : "https://blogserver.ideaflow.top";
const requestTimeMap: Record<string, number> = {}

const defaultOptions: RequestOptions = {
  baseURL: BASE_URL,
  immediate: true,
  // 请求拦截
  onRequest({ options }) {
    // 记录请求开始时间

    if (isDev && request.toString()) {
      let urlPath = request.toString().split('?')[0] // 只保留 URL 的路径部分
      // console.log(`[请求开始] ${request.toString()}`)
      requestTimeMap[urlPath] = Date.now()
    }

    options.headers.set('tenant-id',`169`)
    const token = useCookie('accessToken').value
    if (token) {
      options.headers.set('Authorization',`Bearer ${token}`)
    }
    // 新增：带上 au cookie
    const au = useCookie('au').value
    if (au) {
      options.headers.set('au', au)
    }
  },
  // 响应拦截
  onResponse({request, response, options}) {
    if (isDev && response?.url) {
      let urlPath = new URL(response.url).pathname;
      const start = requestTimeMap[urlPath]
      if (start) {
        const cost = Date.now() - start
        console.log(`[请求耗时] ${urlPath}: ${cost}ms`)
        delete requestTimeMap[urlPath]
      }
    }

    const status = response?.status || 'Unknown'
    const message = response?._data?.msg || 'Unknown error'
    const code = response?._data?.code
    const appStore = useAppStore()
    // console.log("appStore:"+JSON.stringify(appStore.userInfo))
    if(import.meta.client && code !== 0 && code !== 2000900002 && code !== 2000900001) {
      if(isDev) {
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
  // 错误处理
  onResponseError({ response }) {
    const status = response?.status || 'Unknown'
    const message = response?._data?.msg || 'Unknown error'

    if(import.meta.client) {
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

export const request = {
  get: <T = any>(url: string, params?: any, options: RequestOptions<T> = {}) => {
    return useFetch<T>(url, {
      ...defaultOptions,
      ...options,
      method: 'GET',
      params
    })
  },
  post: <T = any>(url: string, body?: any, options: RequestOptions<T> = {}) => {
    return useFetch<T>(url, {
      ...defaultOptions,
      ...options,
      method: 'POST',
      body
    })
  }
}