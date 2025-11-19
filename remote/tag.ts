import { request } from '~/utils/request'

// Response interface
export interface GetTagRes {
  /* */
  code: number;

  /* */
  data: {
    /*id */
    id: number;

    /*名称 */
    name: string;
  }[];

  /* */
  msg: string;
}

/** 
 * 获得标签
 * @returns
 */
export function getTag() {
  return request.get(`/app-api/blog/tag/getAll`);
}