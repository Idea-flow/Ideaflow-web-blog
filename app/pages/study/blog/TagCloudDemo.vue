<script setup lang="ts">
import TagCloud from '~/components/Blog/Sidebar/TagCloud/TagCloud.vue'

// 示例数据1：基础标签云
const basicTags = [
  { name: 'Vue.js', count: 42 },
  { name: 'React', count: 38 },
  { name: 'TypeScript', count: 35 },
  { name: 'JavaScript', count: 30 },
  { name: 'Node.js', count: 28 },
  { name: 'CSS', count: 25 },
  { name: 'HTML', count: 22 },
  { name: 'Webpack', count: 20 }
]

// 示例数据2：自定义颜色的标签云
const customColorTags = [
  { name: '设计', color: 'from-pink-400 to-rose-500' },
  { name: '创意', color: 'from-purple-400 to-indigo-500' },
  { name: '灵感', color: 'from-blue-400 to-cyan-500' },
  { name: '艺术', color: 'from-teal-400 to-emerald-500' },
  { name: '色彩', color: 'from-yellow-400 to-amber-500' }
]

// 示例数据3：技术栈标签
const techTags = [
  { name: 'Frontend', count: 56 },
  { name: 'Backend', count: 48 },
  { name: 'DevOps', count: 32 },
  { name: 'Database', count: 28 },
  { name: 'Cloud', count: 25 },
  { name: 'Security', count: 20 },
  { name: 'Testing', count: 18 },
  { name: 'Mobile', count: 15 }
]

const techTag2s = [
  { name: 'Frontend' },
  { name: 'Backend', },
  { name: 'DevOps',  },
  { name: 'Database',  },
  { name: 'Cloud',  },
  { name: 'Security',  },
  { name: 'Testing',  },
  { name: 'Mobile',  }
]
</script>

<template>
  <div class="p-8 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">标签云组件示例</h1>
    
    <!-- 基础标签云 -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">基础标签云</h2>
      <TagCloud :tags="basicTags" title="技术标签" />
    </div>
    
    <!-- 自定义颜色标签云 -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">自定义颜色标签云</h2>
      <TagCloud :tags="customColorTags" title="创意标签" />
    </div>
    
    <!-- 技术栈标签云 -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">技术栈标签云</h2>
      <TagCloud :tags="techTag2s" title="技术栈" />
    </div>
  </div>
</template>