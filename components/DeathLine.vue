<template>
  <svg class="death-line" width="2" :height="deathLineHeight">
    <line
      x1="1"
      y1="0"
      x2="1"
      :y2="deathLineHeight"
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

const deathLineHeight = 20;

const deathLineX = `${
  props.yearSize * ((props.deathYear || props.currentYear) - props.birthYear) +
  props.halfImageSize
}px`;

const deathLineY = `${props.halfImageSize - deathLineHeight / 2}px`;
</script>

<style scoped>
.death-line {
  margin-top: v-bind("deathLineY");
  margin-left: v-bind("deathLineX");
}
</style>
