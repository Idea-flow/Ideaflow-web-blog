import { ApiResponse } from '~/types/commonHotSearch'

interface Item {
    uri: string
    id: number
    title?: string
    content_text: string
    content_short: string
    display_time: number
    type?: string
}
interface LiveRes {
    data: {
        items: Item[]
    }
}

interface NewsRes {
    data: {
        items: {
            // ad
            resource_type?: string
            resource: Item
        }[]
    }
}

interface HotRes {
    data: {
        day_items: Item[]
    }
}

/**
 * 获取B站热搜数据
 */
export async function getWallStreetcnHotSearch() {
    try {
        let isDev = process.env.NODE_ENV === "development";
        const startTime = new Date();
        if (isDev) {
            console.log(`[华尔街见闻] 请求开始时间: ${startTime.toLocaleString()}`);
        }

        
        const { data } = await useFetch<ApiResponse<HotRes>>('/api/hotSearch/all?type=wallstreetcn', {
            method: 'GET'
        });

        if (isDev) {
            const endTime = new Date();
            const duration = endTime.getTime() - startTime.getTime();
            console.log(`[华尔街见闻] 请求结束时间: ${endTime.toLocaleString()} (耗时: ${duration}ms)`);
        }



        if (!data.value || data.value.code !== 0 || !data.value.data || !data.value.data.data.day_items) {
            console.error('获取华尔街见闻热搜数据失败：数据格式错误')
            return []
        }

        const result = data.value.data.data.day_items.map((k) => ({
            id: k.id,
            title: k.title!,
            url: k.uri,
        }))
        if (isDev) {
            const endTime = new Date();
            const duration = endTime.getTime() - startTime.getTime();
            console.log(`[华尔街见闻] 请求结束时间2: ${endTime.toLocaleString()} (耗时: ${duration}ms)`);
        }

        return result;
    } catch (error) {
        console.error('获取华尔街见闻热搜数据失败:', error)
        return []
    }
}
