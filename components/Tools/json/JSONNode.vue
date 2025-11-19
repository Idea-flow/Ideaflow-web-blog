<!-- 
  JSONNode.vue - JSON数据可视化组件
  功能：递归渲染JSON数据结构，支持展开/折叠、数据类型高亮显示、数据对比等功能
-->
<template>
  <!-- JSON节点容器，根据深度设置缩进 -->
  <div class="json-node" :style="{ paddingLeft: depth > 0 ? '1.5rem' : '0' }">
    <!-- 显示对象的键名，仅当path存在时显示 -->
    <template v-if="path">
      <span @input="handlePathUpdate" contenteditable="true" class="key-name text-blue-500 dark:text-blue-400 font-medium">"{{ path }}"</span>
      <span class="text-gray-400 dark:text-gray-500">: </span>
    </template>

    <!-- 展开/折叠按钮，仅当数据可展开时显示 -->
    <span
      v-if="isExpandable" 
      @click="toggleExpand"
      class="expand-toggle inline-flex items-center justify-center w-5 h-5 -ml-1 mr-1 rounded-full cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
    >
      <!-- 展开/折叠图标，根据isExpanded状态旋转 -->
      <svg 
        class="w-4 h-4 transition-transform duration-200" 
        :class="{ 'rotate-90': isExpanded }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </span>

    <!-- 折叠状态下的预览内容 -->
    <template v-if="isExpandable && !isExpanded">
      <span 
        class="preview inline-flex items-center gap-2 px-2 py-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer group transition-colors"
        @click="toggleExpand"
      >
        <!-- 显示数组或对象的元素数量 -->
        <span class="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" v-html="dealNodeNum(isArray, data)">
        </span>
        <!-- 数据变更提示标记 -->
        <span 
          v-if="hasChanges" 
          class="inline-flex items-center text-xs px-1.5 py-0.5 rounded-full bg-yellow-100/80 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500"
        >
          <svg class="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          已更改
        </span>
      </span>
    </template>

    <!-- 展开状态下的完整内容渲染 -->
    <template v-else-if="isExpandable && isExpanded">
      <!-- 显示数组或对象的开始符号 -->
      <span class="text-gray-600 dark:text-gray-400">{{ isArray ? '[' : '{' }}</span>
      <!-- 递归渲染子节点 -->
      <div class="children">
        <JSONNode
          v-for="(value, key) in data"
          :key="key"
          :data="value"
          :compare-data="compareData?.[key]"
          :path="isArray ? undefined : key"
          :elementPath="isArray ? String(key) : key"
          :depth="depth + 1"
          :expanded="depth < maxDepth"
          :max-depth="maxDepth"
          @update="handleChildUpdate"
        />
      </div>
      <!-- 显示数组或对象的结束符号 -->
      <span class="text-gray-600 dark:text-gray-400">{{ isArray ? ']' : '}' }}</span>
    </template>

    <!-- 基础数据类型的显示 -->
    <template v-else>
<!--      <span class="input-box" contenteditable="true"  @input="handleValueUpdate" v-html="formatValue(data)">-->

