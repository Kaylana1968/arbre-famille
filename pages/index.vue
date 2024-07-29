<template>
  <main>
    
  </main>
</template>

<script setup>
let holding = false;
let posX = 0;
let posY = 0;
let element

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
  element = document.querySelector("main");

  element.addEventListener("mousedown", mouseDown);
  element.addEventListener("mouseup", mouseUp);
  element.addEventListener("mousemove", mouseMove);
});

onBeforeUnmount(() =>{
  element.removeEventListener("mousedown", mouseDown);
  element.removeEventListener("mouseup", mouseUp);
  element.removeEventListener("mousemove", mouseMove);
});
</script>

<style scoped>
main {
  background-color: gray;
  width: 1000vw;
  height: 1000vh;
  overflow: hidden;
  cursor: grab;
  user-select: none;
}
</style>
