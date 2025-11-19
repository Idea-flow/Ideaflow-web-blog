import { ApiResponse } from '~/types/commonHotSearch'

import { request } from '~/utils/request'
interface weiBoRes {
    ok: number // 1 is ok
    data: {
        realtime:
            {
                num: number // 看上去是个 id
                emoticon: string
                icon?: string // 热，新 icon url
                icon_width: number
                icon_height: number
                is_ad?: number // 1
                note: string
                small_icon_desc: string
                icon_desc?: string // 如果是 荐 ,就是广告
                topic_flag: number
                icon_desc_color: string
                flag: number
                word_scheme: string
                small_icon_desc_color: string
                realpos: number
                label_name: string
                word: string // 热搜词
                rank: number
            }[]
    }
}

/**

 */
export async function getWeiBoHotSearch() {
    try {
        let isDev = process.env.NODE_ENV === "development";
        const startTime = new Date();
        if (isDev) {
            console.log(`[微博] 请求开始时间: ${startTime.toLocaleString()}`);
        }


        // 使用服务端代理接口
        const { data } = await useFetch<ApiResponse<weiBoRes>>('/api/hotSearch/all?type=weibo', {
            method: 'GET'
        })

        if (!data.value || data.value.code !== 0 || !data.value.data || !data.value.data.data || !data.value.data.data.realtime) {
            console.error('获取微博热搜数据失败：数据格式错误')
            return []
        }

        const result = data.value.data.data.realtime
            .filter(k => !k.is_ad) // 过滤广告
            .map((k) => {
                const keyword = k.word_scheme ? k.word_scheme : `#${k.word}#`
                return {
                    id: k.word,
                    title: k.word,
                    hot: k.num,
                    tag: k.icon_desc || '',
                    tagColor: k.icon_desc_color || '',
                    url: `https://s.weibo.com/weibo?q=${encodeURIComponent(keyword)}`,
                    mobileUrl: `https://m.weibo.cn/search?containerid=231522type%3D1%26q%3D${encodeURIComponent(keyword)}&_T_WM=16922097837&v_p=42`,
                }
            })
        if (isDev) {
            const endTime = new Date();
            const duration = endTime.getTime() - startTime.getTime();
            console.log(`[微博] 请求结束时间: ${endTime.toLocaleString()} (耗时: ${duration}ms)`);
        }
        // console.log('微博热搜数据：', JSON.stringify(result))
        return result

    } catch (error) {
        console.error('获取微博热搜数据失败：', error)
        return []
    }
}