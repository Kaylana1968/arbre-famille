<template>
  <div :id="member" class="container">
    <!-- Line of the member  -->
    <LifeLine
      :year-size="yearSize"
      :death-year="deathYear"
      :current-year="currentYear"
      :birth-year="birthYear"
      :half-image-size="imageSize / 2"
    />

    <!-- Line that link parent line to his child -->
    <ChildLine
      v-if="parent"
      :member="member"
      :parent="parent"
      :child-number="childNumber"
      :member-height="memberHeight"
      :half-image-size="imageSize / 2"
    />

    <!-- Line of the wedding  -->
    <!-- <WeddingLine
      v-if="!showChildren"
      :member="member"
      :spouse="memberInfos.spouse"
      :wedding-year="weddingYear"
      :birth-year="birthYear"
      :year-size="yearSize"
      :half-image-size="imageSize / 2"
    /> -->

    <!-- Line marking the death of the member -->
    <DeathLine
      v-if="deathYear"
      :year-size="yearSize"
      :death-year="deathYear"
      :current-year="currentYear"
      :birth-year="birthYear"
      :half-image-size="imageSize / 2"
    />

    <!-- Image of the member -->
    <MemberImage
      :member="member"
      :image="memberInfos.image"
      :image-size="imageSize"
    />

    <!-- Image of the spouse if got one -->
    <MemberImage
      v-if="weddingYear"
      class="spouse-image"
      :member="memberInfos.spouse"
      :image="spouseInfos.image"
      :image-size="imageSize"
    />
  </div>

  <!-- Nodes of the children of the member with his current spouse -->
  <Node
    v-if="showChildren"
    v-for="(child, index) in commonChildren"
    :member="child"
    :parent="member"
    :child-number="index + 1"
    :starting-year="startingYear"
    :current-year="currentYear"
  />

  <!-- Nodes of the other children of the member -->
  <Node
    v-for="(child, index) in otherChildren"
    :member="child"
    :parent="member"
    :child-number="(showChildren ? commonChildren.length : 0) + index + 1"
    :starting-year="startingYear"
    :current-year="currentYear"
  />
</template>

<script setup>
const props = defineProps({
  member: String,
  parent: {
    type: String,
    default: null,
  },
  childNumber: {
    type: Number,
    default: 0,
  },
  startingYear: Number,
  currentYear: Number,
  first: {
    type: Boolean,
    default: false,
  },
});

const memberHeight = 111.8; // Size in px of the height of one member's line
const yearSize = 136; // Size in px of the length of one year in the website
const imageSize = 75; // Size in px of the size of an image

const memberInfos = await queryContent(props.member).findOne();
const spouseInfos = await queryContent(memberInfos.spouse).findOne();

// Children both member and spouse have
const commonChildren = memberInfos.children
  .filter((child) => spouseInfos.children.includes(child))
  .reverse();

// Children only the member have
const otherChildren = memberInfos.children
  .filter((child) => !commonChildren.includes(child))
  .reverse();

const birthYear = parseInt(memberInfos.birth.slice(0, 4));
const deathYear = memberInfos.death
  ? parseInt(memberInfos.death.slice(0, 4))
  : null;
const weddingYear = memberInfos.wedding
  ? parseInt(memberInfos.wedding.slice(0, 4))
  : null;

// Distance between member image and wedding image
const weddingStart = `${yearSize * (weddingYear - birthYear) - imageSize}px`;

// true if male or (not first and spouse is external to family)
const showChildren = memberInfos.male || (!props.first && spouseInfos.external);

// distance in px between birth year and starting year of the timeline
const lifeStart = `${yearSize * (birthYear - props.startingYear) + 5.5}px`;
</script>

<style scoped>
.container {
  margin-bottom: 2rem;
  margin-left: v-bind("lifeStart");
}

svg {
  position: absolute;
  z-index: -10;
}

.spouse-image {
  margin-left: v-bind("weddingStart");
}
</style>
