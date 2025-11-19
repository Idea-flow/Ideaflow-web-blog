<script setup lang="ts">
import {useCounterStore} from "~/stores/counter";
import {useImSsrStore} from "~/stores/ImSsrStore";
import {useCookie} from "#app";
import {getAllContactInfo} from "~/remote/imChat";

const store = useCounterStore();





const doubleValue = computed(() => store.doubleCount)

// if (import.meta.client) {
//   store.increment();
// }

if (import.meta.server) {
  store.increment();
}


// console.log("doubleValue:",doubleValue.value)
//
// console.log("countstore.hasContactInfo:",store.hasContactInfo)

const imStore = useImStore();


// console.log("imStore.hasContactInfo:",imStore.hasContactInfo)
// console.log("imStore.isContactInfoLoaded:",imStore.isContactInfoLoaded)
// console.log("imStore.getHasChatList:",imStore.getHasChatList)
// console.log("imStore.activeNav:",imStore.activeNav)
// console.log("imStore.groupList:",imStore.groupList)


const imSsrStore = useImSsrStore();

// console.log("imSsrStore.isContactInfoLoaded:",imSsrStore.isContactInfoLoaded)
// console.log("imSsrStore.activeNav:",imSsrStore.activeNav)
// imSsrStore.setContactInfo([],[]);

// console.log("imSsrStore.isContactInfoLoaded2:",imSsrStore.isContactInfoLoaded)
//
// const accessTokenCookie = useCookie('accessToken')
// console.log("accessTokenCookie.value:",accessTokenCookie.value)
// const useStateCountResult = useState('useStateCounter' )
// console.log("useStateCount.value:",useStateCountResult.value)
// const useStateCount = useState('useStateCounter', () =>100 )
// console.log("useStateCount.value:",useStateCount.value)



if (!imStore.isContactInfoLoaded) { //刷新页面的时候会强制刷新, 如果不刷新页面,只是路由跳转,是生效的

  console.log("imStore.isContactInfoLoaded为false进来了:"+imStore.isContactInfoLoaded)

}
</script>



<!--/study/pinia   通过这个路由访问-->
<template>
pinia

  <div>
    {{doubleValue}}
  </div>

</template>

<style scoped>

</style>