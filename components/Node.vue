<template>
  <div :id="member" class="container">
    <!-- Line that link parent line to his child -->
    <svg class="child-line" width="1" :height="parentDistance">
      <line x1="0" y1="0" x2="0" :y2="parentDistance" stroke="gray" />
    </svg>

    <!-- Line of the member  -->
    <svg class="life-line" :width="lifeLength" height="1">
      <line x1="0" y1="0" :x2="lifeLength" y2="0" stroke="gray" />
    </svg>

    <!-- Line marking the death of the member -->
    <svg
      v-if="memberInfos.death"
      class="death-line"
      :width="lifeLength"
      height="20"
    >
      <line :x1="lifeLength" y1="0" :x2="lifeLength" y2="20" stroke="gray" />
    </svg>

    <!-- Image of the member -->
    <div class="image-container">
      <img :src="memberInfos.image" width="75" height="75" />
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

const memberInfos = await queryContent(props.member).findOne();
const spouseInfos = await queryContent(memberInfos.spouse).findOne();

const commonChildren = memberInfos.children
  .filter((child) => spouseInfos.children.includes(child))
  .reverse();
const otherChildren = memberInfos.children
  .filter((child) => !commonChildren.includes(child))
  .reverse();

const parentDistance = ref(0);
const childLineStart = ref("0");

const birthYear = parseInt(memberInfos.birth.slice(0, 4)); // year of birth
const lifeStart = `${yearSize * (birthYear - props.startingYear) + 5.5}px`; // distance in px between birth year and starting year of the timeline
const lifeLength =
  yearSize *
  ((memberInfos.death
    ? parseInt(memberInfos.death.slice(0, 4))
    : props.currentYear) -
    birthYear); // length in px of the line from his birth to his death or now if alive

// false if female and (first node or spouse is a sibling)
const showChildren = !(
  !memberInfos.male &&
  (props.first || memberInfos.siblings.includes(memberInfos.spouse))
);

onMounted(() => {
  if (props.parent) {
    const parentPosition = document
      .getElementById(props.parent)
      .getBoundingClientRect();
    const memberPosition = document
      .getElementById(props.member)
      .getBoundingClientRect();

    parentDistance.value = Math.abs(parentPosition.y - memberPosition.y);
    childLineStart.value = `${37.5 - parentDistance.value}px`;
  }
});
</script>

<style scoped>
.container {
  margin-bottom: 1rem;
  margin-left: v-bind("lifeStart");
}

.image-container {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 1px solid black;
  overflow: hidden;
}

svg {
  position: absolute;
  z-index: -10;
}

.child-line {
  margin-top: v-bind("childLineStart");
  margin-left: 37.5px;
}

.life-line {
  margin-top: 37.5px;
  margin-left: 37.5px;
}

.death-line {
  margin-top: 27.5px;
  margin-left: 37.5px;
}
</style>
