<template>
  <div
    id="grabbable"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    ref="grabbableElement"
  >
    <main>
      <Node
        :member="elder.spouse"
        :starting-year="startingYear"
        :current-year="currentYear"
        :first="true"
      />

      <Node
        :member="elder._stem"
        :starting-year="startingYear"
        :current-year="currentYear"
        :first="true"
      />
    </main>

    <Timeline :starting-year="startingYear" :current-year="currentYear" />
  </div>

  <HideTimeline />
</template>

<script setup>
const startingYear = 1900;
const currentYear = new Date().getUTCFullYear();
const elder = (await queryContent().sort({ birth: 1 }).find())[0];

// Grab to slide
const grabbableElement = ref(null);
let holding = false;
let posX = 0;
let posY = 0;

function mouseDown(event) {
  posX = event.clientX;
  posY = event.clientY;
  holding = true;
  grabbableElement.value.style.cursor = "grabbing";
}

function mouseMove(event) {
  if (holding) {
    const newPosX = event.clientX;
    const newPosY = event.clientY;

    window.scrollBy(posX - newPosX, posY - newPosY);

    posX = newPosX;
    posY = newPosY;
  }
}

function mouseUp() {
  holding = false;
  grabbableElement.value.style.cursor = "grab";
}
</script>

<style scoped>
#grabbable {
  cursor: grab;
  user-select: none;
}

main {
  min-width: 100vw;
  min-height: 100vh;
  margin-left: 10.3px;
}
</style>
