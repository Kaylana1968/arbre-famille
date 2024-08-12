<template>
  <svg class="life-line" :width="lifeLength" height="2">
    <line
      x1="0"
      y1="1"
      :x2="lifeLength"
      y2="1"
      stroke="gray"
      stroke-width="2"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  yearSize: Number,
  deathYear: Number,
  currentYear: Number,
  birthYear: Number,
  halfImageSize: Number,
});

const halfImageSizePx = `${props.halfImageSize}px`;

const lifeLength =
  props.yearSize * ((props.deathYear || props.currentYear) - props.birthYear); // length in px of the line from his birth to his death or now if alive
</script>

<style scoped>
.life-line {
  margin-top: v-bind("halfImageSizePx");
  margin-left: v-bind("halfImageSizePx");
}
</style>
