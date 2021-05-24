import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Inbox from "../views/Inbox.vue";
import Signup from "../views/Signup.vue";
import Conversation from "../views/Conversation.vue";
import NewChat from "../views/NewChat.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "Login" },
  },
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
    path: "/t",
    name: "Inbox",
    component: Inbox,
    children: [
      {
        name: "Chat",
        path: ":id",
        component: Conversation,
      },
      {
        name: "NewChat",
        path: "new",
        component: NewChat,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
