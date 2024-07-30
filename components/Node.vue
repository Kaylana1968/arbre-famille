<template>
  <div :id="member" class="container">
    <svg class="lifeline" :width="lifeLength" height="1">
      <line x1="0" y1="0" :x2="lifeLength" y2="0" stroke="gray" />
    </svg>

    <svg
      v-if="memberInfos.death"
      class="deathline"
      :width="lifeLength"
      height="20"
    >
      <line :x1="lifeLength" y1="0" :x2="lifeLength" y2="20" stroke="gray" />
    </svg>

    <div class="image-container">
      <img :src="memberInfos.image" width="75" height="75" />
    </div>
  </div>

  <Node
    v-if="showChildren"
    v-for="child in commonChildren"
    :member="child"
    :starting-year="startingYear"
    :current-year="currentYear"
  />

  <Node
    v-for="child in otherChildren"
    :member="child"
    :starting-year="startingYear"
    :current-year="currentYear"
  />
</template>

<script setup>
const props = defineProps({
  member: String,
  startingYear: Number,
  currentYear: Number,
  showChildren: {
    type: Boolean,
    default: true,
  },
});

const yearSize = 136;

const memberInfos = await queryContent(props.member).findOne();
const spouseInfos = await queryContent(memberInfos.spouse).findOne();

const commonChildren = memberInfos.children.filter((child) =>
  spouseInfos.children.includes(child)
);
const otherChildren = memberInfos.children.filter((child) =>
  !commonChildren.includes(child)
);

const showChildren =
  props.showChildren &&
  !(!memberInfos.male && memberInfos.siblings.includes(memberInfos.spouse));

const birthYear = parseInt(memberInfos.birth.slice(0, 4)); // year of birth
const lifeStart = `${yearSize * (birthYear - props.startingYear) + 5.5}px`; // distance from the left in px to correspond birth year
const lifeLength =
  yearSize *
  ((memberInfos.death
    ? parseInt(memberInfos.death.slice(0, 4))
    : props.currentYear) -
    birthYear); // length in px of the line from his birth to his death or now
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

.lifeline {
  margin: 37.5px 0 0 37.5px;
}

.deathline {
  margin: 27.5px 0 0 37.5px;
}
</style>
