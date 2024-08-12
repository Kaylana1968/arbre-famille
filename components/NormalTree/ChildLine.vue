<template>
  <svg class="child-line" width="2" :height="lineLength">
    <line
      x1="1"
      y1="0"
      x2="1"
      :y2="lineLength"
      stroke="gray"
      stroke-width="2"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  posX: Number,
  spouseSpacing: Number,
  halfImageSize: Number,
});

const halfImageSizePx = `${props.halfImageSize}px`;
const lineStart = computed(
  () => `${props.posX + 2 * props.halfImageSize + props.spouseSpacing / 2}px`
);
const lineLength = props.spouseSpacing + props.halfImageSize;
</script>

<style scoped>
.child-line {
  margin-top: v-bind("halfImageSizePx");
  margin-left: v-bind("lineStart");
}
</style>
