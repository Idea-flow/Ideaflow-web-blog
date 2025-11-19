// 响应数据类型定义
export interface ApiResponse<T> {
    code: number;
    data: T;
    msg: string;
}