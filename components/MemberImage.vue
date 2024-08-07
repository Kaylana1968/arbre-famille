<template>
  <button
    class="image-container"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    ref="button"
  >
    <img :src="image" :alt="member" :width="imageSize" :height="imageSize" />
  </button>
</template>

<script setup>
const props = defineProps({
  member: String,
  image: String,
  imageSize: Number,
});

const imageSizePx = `${props.imageSize}px`;

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
    navigateTo(`/member/${props.member}`);
  }
}
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
