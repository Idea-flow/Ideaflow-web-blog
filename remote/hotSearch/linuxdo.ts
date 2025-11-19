import { ApiResponse } from '~/types/commonHotSearch'

interface LinuxdoHotSearchRes {
  topic_list: {
    can_create_topic: boolean
    more_topics_url: string
    per_page: number
    top_tags: string[]
    topics: {
      id: number
      title: string
      fancy_title: string
      posts_count: number
      reply_count: number
      highest_post_number: number
      image_url: null | string
      created_at: Date
      last_posted_at: Date
      bumped: boolean
      bumped_at: Date
      unseen: boolean
      pinned: boolean
      excerpt?: string
      visible: boolean
      closed: boolean
      archived: boolean
      like_count: number
      has_summary: boolean
      last_poster_username: string
      category_id: number
      pinned_globally: boolean
    }[]
  }
}

/**
 * 获取linux.do热搜数据
 */
export async function getLinuxdoHotSearch() {
  try {
    let isDev = process.env.NODE_ENV === "development";
    const startTime = new Date();
    if (isDev) {
      console.log(`[linux.do] 请求开始时间: ${startTime.toLocaleString()}`);
    }

    const { data } = await useFetch<ApiResponse<LinuxdoHotSearchRes>>('/api/hotSearch/all?type=linuxdo', {
      method: 'GET'
    })

    if (!data.value || data.value.code !== 0 || !data.value.data || !data.value.data.topic_list || !data.value.data.topic_list.topics) {
      console.error('获取linux.do热搜数据失败：数据格式错误')
      return []
    }

    const result = data.value.data.topic_list.topics
      .filter(k => k.visible && !k.archived && !k.pinned)
      .map((k) => ({
        id: k.id.toString(),
        title: k.title,
        hot: k.posts_count + k.like_count,
        url: `https://linux.do/t/topic/${k.id}`,
        tag: `${k.posts_count}回复`,
        tagColor: '#2B90D9'
      }))

    if (isDev) {
      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();
      console.log(`[linux.do] 请求结束时间: ${endTime.toLocaleString()} (耗时: ${duration}ms)`);
    }
    return result;
  } catch (error) {
    console.error('获取linux.do热搜数据失败:', error)
    return []
  }
}