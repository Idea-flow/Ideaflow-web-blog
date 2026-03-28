<template>
  <div class="json-editor-container w-full h-full flex flex-col md:flex-row bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800">
    <!-- 左侧输入区域 -->
    <div class="json-input-container w-full md:w-2/5 border-r border-gray-100 dark:border-gray-800 dark:bg-black">
      <JSONInput 
        v-model="jsonInput" 
        @update:model-value="handleInputChange" 
        :error="error" 
      />
    </div>
    
    <!-- 右侧展示区域 -->
    <div class="json-view-container w-full md:w-3/5 flex flex-col">
      <!-- 工具栏 -->
      <JSONToolbar 
        :is-valid="!error" 
        :is-expanded="isExpanded"
        :stats="stats"
        @toggle-expand="toggleExpand"
        @format="formatJSON"
        @minify="minifyJSON"
        @copy="copyToClipboard"
        @toggle-mode="toggleCompareMode"
      />
      
      <!-- JSON 展示区域 -->
      <div class="json-view-content flex-grow overflow-auto p-6">
        <div v-if="error" class="error-message text-red-500 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ error }}</span>
          </div>
        </div>
        
        <template v-else>
          <div v-if="compareMode && parsedJSON" class="mb-6">
            <div class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">比较模式</div>
            <div class="flex space-x-4">
              <button 
                @click="compareMode = false"
                class="px-3 py-1.5 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                退出比较
              </button>
            </div>
          </div>
          
          <JSONViewer 
            v-if="parsedJSON" 
            :data="displayFormat === 'minified' ? JSON.parse(JSON.stringify(parsedJSON)) : parsedJSON" 
            :expanded="isExpanded" 
            :max-depth="maxDepth"
            :compare-data="compareMode ? compareData : null"
            @update:data="handleViewerUpdate"
          />
          
          <div v-else class="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p class="text-sm">请输入有效的 JSON 数据</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import JSONInput from './JSONInput.vue'
import JSONViewer from './JSONViewer.vue'
import JSONToolbar from './JSONToolbar.vue'
import MyMessage from "~/components/Base/Message/MyMessage";

// 定义属性
const props = defineProps({
  initialValue: {
    type: String,
    default: ''
  },
  maxDepth: {
    type: Number,
    default: 10
  },
  theme: {
    type: Object,
    default: () => ({})
  }
})

// 状态管理
const jsonInput = ref(props.initialValue || '')
const error = ref('')
const isExpanded = ref(true)
const displayFormat = ref('formatted')
const compareMode = ref(false)
const compareData = ref(null)
const parsedJSON = ref(null)
const stats = ref({ nodes: 0, depth: 0, size: 0 })

