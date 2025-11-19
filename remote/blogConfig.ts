import { request } from '~/utils/request'

export interface GetAllConfigRes {
    /* */
    code: number;

    /* */
    data: {
        /* */
        webBaseConfig: {
            /* */
            homeImgUrl: Record<string, unknown>[];

            /* */
            footerEmail: string;
            footContentHtml: string;
        };
        /* */
        sidebarConfig: {
            /* */
            authorCardInfo: string;
        };
    };

    /* */
    msg: string;
}
/**
 * 获得标签
 * @returns
 */
export function getAllConfig() {
    return request.get(`/app-api/blog/config/getAll`);
}