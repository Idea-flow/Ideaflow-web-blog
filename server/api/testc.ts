import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    try {

        const storage = useStorage('hot-search') // 使用内置存储
        const cacheKey = 'hot-search-test'

        // const cResult  =  await storage.removeItem(cacheKey)

        const clear =  await storage.clear()
        console.info('清楚:',clear)
        const keysMy = await storage.getKeys()
        console.info('清楚后的key:',keysMy)

        const startTime = Date.now()
        const keys = await storage.getKeys()

        // 批量删除（并行处理）
        await Promise.all(keys.map(key => storage.removeItem(key)))

        console.log(`[清理完成] 删除 ${keys.length} 项，耗时 ${Date.now() - startTime}ms`)

        const keysMy2 = await storage.getKeys()
        console.info('清楚后的key2:',keysMy2)

        const result = {
            code: 0,
            data: clear,
            msg: 'success'
        }

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