<script setup lang="ts">
import * as FileApi from '~/remote/file'
import CryptoJS from 'crypto-js';
// 1.1 生成文件名称
const fileName = await generateStringName("test")
let path = "/test/"+fileName;

console.log("path--:",path)

const presignedInfo = await FileApi.getFilePresignedUrl(path)

console.log("presignedInfo--:",presignedInfo)




/**
 * 生成文件名称（使用算法SHA256）
 * @param file 要上传的文件
 */
async function generateFileName(file: any) {
  // 读取文件内容
  const data = await file.arrayBuffer()
  const wordArray = CryptoJS.lib.WordArray.create(data)
  // 计算SHA256
  const sha256 = CryptoJS.SHA256(wordArray).toString()
  // 拼接后缀
  const ext = file.name.substring(file.name.lastIndexOf('.'))
  return `${sha256}${ext}`
}

async function generateStringName(string: any) {

  // 计算SHA256
  const sha256 = CryptoJS.SHA256(string).toString()

  return `${sha256}`
}
</script>

<template>

</template>

<style scoped>

</style>