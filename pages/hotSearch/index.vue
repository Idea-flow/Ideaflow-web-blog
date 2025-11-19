<script setup lang="ts">
import {getWeiBoHotSearch} from "~/remote/hotSearch/weibo";
import {getDouyinHotSearch, getDouyinHotSearchCookie} from "~/remote/hotSearch/douyin";
import {getBilibiliHotSearch} from "~/remote/hotSearch/bilibili";
import {getBaiduHotSearch} from "~/remote/hotSearch/baidu";
import {getZhihuHotSearch} from "~/remote/hotSearch/zhihu";
import {getLinuxdoHotSearch} from "~/remote/hotSearch/linuxdo";
import {getToutiaoHotSearch} from "~/remote/hotSearch/toutiao";

// 新增引入
import {getWallStreetcnHotSearch} from "~/remote/hotSearch/wallstreetcn";

// 热搜项目接口定义
interface HotSearchItem {
  id: string;
  title: string;
  hot: number;
  tag: string;
  tagColor: string;
  url: string;
  mobileUrl: string;
}

// SEO配置
useHead({
  title: '实时热搜榜 - 微博热搜 & 抖音热搜 & B站热搜 & 知乎热搜',
  meta: [
    { name: 'description', content: '实时展示微博热搜榜单、抖音热搜榜单、B站热搜榜单和知乎热搜榜单，了解最新热门话题和社会动态。' },
    { name: 'keywords', content: '微博热搜,抖音热搜,B站热搜,知乎热搜,热搜榜,热门话题,实时热点' }
  ]
});

const weiboHotSearchList = ref<HotSearchItem[]>([]);
const douyinHotSearchList = ref<HotSearchItem[]>([]);
const bilibiliHotSearchList = ref<HotSearchItem[]>([]);
const baiduHotSearchList = ref<HotSearchItem[]>([]);
const zhihuHotSearchList = ref<HotSearchItem[]>([]);
const douyinHotSearchCookie = ref('');

// 新增响应式数据
const wallstreetcnHotSearchList = ref<HotSearchItem[]>([]);
const linuxdoHotSearchList = ref<HotSearchItem[]>([]);
const toutiaoHotSearchList = ref<HotSearchItem[]>([]);

// 修改fetchHotSearch方法
const fetchHotSearch = async () => {
  try {
    const [
      weiboHotSearch, 
      bilibiliHotSearch,
      baiduHotSearch,
      zhihuHotSearch,
      douyinHotSearch,
      wallstreetcnHotSearch, // 新增华尔街见闻请求
      linuxdoHotSearch, // 新增linux.do请求
      toutiaoHotSearch // 新增今日头条请求
    ] = await Promise.allSettled([
      getWeiBoHotSearch(),
      getBilibiliHotSearch(),
      getBaiduHotSearch(),
      getZhihuHotSearch(),
      getDouyinHotSearch(),
      getWallStreetcnHotSearch(), // 新增请求
      getLinuxdoHotSearch(), // 新增linux.do请求
      getToutiaoHotSearch() // 新增今日头条请求
    ]);
    if (weiboHotSearch.status === 'fulfilled' && weiboHotSearch.value) {
      weiboHotSearchList.value = weiboHotSearch.value;
    }
    if (bilibiliHotSearch.status === 'fulfilled' && bilibiliHotSearch.value) {
      bilibiliHotSearchList.value = bilibiliHotSearch.value;
    }
    if (baiduHotSearch.status === 'fulfilled' && baiduHotSearch.value) {
      baiduHotSearchList.value = baiduHotSearch.value;
    }
    if (zhihuHotSearch.status === 'fulfilled' && zhihuHotSearch.value) {
      zhihuHotSearchList.value = zhihuHotSearch.value;
    }

    // 新增华尔街见闻数据处理
    if (wallstreetcnHotSearch.status === 'fulfilled' && wallstreetcnHotSearch.value) {
      wallstreetcnHotSearchList.value = wallstreetcnHotSearch.value
    }

    // 新增linux.do数据处理
    if (linuxdoHotSearch.status === 'fulfilled' && linuxdoHotSearch.value) {
      linuxdoHotSearchList.value = linuxdoHotSearch.value
    }

    // 新增今日头条数据处理
    if (toutiaoHotSearch.status === 'fulfilled' && toutiaoHotSearch.value) {
      toutiaoHotSearchList.value = toutiaoHotSearch.value
    }

    // 处理抖音Cookie获取结果
    if (douyinHotSearch.status === 'fulfilled' && douyinHotSearch.value) {
      douyinHotSearchList.value = douyinHotSearch.value;
      // console.log("抖音获取成功:", douyinHotSearchCookie.value);
    }
  }
  catch (error) {
    console.error("获取热搜数据失败:", error);
  }
}

