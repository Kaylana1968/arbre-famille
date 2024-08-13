<template>
  <main
    class="select-none flex justify-center mt-4"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    :style="`cursor: ${holding ? 'grabbing' : 'grab'};`"
  >
    <NTNode :member="elder._stem" :first="true" />
  </main>
</template>

<script setup>
const props = defineProps({
  depth: {
    type: Number,
    default: -1,
  },
});

const elder = (await queryContent().sort({ birth: 1 }).find())[0];

const minWidth = ref(0);

onMounted(() => {
  // Width of the first div containing all the nodes so largest div of the page
  minWidth.value = `${document.querySelector("main div").scrollWidth}px`;

  // Scrolls to the left
  document.querySelector("main").scrollTo(0, 0);
});

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

<style scoped>
main {
  min-width: v-bind("minWidth");
}
</style>
