<script setup lang="ts">
import type { Show } from "../types/show";
import Card from "primevue/card";
import { useRouter } from "vue-router";
import RatingBadge from "./RatingBadge.vue";
import ShowPoster from "./ShowPoster.vue";

const router = useRouter();

const props = defineProps<{
  show: Show;
}>();

const handleCardClick = () => {
  router.push({ name: "showDetails", params: { id: props.show.id } });
};
</script>

<template>
  <Card
    @click="handleCardClick"
    :class="{ 'show-card--no-image': !show.image }"
  >
    <template #header>
      <ShowPoster :image="show.image?.original" :name="show.name"></ShowPoster>
    </template>
    <template #title>{{ show.name }}</template>
    <template #subtitle>
      <RatingBadge :rating="show.rating.average" />
    </template>
  </Card>
</template>

<style scoped>
:deep(.p-card-header) {
  display: flex;
  flex-direction: column;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  overflow: hidden;
  height: 100%;
}

:deep(.p-card-title) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.p-card-title:hover) {
  white-space: normal;
}

@media (max-width: 768px) {
  :not(.show-card--no-image) :deep(.p-card-header) {
    border-radius: inherit;
  }

  :not(.show-card--no-image) :deep(.p-card-title),
  :not(.show-card--no-image) :deep(.p-card-body),
  :deep(.p-card-subtitle) {
    display: none;
  }
}
</style>
