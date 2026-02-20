<template>
  <div class="show-shelf">
    <h2 class="show-shelf__title">{{ title }}</h2>
    <div class="show-shelf__list">
      <ShowCard v-for="show in groupedShows" :key="show.id" :show="show" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Show } from "../types/show";
import ShowCard from "./ShowCard.vue";

defineProps<{
  title: string;
  groupedShows: Show[];
}>();
</script>

<style scoped>
.show-shelf {
  width: 100%;
  padding: 1rem;
}

.show-shelf__title {
  margin: 0 0 1rem 0;
  text-align: left;
}

.show-shelf__list {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

:deep(.p-card) {
  flex-shrink: 0;
  min-width: 25rem;
  height: 100%;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

:deep(.p-card:hover) {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
