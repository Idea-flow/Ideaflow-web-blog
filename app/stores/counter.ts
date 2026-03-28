import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const isContactInfoLoaded = ref(true)
  const doubleCount = computed(() => count.value)
  const hasContactInfo = computed(() => isContactInfoLoaded.value)
  function increment() {
    count.value++
  }

  return { count,
    doubleCount,
    hasContactInfo,
    increment }
})
