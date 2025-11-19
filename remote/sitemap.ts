import { request } from '~/utils/request'
import type {GetTagRes} from "~/remote/tag";

export function getArticleSitemap(){
    return request.get<GetTagRes>(`/app-api/blog/sitemap/getArticleSitemap`);
}