<script setup lang="ts">
import Login from "~/components/Blog/Login/Login.vue";
import { useRoute } from 'vue-router'

const route = useRoute()
const redirect = route.query.redirect || '/'
</script>

<template>
    <div class="flex justify-center items-center min-h-screen">
        <Login :redirect="redirect"></Login>
    </div>
</template>

<style scoped>

</style>