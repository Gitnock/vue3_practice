<script setup lang="ts">
import { useSearchStore } from '../stores/search';

const searchStore = useSearchStore();
</script>

<template>
  <div class="search">
    <input
      v-model="searchStore.name"
      type="text"
      placeholder="Search by name"
    />
  </div>
</template>

<style scoped>
@import '../assets/search.css';
</style>
