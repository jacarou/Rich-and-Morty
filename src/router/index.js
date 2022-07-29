import { createRouter, createWebHistory } from "vue-router";
import Places from "../views/Places.vue";
import Episodes from "../views/Episodes.vue";
import Characters from "../views/Characters.vue";

const routes = [
  {
    path: "/",
    name: "characters",
    component: Characters,
  },
  {
    path: "/places",
    name: "places",
    component: Places,
  },
  {
    path: "/episodes",
    name: "episodes",
    component: Episodes,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
