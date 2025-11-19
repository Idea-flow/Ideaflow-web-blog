import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // 从查询参数中获取Cookie
    const query = getQuery(event)
    const cookie = query.cookie as string || ''
    
    // API请求URL
    const url = "https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1"
    
    // 服务器端发起请求，不受CORS限制
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Cookie: 'passport_csrf_token=5'
      }
    })
    
    // 获取响应数据
    const data = await response.json()
    
    // 返回数据给前端
    return {
      code: 0,
      data: data,
      msg: 'success'
    }
  } catch (error) {
    console.error('获取抖音热搜数据失败:', error)
    return {
      code: 500,
      data: null,
      msg: '获取热搜数据失败'
    }
  }
}) 