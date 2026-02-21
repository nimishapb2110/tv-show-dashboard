<script setup lang="ts">
import type { Show } from "../types/show";
import Card from "primevue/card";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  show: Show;
}>();

const handleCardClick = () => {
  router.push({ name: "showDetails", params: { id: props.show.id } });
};
</script>

<template>
  <Card @click="handleCardClick">
    <template #header>
      <img v-if="props.show.image" alt="show header" :src="props.show.image.medium" />
    </template>
    <template #title>{{ props.show.name }}</template>
    <template #subtitle>{{ props.show.genres.join(", ") }}</template>
    <template #content>
      <p class="m-0" v-html="props.show.language"></p>
    </template>
  </Card>
</template>

<style scoped>
:deep(.p-card-header) img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {

  :deep(.p-card-title),
  :deep(.p-card-subtitle),
  :deep(.p-card-content),
  :deep(.p-card-body) {
    display: none;
  }
}
</style>
