import "./assets/main.css";
import router from "./router/router";
import toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueLazyload from "vue3-lazy";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { createApp } from "vue";
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
import App from "./App.vue";
const app = createApp(App);
app.use(router);
app.use(toast);
app.use(pinia);
app.use(VueLazyload, {
  preload: 1.3,
  loading: "/images/spinner.svg",
  attempt: 1,
});

app.mount("#app");
