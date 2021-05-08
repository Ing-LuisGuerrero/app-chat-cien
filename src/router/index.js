import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Inbox from "../views/Inbox.vue";
import Signup from "../views/Signup.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/t/:id",
    name: "Inbox",
    component: Inbox,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
