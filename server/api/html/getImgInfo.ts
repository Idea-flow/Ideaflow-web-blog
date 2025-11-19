import { defineEventHandler, getQuery } from 'h3'
import { load } from "cheerio"

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const url = query.url as string || ''
        
        const storage = useStorage('getImgInfo')
        const cacheKey = 'getImgInfo-'+url
        const cached = await storage.getItem(cacheKey)
        
        if (false) {
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
        response = await $fetch(url) as any
        const $ = load(response)
        const $images = $("img")
        
        // 提取所有图片的属性信息
        let imageInfoList = []
        $images.each((index, element) => {
            const $img = $(element)
            const imgSrc = $img.attr('src')
            if (imgSrc) {
                // 获取图片类型
                let imgType = $img.attr('type') || '';
                if (!imgType) {
                    imgType = imgSrc.split('.').pop()?.toLowerCase() || '';
                }
                
                // 获取图片尺寸
                const width = $img.attr('width') || '';
                const height = $img.attr('height') || '';
                
                imageInfoList.push({
                    url: imgSrc,
                    alt: $img.attr('alt') || '',
                    type: imgType,
                    width: width,
                    height: height
                })
            }
            })


        const cacheData = {
            data: imageInfoList,
            timestamp: new Date().getTime()
        }
        // console.info('获取htmlImgInfo数据:', JSON.stringify(cacheData))
        await storage.setItem(cacheKey, JSON.stringify(cacheData))
        return cacheData.data
    } catch (error) {
        console.error('获取网页数据失败:', error)
        return {
            code: 500,
            data: null,
            msg: '获取数据失败'
        }
    }
})