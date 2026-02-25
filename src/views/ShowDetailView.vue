<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import Button from "primevue/button";
import Chip from "primevue/chip";
import Tag from "primevue/tag";
import { useShowsStore } from "../store/shows";
import { computed, onMounted } from "vue";
import RatingBadge from "../components/RatingBadge.vue";
import ErrorMessage from "../components/ErrorMessage.vue";
import ShowMeta from "../components/ShowMeta.vue";
import ShowPoster from "../components/ShowPoster.vue";

const router = useRouter();
const currentRoute = useRoute();
const store = useShowsStore();

const show = computed(() =>
  store.shows.find((s) => s.id === Number(currentRoute.params.id))
);

onMounted(async () => {
  await store.getShowById(Number(currentRoute.params.id));
});

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push({ name: "dashboard" });
  }
};
</script>

<template>
  <div class="show-detail">
    <Button
      icon="pi pi-arrow-left"
      label="Back"
      severity="secondary"
      @click="goBack"
      class="show-detail__back-button"
    />
    <div v-if="store.isLoading" class="show-detail__message">Loading...</div>
    <ErrorMessage
      v-else-if="store.error"
      :message="store.error"
      @retry="store.getShowById(Number(currentRoute.params.id))"
    />
    <div class="show-detail__wrapper" v-else-if="show">
      <ShowPoster :image="show.image?.original" :name="show.name" is-lcp />
      <div class="show-detail__info">
        <h1>{{ show.name }}</h1>
        <ShowMeta :show="show" />
        <Tag
          class="show-detail__status"
          v-if="show.status"
          :value="show.status"
          :severity="show.status === 'Running' ? 'success' : 'info'"
        />
        <Button
          class="show-detail__official-site-button"
          v-if="show.officialSite"
          label="Official Site"
          icon="pi pi-external-link"
          as="a"
          :href="show.officialSite"
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          text
        />
        <div class="show-detail__genres">
          <Chip v-for="genre in show.genres" :key="genre" :label="genre" />
        </div>
        <p v-html="show.summary" />
        <RatingBadge :rating="show.rating.average" />
      </div>
    </div>
    <div v-else class="show-detail__message">Show not found.</div>
  </div>
</template>

<style scoped>
.show-detail {
  padding: var(--dashboard-padding);
  margin: 0 auto;
}

.show-detail__status,
.show-detail__official-site-button {
  margin-bottom: 1rem;
}

.show-detail__back-button {
  margin-bottom: 1rem;
}

.show-detail__message {
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
  border-radius: var(--radius-md);
}

.show-detail__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: var(--card-height);
  border: var(--border-subtle);
}

.show-detail__genres {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .show-detail__wrapper {
    grid-template-columns: 1fr;
  }

  .show-detail__image {
    max-width: 200px;
  }
}
</style>
