<template>
  <div id="timeline" ref="timelineElement">
    <TimelinePart
      v-for="year in numberYear"
      :year="year + startingYear - 1"
      :start="year + startingYear - 1 === startingYear"
    />

    <strong>></strong>
  </div>
</template>

<script setup>
const props = defineProps({
  startingYear: Number,
  currentYear: Number,
});

const numberYear = props.currentYear - props.startingYear + 1;
const timelineElement = ref(null);

onMounted(() => {
  document.querySelector(
    "main"
  ).style.width = `${timelineElement.value.scrollWidth}px`;
});
</script>

<style scoped>
#timeline {
  position: sticky;
  margin: 0 3rem;
  bottom: 1rem;
  font-size: 1rem;
  display: inline-flex;
  align-items: end;
  user-select: none;
}
</style>
