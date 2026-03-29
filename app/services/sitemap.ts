import { request } from '~/utils/request'
import type { GetTagRes } from '~/services/tag'

export function getArticleSitemap(){
    return request.get<GetTagRes>(`/app-api/blog/sitemap/getArticleSitemap`);
}
