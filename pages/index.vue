<template>
  <main></main>

  <Timeline />
</template>

<script setup>
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
}
</style>
