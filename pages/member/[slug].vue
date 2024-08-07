<template>
  <NuxtLink
    class="absolute top-2 left-2 border border-black rounded py-1 px-2"
    to="/"
    >⇐ Back to tree</NuxtLink
  >

  <main class="flex min-h-screen">
    <div id="tree" class="w-3/5"></div>

    <MemberDescription :member-infos="memberInfos" />
  </main>
</template>

<script setup>
const member = useRoute().params.slug;
const memberInfos = await queryContent(member).findOne();
</script>
