import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event) // 或 event.context.query
//http://localhost:3005/api/testget?type=1&type2=3
        console.log("query.type:"+query.type) // 输出 "baidu"
        console.log("query:"+query) // 输出 "baidu"
        const storage = useStorage('hot-search') // 使用内置存储
        // const keys = await storage.getKeys()

        const cacheKey = 'hot-search-test'

        const cached = await storage.getItem(cacheKey)
        if (cached) {
            console.log("get:获取到缓存")
            return cached
        }else {
            console.log("get:没有获取到缓存")
        }
        // 返回数据给前端
        return cached
    } catch (error) {
        console.error('获取百度热搜数据失败:', error)
        return {
            code: 500,
            data: null,
            msg: '获取数据失败'
        }
    }
})