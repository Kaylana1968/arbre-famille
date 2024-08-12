<template>
  <div ref="globalElement" class="mx-12 text-center">
    <NTWeddingLine
      v-if="memberInfos.spouse"
      :pos-x="posX"
      :spouse-spacing="spouseSpacing"
      :half-image-size="imageSize / 2"
    />

    <NTChildLine
      v-if="children.size"
      :pos-x="posX"
      :spouse-spacing="spouseSpacing"
      :half-image-size="imageSize / 2"
    />

    <MemberImage
      ref="element"
      :member="member"
      :image="memberInfos.image"
      :image-size="imageSize"
    />

    <MemberImage
      v-if="memberInfos.spouse"
      :member="memberInfos.spouse"
      :image="spouseInfos.image"
      :image-size="imageSize"
      class="ml-8"
    />

    <div class="flex justify-center mt-20">
      <NTNode v-for="child in children" :member="child" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  member: String,
});

const imageSize = 75; // Size in px of the size of an image
const spouseSpacing = 32; // Size in px between a member and his spouse

const memberInfos = await queryContent(props.member).findOne();
const spouseInfos = await queryContent(memberInfos.spouse).findOne();

const children = new Set(memberInfos.children.concat(spouseInfos.children));

const globalElement = ref(null);
const element = ref(null);
const posX = ref(0);

onMounted(() => {
  posX.value =
    element.value.$el.getBoundingClientRect().left -
    globalElement.value.getBoundingClientRect().left;
});
</script>

<style scoped>
svg {
  position: absolute;
  z-index: -10;
}
</style>
