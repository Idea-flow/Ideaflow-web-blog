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

export interface CommentApi {
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


// 通用响应类型
export interface BaseResponse<T = any> {
    code: number;
    data: T;
    msg: string;
}

