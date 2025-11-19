import { ApiResponse } from '~/types/commonHotSearch'

interface Res {


  data: {
    word_list: {
      sentence_id: string
      word: string
      event_time: string
      hot_value: string
      label_url: string
    }[]
  }
}

// 抖音热搜数据类型
interface DouyinHotSearchData {
  data: {
    word_list: {
      sentence_id: string;
      word: string;
      event_time: string;
      hot_value: string;
    }[];
  };
}

export async function getDouyinHotSearchCookie() {
  try {
    // 使用服务端代理接口
    const data = await $fetch<ApiResponse<string>>('/api/hotSearch/all?type=douyincookie')
    
    if (data && data.code === 0) {
      return data.data
    }
    
    return null
  } catch (error) {
    console.error('获取抖音热搜Cookie失败：', error)
    return null
  }
}

/**
 * 获取抖音热搜数据
 */
export async function getDouyinHotSearch() {
  try {
    // 使用服务端代理接口
    let isDev = process.env.NODE_ENV === "development";
    const startTime = new Date();
    if (isDev) {
      console.log(`[抖音] 请求开始时间: ${startTime.toLocaleString()}`);
    }

    const data = await $fetch<ApiResponse<Res>>(`/api/hotSearch/all?type=douyin`
    )
    if (!data || data.code !== 0 || !data.data || !data.data.data || !data.data.data.word_list) {
      console.error('获取抖音热搜数据失败：数据格式错误')
      return []
    }
    
    const wordList = data.data.data.word_list

    if (isDev) {
      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();
      console.log(`[抖音] 请求结束时间: ${endTime.toLocaleString()} (耗时: ${duration}ms)`);
    }

    return wordList.map((k) => {
      return {
        id: k.sentence_id,
        title: k.word,
        hot: parseInt(k.hot_value) || 0,
        tag: '',  // 抖音接口暂无标签信息
        tagColor: '',
        url: `https://www.douyin.com/hot/${k.sentence_id}`,
        extra: {
          icon: k.label_url && proxyPicture(k.label_url)
        }
      }
    })
  } catch (error) {
    console.error('获取抖音热搜数据失败：', error)
    return []
  }
}
