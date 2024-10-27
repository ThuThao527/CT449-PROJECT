import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import store from "./store";
import router from './router';

const app = createApp(App);
app.use(store); // Tích hợp Vuex vào Vue application
app.use(router)
app.mount("#app");
