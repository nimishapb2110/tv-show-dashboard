<script setup lang="ts">
import type { Show } from "../types/show";
import Card from "primevue/card";
import RatingBadge from "./RatingBadge.vue";
import ShowPoster from "./ShowPoster.vue";

const props = defineProps<{
  show: Show;
  index: number;
}>();
</script>

<template>
  <router-link
    :to="{ name: 'showDetails', params: { id: show.id } }"
    class="show-card__link"
    :class="{ 'show-card--no-image': !show.image }"
  >
    <Card>
      <template #header>
        <ShowPoster
          :image="show.image?.medium"
          :name="show.name"
          :is-lcp="index === 0"
        ></ShowPoster>
      </template>
      <template #title>{{ show.name }}</template>
      <template #subtitle>
        <RatingBadge :rating="show.rating.average" />
      </template>
    </Card>
  </router-link>
</template>

<style scoped>
.show-card__link {
  text-decoration: none;
  color: inherit;
}

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
  .show-card__link:not(.show-card--no-image) :deep(.p-card-header) {
    border-radius: inherit;
  }

  .show-card__link:not(.show-card--no-image) :deep(.p-card-title),
  .show-card__link:not(.show-card--no-image) :deep(.p-card-body),
  :deep(.p-card-subtitle) {
    display: none;
  }
}
</style>
