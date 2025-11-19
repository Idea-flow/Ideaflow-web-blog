import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { useCookie } from '#app'

interface AppState {
    isDark: boolean
    mobile: boolean
    footer: boolean
    userInfo: any | null
    token: {
        accessToken: string
        refreshToken: string
    } | null
    configData: any | null
    tools: {
        isCollapsed: boolean
    }
}

export const useAppStore = defineStore('app', {
    state: (): AppState => {
        return {
            isDark: false, // 是否是暗黑模式
            mobile: false, // 是否是移动端
            footer: true, // 显示页脚
            userInfo: null, // 用户信息
            token: null, // 用户令牌
            configData: null, // 网站配置数据
            tools: {
                isCollapsed: false // 工具栏是否折叠
            }
        }
    },
    getters: {
        getIsDark(): boolean {
            return this.isDark
        },
        getMobile(): boolean {
            return this.mobile
        },
        getAccessToken(): string | null {
            const accessTokenCookie = useCookie('accessToken')
            return accessTokenCookie.value || null
        },
        getRefreshToken(): string | null {
            const refreshTokenCookie = useCookie('refreshToken')
            return refreshTokenCookie.value || null
        },
        getConfigData(): any | null {
            return this.configData
        },
        getToolsIsCollapsed(): boolean {
            return this.tools.isCollapsed
        }
    },
    actions: {
        setIsDark(isDark: boolean) {
            // console.log("更改主题色:",isDark)
            this.isDark = isDark
        },
        setMobile(mobile: boolean) {
            this.mobile = mobile
        },
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo
        },
        setConfigData(configData: any) {
            this.configData = configData
        },
        setToken(token: { accessToken: string; refreshToken: string } | null) {
            this.token = token
            if (token) {
                const accessTokenCookie = useCookie('accessToken', {
                    maxAge: 3600 * 24 * 7, // 24小时 * 7
                    path: '/',
                })
                const refreshTokenCookie = useCookie('refreshToken', {
                    path: '/',
                })
                accessTokenCookie.value = token.accessToken
                refreshTokenCookie.value = token.refreshToken
            } else {
                const accessTokenCookie = useCookie('accessToken')
                const refreshTokenCookie = useCookie('refreshToken')
                accessTokenCookie.value = null
                refreshTokenCookie.value = null
            }
        },
        clearUserInfo() {
            console.log("clearUserInfo-清除用户信息")
            this.userInfo = null
            this.token = null
            this.setToken(null)
        },
        setToolsIsCollapsed(isCollapsed: boolean) {
            this.tools.isCollapsed = isCollapsed
        }
    },
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    },
})