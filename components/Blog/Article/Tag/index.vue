<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  // 标签文本
  text: string
  // 标签链接
  to?: string
  // 是否新窗口打开
  blank?: boolean
  // 标签尺寸: sm, md, lg
  size?: 'sm' | 'md' | 'lg'
  // 标签类型: default, border
  type?: 'default' | 'border'
  // 是否圆角
  round?: boolean
  // 背景颜色
  bgColor?: string
  // 文字颜色
  textColor?: string
  // 是否使用渐变背景
  gradient?: boolean
  // 主题分类
  theme?: 'tech' | 'entertainment' | 'design' | 'programming'
  // 状态
  status?: 'completed' | 'in-progress' | 'failed'
  // 等级
  level?: 'beginner' | 'intermediate' | 'advanced'
  // 是否使用随机颜色
  useRandomColor?: boolean
}

// 预定义的柔和颜色列表
const predefinedColors = [
  { bg: 'bg-blue-400/80', text: 'text-text-base', border: 'border-blue-400' },
  { bg: 'bg-green-400/80', text: 'text-text-base', border: 'border-green-400' },
  { bg: 'bg-purple-400/80', text: 'text-text-base', border: 'border-purple-400' },
  { bg: 'bg-pink-400/80', text: 'text-text-base', border: 'border-pink-400' },
  { bg: 'bg-indigo-400/80', text: 'text-text-base', border: 'border-indigo-400' },
  { bg: 'bg-red-400/80', text: 'text-text-base', border: 'border-red-400' },
  { bg: 'bg-teal-400/80', text: 'text-text-base', border: 'border-teal-400' }
];

const props = withDefaults(defineProps<Props>(), {
  blank: false,
  size: 'md',
  type: 'default',
  round: true,
  gradient: true,
  useRandomColor: false
})

// 标签尺寸类名
const sizeClass = computed(() => {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  return sizes[props.size]
})

// 标签形态类名
const typeClass = computed(() => {
  if (props.type === 'border') {
    return 'border-2 bg-transparent'
  }
  return 'border-0'
})

// 圆角类名
const roundClass = computed(() => props.round ? 'rounded-full' : 'rounded-lg')

// 随机颜色样式
const randomColorClass = computed(() => {
  // 使用标签文本的字符编码和作为确定性因子
  const charSum = props.text.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const index = charSum % predefinedColors.length;
  return `${predefinedColors[index].bg} ${predefinedColors[index].text} ${predefinedColors[index].border}`;
});

// 主题样式
const themeClass = computed(() => {
  if (props.useRandomColor) {
    return randomColorClass.value;
  }
  const themes = {
    tech: 'bg-blue-500/80 text-white border-blue-500',
    entertainment: 'bg-pink-500/80 text-white border-pink-500',
    design: 'bg-purple-500/80 text-white border-purple-500',
    programming: 'bg-green-500/80 text-white border-green-500'
  }
  return props.theme ? themes[props.theme] : randomColorClass.value
})

// 状态样式
const statusClass = computed(() => {
  const statuses = {
    completed: 'bg-green-500/80 text-white border-green-500',
    'in-progress': 'bg-yellow-500/80 text-white border-yellow-500',
    failed: 'bg-red-500/80 text-white border-red-500'
  }
  return props.status ? statuses[props.status] : ''
})

// 等级样式
const levelClass = computed(() => {
  const levels = {
    beginner: 'bg-blue-500/80 text-white border-blue-500',
    intermediate: 'bg-yellow-500/80 text-white border-yellow-500',
    advanced: 'bg-red-500/80 text-white border-red-500'
  }
  return props.level ? levels[props.level] : ''
})

// 自定义样式
const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }
  if (props.textColor) {
    style.color = props.textColor
  }
  if (props.gradient) {
    style.backgroundImage = 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))'
  }
  return style
})
</script>

<template>
  <component
    :is="to ? 'a' : 'span'"
    :href="to"
    :target="blank ? '_blank' : undefined"
    :class="[
      'inline-flex items-center transition-all duration-300 cursor-pointer hover:scale-105',
      'backdrop-blur-sm backdrop-filter dark:backdrop-blur-md',
      sizeClass,
      typeClass,
      roundClass,
      themeClass || statusClass || levelClass
    ]"
    :style="customStyle"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<style scoped>
/* 深色模式适配 */
:deep(.dark) {
  --tw-bg-opacity: 0.7;
  --tw-border-opacity: 0.3;
  --tw-text-opacity: 0.9;
}

/* 玻璃拟态效果 */
[class*='bg-'] {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 暗黑模式玻璃拟态效果 */
.dark [class*='bg-'] {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.05), 0 2px 4px -1px rgba(255, 255, 255, 0.03);
}

/* 暗黑模式下的悬浮效果 */
.dark .hover\:scale-105:hover {
  box-shadow: 0 8px 12px -1px rgba(255, 255, 255, 0.08), 0 4px 6px -1px rgba(255, 255, 255, 0.05);
}
</style>