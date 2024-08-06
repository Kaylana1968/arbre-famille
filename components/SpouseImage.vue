<template>
  <button
    class="image-container"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    ref="button"
  >
    <img :src="image" :width="imageSize" :height="imageSize" />
  </button>
</template>

<script setup>
const props = defineProps({
  member: String,
  image: String,
  imageSize: Number,
  yearSize: Number,
  weddingYear: Number,
  birthYear: Number,
});

const imageSizePx = `${props.imageSize}px`;

const weddingImageStart = `${
  props.yearSize * (props.weddingYear - props.birthYear) - props.imageSize
}px`;

// Redirect functions
let moved = true;
const button = ref(null);

function mouseDown(event) {
  event.preventDefault();
  moved = false;
}

function mouseMove(event) {
  event.preventDefault();
  moved = true;
}

function mouseUp(event) {
  event.preventDefault();

  if (!moved) {
    navigateTo(`member?name=${props.member}`);
  }
}
</script>

<style scoped>
.image-container {
  display: inline-block;
  margin-left: v-bind("weddingImageStart");
  width: v-bind("imageSizePx");
  height: v-bind("imageSizePx");
  padding: 0;
  border-radius: 50%;
  border: 1px solid black;
  overflow: hidden;
}
</style>
