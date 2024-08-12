<template>
  <div
    class="sticky mx-12 bottom-4 inline-flex items-end"
    ref="timelineElement"
  >
    <div>
      <span class="-ml-2.5">{{ startingYear }}</span>

      <br />

      ├───────────
    </div>

    <TimelinePart v-for="year in numberYear" :year="year + startingYear" />

    <strong>></strong>
  </div>
</template>

<script setup>
const props = defineProps({
  startingYear: Number,
  currentYear: Number,
});

const numberYear = props.currentYear - props.startingYear;
const timelineElement = ref(null);

onMounted(() => {
  document.querySelector(
    "main"
  ).style.width = `${timelineElement.value.scrollWidth}px`;
});
</script>
