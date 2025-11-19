import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    currentTheme: 'system',
  }),
  getters: {
    getCurrentTheme: (state) => state.currentTheme,
  },
  actions: {
    setTheme(theme: string) {
      this.currentTheme = theme
    },
  },
  persist: true,
})