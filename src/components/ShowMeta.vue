<script setup lang="ts">
import type { Show } from "../types/show";
import { getYear } from "../utils/date";

defineProps<{
  show: Show;
}>();
</script>

<template>
  <div class="show-meta">
    <span v-if="show.premiered" class="show-meta__item">
      {{ getYear(show.premiered) }}
    </span>
    <span v-if="show.runtime" class="show-meta__item">
      {{ show.runtime }} min
    </span>
    <span v-if="show.language" class="show-meta__item">
      {{ show.language }}
    </span>
  </div>
</template>

<style scoped>
.show-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.show-meta__item:not(:last-child)::after {
  content: "•";
  margin-left: 0.5rem;
}
</style>
