import { useFetch } from '#app'
import {ApiResponse} from "~/types/commonHotSearch";

/**
 * @description 获取HTML图片信息服务
 * @keywords 图片信息获取, 图片元数据, 图片尺寸, 图片类型, 图片描述
 * 
 * 该服务用于获取指定URL图片的详细信息，包括：
 * - 图片URL地址
 * - 图片替代文本
 * - 图片类型
 * - 图片尺寸（宽度和高度）
 */
interface ImageInfo {
    url: string;
    alt: string;
    type: string;
    width: string;
    height: string;
}

/**
 * 验证URL是否有效
 * @param url 需要验证的URL字符串
 * @returns boolean 返回URL是否有效
 */
function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export async function getHtmlImgInfo(url:string) {
    // 验证URL有效性
    if (!url || !url.trim() || !isValidUrl(url)) {
        console.error('无效的图片URL');
        return [];
    }

    try {
        let isDev = process.env.NODE_ENV === "development";
        const startTime = new Date();
        if (isDev) {
            console.log(`[html-getImgInfo] 请求开始时间: ${startTime.toLocaleString()}`);
        }

        const { data } = await useFetch<ApiResponse<ImageInfo>>('/api/html/getImgInfo?url='+url, {
            method: 'GET'
        })
        // console.log("html-getImgInfo:data.value.data1:",JSON.stringify(data.value))
        // console.log("html-getImgInfo:data.value.data2:",JSON.stringify(data.value.data))
        // console.log("百度:data.value.data.data.cards:",JSON.stringify(data.value.data.data.cards[0]))
        if (!data.value  ) {
            console.error('html-getImgInfo：数据格式错误')
            return []
        }


        const result = data.value

        if (isDev) {
            const endTime = new Date();
            const duration = endTime.getTime() - startTime.getTime();
            console.log(`[html-getImgInfo] 请求结束时间: ${endTime.toLocaleString()} (耗时: ${duration}ms)`);
        }
        return result;
    } catch (error) {
        console.error('获取html-getImgInfo失败:', error)
        return []
    }
}