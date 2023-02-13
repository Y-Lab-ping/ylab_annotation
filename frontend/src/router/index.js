import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateAnnotation from "../views/CreateAnnotatin.vue";
import ShowAnnotation from "@/views/ShowAnnotation.vue";
import EditAnnotation from "@/views/EditAnnotation.vue";
const routes = [
  {
    path: "/",
    name: "home",
    // component: CreateAnnotation,
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: CreateAnnotation,
  },
  {
    path: "/show",
    name: "show",
    component: ShowAnnotation,
  },
  {
    path: "/edit/:annotation_id",
    name: "edit",
    component: EditAnnotation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
