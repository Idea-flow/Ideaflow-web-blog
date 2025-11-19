import { defineStore } from "pinia";
import {useCookie} from "#app";


interface BlogState {

    articleAuth:{}
}

export const useBlogStore = defineStore('blog', {
    state: (): BlogState => {
        return {
            articleAuth:{}
        }
    },
    getters: {

    },
    actions: {
        setArticleAuth(token: string) {
            this.token = token
            if (token) {
                // console.log("setArticleAuth:"+token)
                const au = useCookie('au', {
                    maxAge: 3600 * 24 * 7, // 24小时 * 7
                    path: '/',
                })
                au.value = token
            } else {
                const au = useCookie('au')
                au.value = null
            }
        },
    },
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    },
})