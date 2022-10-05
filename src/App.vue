<script setup lang="ts">
import Classroom from './components/Classroom.vue';
</script>

<template>
  <main class="main">
    <Classroom />
  </main>
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

/* phone screens */
@media screen and (max-width: 640px) {
  #app {
    padding: 0;
  }
}
</style>
