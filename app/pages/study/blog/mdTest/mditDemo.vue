<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import {ref} from "vue";


const md = new MarkdownIt();



const text = ref("[Example](https://example.com)");

const result = md.render(text.value);
// console.log("结果是:"+result);
</script>


<template>
  结果是:
  <div v-html="result"></div>

</template>

<style scoped>

</style>