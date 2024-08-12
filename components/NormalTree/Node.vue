<template>
  <div ref="globalElement" class="mx-12 text-center">
    <NTChildLine
      v-if="!first"
      :absolute-pos-x="absolutePosX"
      :relative-pos-x="relativePosX"
      :parent-pos-x="parentPosX"
      :spouse-spacing="spouseSpacing"
      :line-height="lineHeight"
      :half-image-size="imageSize / 2"
    />

    <NTWeddingLine
      v-if="memberInfos.spouse"
      :relative-pos-x="relativePosX"
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

    <div v-if="children.size" class="flex justify-center mt-20">
      <NTNode
        v-for="child in children"
        :member="child"
        :parent-pos-x="absolutePosX"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  member: String,
  first: {
    type: Boolean,
    default: false,
  },
  parentPosX: {
    type: Number,
    default: null,
  },
});

const imageSize = 75; // Size in px of the size of an image
const lineHeight = 159.25; // Size that a line takes
const spouseSpacing = 32; // Size in px between a member and his spouse

const memberInfos = await queryContent(props.member).findOne();
const spouseInfos = await queryContent(memberInfos.spouse).findOne();

const children = new Set(memberInfos.children.concat(spouseInfos.children));

const globalElement = ref(null);
const element = ref(null);
const absolutePosX = computed(() =>
  element.value ? element.value.$el.getBoundingClientRect().left : 0
);

const relativePosX = computed(() =>
  globalElement.value
    ? absolutePosX.value - globalElement.value.getBoundingClientRect().left
    : 0
);
</script>

<style scoped>
svg {
  position: absolute;
  z-index: -10;
}
</style>
