<script setup lang="ts">
import { useSearchStore } from '../stores/search';

const searchStore = useSearchStore();
</script>

<template>
  <div class="search">
    <input
      v-model="searchStore.tag"
      type="text"
      placeholder="Search by tags"
    />
  </div>
</template>

<style scoped>
@import '../assets/search.css';
</style>
