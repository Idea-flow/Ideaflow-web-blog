import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        // 服务器端发起请求，不受CORS限制
        const url = "https://weibo.com/ajax/side/hotSearch"
        const response = await fetch(url, {
            method: 'GET'
        })

        // 获取响应数据
        const data = await response.json()

        // 返回cookie给前端
        return {
            code: 0,
            data: data,
            msg: 'success'
        }
    } catch (error) {
        console.error('获取微博热搜Cookie失败:', error)
        return {
            code: 500,
            data: null,
            msg: '获取Cookie失败'
        }
    }
})