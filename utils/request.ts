import { UseFetchOptions } from "#app";
import MyMessage from "~/components/Base/Message/MyMessage";
import { useAppStore } from "~/stores/app";

interface RequestOptions<T = any> extends UseFetchOptions<T> {
    immediate?: boolean
}

let isDev = import.meta.dev;
const requestTimeMap: Record<string, number> = {}

/**
 * 生成请求默认配置
 * 统一从 runtimeConfig 中读取公开业务配置，避免直接依赖 process.env 业务变量。
 */
const createDefaultOptions = (): RequestOptions => {
    const { public: { blogBaseURL, tenantId } } = useRuntimeConfig()
    console.log('createDefaultOptions.blogBaseURL',blogBaseURL)
    return {
        baseURL: blogBaseURL,
        immediate: true,
        // 请求拦截
        onRequest({ request, options }) {
            if (tenantId) {
                options.headers.set('tenant-id', String(tenantId))
            }
            // 记录请求开始时间
            if (isDev && request) {
                // 确保 request 是字符串再处理
                const requestStr = typeof request === 'string' ? request : request.toString();
                if (requestStr) {
                    let urlPath = requestStr.split('?')[0]; // 只保留 URL 的路径部分
                    console.log(`[请求开始] ${requestStr}`);
                    requestTimeMap[urlPath] = Date.now();
                }
            }
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
                // console.log(`[请求结束] ${new URL(response.url).pathname}`)
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
}

export const request = {
    get: <T = any>(url: string, params?: any, options: RequestOptions<T> = {}) => {
        return useFetch<T>(url, {
            ...createDefaultOptions(),
            ...options,
            method: 'GET',
            params
        })
    },
    post: <T = any>(url: string, body?: any, options: RequestOptions<T> = {}) => {
        return useFetch<T>(url, {
            ...createDefaultOptions(),
            ...options,
            method: 'POST',
            body
        })
    }
}
