<script lang="ts" setup>
import { ref, computed, inject } from 'vue';
import { useSearchStore } from '../stores/search';
import StudentList from './StudentList.vue';
import SearchName from './SearchName.vue';
import { storeToRefs } from 'pinia';
import SearchTags from './searchTags.vue';
import type student from '../Types/student';
import type tag from '../Types/tag';

const students = ref<student[]>([]);
const { getName, getTag } = storeToRefs(useSearchStore());
const emitter: any = inject('emitter');

const getStudents = async () => {
  const res = await fetch('https://api.hatchways.io/assessment/students');
  return res.json();
};

const Init = async () => {
  const data = await getStudents();
  console.log(data.students[0]);
  students.value.push(...data.students);
  students.value.forEach((student) => {
    student.tags = [];
  });
};

const filterStudentsByNames = computed(() => {
  if (!getName.value || getName.value === '') {
    return [];
  }
  return students.value.filter((student) => {
    const fullname = `${student.firstName} ${student.lastName}`;
    return (
      student.firstName.toLowerCase().includes(getName.value.toLowerCase()) ||
      student.lastName.toLowerCase().includes(getName.value.toLowerCase()) ||
      fullname.toLowerCase().includes(getName.value.toLowerCase())
    );
  });
});

const filterStudentsByTags = computed(() => {
  if (!getTag.value || getTag.value === '') {
    return [];
  }
  return students.value.filter((student) => {
    return student.tags.some((tag) => {
      return tag.toLowerCase().includes(getTag.value.toLowerCase());
    });
  });
});
const filterStudents = computed(() => {
  if (getName.value && getTag.value) {
    return filterStudentsByNames.value.filter((student) => {
      return filterStudentsByTags.value.includes(student);
    });
  } else if (getName.value) {
    return filterStudentsByNames.value;
  } else if (getTag.value) {
    return filterStudentsByTags.value;
  } else {
    return [];
  }
  
});
const isSearching = computed(() => {
  return getName.value || getTag.value;
});

// init component
Init();

emitter.on('onNewTag', (newTag: tag) => {
  students.value.map((student) => {
    if (student.id === newTag.id) {
      student.tags = [...student.tags, newTag.name];
    }
  });
});
</script>

<template>
  <div class="main-classroom">
    <div class="filter-container"><SearchName /> <SearchTags /></div>
    <div class="students-container">
      <StudentList :students="filterStudents" v-if="isSearching" />
      <StudentList :students="students" v-else />
    </div>
  </div>
</template>

<style scoped>

.main-classroom {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 800px;
  background: var(--vt-c-white);
  overflow: hidden;
  border-radius: 12px;
}
.students-container {
  flex: 1;
  overflow: auto;
}
.filter-container {
  width: 100%;
}


/* phone screens */
@media screen and (max-width: 640px) {
  .main-classroom {
    height: auto;
    border-radius: 0;
  }
  .students-container {
    /* flex: 1; */
    overflow: auto;
  }
}
</style>
