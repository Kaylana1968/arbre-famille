<template>
  <ChangeTree @switch-type="withTimeline = !withTimeline" />

  <TimelineTree v-if="withTimeline" />

  <NormalTree v-else />
</template>

<script setup>
const withTimeline = useCookie("timeline");
</script>
