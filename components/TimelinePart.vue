<template>
  <div v-if="start">
    <span class="year">{{ year }}</span>

    <br />

    ├───────────
  </div>
  <div v-else>
    <span class="year">{{ year }}</span>

    <br />

    ┼───────────
  </div>
</template>

<script setup>
defineProps({
  start: Boolean,
  year: Number,
});
</script>

<style>
.year {
  margin-left: -0.5rem;
}
</style>
