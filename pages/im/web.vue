<script setup lang="ts">
import * as $wsApi from '~/utils/imNetty/wssocket.js';
import {computed, onMounted} from "vue";
import MiddleArea from "~/components/im/web/middle/MiddleArea.vue";
import Sidebar from "~/components/im/web/left/Sidebar.vue";
import ChatArea from "~/components/im/web/right/ChatArea.vue";
import {findChatList, getAllContactInfo} from "~/remote/imChat";
const imStore = useImStore()
// 当前选中的导航项
// const activeNav = ref('chat')
const activeNav = computed(() => imStore.activeNav)
// console.log("im主页:activeNav.value"+activeNav.value)



const token = useCookie('accessToken').value
let isDev = process.env.NODE_ENV === "development";
// isDev = false
// ws初始化
// const imNettyWsUrl = isDev ? "ws://localhost:8878/im" : "wss://blogserver.ideaflow.top/im";

onMounted(() => {

  $wsApi.connect("", token);
  $wsApi.onConnect(() => {
    // 加载离线消息
    // this.pullPrivateOfflineMessage(this.$store.state.chatStore.privateMsgMaxId);
    // this.pullGroupOfflineMessage(this.$store.state.chatStore.groupMsgMaxId);
  });
  $wsApi.onMessage((cmd, msgInfo) => {
    if (cmd == 2) {
      // 关闭ws
      $wsApi.close(3000)
      // 异地登录，强制下线
      // ElMessageBox.confirm("您已在其他地方登陆，将被强制下线", "强制下线通知", {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //     location.href = "/";
      //   }
      // });

    } else if (cmd == 3) {
      // 插入私聊消息
      handlePrivateMessage(msgInfo);
    } else if (cmd == 4) {
      // 插入群聊消息
      handleGroupMessage(msgInfo);
    } else if (cmd == 5){
      // 处理系统消息
      // this.handleSystemMessage(msgInfo);
    }
  });
  $wsApi.onClose((e) => {
    console.log(e);
    if (e.code != 3000) {
      // 断线重连
      // this.$message.error("连接断开，正在尝试重新连接...");
      $wsApi.reconnect("",token);
    }
  });

  // imStore.setActiveNav("chat")
  // imStore.setCurrentChat(null)
})
// IM 连接初始化结束







// 处理聊天选择 更新当前右侧聊天区域应该展示的内容
const handleChatSelect = (chat: any) => {
  imStore.setCurrentChat(chat)
}




const appStore = useAppStore()
const userInfo = computed(() => appStore.userInfo)
function handlePrivateMessage(msgInfo) {
  let message = JSON.parse(msgInfo);
  const chatId = message.sendId;
  console.log("接收到私聊消息handlePrivateMessage--msgInfo:"+msgInfo)
  // 获取现有消息列表或初始化新列表
  const existingMessages = imStore.imPrivateMessages[chatId] || [];
  
  // 格式化时间
  const formattedTime = new Date(message.sendTime).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-');
  
  // 构建新消息对象
  const newMessage = {
    id: message.id,
    sendId: message.sendId,
    recvId: message.recvId,
    content: message.content,
    type: message.type,
    status: message.status,
    sendTime: formattedTime,
    avatar: message.sendAvatar
  };
  
  // 将新消息添加到列表中
  const updatedMessages = [...existingMessages, newMessage];
  
  // 更新store中的消息列表
  imStore.updatePrivateMessages(chatId, updatedMessages);

  // 更新最近聊天列表
  imStore.updatePrivateRecentChatList(chatId,message.sendTime,message.content,message.type)

  // console.log("新的消息 imStore.imPrivateMessages[chatId]:"+ imStore.imPrivateMessages[chatId])
}


// 接收到群聊消息handleGroupMessage
function handleGroupMessage (msgInfo){
  let message = JSON.parse(msgInfo);
  const chatId = message.groupId;
  // console.log("接收到群聊消息handleGroupMessage--msgInfo:"+msgInfo)

  if(message.sendId == userInfo.value.id){
    // console.log("接收到群聊消息handleGroupMessage--自己发送的信息返回")
    return
  }
  // 获取现有消息列表或初始化新列表
  const existingMessages = imStore.imGroupMessages[chatId] || [];
  
  // 格式化时间
  const formattedTime = new Date(message.createTime).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-');
  
  // 构建新消息对象
  const newMessage = {
    id: message.id,
    groupId: message.groupId,
    sendId: message.sendId,
    sendNickName: message.sendNickName,
    content: message.content,
    type: message.type,
    status: message.status,
    sendTime: formattedTime,
    avatar: message.sendAvatar || '/logo.webp'
  };
  
  // 将新消息添加到列表中
  const updatedMessages = [...existingMessages, newMessage];
  
  // 更新store中的消息列表
  imStore.updateGroupMessages(chatId, updatedMessages);

  // 更新最近聊天列表
  imStore.updateGroupRecentChatList(chatId, message.createTime, message.sendNickName + ": "+message.content,message.type);
}


// 获取聊天列表
if (!imStore.isChatListLoaded) {
  const { data: AppChatListRep } = await findChatList()
  // console.log("JSON.stringify(AppChatListRep.value):"+JSON.stringify(AppChatListRep.value))
  const chatList = AppChatListRep.value?.data || []
  imStore.setChatList(chatList)
}

// 获取联系人信息
if (!imStore.isContactInfoLoaded) {
  // console.log("imh5 into xxx:")
  const { data: allContactInfoRes } = await getAllContactInfo()
  console.log("im-web-JSON.stringify(allContactInfoRes):"+JSON.stringify(allContactInfoRes))
  const groupInfoList = allContactInfoRes.value?.data?.imContactGroupInfoList || []
  const friendInfoList = allContactInfoRes.value?.data?.imContactFriendInfoList || []

  // console.log("middleArea-imStore.isContactInfoLoaded:"+imStore.isContactInfoLoaded)
  // console.log("middleArea-imStore.isContactInfoLoadedComputed.value:"+isContactInfoLoadedComputed.value)
  // console.log("middleArea-imSsrStore.isContactInfoLoaded:"+imSsrStore.isContactInfoLoaded)
  imStore.setContactInfo(groupInfoList, friendInfoList)

}
</script>

<template>
  <div class="min-h-screen relative">
    <div class="absolute inset-0 bg-[url('/images/im/imbg.webp')] bg-cover bg-center bg-no-repeat opacity-80 dark:opacity-20"></div>
    <div class="absolute inset-0 bg-black/1 dark:bg-black/60 transition-opacity duration-300"></div>

    <div class="container mx-auto p-4 h-[95vh] relative z-10">
      <div class="flex h-full backdrop-blur-xl bg-white/30 dark:bg-black/80 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30">
        <!-- 左侧导航栏 -->
        <Sidebar />


        <NuxtPage />
<!--&lt;!&ndash;         中间内容区域&ndash;&gt;-->
<!--        <MiddleArea-->
<!--            @select-chat="handleChatSelect"-->
<!--        />-->

<!--        &lt;!&ndash; 右侧聊天区域 &ndash;&gt;-->
<!--        <ChatArea />-->
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>