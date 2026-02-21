<script setup lang="ts">
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { ref } from "vue";
import useDebounce from "../composables/useDebounce";

const searchQuery = ref("");
const emit = defineEmits<{ search: [query: string] }>();

const debouncedSearch = useDebounce((query: string) => {
  emit("search", query);
}, 300);

const onInput = () => {
  debouncedSearch(searchQuery.value);
};
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
      @input="onInput"
    />
  </IconField>
</template>
