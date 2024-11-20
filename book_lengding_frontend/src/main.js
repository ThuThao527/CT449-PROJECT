import { createApp } from "vue";
import App from "./App.vue";
import BootstrapVue3 from 'bootstrap-vue-3';

// Import Bootstrap và Bootstrap-Vue-3 CSS/JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import "@fortawesome/fontawesome-free/css/all.min.css"; // Nếu bạn muốn sử dụng Font Awesome

// Import Vuex Store và Router
import store from "./store";
import router from './router';

const app = createApp(App);
app.use(BootstrapVue3);
app.use(store); // Tích hợp Vuex vào Vue application
app.use(router);
app.mount("#app");
