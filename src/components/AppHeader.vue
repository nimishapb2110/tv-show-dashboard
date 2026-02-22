<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import SearchBar from "./SearchBar.vue";
import { useShowsStore } from "../store/shows";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

const store = useShowsStore();
const router = useRouter();
const route = useRoute();

const searchBarRef = ref<InstanceType<typeof SearchBar> | null>(null)

const onSearch = (query: string) => {
  store.searchShows(query);

  if (route.name !== 'dashboard') {
    router.push({ name: 'dashboard' })
  }
};

const onLogoClick = () => {
  store.clearSearch();
  searchBarRef.value?.clearSearch();
};

</script>

<template>
  <Toolbar class="app-header">
    <template #start>
      <router-link :to="{ name: 'dashboard' }" class="app-header__logo" @click="onLogoClick">
        <div class="app-header__logo-icon">
          <i class="pi pi-video" />
        </div>
        <span class="app-header__logo-text">TV <strong>Dashboard</strong></span>
      </router-link>
    </template>
    <template #center>
      <SearchBar ref="searchBarRef" @search="onSearch" />
    </template>
  </Toolbar>
</template>

<style scoped>
.app-header {
  border: none;
  padding: 0.75rem 1.5rem;
}

.app-header__logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
}

.app-header__logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 0.9rem;
}

.app-header__logo-text {
  font-size: 1.1rem;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
  font-weight: 300;
}

.app-header__logo-text strong {
  font-weight: 700;
}

.app-header__logo:hover .app-header__logo-icon {
  filter: brightness(1.2);
  transition: filter 0.2s ease;
}

:deep(.p-toolbar-center) {
  width: calc(100% - 500px);
}

@media screen and (max-width: 768px) {
  :deep(.p-toolbar-center) {
    width: calc(100% - 150px);
  }
}
</style>
