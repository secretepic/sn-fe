import { defineStore } from "pinia";

// 定义认证存储
export const useAuthStore = defineStore("auth", {
  state: () => ({
    // 存储token
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    // 设置token
    setToken(newToken: string | null) {
      this.token = newToken;
      // 同步到localStorage，实现刷新页面后状态保留
      if (newToken) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
      }
    },
    // 清除token（退出登录）
    logout() {
      this.setToken(null);
    },
  },
});
