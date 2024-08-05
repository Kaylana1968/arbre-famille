<template>
  <button id="hide-timeline" @click="hide()">
    {{ timelineVisible ? "Hide" : "Show" }} timeline
  </button>
</template>

<script setup>
const timeline = ref();
const timelineVisible = ref(true);

onMounted(() => {
  timeline.value = document.getElementById("timeline");
});

function hide() {
  timeline.value.style.visibility = timelineVisible.value ? "hidden" : "visible";
  timelineVisible.value = !timelineVisible.value;
}
</script>

<style scoped>
#hide-timeline {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.2rem 0.4rem;
  background-color: #ddd;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
}

#hide-timeline:hover {
  background-color: #aaa;
}
</style>
