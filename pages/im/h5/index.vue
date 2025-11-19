<script setup lang="ts">
import chat from "~/pages/im/h5/chatP/index.vue"
import RecentChatList from "~/pages/im/h5/RecentChatList/index.vue"
import {onMounted} from "vue";
import * as $wsApi from "~/utils/imNetty/wssocket";
import {useImStore} from "~/stores/ImStore";
import {getAllContactInfo} from "~/remote/imChat";


const token = useCookie('accessToken').value

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
      // handlePrivateMessage(msgInfo);
    } else if (cmd == 4) {
      // 插入群聊消息
      // handleGroupMessage(msgInfo);
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

})
// IM 连接初始化结束
// 获取基本信息

// 获取联系人信息
const imStore = useImStore()
if (!imStore.isContactInfoLoaded) {
  // console.log("imh5 into xxx:")
  const { data: allContactInfoRes } = await getAllContactInfo()
  // console.log("middleArea-JSON.stringify(allContactInfoRes):"+JSON.stringify(allContactInfoRes))
  const groupInfoList = allContactInfoRes.value?.data?.imContactGroupInfoList || []
  const friendInfoList = allContactInfoRes.value?.data?.imContactFriendInfoList || []

  // console.log("middleArea-imStore.isContactInfoLoaded:"+imStore.isContactInfoLoaded)
  // console.log("middleArea-imStore.isContactInfoLoadedComputed.value:"+isContactInfoLoadedComputed.value)
  // console.log("middleArea-imSsrStore.isContactInfoLoaded:"+imSsrStore.isContactInfoLoaded)
  imStore.setContactInfo(groupInfoList, friendInfoList)

}


</script>

<template>
  <RecentChatList></RecentChatList>
</template>

<style scoped>
</style>