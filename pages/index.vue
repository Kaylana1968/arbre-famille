<template>
  <!-- <ChangeTree @switch-type="withTimeline = !withTimeline" /> -->

  <TTTree v-if="withTimeline" />

  <NTTree v-else />
</template>

<script setup>
const withTimeline = useCookie("timeline");
</script>
