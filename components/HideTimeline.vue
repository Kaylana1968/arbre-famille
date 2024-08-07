<template>
  <button
    class="fixed top-4 right-4 py-1 px-2 bg-neutral-200 hover:bg-neutral-300 rounded border border-black"
    @click="hide()"
  >
    {{ timelineVisible ? "Hide" : "Show" }}timeline
  </button>
</template>

<script setup>
const timeline = ref();
const timelineVisible = ref(true);

onMounted(() => {
  timeline.value = document.getElementById("timeline");
});

function hide() {
  timeline.value.style.visibility = timelineVisible.value
    ? "hidden"
    : "visible";
  timelineVisible.value = !timelineVisible.value;
}
</script>
