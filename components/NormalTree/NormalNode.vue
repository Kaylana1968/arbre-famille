<template>
  <MemberImage
    :member="member"
    :image="memberInfos.image"
    :image-size="imageSize"
  />
</template>

<script setup>
const props = defineProps({
  member: String,
});

const memberInfos = await queryContent(props.member).findOne();

const imageSize = 75; // Size in px of the size of an image
</script>
