<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {createFile, getFilePresignedUrl} from "~/remote/file";
import CryptoJS from "crypto-js";

const emit = defineEmits<{
  'select': [content: string, type: number]
}>()

const showUploadPanel = ref(false)
const imageUrl = ref('')
const dragOver = ref(false)
const panelRef = ref<HTMLElement | null>(null)
const activeTab = ref('local')
const previewImage = ref('')
const uploadUrl = ref('')
const showUrl = ref('')
const fileConfigId = ref('0')
// 处理点击外部区域关闭面板
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (panelRef.value && !panelRef.value.contains(target)) {
    showUploadPanel.value = false
    previewImage.value= '';
  }
}

// 处理鼠标移出面板
const handleMouseLeave = () => {
  // showUploadPanel.value = false
}

// 组件挂载时添加点击事件监听器
onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
})

// 组件卸载时移除点击事件监听器
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true)
})

// 处理本地文件上传
const handleFileUpload = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    alert('请上传图片文件')
    return
  }
  
  if (file.size > 5 * 1024 * 1024) {
    alert('图片大小不能超过5MB')
    return
  }

  try {
    const formData = new FormData()
    formData.append('file', file)
    const fileName = await  generateFileName(file);
    let path = fileName;
    // if(prefix){
    //   path = prefix + "/" + fileName;
    // }
    path = "im/chat" + "/" + fileName;
    const { data: res } = await getFilePresignedUrl(path)

    uploadUrl.value = res.value.data.uploadUrl;
    showUrl.value = res.value.data.url;
    fileConfigId.value = res.value.data.configId;

    const response = await fetch(uploadUrl.value, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    })
    // console.log("handleFileUpload:response:",response)
    // console.log(" uploadUrl.value:", uploadUrl.value)
    // console.log(" showUrl.value:", showUrl.value)

    if (!response.ok) {
      throw new Error('上传失败')
    }

    // 上传成功后设置预览图片
    previewImage.value = showUrl.value
    const fileVo = {
      configId: fileConfigId.value,
      url: showUrl.value,
      path: path,
      name: file.name,
      type: file.type,
      size: file.size
    }
    const { data: createFileres } = await createFile(fileVo)
    // console.log("handleFileUpload:response:", createFileres.value.data)
  } catch (error) {
    console.error('上传失败:', error)
    alert('图片上传失败，请重试')
  }
}

// 处理拖拽上传
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  dragOver.value = false
  
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    handleFileUpload(files[0])
  }
}

// 处理网络图片URL上传
const handleUrlUpload = () => {
  if (!imageUrl.value) return
  
  // 简单的URL格式验证
  const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i
  if (!urlPattern.test(imageUrl.value)) {
    alert('请输入有效的图片URL')
    return
  }
  
  previewImage.value = imageUrl.value
}

// 处理文件选择
const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  const files = input.files
  if (files && files.length > 0) {
    handleFileUpload(files[0])
  }
}



// 文件操作

/**
 * 生成文件名称（使用算法SHA256）
 * @param file 要上传的文件
 */
async function generateFileName(file: File) {
  // 读取文件内容
  const data = await file.arrayBuffer()
  const wordArray = CryptoJS.lib.WordArray.create(data)
  // 计算SHA256
  const sha256 = CryptoJS.SHA256(wordArray).toString()
  // 拼接后缀
  const ext = file.name.substring(file.name.lastIndexOf('.'))
  console.log("generateFileName:",`${sha256}${ext}`)
  return `${sha256}${ext}`
}



</script>

<template>
  <div class="relative">
    <button
      class="transition-all duration-200 ease-in-out group"
      @click="showUploadPanel = !showUploadPanel"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" class="text-gray-600/80 dark:text-gray-400/80 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"><g fill="none"><path stroke="currentColor" d="M21 11v2c0 3.771 0 5.657-1.172 6.828S16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172S3 16.771 3 13v-2c0-3.771 0-5.657 1.172-6.828S7.229 3 11 3h1" stroke-width="1.5"/><path fill="currentColor" fill-rule="evenodd" d="m18.998 14.29l-.595-.594l-.01-.01c-.069-.069-.114-.115-.154-.15a2.5 2.5 0 0 0-3.976.82l-.007.013l-.04.08a.5.5 0 0 1-.802.098l-.058-.067L8.38 8.674a.5.5 0 0 0-.76.651l4.977 5.806l.007.008q.046.056.08.092a1.5 1.5 0 0 0 2.406-.296l.056-.109l.005-.01c.052-.104.07-.141.085-.167a1.5 1.5 0 0 1 2.327-.377l.133.131l1.28 1.28c.013-.41.019-.871.022-1.393" clip-rule="evenodd"/></g></svg>
    </button>
    
    <div
      v-if="showUploadPanel"
      ref="panelRef"
      class="absolute bottom-full left-0 mb-3 w-80 backdrop-blur-xl bg-white/80 dark:bg-black/40 rounded-2xl shadow-2xl p-5 border border-gray-200/20 dark:border-gray-700/20 transform transition-all duration-300 ease-out"
      @mouseleave="handleMouseLeave"
    >
      <div class="flex mb-5 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl p-1">
        <button
          class="flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200"
          :class="{
            'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-gray-200': activeTab === 'local',
            'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200': activeTab !== 'local'
          }"
          @click="activeTab = 'local'"
        >
          本地图片
        </button>
        <button
          class="flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200"
          :class="{
            'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-gray-200': activeTab === 'url',
            'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200': activeTab !== 'url'
          }"
          @click="activeTab = 'url'"
        >
          网络图片
        </button>
      </div>

      <div v-if="previewImage" class="mb-5 overflow-hidden rounded-xl border border-gray-200/30 dark:border-gray-700/30">
        <img :src="previewImage" class="w-full h-48 object-contain bg-gray-50/50 dark:bg-gray-900/50">
      </div>

      <div v-if="activeTab === 'local'" class="space-y-4">
        <div
          class="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200"
          :class="{
            'border-blue-500/70 bg-blue-50/50 dark:bg-blue-900/20': dragOver,
            'border-gray-300/50 dark:border-gray-600/50 hover:border-gray-400/50 dark:hover:border-gray-500/50': !dragOver
          }"
          @dragover.prevent="dragOver = true"
          @dragleave.prevent="dragOver = false"
          @drop="handleDrop"
        >
          <p class="text-sm text-gray-600 dark:text-gray-300">
            拖拽图片到此处或
            <label class="text-blue-500 cursor-pointer hover:text-blue-600 transition-colors">
              点击上传
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileSelect"
              >
            </label>
          </p>
        </div>
        <button
          v-if="previewImage"
          class="w-full px-4 py-2.5 bg-blue-500/90 hover:bg-blue-600/90 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200"
          @click="() => {
            emit('select', previewImage, 1);
            showUploadPanel = false;
            previewImage = '';
          }"
        >
          确认
        </button>
      </div>

      <div v-if="activeTab === 'url'" class="space-y-4">
        <input
          v-model="imageUrl"
          type="text"
          placeholder="输入图片URL"
          class="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-500/30 transition-all duration-200"
        >
        <div class="space-y-3">
          <button
            v-show="imageUrl"
            class="w-full px-4 py-2.5 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200"
            @click="handleUrlUpload"
          >
            预览
          </button>
          <button
            v-if="previewImage"
            class="w-full px-4 py-2.5 bg-blue-500/90 hover:bg-blue-600/90 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200"
            @click="() => { 
              emit('select', previewImage, 1); 
              showUploadPanel = false; 
              previewImage = ''; 
              imageUrl = '' 
            }"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>