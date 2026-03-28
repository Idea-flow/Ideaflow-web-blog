<template>

  <!-- 顶部粘性元素 -->
  <div class='sticky bottom-0 z-30 translate-y-[25px] flex justify-center w-full bg-cover bg-center after:content-[""] after:w-full after:h-[60%] after:absolute after:bottom-[25px] after:left-0'>
    <div class='flex justify-center lg:w-[950px] xl:w-[1200px] mx-auto'>
      <img :src="animals" alt="动物" width="660.34" height="79.99" class="relative z-40 hidden md:block" />
    </div>
  </div>

  <!-- 底部内容区域 -->
  <footer class='bg-white dark:bg-black px-10 transition-colors'>
    <div class="max-w-6xl mx-auto py-8">
      <!-- 自定义HTML内容 -->
      <div v-if="footContentHtml" v-html="footContentHtml" class="animate-fade-in"></div>

      <!-- 默认页脚内容 -->
      <template v-else>
        <!-- 个性化标语 -->
        <div v-if="slogan" class="text-center mb-2 animate-fade-in">
          <p class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 dark:from-teal-300 dark:to-blue-300 text-lg italic font-medium transition-all duration-500 hover:scale-105 transform">{{ slogan }}</p>
        </div>

        <div class="flex flex-col items-center space-y-4 animate-fade-in">
          <!-- 构建信息和备案信息 作者信息展示区-->
          <div class="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0 text-sm text-gray-500 dark:text-gray-400">
            <div v-if="email" class="flex items-center space-x-3 transform transition-all duration-300 hover:scale-110">
              <a :href="`mailto:${email}`" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                <span>联系我</span>
              </a>
            </div>
            <div v-if="poweredBy" class="transform transition-all duration-300 hover:scale-110">
              <a :href="poweredByLink" target="_blank" rel="noopener noreferrer" class="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                {{ poweredBy }}
              </a>
            </div>
            <div v-if="icp" class="transform transition-all duration-300 hover:scale-110">
              <a :href="icpLink" target="_blank" rel="noopener noreferrer" class="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                {{ icp }}
              </a>
            </div>
          </div>
        </div>
      </template>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

// 使用 Nuxt 的资源引用方式
const animals = ref('https://oss.ideaflow.top/configImg/footer/animals.webp');

// 页脚配置
const footContentHtml = ref('');



const appStore = useAppStore()
const webBaseConfig = computed(() => appStore.getConfigData?.webBaseConfig)

footContentHtml.value = webBaseConfig.value?.footContentHtml;



const slogan = ref('云想衣裳花想容 春风拂槛露华浓');
const email = ref('843145936@qq.com');
const icp = ref('https://beiancx.miit.gov.cn/');
const icpLink = ref('');
const poweredBy = ref('本网站由 Biliww 强力支持');
const poweredByLink = ref('https://blog.ideaflow.top');
</script>

<style scoped>

</style>