<!--      </span>-->
      <span
          contenteditable="true"
        :class="{
          // 字符串类型显示为绿色
          'text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/20': typeof data === 'string',
          // 数字类型显示为紫色
          'text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20': typeof data === 'number',
          // 布尔类型显示为黄色
          'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20': typeof data === 'boolean',
          // null值显示为灰色
          'text-gray-500 dark:text-gray-400': data === null,
          // 数据变更时显示黄色背景
          'bg-yellow-100/80 dark:bg-yellow-900/20': hasChanges && !isExpandable
        }"
          @input="handleValueUpdate"
      >
        {{ formatValue(data) }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update'])
    // 处理值更新
const handleValueUpdate = (event: Event) => {
  const target = event.target as HTMLElement
  const newValue = target.textContent || ''

  // console.log('jsonNode:handleValueUpdate-newValue', newValue)
  // console.log('jsonNode:handleValueUpdate-props.data', props.data)
  // console.log('jsonNode:handleValueUpdate-Array.isArray(props.data)', Array.isArray(props.data))
  // 尝试转换值类型
  let parsedValue = newValue
  if (typeof props.data === 'number') {
    parsedValue = Number(newValue)
  } else if (typeof props.data === 'boolean') {
    parsedValue = newValue.toLowerCase() === 'true'
  } else if (props.data === null && newValue.toLowerCase() === 'null') {
    parsedValue = null
  } else if (typeof props.data === 'string') {
    // 如果是字符串，移除引号
    parsedValue = newValue.replace(/^"|"/g, '')
  }

  // 发出更新事件
  emit('update', {
    path: nowElementPath.value,
    value: parsedValue,
    isArray: Array.isArray(props.data)
  })
}

// 处理子节点更新
const handleChildUpdate = ({ path, value, isArray, newPath, isPathUpdate }) => {
  // 如果是path更新
  if (isPathUpdate) {
    // 如果当前节点是数组
    if (Array.isArray(props.data)) {
      // 如果有父路径，需要拼接完整路径
      // const fullPath = props.elementPath ? `${props.elementPath}$$$$${path}` : path
      const fullPath = nowElementPath.value ? `${nowElementPath.value}$$$$${path}` : path
      // nowElementPath.value = newPath
      emit('update', {
        path: fullPath,
        value,
        isArray: true,
        newPath,
        isPathUpdate: true
      })
      return
    }

    // 对象属性更新，拼接完整路径
    // const fullPath = props.elementPath ? `${props.elementPath}$$$$${path}` : path
    const fullPath = nowElementPath.value ? `${nowElementPath.value}$$$$${path}` : path
    // nowElementPath.value = newPath
    emit('update', {
      path: fullPath,
      value,
      isArray: false,
      newPath,
      isPathUpdate: true
    })
    return
  }

  // 如果当前节点是数组
  if (Array.isArray(props.data)) {
    // 如果有父路径，需要拼接完整路径
    // const fullPath = props.elementPath ? `${props.elementPath}$$$$${path}` : path
    const fullPath = nowElementPath.value ? `${nowElementPath.value}$$$$${path}` : path
    emit('update', {
      path: fullPath,
      value,
      isArray: true
    })
    return
  }
  
  // 对象属性更新，拼接完整路径
  // const fullPath = props.elementPath ? `${props.elementPath}$$$$${path}` : path
  const fullPath = nowElementPath.value ? `${nowElementPath.value}$$$$${path}` : path
  emit('update', {
    path: fullPath,
    value,
    isArray: false
  })
}



/**
 * JSONNode 组件 - 用于递归渲染JSON数据结构
 * 支持功能：
 * 1. 展开/折叠嵌套数据
 * 2. 数据类型的颜色区分
 * 3. 数据对比高亮
 * 4. 自定义展开深度
 */

import { ref, computed, watch } from 'vue'

// 组件属性定义
const props = defineProps({
  // 需要渲染的JSON数据
  data: {
    type: [Object, Array, String, Number, Boolean, null],
    required: true
  },
  // 用于对比的数据，用于高亮显示变更
  compareData: {
    type: [Object, Array, String, Number, Boolean, null],
    default: null
  },
  // 当前节点的键名
  path: {
    type: String,
    default: ''
  },
  // 当前节点的键名 (包含数组的 1 ,2 )
  elementPath: {
    type: String,
    default: ''
  },

  // 当前节点的深度
  depth: {
    type: Number,
    default: 0
  },
  // 是否默认展开
  expanded: {
    type: Boolean,
    default: false
  },
  // 最大展开深度
  maxDepth: {
    type: Number,
    default: 10
  }
})

const nowElementPath = ref(JSON.parse(JSON.stringify(props.elementPath)))

// 监听props.data的变化
watch(() => props.elementPath, (newVal) => {
  nowElementPath.value = newVal
}, { deep: true })

// 控制节点展开/折叠状态
const isExpanded = ref(props.expanded)

// 监听expanded属性变化
watch(() => props.expanded, (newValue) => {
  isExpanded.value = newValue
})

// 监听data属性变化，当数据不可展开时折叠节点
watch(() => props.data, () => {
  if (!isExpandable.value) {
    isExpanded.value = false
  }
}, { deep: true })

// 监听compareData属性变化
watch(() => props.compareData, () => {}, { deep: true })

// 监听maxDepth属性变化，超过最大深度时折叠节点
watch(() => props.maxDepth, (newValue) => {
  if (props.depth >= newValue) {
    isExpanded.value = false
  }
})

// 判断数据是否可展开（对象或数组）
const isExpandable = computed(() => {
  return typeof props.data === 'object' && props.data !== null
})

// 判断数据是否为数组
const isArray = computed(() => {
  return Array.isArray(props.data)
})

// 判断数据是否有变更
const hasChanges = computed(() => {
  // 无对比数据时返回false
  if (props.compareData === undefined || props.compareData === null) return false
  // 类型不同时返回true
  if (typeof props.data !== typeof props.compareData) return true
  // 数组/对象类型不一致时返回true
  if (Array.isArray(props.data) !== Array.isArray(props.compareData)) return true
  // 比较序列化后的字符串是否相等
  return JSON.stringify(props.data) !== JSON.stringify(props.compareData)
})

// 切换节点展开/折叠状态
const toggleExpand = () => {
  if (isExpandable.value) {
    isExpanded.value = !isExpanded.value
  }
}

// 格式化显示值
const formatValue = (value: any): string => {
  // 字符串类型添加引号
  if (typeof value === 'string') return `"${value}"`
  // null值显示为'null'
  if (value === null) return 'null'
  // 其他类型转换为字符串
  return String(value)
}

// 处理节点数量显示
const dealNodeNum = (isArray:boolean,data: any): string => {
  // 获取对象/数组的元素数量
  let nums = Object.keys(data).length;
  // 使用紫色样式包装数字
  let numsColor = '<span class="text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20">'+nums+'</span>';
  // 根据类型返回不同格式的显示文本
  return isArray ? 'Array['+numsColor+']' : 'Object{'+numsColor+'}';
}

// 处理path更新
const handlePathUpdate = (event: Event) => {
  const target = event.target as HTMLElement
  let newPath = target.textContent || ''
  
  // 移除引号
  newPath = newPath.replace(/^"|"$/g, '')

  // console.log('jsonNode:handlePathUpdate-newPath', newPath)
  // console.log('jsonNode:handlePathUpdate-props', props)
  // console.log('jsonNode:handlePathUpdate-nowElementPath.value', nowElementPath.value)
  const pathParts = nowElementPath.value.split('$$$$')
  pathParts[pathParts.length - 1] = newPath


  // 发出更新事件
  emit('update', {
    path: nowElementPath.value,
    value: props.data,
    isArray: Array.isArray(props.data),
    newPath: newPath,
    isPathUpdate: true
  })
  //第一次需要用原值, 后续用更新后的值
  nowElementPath.value = pathParts.join('$$$$')
}
</script>

<style scoped>
.json-node {
  line-height: 1.75;
}

.children > .json-node:not(:last-child)::after {
  content: ",";
  color: rgb(156 163 175);
}

.expand-toggle {
  opacity: 0.8;
}

.json-node:hover > .expand-toggle {
  opacity: 1;
}

[contenteditable]:focus {
  outline: none;
  box-shadow: none;
}
</style>