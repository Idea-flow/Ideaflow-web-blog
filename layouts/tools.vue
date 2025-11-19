<script setup lang="ts">
import {ref} from "vue";
import {navigateTo} from "#app";

const isCollapsed = ref(false)

const handleSidebarToggle = (collapsed: boolean) => {
  isCollapsed.value = collapsed
}

const handleClick = (item: string) => {
  navigateTo(item)
}


// useHead({
//   script: [
//     {
//       async: true,
//       src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1870872898412136',
//       crossorigin: 'anonymous'
//     }
//   ]
// })
</script>


<template>



  <div class="bg-base-100">
<!--    <ToolsHeader />-->
    <div class="container mx-auto p-4">
      <div class="min-h-screen bg-base-100 flex">
        <ToolsSidebar @toggle="handleSidebarToggle" >
          <BaseMenu >
            <BaseMenuItem @click="handleClick('/tools/json')">
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </template>
              JSON工具
            </BaseMenuItem>

            <BaseMenuSubMenu title="加密">
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </template>
              <BaseMenuItem @click="handleClick('/tools/md5')">
                md5
              </BaseMenuItem>
            </BaseMenuSubMenu>

            <BaseMenuSubMenu title="开发">
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </template>
<!--              <BaseMenuItem @click="handleClick('/tools/cron')">-->
<!--                cron表达式生成-->
<!--              </BaseMenuItem>-->
              <BaseMenuItem  @click="handleClick('/tools/date-converter')">
                日期时间转换器
              </BaseMenuItem>
              <BaseMenuItem  @click="handleClick('/tools/develop/urlcodec')">
                url编解码
              </BaseMenuItem>

            </BaseMenuSubMenu>

            <BaseMenuSubMenu title="图片">
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </template>
              <BaseMenuItem @click="handleClick('/tools/image/base64')">
                base64
              </BaseMenuItem>
<!--              <BaseMenuItem @click="handleClick('/tools/image/htmlimage')">-->
<!--                网页图片提取-->
<!--              </BaseMenuItem>-->
            </BaseMenuSubMenu>

          </BaseMenu>


        </ToolsSidebar>
        <!-- 主要内容区域 -->
        <div class="flex-grow p-6 transition-all duration-300 ease-in-out"
             :class="{'ml-[20%]': isCollapsed}">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>