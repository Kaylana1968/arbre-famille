<template>
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
</template>

<script setup>
const startingYear = 1900;
const currentYear = new Date().getUTCFullYear();
const elder = (await queryContent().sort({ birth: 1 }).find())[0];

// Grab to slide
let holding = false;
let posX = 0;
let posY = 0;
let element;

function mouseDown(event) {
  event.preventDefault();
  posX = event.clientX;
  posY = event.clientY;
  holding = true;
  element.style.cursor = "grabbing";
}

function mouseUp(event) {
  event.preventDefault();
  holding = false;
  element.style.cursor = "grab";
}

function mouseMove(event) {
  if (holding) {
    event.preventDefault();
    const newPosX = event.clientX;
    const newPosY = event.clientY;

    window.scrollBy(posX - newPosX, posY - newPosY);

    posX = newPosX;
    posY = newPosY;
  }
}

onMounted(() => {
  element = document.querySelector("body");

  element.addEventListener("mousedown", mouseDown);
  element.addEventListener("mouseup", mouseUp);
  element.addEventListener("mousemove", mouseMove);
  element.style.cursor = "grab";
});

onBeforeUnmount(() => {
  element.removeEventListener("mousedown", mouseDown);
  element.removeEventListener("mouseup", mouseUp);
  element.removeEventListener("mousemove", mouseMove);
});

useHead({
  bodyAttrs: {
    class: "grabbable",
  },
});
</script>

<style scoped>
.grabbable {
  display: inline-block;
  overflow: hidden;
  user-select: none;
}

main {
  min-width: 100vw;
  min-height: 100vh;
  margin-left: 10.3px;
}
</style>
