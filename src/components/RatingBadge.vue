<script setup lang="ts">
defineProps<{ rating: number | null }>();
</script>

<template>
  <div class="rating-badge" v-if="rating">
    <i class="pi pi-star-fill rating-badge__icon" />
    <span class="rating-badge__value">{{ rating }}</span>
  </div>
  <div class="rating-badge rating-badge__none" v-else>
    <i class="pi pi-star rating-badge__icon" />
    <span class="rating-badge__value">N/A</span>
  </div>
</template>

<style scoped>
.rating-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.rating-badge__icon {
  color: var(--color-rating);
  font-size: 0.65rem;
}
</style>
