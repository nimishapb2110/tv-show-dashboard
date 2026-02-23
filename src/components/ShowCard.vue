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
      <img
        v-if="show.image"
        alt="show header"
        :src="show.image.medium"
        loading="lazy"
      />
      <div v-else class="show-card__placeholder">
        <i class="pi pi-video" />
        <span>No Image</span>
      </div>
    </template>
    <template #title>{{ show.name }}</template>
    <template #subtitle>
      <RatingBadge :rating="show.rating.average" />
    </template>
  </Card>
</template>

<style scoped>
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

:deep(.p-card:hover) {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

:deep(.p-card-header) img {
  width: 100%;
  object-fit: cover;
  display: block;
}

:deep(.p-card-header) {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
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
  :deep(.p-card-header) {
    border-radius: inherit;
  }

  :deep(.p-card-title),
  :deep(.p-card-subtitle),
  :deep(.p-card-content),
  :deep(.p-card-body) {
    display: none;
  }
}
</style>
