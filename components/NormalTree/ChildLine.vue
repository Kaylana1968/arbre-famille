<template>
  <svg
    v-if="horizontalLineLength > 0"
    class="child-line"
    :width="horizontalLineLength + 1"
    :height="lineHeight"
  >
    <line
      :x1="horizontalLineLength"
      y1="0"
      :x2="horizontalLineLength"
      :y2="topVerticalLineEnd"
      stroke="gray"
      stroke-width="2"
    />
    <line
      x1="0"
      :y1="topVerticalLineEnd"
      :x2="horizontalLineLength + 1"
      :y2="topVerticalLineEnd"
      stroke="gray"
      stroke-width="2"
    />
    <line
      x1="1"
      :y1="topVerticalLineEnd"
      x2="1"
      :y2="props.lineHeight"
      stroke="gray"
      stroke-width="2"
    />
  </svg>

  <svg
    v-else
    class="child-line"
    :style="`margin-left: ${
      relativePosX + halfImageSize + horizontalLineLength - 1
    }px`"
    :width="-horizontalLineLength + 1"
    :height="lineHeight"
  >
    <line
      x1="1"
      y1="0"
      x2="1"
      :y2="topVerticalLineEnd"
      stroke="gray"
      stroke-width="2"
    />
    <line
      x1="0"
      :y1="topVerticalLineEnd"
      :x2="-horizontalLineLength"
      :y2="topVerticalLineEnd"
      stroke="gray"
      stroke-width="2"
    />
    <line
      :x1="-horizontalLineLength"
      :y1="topVerticalLineEnd"
      :x2="-horizontalLineLength"
      :y2="props.lineHeight"
      stroke="gray"
      stroke-width="2"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  absolutePosX: Number,
  relativePosX: Number,
  parentPosX: Number,
  spouseSpacing: Number,
  lineHeight: Number,
  halfImageSize: Number,
});

const horizontalLineStart = computed(
  () => `${props.relativePosX + props.halfImageSize}px`
);
const horizontalLineLength = computed(
  () =>
    props.parentPosX -
    props.absolutePosX +
    props.halfImageSize +
    props.spouseSpacing / 2
);

const verticalLineStart = `-${props.lineHeight - props.halfImageSize}px`;
const topVerticalLineEnd = props.lineHeight * 0.6;
</script>

<style scoped>
.child-line {
  margin-top: v-bind("verticalLineStart");
  margin-left: v-bind("horizontalLineStart");
}
</style>
