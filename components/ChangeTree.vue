<template>
  <button
    class="fixed top-4 left-4 py-1 px-2 bg-neutral-200 hover:bg-neutral-300 rounded border border-black"
    @click="$emit('switchType')"
  >
    Switch tree type
  </button>
</template>
