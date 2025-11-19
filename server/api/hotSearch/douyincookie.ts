import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // 服务器端发起请求，不受CORS限制
    const response = await fetch('https://www.douyin.com/passport/general/login_guiding_strategy/?aid=6383', {
      method: 'GET'
    })
    
    // 获取响应头中的cookie
    const setCookie = response.headers.get('set-cookie')
    
    // 返回cookie给前端
    return {
      code: 0,
      data: setCookie,
      msg: 'success'
    }
  } catch (error) {
    console.error('获取抖音热搜Cookie失败:', error)
    return {
      code: 500,
      data: null,
      msg: '获取Cookie失败'
    }
  }
}) 