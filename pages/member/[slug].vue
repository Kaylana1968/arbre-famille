<template>
  <NuxtLink
    class="absolute top-4 left-4 bg-neutral-200 hover:bg-neutral-300 rounded border border-black py-1 px-2"
    to="/"
  >
    ⇐ Retour à l'arbre
  </NuxtLink>

  <main class="flex min-h-screen">
    <div id="tree" class="w-3/5"></div>

    <MemberDescription :member-infos="memberInfos" />
  </main>
</template>

<script setup>
const member = useRoute().params.slug;
const memberInfos = await queryContent(member).findOne();
</script>
