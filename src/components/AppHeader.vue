<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import SearchBar from "./SearchBar.vue";
import { useShowsStore } from "../store/shows";
import { useRouter, useRoute } from "vue-router";

const store = useShowsStore();
const router = useRouter();
const route = useRoute();

const onSearch = (query: string) => {
  store.searchShows(query);

  if (route.name !== 'dashboard') {
    router.push({ name: 'dashboard' })
  }
};
</script>

<template>
  <Toolbar class="app-header">
    <template #start>
      <router-link :to="{ name: 'dashboard' }" class="app-header__logo">
        <div class="app-header__logo-icon">
          <i class="pi pi-video" />
        </div>
        <span class="app-header__logo-text">TV <strong>Dashboard</strong></span>
      </router-link>
    </template>
    <template #center>
      <SearchBar @search="onSearch" />
    </template>
  </Toolbar>
</template>

<style scoped>
.app-header {
  background: #0f0f0f;
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
  background: #019c44;
  color: #ffffff;
  font-size: 0.9rem;
}

.app-header__logo-text {
  font-size: 1.1rem;
  color: #ffffff;
  letter-spacing: 0.02em;
  font-weight: 300;
}

.app-header__logo-text strong {
  font-weight: 700;
}

.app-header__logo:hover .app-header__logo-icon {
  background: #019c44cc;
  transition: background 0.2s ease;
}
</style>
