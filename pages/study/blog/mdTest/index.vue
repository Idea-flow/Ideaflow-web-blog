<script setup lang="ts">
import { ref } from 'vue';
import { MdPreview, MdCatalog,XSSPlugin,config } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
import {getDefaultWhiteList} from "xss";
const id = 'preview-only';
const text = ref('# Hello Editor');
const text2 = ref('<div class ="My"> ![示例图片1](https://picsum.photos/300/300?random=1)</div>');
// 使用 Markdown 语法表示一级标题，并添加内联样式
const text3 = ref('<div style="font-size: 18px; color: blue;"># Hello Editor3</div>');

let scrollElement = ref();
if (import.meta.server) {
  // console.log('这是服务端渲染！');
  // scrollElement.value = "body"
}else {

  // console.log('这是客户端渲染！');
  // scrollElement.value = document.documentElement;
}


config({
  markdownItPlugins(plugins) {
    return [
      ...plugins,
      {
        type: 'xss',
        plugin: XSSPlugin,
        options: {
          // 配置 XSS 插件的白名单，添加 div 标签支持
          extendedWhiteList: {
            div: ['class','style'] // 允许 div 标签使用 class 属性
          }
        },
      },
    ];
  },
});

</script>

<template>
<!--  <MdPreview :id="id" :modelValue="text2" />-->
  <MdEditor v-model="text2" />

  <div v-html="text2"></div>
</template>

<style scoped>

</style>