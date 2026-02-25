<script setup lang="ts">
defineProps<{
  name: string;
  image?: string | null;
  isLcp: boolean;
}>();
</script>

<template>
  <div class="show-poster">
    <img
      v-if="image"
      :src="image"
      :alt="`Poster for ${name}`"
      class="show-poster__image"
      :loading="isLcp ? 'eager' : 'lazy'"
      :fetchpriority="isLcp ? 'high' : undefined"
    />
    <div v-else class="show-poster__placeholder">
      <i class="pi pi-video" />
      <span>No Image</span>
    </div>
  </div>
</template>

<style scoped>
.show-poster {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.show-poster__image {
  width: 100%;
  height: 100%;
}

.show-poster__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  background-color: var(--color-muted);
}

@media (max-width: 768px) {
  .show-poster {
    height: 100%;
  }
  .show-poster__placeholder {
    height: var(--card-height);
  }
  .show-poster__image {
    max-width: 200px;
  }
}
</style>
