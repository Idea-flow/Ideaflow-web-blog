<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', password: string): void
}>()

const password = ref('')
const error = ref('')

function handleSubmit() {
  if (!password.value) {
    error.value = '密码不能为空'
    return
  }
  error.value = ''
  emit('submit', password.value)
}
</script>

<template>
  <div class="flex flex-col items-center">
    <h3 class="text-xl font-bold mb-4 text-primary">请输入密码</h3>
    <input
        v-model="password"
        type="password"
        placeholder="请输入密码"
        class="w-full md:w-96 p-3 border border-base-300 rounded focus:outline-none focus:ring-2 focus:ring-primary mb-2 transition"
    />
    <div v-if="error" class="w-full md:w-96 text-red-500 text-sm mb-2">{{ error }}</div>
    <button
        @click="handleSubmit"
        class="w-full md:w-96 bg-primary text-base-100 p-3 rounded hover:bg-primary-focus transition-colors font-semibold mt-5"
    >
      提交
    </button>

  </div>

</template>