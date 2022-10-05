<script setup lang="ts">
import { ref, inject } from 'vue';
import type { PropType } from 'vue';
import type student from '@/Types/student';
import type tag from '@/Types/tag';

const isExpanded = ref(false);
const props = defineProps({
  student: { type: Object as PropType<student>, required: true },
});
const emitter: any = inject('emitter');
const newTag = ref('');

const toNumber = (arr: string[]) => {
  return Array.from(arr, Number);
};
const avgGrade = (grades: string[]) => {
  let sum = 0;
  const numGrades = toNumber(grades);
  numGrades.forEach((grade) => {
    sum += grade;
  });

  return (sum / grades.length).toFixed(2);
};
//send tags to parent component
const sendTag = (tag: string, id: number) => {
  const tagObj: tag = {
    name: tag,
    id: id,
  };
  emitter.emit('onNewTag', tagObj);
  newTag.value = '';
};
</script>

<template>
  <div class="student-container">
    <div class="avater-container">
      <div class="avater-wrapper">
        <img
          class="avater-img"
          :src="props.student.pic"
          alt="student profile image"
        />
      </div>
    </div>
    <div class="info-container">
      <h1 class="student-name">
        {{ `${props.student.firstName.toUpperCase()} ${props.student.lastName.toUpperCase()}` }}
      </h1>
      <div class="student-info-details">
        <p>{{ `Email: ${props.student.email} ` }}</p>
        <p>{{ `Skill: ${props.student.company} ` }}</p>
        <p>{{ `Grade: ${avgGrade(props.student.grades)}% ` }}</p>
        <div class="tags-container">
          <p class="tag" v-for="tag in props.student.tags">{{ tag }}</p>
        </div>
        <div class="grades-container" v-if="isExpanded">
          <p v-for="(grad, pos) in props.student.grades" :key="pos">
            {{ grad }}
          </p>
        </div>
        <div class="tag-input-container">
          <input
            type="text"
            v-model="newTag"
            placeholder="Add a tag"
            @keyup.enter="sendTag(newTag, props.student.id)"
          />
        </div>
      </div>
    </div>
    <div class="expand-container">
      <button
        class="expand-btn"
        @click="isExpanded = !isExpanded"
        aria-label="button that expandes a list of grades"
      >
        <i
          alt="plus icon"
          class="expand-tx bx bx-plus"
          v-show="!isExpanded"
          aria-hidden="true"
        />
        <i
          alt="minus icon"
          class="expand-tx bx bx-minus"
          v-show="isExpanded"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/search.css';

.student-container {
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
  position: relative;
}

/* avatar*/
.avater-container {
  padding: 32px;
}
.avater-wrapper {
  width: 142px;
  height: 142px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  border: 2px solid var(--vt-c-gray);
  display: flex;
  justify-content: center;
}

.avater-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* tags */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 4px;
  margin-top: 12px;
}
.tag {
  background: var(--vt-c-gray);
  color: var(--vt-c-black);
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
}

/* grades */
.grades-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
}
/* info */
.info-container{
  width: 420px;
}
.student-info-details {
  padding: 0 12px;
}
.student-name{
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 12px;
   color: var(--color-heading);
}

/* expand */
.expand-container {
  position: absolute;
  top: 0;
  right: 12px;
  z-index: 7;
}
.expand-btn {
  background: transparent;
  border: none;
}
.expand-tx {
  font-size: 42px;
  color: var(--vt-c-gray-dark);
}
.expand-tx:hover {
  color: var(--color-border-hover);
}

/* phone screens */
@media screen and (max-width: 640px) {
  .student-container {
    justify-content: center;
  }
}
</style>
