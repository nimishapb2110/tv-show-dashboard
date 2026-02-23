<script setup lang="ts">
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import Button from "primevue/button";
import { ref } from "vue";
import useDebounce from "../composables/useDebounce";

const emit = defineEmits<{ search: [query: string] }>();

const searchQuery = ref("");

const debouncedSearch = useDebounce((query: string) => {
  emit("search", query);
}, 300);

const onInput = () => {
  debouncedSearch(searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = "";
  emit("search", "");
};

defineExpose({
  clearSearch
});
</script>

<template>
  <div class="search-bar">
    <IconField>
      <InputIcon>
        <i class="pi pi-search" />
      </InputIcon>
      <InputText
        v-model="searchQuery"
        placeholder="Search"
        class="search-bar__input"
        @input="onInput"
      />
    </IconField>
    <div v-if="searchQuery" class="search-bar__clear" @click="clearSearch">
      <Button icon="pi pi-times" rounded text severity="secondary" />
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
}

:deep(.p-iconfield) {
  width: 100%;
}

.search-bar__input {
  width: 100%;
  padding-right: 2.5rem;
}

.search-bar__clear {
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
}
</style>
