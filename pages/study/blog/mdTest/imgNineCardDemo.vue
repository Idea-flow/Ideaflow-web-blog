<template>
  <div class="container">
    <h1>图片九宫格布局示例</h1>


    <div class="demo-section">
      <h2>九张图片</h2>
      <MdPreview
          :modelValue="nineImages"
          :theme="'light'"
      />
    </div>

    <div class="demo-section">
      <h2>九张图片3</h2>
      <MdPreview
          :id="previewId"
          :modelValue="nineImages3"
          :theme="'light'"
      />
    </div>
<!--    <div class="demo-section">-->
<!--      <h2>九张图片4</h2>-->
<!--      <MdPreview-->
<!--          :id="previewI2"-->
<!--          :modelValue="nineImages4"-->
<!--          :theme="'light'"-->
<!--      />-->
<!--    </div>-->

<!--    <div class="demo-section">-->
<!--      <h2>九张图片2</h2>-->
<!--      <MdPreview-->
<!--          :modelValue="nineImages2"-->
<!--          :theme="'light'"-->
<!--      />-->
<!--&lt;!&ndash;      <MarkdownRenderer :content="nineImages2" />&ndash;&gt;-->
<!--    </div>-->
  </div>

  <!-- 图片预览弹窗 -->
  <Teleport to="body">
    <div v-if="showPreview" class="image-preview-overlay" @click="closePreview">
      <div class="image-preview-container" @click.stop>
        <button class="nav-button prev" @click="prevImage" :disabled="currentIndex === 0">
          <span class="arrow">‹</span>
        </button>
        <img :src="currentImage" alt="预览图片" class="preview-image" />
        <button class="nav-button next" @click="nextImage" :disabled="currentIndex === images.length - 1">
          <span class="arrow">›</span>
        </button>
        <button class="close-button" @click="closePreview">×</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { MdPreview, MdCatalog, config } from 'md-editor-v3';
import { createMarkdownItNewWindowPlugin } from 'assets/js/markdown-it-plugin/a-new-window-plugin.js';
import 'md-editor-v3/lib/preview.css';
import 'assets/css/markdown/content/img-nine-layout.css';
import {
  createMarkdownItImgNineLayoutPlugin
} from "assets/js/markdown-it-plugin/img-nine-layout-plugin.js";

const previewId = 'preview-only';
const previewId2 = 'preview-only2';

// 图片预览相关状态
const showPreview = ref(false);
const currentIndex = ref(0);
const images = ref([]);
const currentImage = ref('');



// 原有的图片数据和配置
const singleImage = `<imgCard>
![示例图片1](https://picsum.photos/300/300?random=1)
</imgCard>`;

const fourImages = `<imgCard>
![示例图片1](https://picsum.photos/300/300?random=1)
![示例图片2](https://picsum.photos/300/300?random=2)
![示例图片3](https://picsum.photos/300/300?random=3)
![示例图片4](https://picsum.photos/300/300?random=4)
</imgCard>`;

const nineImages = `<ImgNineLayout>
![示例图片1](https://picsum.photos/300/300?random=1)
![示例图片2](https://picsum.photos/300/300?random=2)
![示例图片3](https://picsum.photos/300/300?random=3)
![示例图片4](https://picsum.photos/300/300?random=4)
![示例图片5](https://picsum.photos/300/300?random=5)
![示例图片6](https://picsum.photos/300/300?random=6)
![示例图片7](https://picsum.photos/300/300?random=7)
![示例图片8](https://picsum.photos/300/300?random=8)
![示例图片9](https://picsum.photos/300/300?random=9)
</ImgNineLayout>`;

const nineImages3 = `# 九宫格展示
<ImgNineLayout>
![示例图片1](https://picsum.photos/300/300?random=1)
![示例图片2](https://picsum.photos/300/300?random=2)
![示例图片3](https://picsum.photos/300/300?random=3)
![示例图片4](https://picsum.photos/300/300?random=4)
![示例图片5](https://picsum.photos/300/300?random=5)
![示例图片6](https://picsum.photos/300/300?random=6)
![示例图片7](https://picsum.photos/300/300?random=7)
![示例图片8](https://picsum.photos/300/300?random=8)
![示例图片9](https://picsum.photos/300/300?random=9)
</ImgNineLayout>
哈哈哈 您好
# 九宫格展示记得看啦距离观看`;

config({
  markdownItConfig(mdit) {
    mdit.use(createMarkdownItImgNineLayoutPlugin());
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
}


</style>