// 解析JSON字符串
const parseJSON = (value: string) => {
  try {
    if (!value.trim()) return null
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}

// 更新统计信息
const updateStats = (json: any) => {
  if (!json) {
    stats.value = { nodes: 0, depth: 0, size: 0 }
    return
  }
  
  let nodes = 0
  let maxDepth = 0
  
  const countNodes = (obj: any, depth = 0) => {
    nodes++
    maxDepth = Math.max(maxDepth, depth)
    
    if (obj && typeof obj === 'object') {
      Object.values(obj).forEach(value => {
        countNodes(value, depth + 1)
      })
    }
  }
  
  countNodes(json)
  
  stats.value = {
    nodes,
    depth: maxDepth,
    size: new Blob([JSON.stringify(json)]).size
  }
}

// 处理JSON查看器更新
const handleViewerUpdate = (newData: any) => {
  // console.log('jsonEditor:handleViewerUpdate', newData)
  jsonInput.value = JSON.stringify(newData, null, 2)

  let handleViewerUpdateParsedJSON = parseJSON(JSON.stringify(newData) || '')
  updateStats(handleViewerUpdateParsedJSON)
}

// 用于展示的 JSON 字符串
const displayJSON = computed(() => {
  if (!parsedJSON.value) return ''
  return displayFormat.value === 'minified'
    ? JSON.stringify(parsedJSON.value)
    : JSON.stringify(parsedJSON.value, null, 2)
})

// // 统计信息
// const stats = computed(() => {
//   if (!parsedJSON.value) return { nodes: 0, depth: 0, size: 0 }
//
//   let nodes = 0
//   let maxDepth = 0
//
//   const countNodes = (obj, depth = 0) => {
//     nodes++
//     maxDepth = Math.max(maxDepth, depth)
//
//     if (obj && typeof obj === 'object') {
//       Object.values(obj).forEach(value => {
//         countNodes(value, depth + 1)
//       })
//     }
//   }
//
//   countNodes(parsedJSON.value)
//
//   return {
//     nodes,
//     depth: maxDepth,
//     size: new Blob([jsonInput.value]).size
//   }
// })

// 方法
const handleInputChange = (value: string) => {
  jsonInput.value = value
  validateJSON(value)
  const newParsedJSON = parseJSON(value)
  parsedJSON.value = newParsedJSON
  updateStats(newParsedJSON)
}

const validateJSON = (value: string) => {
  if (!value.trim()) {
    error.value = ''
    return
  }
  
  try {
    JSON.parse(value)
    error.value = ''
  } catch (e) {
    error.value = `JSON 语法错误: ${e.message}`
  }
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const formatJSON = () => {
  if (parsedJSON.value) {
    displayFormat.value = 'formatted'
    jsonInput.value = JSON.stringify(parsedJSON.value, null, 2)
  }
}

const minifyJSON = () => {
  if (parsedJSON.value) {
    displayFormat.value = 'minified'
    jsonInput.value = JSON.stringify(parsedJSON.value)
  }
}

const copyToClipboard = () => {
  if (!parsedJSON.value) return
  const textToCopy = JSON.stringify(parsedJSON.value, null, 2)
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      MyMessage.success('已复制到剪贴板')
    })
    .catch(err => {
      MyMessage.error('复制失败，请重试')
      console.error('无法复制到剪贴板:', err)
    })
}
const demoJson = ref({"project":"JSON Data Generator","version":2.1,"isProduction":false,"metadata":{"author":"AI助手","created":"2023-11-15T08:30:00Z","tags":["test","demo","multi\nline"],"license":null},"testCases":[{"id":1,"description":"基础类型测试","payload":{"string":"普通字符串","emptyString":"","unicode":"中文/日本語/한글/😊","number":42,"float":3.1415926,"negative":-1,"zero":0,"boolean":true,"isNull":null}},{"id":2,"description":"特殊字符测试","payload":{"specialChars":"~!@#$%^&*()_+`-=[]\\{}|;':\",./<>?","whitespace":" \t\r\n","escapeChars":"\\\"/\b\f\n\r\t"}},{"id":3,"description":"嵌套结构测试","payload":{"arrayInArray":[1,[2,[3]],["a","b"]],"objectInArray":[{"name":"Alice","age":28},{"name":"Bob","age":32}],"mixedTypes":[42,"text",null,{"key":"value"},[1,2,3]]}}],"boundaryCases":{"maxValues":{"intMax":2147483647,"bigNumber":1.7976931348623157e+308,"longString":"Lorem ipsum dolor sit amet...（此处可放长文本）"},"minValues":{"intMin":-2147483648,"smallNumber":5e-324,"emptyArray":[],"emptyObject":{}}},"formats":{"date":"2023-11-15","datetime":"2023-11-15T08:30:00+08:00","time":"14:30:00","url":"https://example.com/path?param=value#anchor","email":"user@example.com","regex":"^[a-zA-Z0-9]{8}$"},"备注":"这个JSON包含各种测试场景，包括：\n1. 多语言文本\n2. 特殊字符\n3. 各种数据类型\n4. 边界值\n5. 格式验证"})

const toggleCompareMode = () => {
  if (!compareMode.value) {
    compareData.value = JSON.parse(JSON.stringify(parsedJSON.value))
    compareMode.value = true
  } else {
    compareData.value = null
    compareMode.value = false
  }
}

// 初始化
watch(() => jsonInput.value, validateJSON, { immediate: true })
const initialParsedJSON = parseJSON(props.initialValue || '')
parsedJSON.value = initialParsedJSON
updateStats(initialParsedJSON)
</script>

<style scoped>
.json-editor-container {
  height: 90vh;
}

@media (max-width: 768px) {
  .json-editor-container {
    height: 100vh;
  }
}
</style>