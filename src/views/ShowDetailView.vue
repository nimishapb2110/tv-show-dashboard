<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "primevue/button";

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="show-detail">
    <Button
      icon="pi pi-arrow-left"
      label="Back"
      severity="secondary"
      @click="goBack"
      class="mb-4"
    />
    <p>Show Detail View</p>
  </div>
</template>

<style scoped>
.show-detail {
  padding: 2rem;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>
