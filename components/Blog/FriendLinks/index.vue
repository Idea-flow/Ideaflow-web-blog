<script setup lang="ts">
import { computed } from 'vue'

interface FriendLink {
  id: number
  name: string
  description: string
  logo: string
  url: string
  categoryName: string
  createTime: Record<string, unknown>
}

interface Props {
  links: FriendLink[]
  columns?: number
  showCategory?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  links: () => [],
  columns: 3,
  showCategory: false
})

// 根据分类对链接进行分组
const groupedLinks = computed(() => {
  if (!props.showCategory) return { default: props.links }
  return props.links.reduce((groups: Record<string, FriendLink[]>, link) => {
    const category = link.categoryName || 'default'
    if (!groups[category]) groups[category] = []
    groups[category].push(link)
    return groups
  }, {})
})

// 默认头像
const defaultAvatar = 'https://oss.ideaflow.top/configImg/default-avatar.webp'
</script>

<template>
  <div class="w-full friend-links-container p-4 space-y-6">
    <template v-if="showCategory">
      <!-- 分类展示模式 -->
      <div v-for="(links, category) in groupedLinks" :key="category" class="space-y-4">
        <div v-if="category !== 'default'" class="flex items-center justify-center space-x-2 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500 dark:text-primary-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {{ category }}
          </h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-auto-flow-dense">
          <a v-for="link in links" :key="link.id"
             :href="link.url"
             target="_blank"
             rel="noopener noreferrer"
             class="friend-link-card group relative overflow-hidden rounded-2xl
                    backdrop-blur-md bg-white/80 dark:bg-gray-800/80
                    hover:bg-white/90 dark:hover:bg-gray-800/90
                    shadow-sm hover:shadow-lg transition-all duration-300
                    hover:-translate-y-1 flex cursor-pointer">
            <div class="w-2/5 relative overflow-hidden">
              <img :src="link.logo || defaultAvatar" :alt="link.name"
                   class="w-full h-full object-cover absolute inset-0
                          transition-transform duration-300 group-hover:scale-110">
              <div class="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
            </div>
            <div class="flex-1 p-4 m-2 rounded-lg">
              <div class="flex flex-col h-full justify-between">
                <div>
                  <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 truncate">
                    {{ link.name }}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                    {{ link.description }}

                  </p>
                </div>
                <p class="text-xs text-gray-400 dark:text-gray-500">
                  {{ new Date(link.createTime).toLocaleDateString() }}
                </p>
              </div>
            </div>

            <!-- 底部装饰线 -->
            <div
                class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-violet-300 dark:from-blue-500 dark:via-blue-400 dark:to-violet-400 group-hover:w-full group-hover:left-0 transition-all duration-300">
            </div>

          </a>
        </div>
      </div>
    </template>

    <!-- 无分类展示模式 -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-auto-flow-dense">
      <a v-for="link in links" :key="link.id"
         :href="link.url"
         target="_blank"
         rel="noopener noreferrer"
         class="friend-link-card group relative overflow-hidden rounded-2xl
                backdrop-blur-md bg-white/80 dark:bg-gray-800/80
                hover:bg-white/90 dark:hover:bg-gray-800/90
                shadow-sm hover:shadow-lg transition-all duration-300
                hover:-translate-y-1 flex cursor-pointer">
        <div class="w-1/4 sm:w-1/3 relative overflow-hidden">
          <img :src="link.logo || defaultAvatar" :alt="link.name"
               class="w-full h-full object-cover absolute inset-0
                      transition-transform duration-300 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
        </div>
        <div class="flex-1 p-4 rounded-lg">
          <div class="flex flex-col h-full justify-between">
            <div>
              <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 truncate">
                {{ link.name }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                {{ link.description }}
              </p>
            </div>
            <p class="text-xs text-gray-400 dark:text-gray-500">
              {{ new Date(link.createTime).toLocaleDateString() }}
            </p>
          </div>
        </div>
        <!-- 底部装饰线 -->
        <div
            class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-violet-300 dark:from-blue-500 dark:via-blue-400 dark:to-violet-400 group-hover:w-full group-hover:left-0 transition-all duration-300">
        </div>

      </a>
    </div>
  </div>
</template>

<style scoped>
.friend-link-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 160px;
}
</style>