<template>
  <div
    class="select-none"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    :style="`cursor: ${holding ? 'grabbing' : 'grab'}`"
  >
    <main class="ml-[10.3px]">
      <TTNode
        :member="elder.spouse"
        :starting-year="startingYear"
        :current-year="currentYear"
        :first="true"
      />

      <TTNode
        :member="elder._stem"
        :starting-year="startingYear"
        :current-year="currentYear"
        :first="true"
      />
    </main>

    <TTTimeline
      v-if="showTimeline"
      :starting-year="startingYear"
      :current-year="currentYear"
    />
  </div>

  <TTHideTimeline
    @hide-timeline="showTimeline = !showTimeline"
    :show-timeline="showTimeline"
  />
</template>

<script setup>
const elder = (await queryContent().sort({ birth: 1 }).find())[0];
const startingYear = Number(elder.birth.slice(0, 4));
const currentYear = new Date().getUTCFullYear();
const showTimeline = ref(true);

// Grab to slide
const holding = ref(false);
let posX = 0;
let posY = 0;

function mouseDown(event) {
  posX = event.clientX;
  posY = event.clientY;
  holding.value = true;
}

function mouseMove(event) {
  if (holding.value) {
    const newPosX = event.clientX;
    const newPosY = event.clientY;

    window.scrollBy(posX - newPosX, posY - newPosY);

    posX = newPosX;
    posY = newPosY;
  }
}

function mouseUp() {
  holding.value = false;
}
</script>
