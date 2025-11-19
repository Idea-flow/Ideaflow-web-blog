import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const type = query.type as string || ''
        
        const storage = useStorage('hot-search')
        const cacheKey = 'hot-search-'+type
        const cached = await storage.getItem(cacheKey)
        
        if (cached) {
            try {
                const cachedData = typeof cached === 'string' ? JSON.parse(cached) : cached
                const currentTime = new Date().getTime()
                const cacheExpireTime = 10*60  * 1000 // 10分钟过期时间
                
                if (currentTime - cachedData.timestamp < cacheExpireTime) {
                    // console.info('通过热搜获取热搜数据:currentTime:{},cachedData.timestamp:{},差值',currentTime,cachedData.timestamp,currentTime - cachedData.timestamp)
                    return cachedData.data
                } else {
                    // console.info('不通过热搜获取热搜数据:')
                }
            } catch (error) {
                // console.error('解析缓存数据失败:', error)
                // 解析失败时继续获取新数据
            }
        }

        let response = null
        if (type == "douyin") {
            const cookie = query.cookie as string || ''
            response = await $fetch('/api/hotSearch/'+type,{
                query: {
                    cookie: cookie
                }
            })
        } else {
            response = await $fetch('/api/hotSearch/'+type)
        }

        const cacheData = {
            data: response,
            timestamp: new Date().getTime()
        }
        // console.info('获取热搜数据:', JSON.stringify(cacheData))
        await storage.setItem(cacheKey, JSON.stringify(cacheData))
        return response
    } catch (error) {
        console.error('获取热搜数据失败:', error)
        return {
            code: 500,
            data: null,
            msg: '获取数据失败'
        }
    }
})