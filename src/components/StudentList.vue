<script setup lang="ts">
import type { PropType } from 'vue';
import type student from '../Types/student';
import StudentItem from './StudentItem.vue';
const props = defineProps({
  students: { type: Array as PropType<student[]>, required: true },
});
</script>

<template>
  <div class="student-list">
    <div v-for="student in props.students" :key="student.id">
      <StudentItem :student="student" />
      <hr />
    </div>
  </div>
</template>

<style scoped>
.student-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
hr {
  border: 1px solid var(--vt-c-gray);
  margin: 0;
}
</style>
