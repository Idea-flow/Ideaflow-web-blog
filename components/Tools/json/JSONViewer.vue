<template>
<!--  <div class="json-viewer p-4 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 overflow-x-auto">-->

<!--  </div>-->

  <JSONNode
      v-if="data"
      :data="data"
      :compare-data="compareData"
      :expanded="expanded"
      :max-depth="maxDepth"
      :path="''"
      :depth="0"
      @update="handleUpdate"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import JSONNode from './JSONNode.vue'

 const props = defineProps({
  data: {
    type: [Object, Array, String, Number, Boolean],
    required: true
  },
  compareData: {
    type: [Object, Array, String, Number, Boolean, null],
    default: null
  },
  expanded: {
    type: Boolean,
    default: false
  },
  maxDepth: {
    type: Number,
    default: 10
  }
})

const localData = ref(JSON.parse(JSON.stringify(props.data)))

// 监听props.data的变化
watch(() => props.data, (newVal) => {
  localData.value = JSON.parse(JSON.stringify(newVal))
}, { deep: true })

// console.log('jsonViewer:data', JSON.stringify(props.data))

const handleUpdate = ({ path, value, isArray, newPath, isPathUpdate }) => {
  if (!path) return

  // 创建数据的深拷贝
  const newData = JSON.parse(JSON.stringify(localData.value))
  // console.log('jsonViewer:handleUpdate-path', path)
  // console.log('jsonViewer:handleUpdate-newPath', newPath)
  // console.log('jsonViewer:handleUpdate-isPathUpdate', isPathUpdate)
  // 更新对象或数组中的key
  const updateKey = (obj, pathKeys, currentIndex, newPathValue) => {
    // 如果是最后一个key，直接更新
    if (currentIndex === pathKeys.length - 1) {
      const result = Array.isArray(obj) ? [] : {}
      const lastKey = pathKeys[currentIndex]
      
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          if (index.toString() === lastKey) {
            if (isPathUpdate) {
              result[parseInt(newPathValue)] = item
            } else {
              result[index] = value
            }
          } else {
            result[index] = item
          }
        })
      } else {
        // 保持原有顺序
        for (const key in obj) {
          if (key === lastKey) {
            if (isPathUpdate) {
              result[newPathValue] = obj[key]
            } else {
              result[key] = value
            }
          } else {
            result[key] = obj[key]
          }
        }
      }
      return result
    }
    
    // 处理中间路径
    const currentKey = pathKeys[currentIndex]
    const result = Array.isArray(obj) ? [] : {}
    
    if (Array.isArray(obj)) {
      // 处理数组
      obj.forEach((item, index) => {
        if (index.toString() === currentKey) {
          result[index] = updateKey(item, pathKeys, currentIndex + 1, newPathValue)
        } else {
          result[index] = JSON.parse(JSON.stringify(item))
        }
      })
    } else {
      // 处理对象
      for (const key in obj) {
        if (key === currentKey) {
          result[key] = updateKey(obj[key], pathKeys, currentIndex + 1, newPathValue)
        } else {
          result[key] = JSON.parse(JSON.stringify(obj[key]))
        }
      }
    }
    
    return result
  }
  
  const keys = path.split('$$$$')
  // console.log('jsonViewer:handleUpdate-newData', newData)
  const updatedData = updateKey(newData, keys, 0, newPath)
  
  // 更新本地数据并触发更新
  localData.value = updatedData
  // console.log('jsonViewer:handleUpdate-newUpdatedData', updatedData)
  // console.log('jsonViewer:handleUpdate-localData.value', JSON.stringify(localData.value))

  emit('update:data', updatedData)
}

const emit = defineEmits(['update:data'])
</script>

<style scoped>

</style>