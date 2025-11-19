import { request } from '~/utils/request'

// 通用响应类型
export interface BaseResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}

// 用户信息类型
export interface UserInfo {
  id: number;
  username: string;
  phoneNumber: string;
  email: string;
  gender: number;
  avatar: string;
  introduction: string;
  subscribe: string;
  createTime: Record<string, unknown>;
  accessToken: string;
  refreshToken: string;
  expiresTime: Record<string, unknown>;
}

// 注册参数类型
export interface RegisterParams {
  username: string;
  password: string;
  email: string;
  code: string;
}

// 登录参数类型
export interface LoginParams {
  account: string;
  password: string;
}

// 登录参数类型
export interface socialLoginParams {
  type: string;
  code: string;
  state: string;
}

// 验证码参数类型
export interface VerificationCodeParams {
  email: string;
  type: 'login' | 'register';
}

// 注册接口
export const register = (params: RegisterParams) => {
  return request.post('/app-api/blog/userAuth/regist', params)
}

// 登录接口
export const login = (params: LoginParams) => {
  return request.post('/app-api/blog/userAuth/login', params)
}

// 登出接口
export const logout = () => {
  return request.post('/app-api/blog/userAuth/logout')
}

// 获取验证码接口
export const getVerificationCode = (params: VerificationCodeParams) => {
  return request.get('/app-api/blog/userAuth/getCodeForForgetPassword', params)
}


// 社交授权的跳转
export const socialAuthRedirect = (type: number, redirectUri: string) => {
  return request.get('/app-api/blog/userAuth/social-auth-redirect?type=' + type + '&redirectUri=' + redirectUri);
};

// 社交快捷登录，使用 code 授权码
export const socialLogin = (params: socialLoginParams) => {
  return request.post('/app-api/blog/userAuth/social-login', params)
}