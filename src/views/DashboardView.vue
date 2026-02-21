<script setup lang="ts">
import { onMounted } from "vue";
import ShowShelf from "../components/ShowShelf.vue";
import { useShowsStore } from "../store/shows";

const store = useShowsStore();

onMounted(() => {
  store.fetchShows();
});
</script>

<template>
  <div class="dashboard">
    <div v-if="store.isLoading">Loading...</div>
    <div v-else-if="store.error">
      {{ store.error }}
    </div>
    <template v-else>
      <ShowShelf v-if="store.isSearchMode" title="Search Results" :groupedShows="store.searchResults" />
      <ShowShelf v-else v-for="genre in store.genres" :key="genre" :title="genre"
        :groupedShows="store.showsByGenre[genre] || []" />
    </template>
  </div>
</template>

<style scoped>
.dashboard {
  padding: var(--dashboard-padding);
  box-sizing: border-box;
}
</style>
