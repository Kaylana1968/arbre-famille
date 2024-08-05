<template>
  <div class="image-container">
    <img :src="image" :width="imageSize" :height="imageSize" />
  </div>
</template>

<script setup>
const props = defineProps({
  image: String,
  imageSize: Number,
});

const imageSizePx = `${props.imageSize}px`;
</script>

<style scoped>
.image-container {
  width: v-bind("imageSizePx");
  height: v-bind("imageSizePx");
  border-radius: 50%;
  border: 1px solid black;
  overflow: hidden;
}
</style>
