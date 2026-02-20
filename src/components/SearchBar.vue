<script setup lang="ts">
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { ref } from "vue";

const searchQuery = ref("");
</script>

<template>
  <IconField>
    <InputIcon>
      <i class="pi pi-search" />
    </InputIcon>
    <InputText
      placeholder="Search"
      v-model="searchQuery"
      class="search-input"
    />
  </IconField>
</template>