// 初始化加载数据
await fetchHotSearch();



// 统一的热搜刷新方法
const fetchHotSearchByPlatform = async (platform: string) => {
  try {
    isRefreshing.value = true
    switch (platform) {
      case 'weibo':
        weiboHotSearchList.value = await getWeiBoHotSearch();
        break;
      case 'douyin':
        douyinHotSearchList.value = await getDouyinHotSearch();
        break;
      case 'bilibili':
        bilibiliHotSearchList.value = await getBilibiliHotSearch();
        break;
      case 'baidu':
        baiduHotSearchList.value = await getBaiduHotSearch();
        break;
      case 'zhihu':
        zhihuHotSearchList.value = await getZhihuHotSearch();
        break;
      case 'wallstreetcn':
        wallstreetcnHotSearchList.value = await getWallStreetcnHotSearch();
        break;
      case 'linuxdo':
        linuxdoHotSearchList.value = await getLinuxdoHotSearch();
        break;
      case 'toutiao':
        toutiaoHotSearchList.value = await getToutiaoHotSearch();
        break;
      default:
        console.error('未知的平台类型');
    }
  } catch (error) {
    console.error(`获取${platform}热搜数据失败:`, error);
  } finally {
    isRefreshing.value = false
  }
}

// 各平台的刷新方法
const fetchDouyinHotSearch = () => fetchHotSearchByPlatform('douyin');
const fetchWeiboHotSearch = () => fetchHotSearchByPlatform('weibo');
const fetchBilibiliHotSearch = () => fetchHotSearchByPlatform('bilibili');
const fetchBaiduHotSearch = () => fetchHotSearchByPlatform('baidu');
const fetchZhihuHotSearch = () => fetchHotSearchByPlatform('zhihu');
const fetchWallStreetcnHotSearch = () => fetchHotSearchByPlatform('wallstreetcn');
const fetchLinuxdoHotSearch = () => fetchHotSearchByPlatform('linuxdo');
const fetchToutiaoHotSearch = () => fetchHotSearchByPlatform('toutiao');

const isRefreshing = ref(false)

// 新增刷新所有热搜的方法
const refreshAllHotSearch = async () => {
  isRefreshing.value = true
  try {
    await fetchHotSearch()
  } finally {
    isRefreshing.value = false
  }
}
</script>

