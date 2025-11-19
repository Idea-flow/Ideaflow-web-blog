import { ApiResponse } from '~/types/commonHotSearch'

interface ZhihuRes {
  data: {
    type: "hot_list_feed"
    style_type: "1"
    feed_specific: {
      answer_count: 0
    }
    card_label:{
      "type":""
      "icon" :""
      "night_icon":""
    }
    target: {
      title_area: {
        text: string
      }
      excerpt_area: {
        text: string
      }
      image_area: {
        url: string
      }
      metrics_area: {
        text: string
        font_color: string
        background: string
        weight: string
      }
      label_area: {
        type: "trend"
        trend: number
        night_color: string
        normal_color: string
      }
      link: {
        url: string
      }
    }
  }[]
}

/**
 * 获取知乎热搜
 */
export async function getZhihuHotSearch() {
  try {
    // 使用服务端代理接口
    const { data } = await useFetch<ApiResponse<ZhihuRes>>('/api/hotSearch/all?type=zhihu', {
      method: 'GET'
    })
    // console.log("知乎获取数据JSON.parse(data.value.data):",JSON.stringify(data.value.data))

    if (!data.value || data.value.code !== 0 || !data.value.data) {
      console.error('获取知乎热搜数据失败：数据格式错误')
      return []
    }

    // console.log("知乎获取数据JSON.parse(data.value.data):",JSON.stringify(data.value.data.data))
    return data.value.data.data.map((k) => {
      return {
        id: k.target.link.url.match(/(\d+)$/)?.[1] ?? k.target.link.url,
        title: k.target.title_area.text,
        hot: k.feed_specific.answer_count,
        extra: {
          icon: k.card_label?.night_icon && proxyPicture(k.card_label.night_icon)
        },
        // url: `https://www.zhihu.com/question/${k.card_id.split('_')[1]}`
        url: k.target.link.url
      }
    })
  } catch (error) {
    console.error('获取知乎热搜数据失败：', error)
    return []
  }
}