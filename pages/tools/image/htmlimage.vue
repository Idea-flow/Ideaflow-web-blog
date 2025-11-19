<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getHtmlImgInfo } from "~/remote/html/getImgInfo";

useHead({
  title: '网页图片提取工具 - 一键获取网站所有图片',
  meta: [
    { name: 'description', content: '一款强大的网页图片提取工具，支持一键获取任意网站的所有图片资源，支持多种图片格式筛选和批量下载功能。' },
    { name: 'keywords', content: '图片提取,网页图片下载,图片批量下载,网站图片采集,图片资源获取' }
  ]
});

interface ImageInfo {
  url: string;
  alt: string;
  type: string;
}

const imageTypes = [
  { label: '全部', value: '' },
  { label: 'PNG', value: 'png' },
  { label: 'JPEG', value: 'jpeg' },
  { label: 'GIF', value: 'gif' },
  { label: 'SVG', value: 'svg' },
  { label: 'WebP', value: 'webp' },
  { label: 'Base64', value: 'base64' }
];

const selectedType = ref('');
const isValidUrl = ref(true);
const showTypeFilter = ref(false);

const validateUrl = (url: string) => {
  try {
    new URL(url);
    isValidUrl.value = true;
    return true;
  } catch {
    isValidUrl.value = false;
    return false;
  }
};

const handleSearch = async () => {
  if (!validateUrl(imgHtmlUrl.value)) {
    return;
  }
  await fetchImgInfo();
};

const filteredImages = computed(() => {
  return htmlImgInfoContent.value.filter(image => {
    if (!selectedType.value) return true;
    return image.type === selectedType.value;
  });
});


const htmlImgInfoContent = ref<ImageInfo[]>([]);
const imgHtmlUrl = ref("")

const getFullImageUrl = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return new URL(url.trim(), imgHtmlUrl.value).toString();
};

const downloadImage = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error('下载图片失败:', error);
  }
};

const getImageType = (url: string): string => {
  if (url.startsWith('data:image/')) {
    const match = url.match(/^data:image\/(\w+);base64,/);
    return match ? 'base64' : '';
  }
  const extension = url.split('.').pop()?.toLowerCase() || '';
  return ['png', 'jpeg', 'jpg', 'gif', 'svg', 'webp'].includes(extension) ? extension : '';
};

const fetchImgInfo = async () => {
  const [htmlImgInfo] = await Promise.allSettled([
    getHtmlImgInfo(imgHtmlUrl.value)
  ]);
  
  if (htmlImgInfo.status === 'fulfilled' && htmlImgInfo.value) {
    try {
      const processedImages = htmlImgInfo.value.map(image => ({
        ...image,
        type: image.type || getImageType(image.url)
      }));
      htmlImgInfoContent.value = processedImages;
      showTypeFilter.value = processedImages.length > 0;
    } catch (error) {
      console.error('解析图片数据失败:', error);
    }
  }
};

// 移除初始化加载，改为在有效URL时才加载数据

</script>

<template>
  <div class="p-5">
    <div class="mb-8 space-y-4">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-text-base mb-4">网页图片提取工具</h1>
        <p class="text-text-muted max-w-2xl mx-auto">输入任意网址(仅支持服务端渲染的页面)，即可一键获取该网站所有图片资源。支持PNG、JPEG、GIF、SVG、WebP等多种格式，可进行分类筛选和批量下载。</p>
      </div>
      <h2 class="text-2xl font-semibold text-text-base">图片列表</h2>
      <div class="flex gap-4">
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="imgHtmlUrl"
              type="text"
              placeholder="请输入网站域名"
              class="w-full px-4 py-2 rounded-lg border-border-base focus:outline-none focus:ring-2 focus:ring-primary transition-all dark:bg-base-300"
              :class="{'border-error': !isValidUrl, 'border-border-base': isValidUrl}"
              @input="validateUrl($event.target.value)"
              @keyup.enter="handleSearch"
            />
            <div v-if="!isValidUrl" class="absolute -bottom-6 left-0 text-error text-sm">
              请输入有效的URL地址
            </div>
          </div>
        </div>
        <button
          @click="handleSearch"
          class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValidUrl"
        >
          搜索
        </button>
      </div>
      <div v-if="showTypeFilter" class="flex items-center gap-4">
        <span class="text-text-muted">图片类型：</span>
        <div class="flex gap-2">
          <button
            v-for="type in imageTypes"
            :key="type.value"
            @click="selectedType = type.value"
            class="px-3 py-1 rounded-full text-sm transition-colors duration-200"
            :class="{
              'bg-primary text-white': selectedType === type.value,
              'bg-base-200 text-text-base hover:bg-base-300': selectedType !== type.value
            }"
          >
            {{ type.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="(image, index) in filteredImages" 
           :key="index" 
           class="bg-base-100 rounded-lg shadow-md overflow-hidden border border-border-light hover:shadow-lg transition-transform duration-300 hover:-translate-y-2">
        <div class="relative aspect-square overflow-hidden">
          <img 
            :src="getFullImageUrl(image.url)" 
            :alt="image.alt || '图片'"
            class="w-full h-full object-contain"
            loading="lazy"
          />
          <button 
            @click="downloadImage(getFullImageUrl(image.url), image.alt || 'image')"
            class="absolute bottom-2 right-2 bg-primary hover:bg-primary-hover text-white p-2 rounded-full shadow-lg transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
        <div class="p-4">
          <p class="text-text-base font-medium mb-2 line-clamp-2">{{ image.alt || '无描述' }}</p>
          <p class="text-text-muted text-sm line-clamp-3">{{ getFullImageUrl(image.url) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>