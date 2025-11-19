
import { config } from './config'

import errorCode from './errorCode'

import MyMessage from "~/components/Base/Message/MyMessage";
import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";

// const token = useCookie('accessToken').value
const token = '123';
// const refreshToken = useCookie('refreshToken').value

// const tenantId = useAppStore().tenantId;
const tenantId = 170;

const tenantEnable = 'true'
const { result_code, base_url, request_timeout } = config

// 需要忽略的提示。忽略后，自动 Promise.reject('error')
const ignoreMsgs = [
  '无效的刷新令牌', // 刷新令牌被删除时，不用提示
  '刷新令牌已过期' // 使用刷新令牌，刷新获取新的访问令牌时，结果因为过期失败，此时需要忽略。否则，会导致继续 401，无法跳转到登出界面
]
// 是否显示重新登录
export const isRelogin = { show: false }
// Axios 无感知刷新令牌，参考 https://www.dashingdog.cn/article/11 与 https://segmentfault.com/a/1190000020210980 实现
// 请求队列
let requestList: any[] = []
// 是否正在刷新中
let isRefreshToken = false
// 请求白名单，无须token的接口
const whiteList: string[] = ['/login', '/refresh-token']

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: base_url, // api 的 base_url
  timeout: request_timeout, // 请求超时时间
  withCredentials: false, // 禁用 Cookie 等信息
  // // 自定义参数序列化函数
  // paramsSerializer: (params) => {
  //   return JSON.stringify(params, { allowDots: true })
  // }
})

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 是否需要设置 token
    let isToken = (config!.headers || {}).isToken === false
    whiteList.some((v) => {
      if (config.url && config.url.indexOf(v) > -1) {
        return (isToken = false)
      }
    })
    const token =  useCookie('accessToken').value
    if (token && !isToken) {
      config.headers.Authorization = 'Bearer ' + token // 让每个请求携带自定义token
    }
    // 设置租户
    if (tenantEnable && tenantEnable === 'true') {
      if (tenantId) config.headers['tenant-id'] = tenantId
    }
    const method = config.method?.toUpperCase()
    // 防止 GET 请求缓存
    if (method === 'GET') {
      config.headers['Cache-Control'] = 'no-cache'
      config.headers['Pragma'] = 'no-cache'
    }
    // 自定义参数序列化函数
    else if (method === 'POST') {
      const contentType = config.headers['Content-Type'] || config.headers['content-type']
      if (contentType === 'application/x-www-form-urlencoded') {
        if (config.data && typeof config.data !== 'string') {
          config.data = JSON.stringify(config.data)
        }
      }
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    let { data } = response
    const config = response.config
    if (!data) {
      // 返回“[HTTP]请求没有返回值”;
      throw new Error()
    }
    // 未设置状态码则默认成功状态
    // 二进制数据则直接返回，例如说 Excel 导出
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      // 注意：如果导出的响应为 json，说明可能失败了，不直接返回进行下载
      if (response.data.type !== 'application/json') {
        return response.data
      }
      data = await new Response(response.data).json()
    }
    const code = data.code || result_code
    // 获取错误信息
    const msg = data.msg || errorCode[code] || errorCode['default']
    if (ignoreMsgs.indexOf(msg) !== -1) {
      // 如果是忽略的错误码，直接返回 msg 异常
      return Promise.reject(msg)
    } else if (code === 401) {

    } else if (code === 500) {
        MyMessage.error("sys.api.errMsg500")
      return Promise.reject(new Error(msg))
    } else if (code === 901) {
        // MyMessage.success()
        MyMessage.error("sys.api.errMsg901")
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      if (msg === '无效的刷新令牌') {
        // hard coding：忽略这个提示，直接登出
        console.log(msg)
      } else {
          MyMessage.error(msg)
      }
      return Promise.reject('error')
    } else {
      return data
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    let { message } = error
    if (message === 'Network Error') {
      message = ('sys.api.errorMessage')
    } else if (message.includes('timeout')) {
      message = ('sys.api.apiTimeoutMessage')
    } else if (message.includes('Request failed with status code')) {
      message = ('sys.api.apiRequestFailed') + message.substr(message.length - 3)
    }
      MyMessage.error(message)
    return Promise.reject(error)
  }
)

// const refreshToken = async () => {
//   axios.defaults.headers.common['tenant-id'] = tenantId
//   return await axios.post(base_url + '/system/auth/refresh-token?refreshToken=' + refreshToken)
// }
const handleAuthorized = () => {
    // resetRouter() // 重置静态路由表
    // deleteUserCache() // 删除用户缓存
    // removeToken()

  return Promise.reject(('sys.api.timeoutMessage'))
}
export { service }
