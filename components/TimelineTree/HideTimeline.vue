<template>
  <button
    class="fixed top-4 right-4 py-1 px-2 bg-neutral-200 hover:bg-neutral-300 rounded border border-black"
    @click="$emit('hideTimeline')"
  >
    {{ showTimeline ? "Hide" : "Show" }} timeline
  </button>
</template>

<script setup>
defineProps({
  showTimeline: Boolean,
});
</script>
