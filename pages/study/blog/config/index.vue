<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
// console.log("runtimeConfig.public.blogBaseURL:"+runtimeConfig.public.blogBaseURL)
// console.log("process.env.BLOG_BASE_URL:"+process.env.BLOG_BASE_URL)
// console.log("process.env.NUXT_BLOG_BASE_URL:"+process.env.NUXT_BLOG_BASE_URL)
// console.log("process.env.NUXT_PUBLIC_BLOG_BASE_URL:"+process.env.NUXT_PUBLIC_BLOG_BASE_URL)
console.log("import.meta.env.BLOG_BASE_URL:"+import.meta.env.BLOG_BASE_URL)
console.log("import.meta.env.VITE_BLOG_BASE_URL:"+import.meta.env.VITE_BLOG_BASE_URL)





</script>

<template>

</template>

<style scoped>

</style>