<template>
  <div class="min-h-screen  p-8 relative bg-base-100">
    <div class="absolute inset-0 bg-gradient-radial from-[#E8F5E9]/50 via-[#E8F5E9]/20 to-transparent bg-[length:100%_100%] bg-[position:0%_0%] bg-no-repeat"></div>
    <div class="absolute inset-0 bg-gradient-radial from-[#F3E5F5]/50 via-[#F3E5F5]/20 to-transparent bg-[length:100%_100%] bg-[position:50%_50%] bg-no-repeat"></div>
    <div class="absolute inset-0 bg-gradient-radial from-[#FFF3E0]/50 via-[#FFF3E0]/20 to-transparent bg-[length:100%_100%] bg-[position:100%_100%] bg-no-repeat"></div>

    <!-- 操作栏 -->
    <div class="relative w-2/5 mx-auto mb-8  shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] dark:shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] rounded-full p-4 flex justify-center items-center space-x-4 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.47)] dark:hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.4)] transition-shadow duration-300"
    :class=" $colorMode.value == 'dark' ? ' dark:bg-base-100'  : 'bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100' " >
      <button @click="refreshAllHotSearch" class="group relative transition-transform duration-300  hover:rotate-45" :disabled="isRefreshing">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2em" height="2em" viewBox="0 0 64 64">
          <path fill="#72caaf" d="M55 47.96v-1.84C50.25 53.84 41.73 59 32 59 18.1 59 6.66 48.5 5.17 35h6.07C12.7 45.17 21.42 53 32 53c7.56 0 14.17-4.01 17.86-10H45v-6h14.55C58.83 41.02 57.25 44.73 55 47.96zM58.83 29h-6.07C51.3 18.83 42.58 11 32 11c-7.56 0-14.17 4.01-17.86 10H19v6H4.45c.72-4.02 2.3-7.73 4.55-10.96v1.84C13.75 10.16 22.27 5 32 5 45.9 5 57.34 15.5 58.83 29z"></path><path fill="#72caaf" d="M9 11v6.883C13.749 10.158 22.266 5 32 5c13.897 0 25.337 10.501 26.83 24h-6.069C51.302 18.827 42.577 11 32 11c-7.56 0-14.169 4.005-17.865 10H19v6H3V11H9zM11.239 35C12.698 45.173 21.423 53 32 53c7.56 0 14.169-4.005 17.865-10H45v-6h16v16h-6v-6.883C50.251 53.842 41.734 59 32 59 18.103 59 6.663 48.499 5.17 35H11.239z"></path><path fill="#97e0bb" d="M9,11l1,5.04C7.75,19.27,6.17,22.98,5.45,27H3V11H9z"></path><path fill="#5dbc9d" d="M61,37v16h-6l-1-5.04c2.25-3.23,3.83-6.94,4.55-10.96H61z"></path><path fill="#8d6c9f" d="M20 27v-6c0-.552-.447-1-1-1h-2.978c3.771-5.041 9.618-8 15.978-8 9.87 0 18.37 7.37 19.771 17.142C51.843 29.634 52.265 30 52.762 30h6.068c.284 0 .556-.121.745-.333s.28-.494.249-.777C58.255 14.7 46.293 4 32 4c-8.704 0-16.715 3.945-22 10.695V11c0-.552-.447-1-1-1H3c-.553 0-1 .448-1 1v16c0 .552.447 1 1 1h16C19.553 28 20 27.552 20 27zM18 26H4V12h4v5.883c0 .447.297.84.728.962.432.121.891-.057 1.124-.438C14.628 10.638 22.907 6 32 6c12.896 0 23.749 9.381 25.689 22h-4.078C51.708 17.679 42.567 10 32 10c-7.676 0-14.672 3.916-18.717 10.475-.189.309-.198.696-.021 1.012S13.772 22 14.135 22H18V26zM61 36H45c-.553 0-1 .448-1 1v6c0 .552.447 1 1 1h2.978c-3.771 5.041-9.618 8-15.978 8-9.87 0-18.37-7.37-19.771-17.142C12.157 34.366 11.735 34 11.238 34H5.17c-.284 0-.556.121-.745.333s-.28.494-.249.777C5.745 49.3 17.707 60 32 60c8.704 0 16.715-3.945 22-10.695V53c0 .552.447 1 1 1h6c.553 0 1-.448 1-1V37C62 36.448 61.553 36 61 36zM60 52h-4v-5.883c0-.447-.297-.84-.728-.962-.431-.121-.891.057-1.124.438C49.372 53.362 41.093 58 32 58 19.104 58 8.251 48.619 6.311 36h4.078C12.292 46.321 21.433 54 32 54c7.676 0 14.672-3.916 18.717-10.475.189-.309.198-.696.021-1.012S50.228 42 49.865 42H46v-4h14V52z"></path><path fill="#8d6c9f" d="M30.844 46v2.312c0 .552.447 1 1 1s1-.448 1-1V46c0-.552-.447-1-1-1S30.844 45.448 30.844 46zM20.419 44.581c.256 0 .512-.098.707-.293l1.636-1.635c.391-.39.391-1.023 0-1.414s-1.023-.391-1.414 0l-1.636 1.635c-.391.39-.391 1.023 0 1.414C19.907 44.483 20.163 44.581 20.419 44.581zM25.73 44.618l-.866 2.144c-.207.512.04 1.095.552 1.302.123.049.25.073.375.073.396 0 .77-.237.927-.626l.866-2.144c.207-.512-.04-1.095-.552-1.302C26.521 43.859 25.937 44.106 25.73 44.618zM20.021 37.175c-.217-.509-.808-.745-1.312-.53l-2.129.904c-.509.216-.746.803-.53 1.311.162.381.532.61.921.61.131 0 .264-.026.391-.08l2.129-.904C20 38.27 20.237 37.683 20.021 37.175zM37.235 47.419c.162.381.532.61.921.61.131 0 .264-.026.391-.08.509-.216.746-.803.53-1.311l-.843-1.985c-.217-.509-.808-.746-1.312-.53-.509.216-.746.803-.53 1.311L37.235 47.419zM42.098 20.589c.29 0 .578-.125.775-.368.35-.428.286-1.058-.143-1.407-.951-.776-1.99-1.45-3.09-2.005-.494-.25-1.095-.05-1.343.443-.249.493-.051 1.094.442 1.343.97.489 1.888 1.084 2.727 1.769C41.652 20.516 41.876 20.589 42.098 20.589zM36.896 16.73c.135-.536-.189-1.079-.726-1.214-4.123-1.04-8.667-.462-12.399 1.605-.483.268-.658.876-.391 1.359.183.329.524.515.876.515.164 0 .33-.04.483-.125 3.293-1.823 7.301-2.332 10.942-1.415C36.216 17.588 36.761 17.265 36.896 16.73z"></path>
        </svg>
      </button>
      <a href="/" class="group relative transition-transform duration-300 hover:scale-110 hover:rotate-12">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2em" height="2em" viewBox="0 0 64 64">
          <path fill="#faefde" d="M55 33L31 13 7 33 7 57 55 57z"></path><path fill="#efd8be" d="M31,13L7,33v1.7c0,1.1,0.9,2,2,2c0.5,0,0.9-0.2,1.3-0.5l20.1-16.7c0.4-0.3,0.9-0.3,1.3,0l20.1,16.7 c0.8,0.7,2.1,0.6,2.8-0.3c0.3-0.4,0.5-0.8,0.5-1.3V33L31,13z"></path><path fill="#f9dd8f" d="M7 47H55V57H7z"></path><path fill="#cda1a7" d="M31.6,13.5l25.7,21.1c0.4,0.3,1.1,0.3,1.4-0.1c0.1-0.2,0.2-0.4,0.2-0.6V31c0-0.6-0.3-1.2-0.7-1.5L32.3,8 c-0.7-0.6-1.8-0.6-2.5,0l-26,21.4C3.3,29.8,3,30.3,3,31v2.9c0,0.6,0.5,1,1,1c0.2,0,0.4-0.1,0.6-0.2l25.7-21.1 C30.7,13.2,31.3,13.2,31.6,13.5z"></path><path fill="#8d6c9f" d="M16 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1 .6 0 1-.4 1-1v-2C17 50.4 16.6 50 16 50zM11 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C12 50.4 11.6 50 11 50zM46 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C47 50.4 46.6 50 46 50zM51 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C52 50.4 51.6 50 51 50z"></path><path fill="#bbdef9" d="M31 20A4 4 0 1 0 31 28A4 4 0 1 0 31 20Z"></path><path fill="#8d6c9f" d="M31,19c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S33.8,19,31,19z M31,27.2c-1.8,0-3.2-1.4-3.2-3.2s1.4-3.2,3.2-3.2 c1.8,0,3.2,1.4,3.2,3.2v0C34.2,25.8,32.8,27.2,31,27.2z"></path><path fill="#ed7899" d="M25 37H37V57H25z"></path><path fill="#8d6c9f" d="M33,45c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1s1-0.4,1-1v-2C34,45.4,33.6,45,33,45z"></path><path fill="#8d6c9f" d="M56.7,35.4c0.9,0.7,2.1,0.6,2.8-0.3c0.3-0.4,0.5-0.8,0.5-1.3V31c0-0.9-0.4-1.8-1.1-2.3l-26-21.4 c-1.1-0.9-2.7-0.9-3.8,0L18,16.4v-3.3c0-0.6-0.4-1-1-1s-1,0.4-1,1v5l-2,1.6V9.1c0-0.6-0.4-1-1-1s-1,0.4-1,1v12c0,0.1,0,0.1,0,0.2 l-8.9,7.4C2.4,29.2,2,30.1,2,31v2.9c0,0.8,0.4,1.5,1.2,1.8c0.7,0.3,1.5,0.2,2.1-0.3L6,34.8V56H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h56 c0.6,0,1-0.4,1-1s-0.4-1-1-1h-3V34.8L56.7,35.4z M22,56h-2H8v-8h16v8H22z M26,56V38h10v18H26z M54,56H42h-2h-2v-8h16V56z M54,38v8 H38v-8c0-1.1-0.9-2-2-2H26c-1.1,0-2,0.9-2,2v8H8v-8v-4.8l23-18.9l23,18.9V38z M32.3,12.8c-0.7-0.6-1.8-0.6-2.5,0L4,33.9V31 c0-0.3,0.1-0.6,0.4-0.8l26-21.4c0.4-0.3,0.9-0.3,1.3,0l26,21.4c0.2,0.2,0.4,0.5,0.4,0.8v2.9L32.3,12.8z"></path><path fill="#8d6c9f" d="M21 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C22 50.4 21.6 50 21 50zM41 50c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2C42 50.4 41.6 50 41 50z"></path>
        </svg>
      </a>

      <BaseThemeSwitch>
        <img width="35px" height="35px" class="transition-transform duration-300 hover:scale-110 hover:rotate-45" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAALj0lEQVR4nO1bWXBTyRVVJgmVhCSVSSqpVPKR/CQf+cykJktlmcp85CP5nUpVUqn5mwS/JxnbMDAMgzJkmAH0nmSPMWBsvZZsvMnYxmbxMMQLBq/gHdvIeEXGuyV5X+Gmbksta3lP1mogxa26VXbr6XXf031P33u7pVK9lJcSV0lT535TSCBvCjw5LPBSgciTej1PbHo1ceo1ZF7kCejVpgWRN/WLPLkt8EQSObJfx5E3xCTLV1Uvooj/NP1Q4KRkPU9qRZ5soZERqdq0KvDkmpBg3PfJvrxXVc+76Hjpj6JaKvM22pBohgJdBVQX1kHP7S4Y6x0Ex9hjWLXPAKw64emyg/69MDEBtp5BuF/XSZ/NP10OBo3ZG5A1gSO5ugTjL1XPm+g48oZeY6png01NNMOVrM/B2tQDa25DI1EEpq+xGy6fq/QBA1eFnsv+xbO2W3U6gXxfVBMLG9jZQ/nQfK0ZlmemIjZaSZemJ6GhvAkyDua5QZCeijzJMiSSbz0T4wVe+isjsfSUXGr4hnNWdvBPV+bgydIUbC08hs35R2BtvAuFQhl8mpRDtUgsg/7mVtict8HWwjg8WZ6BpysO2XetO2ehoaIR0pJz3CtCmhA44192zXCt1rJH4Eg6m3VcnguTEzJG22FrcQI2naOw4RjyaK2lSpH06ixVPs9uzo9S4GDVHvB+5IyyjEqv1SB9pNVqX4mr8acOZn9DrzbVYKdpSTnQVdsRaPjyHGzNj/kYwtTa0OIyVkPgGCmEA7UlVLVSAW3Dz6xNd2W+O0zfiSvJp78VJ3RUtUFaktnDDbqUnL1xMT5NbfyuQWPqwI4uHC2EqcFRP+PtdInLGc4Ulz1+Hw1ObinzUQoCT6g7KL9jGLYWxwNWxET/MGQecX1f4KRGMSnr2/GY+XbsgBy/RJef9wCeLE/TwQUzHvVTt98evFUaAMCBW6X0s/TknB3fs+EcpmA/pVwxS91kbqQfjP8uZC7RHjNy1GotewwaUy0zfmXWm+Ed0N/cEUhosst4GwBc9gEA1JYEBQDdZ6d+nLYHYNS6QBA5UpX5TuaXowZA4KQ0tux9Zn7FCbXFNSETGioOWskFjkmugVv0gS4QDnHODffC+SPurZIjGVEZL/LkLUZ4Pj6/4gRrY6sr0tOYIa+oA653OanmF7Z7ghZ/QsMZYySIIMiSYPM9WeJM5QnUJmeD7VAmVfwb2+T6sXV3Qup+d+DESX+LyHjdv3K+x/Z5X7Z3wOaCzUNoaPDNoXUfxTYlQqsLNpvF1YrEiQbPHc70UWxT6qft8zssTrBjbhI2AHreVMD2eW/CQxb29mecdX8AsC2oPzfdpYPGd6DisvefeX/ewFn3BwDbFPuxD0FJWjkjxdKwjBcSjL9lEZ6337vYfmhnADrdAKSEwOgh7hyyALx7IWg/9pE+SGUxQgJ5M2QADBpTHX4Jw1vvfX7DMRJAaHIukFfUrkho4SrrR84FalKyd+znTomHqFtCMl5UG//AEhvv2N4/yGGEhoSHIMiSoMKyDkdZP0FJMEg/S1MPIeNgLguS/hQCAMTiP/sY3sq9PFxCi1Sj7ed2STV7/rNQ0tstzOe9U1ql2D5cQmM61X8fsj4ogLT9ZqqZR/Kh9EwF3PvsNiyM98esH6aOR31g0JgwOHpiSCQ/Vp59XuIRqatZN32yumhnsLOqAe5W3vb8P9rZAXockMyMIiA4qyvTD2O2glBL0ytYXPCeIgB6tem/Lp/q8dr2JqLuPPP9fNr5YGubj2/ibC9O9MN4XzfdtwsFVz6AWn7uakwB6KpuYDzQLGu8LiVnr6g2beDy9y5j+efzkWh9eS3t3HyieMdnB+620uCn5VpdTAFYeGzF6rOrdiBXbdbz0u/otqYr96nkhJqIBNOVmQEgx4vA/NHOAAR8N4auwFbiKY30kwAABE5Kxg+xIusJfJamwkpEmDZfq4MzB3Kh/nItrEwP0LZ1+yDVcAZMuUJtgqYrt3YBAJ6Y8MOeO90eAPqbXAFNqoZA46UCsPddotpYXEDblCo4CAADCWd+fS48w5mO9XTRd2QcvEg5IxrjHbYHLhfgyJqCC5BqGnL2DHoAKBQv0wGgweu2Uh/FtmAVnKG2Nsg5UUyXfaQAoFoMrkiws7ohKgA8K5mTrsqSoEFjGsQH8NCCAcDicJx1fwCwLeQKThQ6ab0PlaQS7KN9Eb+jr74FDG4CNHDmXytsgcSOBq07ZkMDoLckZglPPBSJ91FXB1RKlSCq3QcqHPmPrPEoLPffnN+uvLJERM4FGtwu4J+I5J9yAYNaoCuNmUHoRl01jVCcehky3r2oSMxyKvBkQ+ClI6CCL6iURM+TJXx4a3EbgP6me9skWKxAgn7hKBodawCwzHXxpMvlQldpVeDIAzzDEDjzTxUNZ6LnidPfBbDSu1sJj5LOj1lp3sCqOwJH3keDYlLw9Ba9WrJSf7eNeQEwEnUiEq1WZF5jgI+ENJORisDRs3x6fO0Jg+cfRTxwtg1GEwfMDPbSvTvsik5EAPCuQKi7rlOxCBKqNl+NTSDUct39Hk5qi6vxKAInJWJnVQW3tkPhxcnIBi4TCq/NDsJamEDczL3BgDyrirfoEky/p8nQ6fIdK0GR7MnSh0V0NUQGgJQZfwBScvbiNRSs563ap714IDAdDjc7vFNWE3I6LOcCeNan2g0ROek6dtjb0K1YEIkkO0R38C+IhEuCeA0n7gAICcZ92FnF+RuybsCOqQxqAmUnL0JDdj7VspO5tE0pO0ROwAwxEve5wrZBjtgiOuEJ9zhM5MkG3uxanJr0KorafI6p0OBWc4GPYluw7DCaQCj7mDsQ4kj/KS77B3EFQeBJHnaG93D8K0MsOWrM9jUetTE7P27Z4exQL1w4yi5AkA68rxA/ANTSb7Cjc4fz6YUkDxkujHkAwGXvD0BDmACszgzQSnHeqRIPmeLf2IafyfHB2cOeJChLFU8ReYlWh+sve62CpWlPdhjMBUI5DnOM9tFCiRKZ4m6Bz/h/D0kUU1vM6wWN6bW4ASBoTK9hJzjjnhtgK47t4zBKgrnyJLhDjoCzy4y/8IEF+ttHYH1tg+rDzlGQjpd6QJBbCeXnr7KtsSBuAKDgtVTsqCT9Or0QgYoDiDY7xCXOjF9dXgN/WV1ep5/hM3hSJFcodYfHS3G9TJ3Omb8j8tKkqx7XTi8kebbDKLJDltfjzCuJtW2YPpN3siTwHfYhOHvIxQWK5a1YiY4nf8aO8B6e7X53TBidESkueSVZX90ISqiMi3QJ5B+qeIvIE51rV8ijFw52A4C1lfWgAJRlXHGnyMZ9cQdAq9W+gldMsENMaLC+Hg0AzAWQ8BRdoDWIC9BSuatcL6jJ31W7IZnvZH5N5Ai9Dp+tLYxqJTASRLZHwgsgwaU1uHBUmQRRz7/nijlENfmVardEl5KzV+CkG9gxHjHhVbRIAKDb4IntbRAJD30eFWeeGU+3wdnA+sHEg25W6V3Wvk2+otpN0Wote0SOFFMGTjTTI+1IQKCB0InwAyHUG+YbuxMHKInlLcsXBZ58jLctaJyQVk5j9bBXwuwgXeLo52w7xVAY2+RmHnW8r8t104MCZXpd9SxFdF2mekTPDZLMtOixNBnbWx3+WaFRW8SCoIuq50E+2Zf3Kv7MTeAl+iMpvI11p7SGXlqOpfHTAz1APvQY3/fMfiajJDq18WciJ5W5f8dDlyneyemta4aFcWvEhjttVnrDKzXJTN8r8pJVl5D9I9XzKiJvet1dXqfHbKhY0sr9uBiq8m5S0sTzgtnBHnplBX0ddwU0dGagB0Y62ukzWAzNP10Cevfxm7sYUvhC/HYQ5UzCma/rOelt3DYFniyGd6bndajJkTWBJ5exYq16UUWr1X5Jz0k/FziiFjlixN/1iLzUKXBkUuTIguu8TxoWeDKIp1MCL50TOMLhjzARyGc9/pei+j+X/wGLPLI3xsk3AwAAAABJRU5ErkJggg==" alt="paint-palette">

      </BaseThemeSwitch>

    </div>

    <div class="relative max-w-[94%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6">
        <OtherHotSearch :items="weiboHotSearchList" @refresh="() => fetchHotSearchByPlatform('weibo')" platform-name="微博" theme-color="#FF8200" platform-icon="/images/hotSearchIcons/weibo.png" ></OtherHotSearch>
        <OtherHotSearch :items="douyinHotSearchList" @refresh="() => fetchHotSearchByPlatform('douyin')" platform-name="抖音" theme-color="#FE2C55" platform-icon="/images/hotSearchIcons/douyin.png" ></OtherHotSearch>
        <OtherHotSearch :items="bilibiliHotSearchList" @refresh="() => fetchHotSearchByPlatform('bilibili')" platform-name="B站" theme-color="#00A1D6" platform-icon="/images/hotSearchIcons/bilibili.png" ></OtherHotSearch>
        <OtherHotSearch :items="baiduHotSearchList" @refresh="() => fetchHotSearchByPlatform('baidu')" platform-name="百度" theme-color="#2932E1" platform-icon="/images/hotSearchIcons/baidu.png" ></OtherHotSearch>
        <OtherHotSearch :items="zhihuHotSearchList" @refresh="() => fetchHotSearchByPlatform('zhihu')" platform-name="知乎" theme-color="#056DE8" platform-icon="/images/hotSearchIcons/zhihu.png" ></OtherHotSearch>
        <OtherHotSearch :items="wallstreetcnHotSearchList" @refresh="() => fetchHotSearchByPlatform('wallstreetcn')" platform-name="华尔街见闻" theme-color="#4ECDC4" platform-icon="/images/hotSearchIcons/wallstreetcn.png" >
        </OtherHotSearch>
        <OtherHotSearch :items="linuxdoHotSearchList" @refresh="() => fetchHotSearchByPlatform('linuxdo')" platform-name="Linux.do" theme-color="#2B90D9" platform-icon="/images/hotSearchIcons/linuxdo.png" >
        </OtherHotSearch>
        <OtherHotSearch :items="toutiaoHotSearchList" @refresh="() => fetchHotSearchByPlatform('toutiao')" platform-name="今日头条" theme-color="#FF0000" platform-icon="/images/hotSearchIcons/toutiao.png" >
        </OtherHotSearch>
    </div>
  </div>
  <BaseLoading v-if="isRefreshing"  />
</template>

<style scoped>
</style>