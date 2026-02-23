<script setup lang="ts">
import Button from "primevue/button";

defineProps<{
  message: string;
}>();

const emit = defineEmits<{ retry: [] }>();
</script>

<template>
  <div class="error-message">
    <i class="pi pi-exclamation-circle error-message__icon" />
    <span>{{ message }}</span>
    <Button label="Retry" @click="emit('retry')" />
  </div>
</template>

<style scoped>
.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem;
  text-align: center;
}

.error-message__icon {
  font-size: 3rem;
  color: var(--color-error);
}
</style>
