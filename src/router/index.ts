import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/:pathMatch(.*)*", // 通配符，匹配所有未定义的路径
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"), // 404组件
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 从Pinia获取token
  const authStore = useAuthStore();
  const token = authStore.token;
  if (to.meta.requiresAuth && !token) {
    next("/login");
    return;
  }
  next();
});

export default router;
