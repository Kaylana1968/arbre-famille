<template>
  <MemberImage
    :member="member"
    :image="memberInfos.image"
    :image-size="imageSize"
  />
  <MemberImage
    :member="member.spouse"
    :image="spouseInfos.image"
    :image-size="imageSize"
    class="ml-8"
  />
</template>

<script setup>
const props = defineProps({
  member: String,
});

const memberInfos = await queryContent(props.member).findOne();
const spouseInfos = await queryContent(memberInfos.spouse).findOne();

const imageSize = 75; // Size in px of the size of an image
</script>

<style scoped>
svg {
  position: absolute;
  z-index: -10;
}
</style>
