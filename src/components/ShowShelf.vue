<script setup lang="ts">
import type { Show } from "../types/show";
import ShowCard from "./ShowCard.vue";
import Button from "primevue/button";
import useHorizontalScroll from "../composables/useHorizontalScroll";
import { useTemplateRef } from "vue";

defineProps<{
  title: string;
  groupedShows: Show[];
}>();

const rowRef = useTemplateRef<HTMLElement>("rowRef");

const { canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
  useHorizontalScroll(rowRef);
</script>

<template>
  <div class="show-shelf">
    <h2 class="show-shelf__title">{{ title }}</h2>

    <div class="show-shelf__wrapper">
      <template v-if="!groupedShows.length">
        <p class="show-shelf__empty-message">No shows available!</p>
      </template>
      <template v-else>
        <div
          class="show-shelf__nav show-shelf__nav--left"
          v-show="canScrollLeft"
        >
          <Button
            icon="pi pi-chevron-left"
            text
            @click="scrollLeft"
            aria-label="Scroll left"
          />
        </div>
        <div class="show-shelf__list" ref="rowRef">
          <ShowCard
            v-for="(show, index) in groupedShows"
            :key="show.id"
            :show="show"
            :index="index"
          />
        </div>
        <div
          class="show-shelf__nav show-shelf__nav--right"
          v-show="canScrollRight"
        >
          <Button
            icon="pi pi-chevron-right"
            text
            @click="scrollRight"
            aria-label="Scroll right"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.show-shelf {
  width: 100%;
  padding: var(--shelf-item-padding);
}

.show-shelf__title {
  margin: 0 0 1rem 0;
  text-align: left;
  padding: 0 var(--shelf-item-padding);
}

.show-shelf__title::before {
  content: "";
  display: inline-block;
  width: 0.25rem;
  height: 1.75rem;
  background-color: var(--color-primary);
  margin-right: 0.5rem;
  vertical-align: middle;
  border-radius: var(--radius-md);
}

.show-shelf__wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-y: visible;
  padding: 0 var(--shelf-item-padding);
}

.show-shelf__list {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.show-shelf__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(0, 0, 0, 0.5) !important;
  flex-shrink: 0;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border-subtle);
  border-radius: var(--radius-sm);
}

.show-shelf__nav--left {
  left: 0.5rem;
}

.show-shelf__nav--right {
  right: 0.5rem;
}

:deep(.p-card) {
  flex-shrink: 0;
  width: var(--card-width);
  height: var(--card-height);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

:deep(.p-card:hover) {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}
</style>
