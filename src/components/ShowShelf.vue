<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Show } from "../types/show";
import ShowCard from "./ShowCard.vue";
import Button from "primevue/button";

defineProps<{
  title: string;
  groupedShows: Show[];
}>();

const rowRef = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

const updateScrollState = () => {
  if (!rowRef.value) return;

  const { scrollLeft, scrollWidth, clientWidth } = rowRef.value;

  canScrollLeft.value = scrollLeft > 0;
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth;
};

const scrollLeft = () => {
  rowRef.value?.scrollBy({ left: -400, behavior: "smooth" });
};

const scrollRight = () => {
  rowRef.value?.scrollBy({ left: 400, behavior: "smooth" });
};

onMounted(() => {
  rowRef.value?.addEventListener("scroll", updateScrollState);
  updateScrollState();
});

onUnmounted(() => {
  rowRef.value?.removeEventListener("scroll", updateScrollState);
});
</script>

<template>
  <div class="show-shelf">
    <h2 class="show-shelf__title">{{ title }}</h2>

    <div class="show-shelf__wrapper">
      <template v-if="!groupedShows.length">
        <p class="show-shelf__empty-message">No shows available!</p>
      </template>
      <template v-else>
        <div class="show-shelf__nav show-shelf__nav--left" v-show="canScrollLeft">
          <Button icon="pi pi-chevron-left" text @click="scrollLeft" />
        </div>
        <div class="show-shelf__list" ref="rowRef">
          <ShowCard v-for="show in groupedShows" :key="show.id" :show="show" />
        </div>
        <div class="show-shelf__nav show-shelf__nav--right" v-show="canScrollRight">
          <Button icon="pi pi-chevron-right" text @click="scrollRight" />
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
  border-radius: 0.5rem;
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
  border: 0.05px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
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
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  height: var(--card-height);
}

:deep(.p-card:hover) {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}
</style>
