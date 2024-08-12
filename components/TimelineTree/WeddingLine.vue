<template>
  <svg class="wedding-line" width="2" :height="spouseDistance">
    <line
      x1="1"
      y1="0"
      x2="1"
      :y2="spouseDistance"
      stroke="pink"
      stroke-width="2"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  member: String,
  spouse: String,
  weddingYear: Number,
  birthYear: Number,
  yearSize: Number,
  halfImageSize: Number,
});

const halfImageSizePx = `${props.halfImageSize}px`;

const spouseDistance = ref(0);
const spouseLineStart = ref("0");

onMounted(() => {
  const memberPosition = document
    .getElementById(props.member)
    .getBoundingClientRect();

  const spousePosition = document
    .getElementById(props.spouse)
    .getBoundingClientRect();

  spouseDistance.value = Math.abs(spousePosition.y - memberPosition.y);
  spouseLineStart.value = `${
    props.yearSize * (props.weddingYear - props.birthYear) + props.halfImageSize
  }px`;
});
</script>

<style scoped>
.wedding-line {
  margin-top: v-bind("halfImageSizePx");
  margin-left: v-bind("spouseLineStart");
}
</style>
