import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {useCookie} from "#app";

export const useToolsStore = defineStore('tools', () => {


  function setSidebarIsCollapsed(sidebarIsCollapsedArg: boolean) {
    const sidebarIsCollapsed = useCookie('sidebarIsCollapsed', {
      maxAge: 3600 * 24 * 7, // 24小时 * 7
    })
    sidebarIsCollapsed.value = sidebarIsCollapsedArg;
  }

  function getSidebarIsCollapsed() {
    return useCookie('sidebarIsCollapsed').value
  }

  return {setSidebarIsCollapsed,getSidebarIsCollapsed}
})
