<template>
  <button id="hide-timeline" @click="visible = !visible">Hide timeline</button>

  <div id="timeline" ref="timelineElement" :style="`visibility: ${visible ? 'visible' : 'hidden'}`">
    <TimelinePart
      v-for="year in numberYear"
      :year="year + startingYear - 1"
      :start="year + startingYear - 1 === startingYear"
    />

    <strong>></strong>
  </div>
</template>

<script setup>
const startingYear = 1900;
const numberYear = new Date().getUTCFullYear() - startingYear + 1;
const visible = ref(true);
const timelineElement = ref(null)

onMounted(() => {
  document.querySelector("main").style.width = `${timelineElement.value.scrollWidth}px`;
});
</script>

<style scoped>
#timeline {
  position: sticky;
  margin: 0 1rem;
  bottom: 1rem;
  font-size: 1rem;
  display: inline-flex;
  align-items: end;
}

#hide-timeline {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.2rem 0.4rem;
  border-radius: 0.5rem;
}
</style>
