<template>
  <div class="not-found">
    <h1>404 - Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link :to="{ name: 'dashboard' }">Go back to Dashboard</router-link>
  </div>
</template>
