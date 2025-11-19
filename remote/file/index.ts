import { request } from '~/utils/request'

// Response interface
export interface GetFilePresignedUrlRes {
  /* */
  code: number;

  /* */
  data: {
    /*配置编号 */
    configId: number;

    /*文件上传 URL */
    uploadUrl: string;

    /*文件访问 URL */
    url: string;
  };

  /* */
  msg: string;
}
/**
 * 获取文件预签名地址
 * @param {string} path
 * @returns
 */
export function getFilePresignedUrl(path: string){
  return request.get(`/app-api/infra/file/presigned-url?path=${path}`);
}


export interface CreateFileVo {
  /* */
  configId: number;
  url: string;
  path: string;
  name: string;
  type: string;
  size: string;
}

export interface CreateFileRes {
  /* */
  code: number;

  /* */
  data: number;

  /* */
  msg: string;
}

// 创建文件


export function createFile(data: CreateFileVo) {
  return request.post(`/app-api/infra/file/create`,data);
}