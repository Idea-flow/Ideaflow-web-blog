import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { useCookie } from '#app'

interface ImState {
    recentChatList: any[]
    groupList: any[]
    friendList: any[]
    isContactInfoLoaded: boolean
    isChatListLoaded: boolean
    imPrivateMessages: any,
    imGroupMessages: any,
    //当前聊天(控制右侧聊天的展示状态)
    currentChat: any,
    //侧边栏激活状态
    activeNav: string,
}

export const useImStore = defineStore('im', {
    state: () =>  ({
        recentChatList: [],
        groupList: [],
        friendList: [],
        isContactInfoLoaded: false,
        isChatListLoaded: false,
        //私聊消息列表
        imPrivateMessages: {},
        //群消息列表
        imGroupMessages: {},
        currentChat: {},
        activeNav: 'chat',
    }),
    getters: {
        hasContactInfo: (state) => state.isContactInfoLoaded,
        hasChatList: (state) => state.isChatListLoaded,
        getHasChatList():any {
            return this.isChatListLoaded
        },
        getCurrentChat(): any{
            return this.currentChat
        },
    },
    actions: {
        setContactInfo(groupInfoList: any[], friendInfoList: any[]) {
            this.groupList = groupInfoList
            this.friendList = friendInfoList
            this.isContactInfoLoaded = true
        },
        setChatList(chatList: any[]) {
            this.recentChatList = chatList
            this.isChatListLoaded = true
        },
        clearContactInfo() {
            this.groupList = []
            this.friendList = []
            this.isContactInfoLoaded = false
        },
        // 更新私聊消息
        updatePrivateMessages(chatId: string | number, messages: any[]) {
            // console.log("更新私聊消息-chatId:-",chatId)
            // console.log("更新私聊消息-messages:-",messages)
            this.imPrivateMessages[chatId] = messages
        },
        clearChatList() {
            this.recentChatList = []
            this.isChatListLoaded = false
        },
        // 格式化聊天列表时间显示
        getChatListTime(timestamp: number): string {
            const date = new Date(timestamp)
            const now = new Date()
            
            // 判断是否是同一天
            const isToday = date.toDateString() === now.toDateString()
            if (isToday) {
                return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })
            }
            
            // 判断是否是昨天
            const yesterday = new Date(now)
            yesterday.setDate(yesterday.getDate() - 1)
            const isYesterday = date.toDateString() === yesterday.toDateString()
            if (isYesterday) {
                return `昨天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })}`
            }
            
            // 判断是否是今年
            const isThisYear = date.getFullYear() === now.getFullYear()
            if (isThisYear) {
                return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
            }
            
            // 其他日期返回完整格式
            return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
        },
        // 更新群聊消息
        updateGroupMessages(chatId: string | number, messages: any[]) {
            this.imGroupMessages[chatId] = messages
        },
        // 更新最近聊天列表
        updatePrivateRecentChatList(id:number,time: number,content:string,messageType:number) {
            // 查找现有的聊天记录
            const existingChat = this.recentChatList.find(chat => 
                chat.type === 'private' && chat.id === id
            )

            // console.log("id:"+id)
            // console.log("existingChat:"+existingChat)

            // 从列表中移除旧的聊天记录（如果存在）
            this.recentChatList = this.recentChatList.filter(chat => 
                !(chat.type === 'private' && chat.id === id)
            )
            let lastMessage  = content;
            //https://bu.dusays.com/2023/11/10/654e2da27801e.jpg
            // console.log("messageType:",messageType)
            if (messageType === 1) {
                lastMessage = "[图片消息]";
            }
            // 构建新的聊天记录，如果存在则保留原有属性
            const newChat = {
                id: existingChat ? existingChat.id : id,
                type: existingChat ? existingChat.type : 'private',
                lastMessage: lastMessage,
                time: this.getChatListTime(time),
                name: existingChat ? existingChat.name : ( '未知用户'),
                avatar: existingChat ? existingChat.avatar : ''
            }
            
            // 将新的聊天记录添加到列表开头
            this.recentChatList.unshift(newChat)
        },
        // 更新群聊最近聊天列表
        updateGroupRecentChatList(id: number, time: number, content: string,messageType:number) {
            // 查找现有的群聊记录
            const existingChat = this.recentChatList.find(chat => 
                chat.type === 'group' && chat.id === id
            )

            // 从列表中移除旧的群聊记录（如果存在）
            this.recentChatList = this.recentChatList.filter(chat => 
                !(chat.type === 'group' && chat.id === id)
            )
            let lastMessage  = content;
            if (messageType === 1) {
                lastMessage = "[图片消息]";
            }
            // 构建新的群聊记录，如果存在则保留原有属性
            const newChat = {
                id: existingChat ? existingChat.id : id,
                type: existingChat ? existingChat.type : 'group',
                lastMessage: lastMessage,
                time: this.getChatListTime(time),
                name: existingChat ? existingChat.name : '未知群聊',
                avatar: existingChat ? existingChat.avatar : ''
            }
            
            // 将新的群聊记录添加到列表开头
            this.recentChatList.unshift(newChat)
        },
        setCurrentChat(chat: any) {
            // 更新当前聊天对象
            this.currentChat = chat;
        },
      setActiveNav(activeNav: string) {
        // 更新当前聊天对象
        this.activeNav = activeNav;
      }
    },

    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    },
})