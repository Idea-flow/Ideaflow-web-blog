import { proxyPicture } from '~/utils/proxyPicture'

interface Res {
  data: {
    card_id:string
    card_label?: {
      icon: string
      night_icon: string
    }
    target: {
      id: number
      title: string
      url: string
      created: number
      answer_count: number
      follower_count: number
      bound_topic_ids: number[]
      comment_count: number
      is_following: boolean
      excerpt: string
    }
  }[]
}

export default defineEventHandler(async (event) => {
  try {
    const url = 'https://www.zhihu.com/api/v3/feed/topstory/hot-list-web?limit=20&desktop=true'
    const response = await fetch(url)
    if (!response.ok) {
      // console.log("知乎HTTP error! status:",response.status)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    // console.log("知乎:defineEventHandler:data:",JSON.stringify(data))
    // const result = res.data.map((k) => ({
    //   id: k.target.id,
    //   title: k.target.title,
    //   extra: {
    //     icon: k.card_label?.night_icon && proxyPicture(k.card_label.night_icon)
    //   },
    //   url: `https://www.zhihu.com/question/${k.target.id}`
    // }))

    return {
      code: 0,
      message: 'success',
      data: data
    }
  } catch (error) {
    console.error('获取知乎热搜数据失败:', error)
    return {
      code: 500,
      message: '获取知乎热搜数据失败',
      data: null
    }
  }
})