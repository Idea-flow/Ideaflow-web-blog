import { ApiResponse } from '~/types/commonHotSearch'

interface BilibiliHotSearchRes {
  code: number
  exp_str: string
  list: {
    hot_id: number
    keyword: string
    show_name: string
    score: number
    word_type: number
    goto_type: number
    goto_value: string
    icon: string
    live_id: any[]
    call_reason: number
    heat_layer: string
    pos: number
    id: number
    status: string
    name_type: string
    resource_id: number
    set_gray: number
    card_values: any[]
    heat_score: number
    stat_datas: {
      etime: string
      stime: string
      is_commercial: string
    }
  }[]
  top_list: any[]
  hotword_egg_info: string
  seid: string
  timestamp: number
  total_count: number
}

/**
 * 获取B站热搜数据
 */
export async function getBilibiliHotSearch() {
  try {
    let isDev = process.env.NODE_ENV === "development";
    const startTime = new Date();
    if (isDev) {
      console.log(`[B站] 请求开始时间: ${startTime.toLocaleString()}`);
    }


    const { data } = await useFetch<ApiResponse<BilibiliHotSearchRes>>('/api/hotSearch/all?type=bilibili', {
      method: 'GET'
    })


    if (!data.value || data.value.code !== 0 || !data.value.data || !data.value.data.list) {
      console.error('获取B站热搜数据失败：数据格式错误')
      return []
    }

   const result = data.value.data.list.map((k) => ({
      id: k.keyword,
      title: k.show_name,
      hot: k.heat_score,
      url: `https://search.bilibili.com/all?keyword=${encodeURIComponent(k.keyword)}`,
      extra: {
        icon: k.icon && proxyPicture(k.icon)
      }
    }))
    if (isDev) {
      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();
      console.log(`[B站] 请求结束时间: ${endTime.toLocaleString()} (耗时: ${duration}ms)`);
    }
    return result;
  } catch (error) {
    console.error('获取B站热搜数据失败:', error)
    return []
  }
}