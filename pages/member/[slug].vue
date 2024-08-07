<template>
  <NuxtLink to="/"><= Back to tree</NuxtLink>

  <main>
    <div id="tree"></div>

    <MemberDescription :member-infos="memberInfos" />
  </main>
</template>

<script setup>
const member = useRoute().params.slug;
const memberInfos = await queryContent(member).findOne();
</script>

<style scoped>
a {
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.2rem 0.4rem;
  text-decoration: none;
  color: black;
}

main {
  display: flex;
}

#tree {
  width: 60%;
}
</style>
