<script setup lang="ts">
import {ref} from "vue";
import {getAll, createLink, type CreateLinkReq} from "~/remote/friendLinks";

let friendLinksData = ref([])


const { data: friendLinksDataRes } = await getAll()
friendLinksData.value = friendLinksDataRes.value?.data

// 是否显示分类
const showCategory = ref(true)

// 控制申请模态框的显示
const showApplyModal = ref(false)

// 申请表单数据
const formData = ref<CreateLinkReq>({
  name: '',
  url: '',
  description: '',
  logo: '',
  categoryName: '',
  contactInfo: ''
})

// 分类选项
const categoryOptions = [
  { label: '生活博客', value: '生活博客' },
  { label: '技术博客', value: '技术博客' },
  { label: '其他', value: '其他' }
]

// 提交申请
const handleSubmit = async () => {
  // 表单验证
  if (!formData.value.name) {
    alert('请输入网站名称')
    return
  }
  if (!formData.value.url) {
    alert('请输入网站链接')
    return
  }
  if (!formData.value.description) {
    alert('请输入网站简介')
    return
  }
  if (!formData.value.logo) {
    alert('请输入网站LOGO地址')
    return
  }
  if (!formData.value.categoryName) {
    alert('请选择网站分类')
    return
  }

  try {
    await createLink(formData.value)
    showApplyModal.value = false
    // 重置表单
    formData.value = {
      name: '',
      url: '',
      description: '',
      logo: '',
      categoryName: '',
      contactInfo: ''
    }
    // 刷新友链列表
    const { data: newData } = await getAll()
    friendLinksData.value = newData.value?.data
  } catch (error) {
    console.error('提交失败：', error)
  }
}


</script>

<template>
  <!-- 头部大图区域 -->
  <BlogImgBackground>
    <!-- 星空效果 -->
    <BlogStarry />
    <!-- 页面标题和申请按钮 -->
    <div class="flex justify-center items-end h-full pb-8">
      <button
          @click="showApplyModal = true"
          class="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500
               text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1
               transition-all duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2
               focus:ring-pink-400 focus:ring-opacity-50 dark:focus:ring-pink-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span>交个朋友吧~</span>
      </button>
    </div>
  </BlogImgBackground>

  <div class="max-w-7xl mx-auto px-4 py-8">


    <!-- 友链列表 -->
    <BlogFriendLinks
      :links="friendLinksData"
      :show-category="showCategory"
    />

    <!-- 申请模态框 -->
    <div v-if="showApplyModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- 背景遮罩 - 磨砂玻璃效果 -->
        <div class="fixed inset-0 transition-opacity" @click="showApplyModal = false">
          <div class="absolute inset-0 backdrop-blur-lg bg-white/30 dark:bg-gray-900/30"></div>
        </div>

        <!-- 模态框内容 -->
        <div class="inline-block align-middle bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full mx-auto border border-gray-200 dark:border-gray-700">
          <div class="px-6 pt-6 pb-4 sm:p-8 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center tracking-tight">
                  申请友链
                </h3>
                <div class="space-y-6">
                  <!-- 网站名称 -->
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      网站名称 <span class="text-red-500">*</span>
                    </label>
                    <div class="relative rounded-xl shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-pink-500 dark:focus-within:ring-pink-400">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <input
                        v-model="formData.name"
                        type="text"
                        class="block w-full pl-12 pr-4 py-3 text-base border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 focus:outline-none"
                        placeholder="请输入网站名称"
                      >
                    </div>
                  </div>

                  <!-- 网站链接 -->
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      网站链接 <span class="text-red-500">*</span>
                    </label>
                    <div class="relative rounded-xl shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-pink-500 dark:focus-within:ring-pink-400">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <input
                        v-model="formData.url"
                        type="url"
                        class="block w-full pl-12 pr-4 py-3 text-base border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 focus:outline-none"
                        placeholder="请输入网站链接"
                      >
                    </div>
                  </div>

                  <!-- 网站简介 -->
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      网站简介 <span class="text-red-500">*</span>
                    </label>
                    <div class="relative rounded-xl shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-pink-500 dark:focus-within:ring-pink-400">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                      </div>
                      <textarea
                        v-model="formData.description"
                        rows="3"
                        class="block w-full pl-12 pr-4 py-3 text-base border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-0 align-middle leading-relaxed"
                        placeholder="请输入网站简介"
                        style="resize: none; padding-top: 1rem;"
                      ></textarea>
                    </div>
                  </div>

              

                  <!-- 网站LOGO地址 -->
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      网站LOGO地址 <span class="text-red-500">*</span>
                    </label>
                    <div class="relative rounded-xl shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-pink-500 dark:focus-within:ring-pink-400">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        v-model="formData.logo"
                        type="url"
                        class="block w-full pl-12 pr-4 py-3 text-base border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 focus:outline-none"
                        placeholder="请输入LOGO地址"
                      >
                    </div>
                  </div>

                  <!-- 网站分类 -->
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      网站分类 <span class="text-red-500">*</span>
                    </label>
                    <div class="relative rounded-xl shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-pink-500 dark:focus-within:ring-pink-400">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h18M4 12h18M4 18h18" />
                        </svg>
                      </div>
                      <select
                        v-model="formData.categoryName"
                        class="appearance-none block w-full pl-12 pr-10 py-3 text-base border-gray-300 dark:border-gray-600 rounded-xl bg-white/95 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-0 hover:bg-white dark:hover:bg-gray-700/90"
                        style="-webkit-appearance: none;"
                      >
                        <option value="" disabled class="text-gray-400 dark:text-gray-400">请选择分类</option>
                        <option v-for="option in categoryOptions" :key="option.value" :value="option.value" >
                          {{ option.label }}
                        </option>
                      </select>
                      <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                      <!-- 联系方式 -->
                      <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      联系方式
                    </label>
                    <div class="relative rounded-xl shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-pink-500 dark:focus-within:ring-pink-400">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        v-model="formData.contactInfo"
                        type="text"
                        class="block w-full pl-12 pr-4 py-3 text-base border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 focus:outline-none"
                        placeholder="请输入联系方式"
                      >
                    </div>
                  </div>
                </div>

                <!-- 温馨提示 -->
                <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  <p class="flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>期待与你成为朋友!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 模态框底部按钮 -->
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="handleSubmit"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 transform hover:-translate-y-0.5"
            >
              提交申请
            </button>
            <button
              @click="showApplyModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friend-link-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>