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
      :half-image-size="imageSize / 2"
    />

    <!-- Line of the wedding  -->
    <WeddingLine
      v-if="!showChildren"
      :member="member"
      :spouse="memberInfos.spouse"
      :wedding-year="parseInt(memberInfos.wedding.slice(0, 4))"
      :birth-year="birthYear"
      :year-size="yearSize"
      :half-image-size="imageSize / 2"
    />

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
    <div class="image-container">
      <img :src="memberInfos.image" :width="imageSize" :height="imageSize" />
    </div>
  </div>

  <!-- Nodes of the children of the member with his current spouse -->
  <Node
    v-if="showChildren"
    v-for="child in commonChildren"
    :member="child"
    :parent="member"
    :starting-year="startingYear"
    :current-year="currentYear"
  />

  <!-- Nodes of the other children of the member -->
  <Node
    v-for="child in otherChildren"
    :member="child"
    :parent="member"
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
  startingYear: Number,
  currentYear: Number,
  first: {
    type: Boolean,
    default: false,
  },
});

const yearSize = 136; // Size in px of the length of one year in the website
const imageSize = 75;

const memberInfos = await queryContent(props.member).findOne();
const spouseInfos = await queryContent(memberInfos.spouse).findOne();

const commonChildren = memberInfos.children
  .filter((child) => spouseInfos.children.includes(child))
  .reverse();
const otherChildren = memberInfos.children
  .filter((child) => !commonChildren.includes(child))
  .reverse();

const birthYear = parseInt(memberInfos.birth.slice(0, 4)); // year of birth
const deathYear =
  memberInfos.death === null ? null : parseInt(memberInfos.death.slice(0, 4));

const lifeStart = `${yearSize * (birthYear - props.startingYear) + 5.5}px`; // distance in px between birth year and starting year of the timeline
const imageSizePx = `${imageSize}px`;

// false if female and (first node or spouse is a sibling)
const showChildren = !(
  !memberInfos.male &&
  (props.first || memberInfos.siblings.includes(memberInfos.spouse))
);
</script>

<style scoped>
.container {
  margin-bottom: 1rem;
  margin-left: v-bind("lifeStart");
}

.image-container {
  width: v-bind("imageSizePx");
  height: v-bind("imageSizePx");
  border-radius: 50%;
  border: 1px solid black;
  overflow: hidden;
}

svg {
  position: absolute;
  z-index: -10;
}
</style>
