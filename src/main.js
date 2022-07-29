import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

createApp(App).use(router).use(VueAxios, axios).use(createVuestic()).mount("#app");
