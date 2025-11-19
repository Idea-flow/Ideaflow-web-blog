import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useImSsrStore = defineStore('imSsr', () => {

  const recentChatList  = ref([])
  const groupList  = ref([])
  const friendList  = ref([])

  const isContactInfoLoaded = ref(false)
  const  isChatListLoaded  = ref(false)

  const imPrivateMessages  = ref({})
  //群消息列表
  const imGroupMessages  = ref({})
  const currentChat  = ref({})
  const  activeNav  = ref('chat')



    function  setContactInfo(groupInfoList: any[], friendInfoList: any[]) {
      groupList.value = groupInfoList
      friendList.value = friendInfoList
      isContactInfoLoaded.value = true
    }



  return {
    recentChatList,
    groupList,
    friendList,
    isContactInfoLoaded,
    isChatListLoaded,
    imPrivateMessages,
    imGroupMessages,
    currentChat,
    activeNav,
    setContactInfo

     }
})
