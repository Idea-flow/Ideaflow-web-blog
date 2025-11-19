import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    try {

        const storage = useStorage('hot-search') // 使用内置存储
        const cacheKey = 'hot-search-test'



        const result = {
            code: 0,
            data: " hot-search-test:save",
            msg: 'success'
        }
       const setResult =  await storage.setItem(cacheKey, result, { ttl: 10 })
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