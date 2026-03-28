<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  title: string
  icon?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const isExpanded = ref(false)

const toggleSubmenu = () => {
  if (!props.disabled) {
    isExpanded.value = !isExpanded.value
  }
}

const submenuClasses = computed(() => ({
  'submenu-disabled': props.disabled
}))
</script>

<template>
  <div class="submenu" :class="submenuClasses">
    <!-- 子菜单标题 -->
    <div
      class="submenu-title"
      @click="toggleSubmenu"
    >
      <slot name="icon">
        <i v-if="icon" :class="icon"></i>
      </slot>
      <span class="submenu-title-content">{{ title }}</span>
      <svg
        class="submenu-arrow transition-transform duration-300"
        :class="{ 'rotate-180': isExpanded }"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    <!-- 子菜单内容 -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div v-show="isExpanded" class="submenu-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.submenu {
  @apply w-full;
}

.submenu-title {
  @apply flex items-center px-4 py-2 cursor-pointer text-text-base hover:bg-base-200 transition-colors rounded-lg;
}

.submenu-disabled .submenu-title {
  @apply opacity-50 cursor-not-allowed hover:bg-transparent;
}

.submenu-title-content {
  @apply flex-grow ml-2;
}

.submenu-arrow {
  @apply ml-2;
}

.submenu-content {
  @apply pl-4;
}
</style>