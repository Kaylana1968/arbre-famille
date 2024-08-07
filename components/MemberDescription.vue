<template>
  <div id="infos">
    <div class="image-container">
      <img
        :src="memberInfos.image"
        :alt="memberInfos.name"
        height="200"
        width="200"
      />
    </div>

    <h1>{{ memberInfos.name }}</h1>

    <table>
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
            {{ dateToString(memberInfos.birth) }}
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
</script>

<style scoped>
#infos {
  width: 40%;
  border-left: 1px solid lightgray;
  padding-left: 1rem;
}

.image-container {
  text-align: center;
}

table {
  width: 100%;
}

th,
td {
  text-align: left;
  padding-bottom: 0.5rem;
}

ul {
  padding-left: 0;
}

li {
  margin-bottom: 0.5rem;
}
</style>
