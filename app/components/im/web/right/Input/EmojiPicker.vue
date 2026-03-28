<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  'select': [emoji: string]
}>()

// 表情包显示控制
const showEmoji = ref(false)

// 表情分类
const emojiCategories = [
  { name: '常用', id: 'frequently' },
  { name: '自然', id: 'nature' },
  { name: 'B站', id: 'bilibili' }
]

// 当前选中的分类
const currentCategory = ref('frequently')

// 表情数据
const emojiData = {
  frequently: [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
    '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
    '😘', '😗', '😚', '😋', '😛', '😝', '😜', '🤪',
    '🥳', '🤩', '🥺', '😢', '😭', '😤', '😠', '😡',
    '🤔', '🤫', '🤭', '🤗', '🤑', '😴', '🥱', '😵',
    '🤯', '🤠', '😎', '🤓', '🧐', '😷', '🤒', '🤕',
    '👋', '🤚', '✋', '🖐️', '👌', '🤌', '🤏', '✌️',
    '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇'
  ],
  nature: [
    '🌞', '🌙', '⭐', '🌟', '⚡', '☀️', '🌤️', '⛅',
    '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '❄️',
    '🌸', '🌹', '🌺', '🌻', '🌼', '🍀', '🌿', '🍃',
    '🌳', '🌲', '🎋', '🎍', '🍂', '🍁', '🌾', '💐',
    '🌷', '🌱', '🪴', '🎄', '🌵', '🌴', '🌊', '🌈',
    '🔥', '💫', '✨', '💥', '☄️', '🌎', '🌍', '🌏',
    '🦋', '🐛', '🐝', '🐞', '🐌', '🦗', '🪲', '🦟',
    '🐢', '🦎', '🐍', '🦕', '🦖', '🦦', '🦫', '🦘'
  ],
  bilibili: [
    '[微笑]', '[OK]', '[星星眼]', '[doge]', '[妙啊]',
    '[吃瓜]', '[滑稽]', '[呲牙]', '[打call]', '[歪嘴]',
    '[笑哭]', '[脱单doge]', '[喜欢]', '[酸了]', '[嫌弃]',
  ]
}

// 选择表情
const selectEmoji = (emoji: string) => {
  emit('select', emoji)
  showEmoji.value = false
}

// 点击外部关闭表情面板
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.emoji-picker')) {
    showEmoji.value = false
  }
}

// 监听鼠标移出事件
const handleMouseLeave = () => {
  showEmoji.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <!-- 表情按钮 -->
<div class="emoji-picker relative">
    <button
        class="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
        @click.stop="showEmoji = !showEmoji"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>

    <!-- 表情选择面板 -->
    <div v-if="showEmoji"
         class="absolute bottom-full left-0 mb-2 p-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-lg shadow-lg shadow-black/[0.08] dark:shadow-black/30 ring-1 ring-black/[0.08] dark:ring-white/[0.08] w-64 z-50 flex flex-col "
         @click.stop
         @mouseleave="handleMouseLeave">
      <!-- 表情网格 -->
      <div class="grid grid-cols-8 gap-1.5 overflow-y-auto max-h-48  mb-2  p-0.5 custom-scrollbar">
     
        <button
          v-for="emoji in emojiData[currentCategory]"
          :key="emoji"
          class="p-1.5 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-md text-sm transition-colors duration-200 hover:scale-110 transform"
          @click="selectEmoji(emoji)"
        >
          {{ emoji }}
        </button>
      </div>
      <!-- 表情分类选项卡 -->
      <div class="flex space-x-2 pt-2 border-t border-gray-200/10 dark:border-gray-700/10">
        <button
          v-for="category in emojiCategories"
          :key="category.id"
          class="px-2 py-1 text-sm rounded-md transition-colors"
          :class="{
            'bg-emerald-200 dark:bg-emerald-500 text-gray-800 dark:text-gray-800 ': currentCategory === category.id,
            'hover:bg-emerald-200 dark:hover:bg-emerald-500 text-gray-800 dark:text-gray-800': currentCategory !== category.id
          }"
          @click="currentCategory = category.id"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 3px;
  transition: all 0.2s ease;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(209, 213, 219, 0.3);
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(209, 213, 219, 0.5);
}
</style>