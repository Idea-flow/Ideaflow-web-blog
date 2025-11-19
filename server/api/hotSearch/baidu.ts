import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const storage = useStorage('hot-search') // 使用内置存储
        const cacheKey = 'hot-search-baidu'

        // 尝试获取缓存

        const cached = await storage.getItem(cacheKey)
        if (cached) {
            // console.log("百度获取到缓存")
            return cached
        }else {
            // console.log("百度m没有获取到缓存")
        }

        // 服务器端发起请求，不受CORS限制
        const url = "https://top.baidu.com/board?tab=realtime"
        const response = await fetch(url, {
            method: 'GET'
        })

        // 获取响应文本
        const rawData = await response.text()
        // console.log("百度:rawData:",rawData)
        // 提取JSON数据
        const jsonStr = rawData.match(/<!--s-data:(.*?)-->/s)
        if (!jsonStr || !jsonStr[1]) {
            throw new Error('Failed to extract JSON data from response')
        }

        // 解析JSON数据
        const data = JSON.parse(jsonStr[1])

        const result = {
            code: 0,
            data: data,
            msg: 'success'
        }
// 设置缓存并返回（60秒缓存）
        await storage.setItem(cacheKey, result, { ttl: 60 })
        // 返回数据给前端
        return result
    } catch (error) {
        console.error('获取百度热搜数据失败:', error)
        return {
            code: 500,
            data: null,
            msg: '获取数据失败'
        }
    }
})