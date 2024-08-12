<template>
  <div class="w-2/5 pt-4 pl-4 border-l border-neutral-200">
    <div class="image-container">
      <NuxtImg
        :src="memberInfos.image"
        :alt="memberInfos.name"
        format="webp"
        quality="80"
        height="250"
        width="250"
        class="mx-auto rounded"
      />
    </div>

    <h1 class="text-3xl mt-4">{{ memberInfos.name }}</h1>

    <hr class="my-4 -ml-4 border-neutral-200" />

    <table class="w-full">
      <tbody>
        <tr v-if="memberInfos.father">
          <th>Père</th>
          <td>
            <NuxtLink :to="`/member/${memberInfos.father}`">
              {{ fatherInfos.name }}
            </NuxtLink>
          </td>
        </tr>

        <tr v-if="memberInfos.mother">
          <th>Mère</th>
          <td>
            <NuxtLink :to="`/member/${memberInfos.mother}`">
              {{ motherInfos.name }}
            </NuxtLink>
          </td>
        </tr>

        <tr>
          <th>Naissance</th>
          <td>
            {{ `${dateToString(memberInfos.birth)} (${age} ans)` }}
          </td>
        </tr>

        <tr v-if="memberInfos.spouse">
          <th>{{ memberInfos.male ? "Épouse" : "Époux" }}</th>
          <td>
            <NuxtLink :to="`/member/${memberInfos.spouse}`">
              {{ spouseInfos.name }}
            </NuxtLink>
          </td>
        </tr>

        <tr v-if="memberInfos.wedding">
          <th>Marriage</th>
          <td>
            {{ dateToString(memberInfos.wedding) }}
          </td>
        </tr>

        <tr v-if="memberInfos.children.length">
          <th>Descendance</th>
          <td>
            <ul>
              <li v-for="child in memberInfos.children">
                <NuxtLink :to="`/member/${child}`">
                  {{ childrenNames[child] }}
                </NuxtLink>
              </li>
            </ul>
          </td>
        </tr>

        <tr v-if="memberInfos.death">
          <th>Décès</th>
          <td>
            {{ dateToString(memberInfos.death) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  memberInfos: Object,
});

const spouseInfos = props.memberInfos.spouse
  ? await queryContent(props.memberInfos.spouse).findOne()
  : null;

const fatherInfos = props.memberInfos.father
  ? await queryContent(props.memberInfos.father).findOne()
  : null;

const motherInfos = props.memberInfos.mother
  ? await queryContent(props.memberInfos.mother).findOne()
  : null;

const childrenNames = {};

props.memberInfos.children.forEach(async (child) => {
  const childInfos = await queryContent(child).findOne();

  childrenNames[child] = childInfos.name;
});

const frenchDateConverter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
function dateToString(date) {
  return frenchDateConverter.format(new Date(date));
}

const now = new Date();
const birth = new Date(props.memberInfos.birth);

const monthDiff = now.getMonth() - birth.getMonth;
const age =
  now.getFullYear() -
  birth.getFullYear() -
  (monthDiff < 0 ? 1 : monthDiff > 0 ? 0 : now.getDate() - birth.getDate() < 0);
</script>

<style scoped>
th,
td {
  text-align: left;
  padding-bottom: 1rem;
}

a {
  color: blue;
  text-decoration: underline;
}

ul {
  list-style: inside;
}

li {
  margin-bottom: 0.3rem;
}
</style>
