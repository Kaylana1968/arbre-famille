<template>
  <svg class="child-line" width="2" :height="parentDistance">
    <line
      x1="1"
      y1="0"
      x2="1"
      :y2="parentDistance"
      stroke="gray"
      stroke-width="2"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  member: String,
  parent: String,
  halfImageSize: Number,
});

const halfImageSizePx = `${props.halfImageSize}px`;

const parentDistance = ref(0);
const childLineStart = ref("0");

onMounted(() => {
  const memberPosition = document
    .getElementById(props.member)
    .getBoundingClientRect();

  const parentPosition = document
    .getElementById(props.parent)
    .getBoundingClientRect();

  parentDistance.value = Math.abs(parentPosition.y - memberPosition.y);
  childLineStart.value = `${props.halfImageSize - parentDistance.value}px`;
});
</script>

<style scoped>
.child-line {
  margin-top: v-bind("childLineStart");
  margin-left: v-bind("halfImageSizePx");
}
</style>
