<script setup>

const { $axios } = useNuxtApp();
const presignedUrlData = ref(null);
const presignedUploadUrl = ref(null);

const presignedUrlMethod = async () => {
  try {
    presignedUrlData.value = await $axios.get("/infra/file/presigned-url?path=test/dag.png");

    presignedUploadUrl.value = presignedUrlData.value.data.uploadUrl;
    console.log("presignedUploadUrl.value:",presignedUploadUrl.value);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

onMounted(presignedUrlMethod);



</script>

<template>
  <div>
    <h1>Axios Fetch Example</h1>
    <pre>{{ presignedUrlData }}</pre>
    <pre>{{ presignedUploadUrl }}</pre>

<!--    <br>-->
<!--    data2.value:-->
<!--    <pre>{{ data2.value }}</pre>-->
  </div>
</template>