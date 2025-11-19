import { ApiResponse } from '~/types/commonHotSearch'


interface ToutiaoHotSearchResponse {
  data: {
    ClusterIdStr: string
    Title: string
    HotValue: string
    Image: {
      url: string
    }
    LabelUri?: {
      url: string
    }
  }[]
}

/**
 * 获取今日头条热搜数据
 */
export async function getToutiaoHotSearch() {
  try {
    let isDev = process.env.NODE_ENV === "development";
    const startTime = new Date();
    if (isDev) {
      console.log(`[今日头条] 请求开始时间: ${startTime.toLocaleString()}`);
    }


    const { data } = await useFetch<ApiResponse<ToutiaoHotSearchResponse>>('/api/hotSearch/all?type=toutiao', {
      method: 'GET'
    })

    if (!data.value || data.value.code !== 0 || !data.value.data || !data.value.data.data) {
      console.error('获取今日头条热搜数据失败：数据格式错误')
      return []
    }
    const result = data.value.data.data.map((k) => ({
      id: k.ClusterIdStr,
      title: k.Title,
      url: `https://www.toutiao.com/trending/${k.ClusterIdStr}/`,
      extra: {
        icon: k.LabelUri?.url && proxyPicture(k.LabelUri.url, "encodeBase64URL"),
      },
    }))
    if (isDev) {
      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();
      console.log(`[今日头条] 请求结束时间: ${endTime.toLocaleString()} (耗时: ${duration}ms)`);
    }
    return result;
  } catch (error) {
    console.error('获取今日头条热搜数据失败:', error)
    return []
  }
}
