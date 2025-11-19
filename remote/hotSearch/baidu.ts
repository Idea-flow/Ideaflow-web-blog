import { ApiResponse } from '~/types/commonHotSearch'
import { useFetch } from '#app'

interface BaiduHotSearchRes {
  data: {
    cards: {
      content: {
        isTop?: boolean
        hotScore: string
        word: string
        rawUrl: string
        desc?: string
      }[]
    }[]
  }
}

/**
 * 获取百度热搜数据
 */
export const getBaiduHotSearch = async () => {
  try {
      let isDev = process.env.NODE_ENV === "development";
      const startTime = new Date();
      if (isDev) {
          console.log(`[百度] 请求开始时间: ${startTime.toLocaleString()}`);
      }


    //   const { data } = await useFetch<ApiResponse<BaiduHotSearchRes>>('/api/hotSearch/baidu', {
    //   method: 'GET'
    // })
      const { data } = await useFetch<ApiResponse<BaiduHotSearchRes>>('/api/hotSearch/all?type=baidu', {
          method: 'GET'
      })
      // console.log("百度:data.value.data.data:",JSON.stringify(data.value.data.data.cards[0]))
      // console.log("百度:data.value.data.data.cards:",JSON.stringify(data.value.data.data.cards[0]))
    if (!data.value  || !data.value.data || !data.value.data.data.cards[0]?.content) {
      console.error('获取百度热搜数据失败：数据格式错误')
      return []
    }


     const result = data.value.data.data.cards[0].content
      .filter(k => !k.isTop)
      .map((k) => ({
        id: k.rawUrl,
        title: k.word,
        hot: k.hotScore, // 百度不提供具体热度值
        tag: '', // 百度不提供标签
        tagColor: '', // 百度不提供标签颜色
        url: k.rawUrl,
        extra: {
          icon:  '', // 添加描述信息用于hover显示
        },
      }))

      if (isDev) {
          const endTime = new Date();
          const duration = endTime.getTime() - startTime.getTime();
          console.log(`[百度] 请求结束时间: ${endTime.toLocaleString()} (耗时: ${duration}ms)`);
      }
      return result;
  } catch (error) {
    console.error('获取百度热搜失败:', error)
    return []
  }
}