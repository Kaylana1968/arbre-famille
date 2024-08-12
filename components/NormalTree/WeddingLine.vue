<template>
  <svg class="wedding-line" :width="lineLength" height="2">
    <line
      x1="0"
      y1="1"
      :x2="lineLength"
      y2="1"
      stroke="gray"
      stroke-width="2"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  spouseSpacing: Number,
  halfImageSize: Number,
});

const halfImageSizePx = `${props.halfImageSize}px`;

const lineLength = 2 * props.halfImageSize + props.spouseSpacing;
</script>

<style scoped>
.wedding-line {
  margin-top: v-bind("halfImageSizePx");
  margin-left: v-bind("halfImageSizePx");
}
</style>
