import { request } from '~/utils/request'
import type {CreateCommentParams} from "~/remote/comment";

// 响应接口定义
export interface GetAllRes {
  code: number;
  data: {
    id: number;
    name: string;
    url: string;
    description: string;
    logo: string;
    categoryName: string;
    createTime: Record<string, unknown>;
  }[];
  msg: string;
}

/** 
 * 获取所有的友人链接
 * @returns Promise<GetAllRes>
 */
export function getAll() {
  return request.get('/app-api/blog/link/getAll');
}



// Response interface
export interface CreateLinkRes {
  /* */
  code: number;

  /* */
  data: number;

  /* */
  msg: string;
}

// Response interface
export interface CreateLinkReq {
  /* 网站名称*/
  name: string;

  /*网站地址 */
  url: string;

  /*网站描述 */
  description: string;
  // 网站LOGO地址
  logo: string;
  // 分类名称
  categoryName: string;

  // 联系方式
  contactInfo: string;
}

/**
 * 友人链接申请
 */
export function createLink(params: CreateLinkReq) {
  return request.post(`/app-api/blog/link/add`, params);
}
