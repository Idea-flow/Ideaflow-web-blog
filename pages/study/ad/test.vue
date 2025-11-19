<template>
  广告1:
  <div class="page-layout">

  </div>
  <Adsbygoogle
      ad-format="auto"
      :include-query="true"
      :style="{ minWidth: '300px' }"
  />

</template>

<style scoped>
.content {
  flex: 1 1 auto;
  overflow-x: hidden;
}

.page-layout {
  display: flex;
  direction: row;
  gap: 36px;
  overflow: wrap;
}
</style>
<script setup lang="ts">
</script>