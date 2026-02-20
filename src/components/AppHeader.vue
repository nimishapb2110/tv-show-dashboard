<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import SearchBar from "./SearchBar.vue";
</script>

<template>
  <Toolbar class="app-header">
    <template #start>
      <router-link :to="{ name: 'dashboard' }" class="app-header__logo">
        <i class="pi pi-video" />
        <span>TV Dashboard</span>
      </router-link>
    </template>
    <template #center>
      <SearchBar></SearchBar>
    </template>
  </Toolbar>
</template>
