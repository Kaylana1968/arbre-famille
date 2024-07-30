<template>
  <div class="container">
    <svg class="lifeline" :width="lifeLength" height="1">
      <line x1="0" y1="0" :x2="lifeLength" y2="0" stroke="gray" />
    </svg>

    <svg v-if="infos.death" class="deathline" :width="lifeLength" height="20">
      <line :x1="lifeLength" y1="0" :x2="lifeLength" y2="20" stroke="gray" />
    </svg>

    <div class="image-container">
      <img :src="infos.image" width="75" height="75" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  member: String,
  currentYear: Number,
});

const infos = await queryContent(props.member).findOne();

const lifeLength =
  136 *
  ((infos.death ? parseInt(infos.death.slice(0, 4)) : props.currentYear) -
    parseInt(infos.birth.slice(0, 4)));

console.log(props.currentYear);
console.log(parseInt(infos.birth.slice(0, 4)));
console.log(lifeLength);
</script>

<style scoped>
.container {
  margin-left: 5.5px;
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
