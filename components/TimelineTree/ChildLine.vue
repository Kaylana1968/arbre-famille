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
  childNumber: Number,
  memberHeight: Number,
  halfImageSize: Number,
});

const halfImageSizePx = `${props.halfImageSize}px`;

const parentDistance = props.childNumber * props.memberHeight;
const childLineStart = `${props.halfImageSize - parentDistance}px`;
</script>

<style scoped>
.child-line {
  margin-top: v-bind("childLineStart");
  margin-left: v-bind("halfImageSizePx");
}
</style>
