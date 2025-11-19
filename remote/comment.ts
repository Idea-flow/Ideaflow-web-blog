import { request } from '~/utils/request'
import { BaseResponse } from './auth'

export interface UserInfo {
  userId: number
  userName: string
  avatar?: string
  role?: string | '博主' | '管理员' | '访客' | '会员' | '超级会员'
}

export interface ReplyPagination {
  list: Comment[]
  total: number
}
interface CommentApi {
  id: number
  parentId: number
  articleId: number
  commentUserInfo: UserInfo
  replyToUserInfo: UserInfo | null
  content: string
  createTime: number
  likeCount: number
  isStick: number
  replies: ReplyPagination | null
}

// 评论分页参数类型
export interface CommentPageParams {
  pageNo: number
  pageSize: number
  articleId: string | string[]
  sortType?: 'latest' | 'hot' | 'featured'
  parentId?: number
}

// 评论分页响应类型
export interface CommentPageResponse {
  list: CommentApi[]
  total: number
}

// 评论列表分页查询
export const getCommentPage = (params: CommentPageParams) => {
  return request.get('/app-api/blog/comment/page', params)
}

// 创建评论参数类型
export interface CreateCommentParams {
  articleId: string | string[]
  content: string
  parentId?: number
  replyToUserId?: number
}

// 创建评论
export const createComment = (params: CreateCommentParams) => {
  return request.post('/app-api/blog/comment/add', params)
}

