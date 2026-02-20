<script setup lang="ts">
import type { Show } from "../types/show";
import Card from "primevue/card";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  show: Show;
}>();

const handleCardClick = () => {
  router.push({ name: "showDetails", params: { id: props.show.id } });
};
</script>

<template>
  <Card style="width: 25rem; overflow: hidden" @click="handleCardClick">
    <template #header>
      <img
        v-if="props.show.image"
        alt="show header"
        :src="props.show.image.medium"
      />
    </template>
    <template #title>{{ props.show.name }}</template>
    <template #subtitle>{{ props.show.genres.join(", ") }}</template>
    <template #content>
      <p class="m-0" v-html="props.show.officialSite"></p>
    </template>
  </Card>
</template>
