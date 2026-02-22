<script setup lang="ts">
import type { Show } from "../types/show";
import Card from "primevue/card";
import { useRouter } from "vue-router";
import RatingBadge from "./RatingBadge.vue";

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
      <div class="show-card__poster">
        <img v-if="props.show.image" alt="show header" :src="props.show.image.medium" />
        <div v-else class="show-card__placeholder">
          <i class="pi pi-video" />
          <span>No Image</span>
        </div>
      </div>
    </template>
    <template #title>{{ props.show.name }}</template>
    <template #subtitle>
      <RatingBadge :rating="props.show.rating.average" />
    </template>
  </Card>
</template>

<style scoped>
.show-card__genres {
  display: flex;
  gap: 0.25rem;
}

.show-card__placeholder {
  width: 100%;
  height: var(--card-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.show-card__placeholder .pi {
  font-size: 2rem;
}

:deep(.p-card-header) img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

:deep(.p-card-header) {
  border-radius: inherit;
  overflow: hidden;
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

  :deep(.p-card-title),
  :deep(.p-card-subtitle),
  :deep(.p-card-content),
  :deep(.p-card-body) {
    display: none;
  }
}
</style>
