import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { PrimeVue } from "@primevue/core";
import Aura from "@primevue/themes/aura";
import router from "./router";
import "primeicons/primeicons.css";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
  },
});

router.isReady().then(() => {
  app.mount("#app");
});
