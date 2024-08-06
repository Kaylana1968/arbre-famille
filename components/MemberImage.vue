<template>
  <NuxtLink :to="`member?name=${member}`" class="image-container">
    <img :src="image" :width="imageSize" :height="imageSize" />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  member: String,
  image: String,
  imageSize: Number,
});

const imageSizePx = `${props.imageSize}px`;
</script>

<style scoped>
.image-container {
  display: inline-block;
  width: v-bind("imageSizePx");
  height: v-bind("imageSizePx");
  border-radius: 50%;
  border: 1px solid black;
  overflow: hidden;
}
</style>
