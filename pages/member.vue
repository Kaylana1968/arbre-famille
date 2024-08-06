<template>
  <h1>{{ memberInfos.name }}</h1>
</template>

<script setup>
const member = useRoute().query.name;
const memberInfos = await queryContent(member).findOne();
</script>
