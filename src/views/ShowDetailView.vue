<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import Button from "primevue/button";
import Chip from "primevue/chip";
import Tag from "primevue/tag";
import { useShowsStore } from "../store/shows";
import { computed, onMounted } from "vue";
import RatingBadge from "../components/RatingBadge.vue";

const router = useRouter();
const currentRoute = useRoute();
const store = useShowsStore();

const show = computed(() =>
  store.shows.find((s) => s.id === Number(currentRoute.params.id)),
);

onMounted(async () => {
  if (!show.value) {

    const id = Number(currentRoute.params.id);

    await store.getShowById(id);
  }
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="show-detail">
    <Button icon="pi pi-arrow-left" label="Back" severity="secondary" @click="goBack"
      class="show-detail__back-button" />
    <div v-if="store.isLoading" class="loading-message">Loading...</div>
    <div class="show-detail__wrapper" v-else-if="show">
      <div class="show-detail__image-wrapper">
        <img :src="show.image?.original" :alt="show.name" class="show-detail__image" />
      </div>
      <div class="show-detail__info">
        <h1>{{ show.name }}</h1>
        <div class="show-detail__meta">
          <span v-if="show.premiered" class="show-detail__meta-item">{{
            new Date(show.premiered).getFullYear()
            }}</span>
          <span v-if="show.runtime" class="show-detail__meta-item">{{ show.runtime }} min</span>
          <span v-if="show.language" class="show-detail__meta-item">
            {{ show.language }}
          </span>
          <Tag v-if="show.status" :value="show.status" :severity="show.status === 'Running' ? 'success' : 'info'" />
          <Button v-if="show.officialSite" label="Official Site" icon="pi pi-external-link" as="a"
            :href="show.officialSite" target="_blank" rel="noopener noreferrer" size="small" text />
        </div>
        <div class="show-detail__genres">
          <Chip v-for="genre in show.genres" :key="genre" :label="genre" />
        </div>

        <p v-html="show.summary" />
        <RatingBadge :rating="show.rating.average" />
      </div>
    </div>
    <div v-else class="loading-message">Show not found.</div>
  </div>
</template>

<style scoped>
.show-detail {
  padding: var(--dashboard-padding);
  width: calc(100% - var(--dashboard-padding) * 2);
  margin: 0 auto;
}

.show-detail__back-button {
  margin-bottom: 1rem;
}

.loading-message {
  text-align: center;
  padding: 2rem;
}

.show-detail__wrapper {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: var(--dashboard-padding);
  background-color: var(--card-background);
}

.show-detail__image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.show-detail__image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.show-detail__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.show-detail__meta-item:not(:last-child)::after {
  content: "•";
  margin-left: 0.75rem;
}

.show-detail__genres {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .show-detail__wrapper {
    grid-template-columns: 1fr;
  }

  .show-detail__wrapper>div:first-child {
    display: flex;
    justify-content: center;
  }

  .show-detail__image {
    max-width: 200px;
  }
}
</style>
