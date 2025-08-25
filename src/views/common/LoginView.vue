<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// 表单状态
const username = ref("");
const password = ref("");
const rememberMe = ref(true);
const showPassword = ref(false);
const isLoading = ref(false);

// 错误信息
const usernameError = ref("");
const passwordError = ref("");

// 路由和状态管理
const router = useRouter();
const authStore = useAuthStore();

// 清除错误信息
const clearError = (field: "username" | "password") => {
  if (field === "username") usernameError.value = "";
  if (field === "password") passwordError.value = "";
};

// 表单验证
const validateForm = (): boolean => {
  let isValid = true;

  if (!username.value.trim()) {
    usernameError.value = "请输入用户名";
    isValid = false;
  }

  if (!password.value) {
    passwordError.value = "请输入密码";
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = "密码长度不能少于6位";
    isValid = false;
  }

  return isValid;
};

// 处理登录
const handleLogin = async () => {
  // 表单验证
  if (!validateForm()) return;

  try {
    isLoading.value = true;

    // 模拟登录API请求
    const response = await new Promise<{ token: string }>((resolve) => {
      setTimeout(() => {
        resolve({ token: "mock-jwt-token-123456" });
      }, 1500);
    });

    // 存储token
    authStore.setToken(response.token);

    // 跳转到首页或之前的页面
    const redirectPath = localStorage.getItem("redirectPath") || "/";
    localStorage.removeItem("redirectPath");
    router.push(redirectPath);
  } catch (error) {
    console.error("登录失败:", error);
    passwordError.value = "用户名或密码错误，请重试";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <!-- 背景装饰 -->
    <div class="bg-decoration"></div>

    <div class="login-card">
      <!-- 登录卡片标题区域 -->
      <div class="login-header">
        <h1 class="login-title">欢迎回来</h1>
        <p class="login-subtitle">请登录您的账号继续访问</p>
      </div>

      <!-- 登录表单 -->
      <form class="login-form" @submit.prevent="handleLogin">
        <!-- 用户名输入 -->
        <div class="form-group" :class="{ 'has-error': usernameError }">
          <div class="input-wrapper">
            <i class="icon-user"></i>
            <input
              type="text"
              id="username"
              v-model="username"
              @input="clearError('username')"
              placeholder="请输入用户名"
              class="form-input"
              :aria-invalid="usernameError ? 'true' : 'false'"
              :aria-describedby="usernameError ? 'username-error' : undefined"
              required
            />
          </div>
          <p v-if="usernameError" id="username-error" class="error-message">
            {{ usernameError }}
          </p>
        </div>

        <!-- 密码输入 -->
        <div class="form-group" :class="{ 'has-error': passwordError }">
          <div class="input-wrapper">
            <i class="icon-lock"></i>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              @input="clearError('password')"
              placeholder="请输入密码"
              class="form-input"
              :aria-invalid="passwordError ? 'true' : 'false'"
              :aria-describedby="passwordError ? 'password-error' : undefined"
              required
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? '隐藏密码' : '显示密码'"
            >
              <i
                class="icon-eye"
                :class="{ 'icon-eye-slash': showPassword }"
              ></i>
            </button>
          </div>
          <p v-if="passwordError" id="password-error" class="error-message">
            {{ passwordError }}
          </p>
        </div>

        <!-- 记住密码和忘记密码 -->
        <div class="form-actions">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" class="checkbox" />
            <span class="checkbox-label">记住我</span>
          </label>
          <a href="#" class="forgot-password">忘记密码?</a>
        </div>

        <!-- 登录按钮 -->
        <button
          type="submit"
          class="login-button"
          :disabled="isLoading"
          :aria-busy="isLoading"
        >
          <span v-if="!isLoading">登录</span>
          <span v-else class="loading-spinner"></span>
        </button>

        <!-- 注册链接 -->
        <p class="register-prompt">
          还没有账号? <a href="#" class="register-link">立即注册</a>
        </p>
      </form>
    </div>

    <!-- 装饰元素 -->
    <div class="decor-element element-1"></div>
    <div class="decor-element element-2"></div>
    <div class="decor-element element-3"></div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #f8fafc;
  overflow: hidden;
}

.bg-decoration {
  position: absolute;
  top: -20%;
  right: -10%;
  width: 60%;
  height: 60%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.1) 0%,
    transparent 70%
  );
  border-radius: 50%;
  z-index: 0;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05),
    0 8px 10px -6px rgba(0, 0, 0, 0.02);
  padding: 2.5rem;
  position: relative;
  z-index: 1;
  transform: translateY(20px);
  opacity: 0;
  animation: fadeInUp 0.6s forwards 200ms;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
}

.login-subtitle {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.form-group.has-error .form-input {
  border-color: #ef4444;
  box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.2);
}


.input-wrapper {
  position: relative;
}

.form-input {
  width: 80%;
  padding: 1rem 1rem 1rem 2.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: white;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #94a3b8;
}

.icon-user,
.icon-lock {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  width: 1.25rem;
  height: 1.25rem;
}

.icon-user::before,
.icon-lock::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-user::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E");
}

.icon-lock::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'%3E%3C/path%3E%3C/svg%3E");
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.toggle-password:hover {
  color: #3b82f6;
}

.icon-eye,
.icon-eye-slash {
  margin-left: -60px;
  width: 100%;
  height: 100%;
  position: relative;
}

.icon-eye::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'%3E%3C/path%3E%3Ccircle cx='12' cy='12' r='3'%3E%3C/circle%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

.icon-eye-slash::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10.7 16.7a6 6 0 0 1-8-8 18 18 0 0 1 21.6 0'/%3E%3Cline x1='12' y1='9' x2='12' y2='13'/%3E%3Cline x1='15' y1='12' x2='9' y2='12'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

.error-message {
  font-size: 0.85rem;
  color: #ef4444;
  margin: 0;
  min-height: 1.2rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox {
  width: 1rem;
  height: 1rem;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  accent-color: #3b82f6;
  transition: all 0.2s ease;
}

.checkbox-label {
  font-size: 0.85rem;
  color: #64748b;
}

.forgot-password {
  font-size: 0.85rem;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-password:hover {
  color: #2563eb;
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1),
    0 2px 4px -1px rgba(59, 130, 246, 0.06);
}

.login-button:hover:not(:disabled) {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1),
    0 4px 6px -2px rgba(59, 130, 246, 0.05);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
  box-shadow: none;
}

.loading-spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

.register-prompt {
  text-align: center;
  font-size: 0.9rem;
  color: #64748b;
  margin: 1.5rem 0 0 0;
}

.register-link {
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.register-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

.decor-element {
  --rotation: 0deg;
  position: absolute;
  background-color: rgba(59, 130, 246, 0.05);
  border-radius: 8px;
  z-index: 0;
}

.element-1 {
  width: 180px;
  height: 180px;
  bottom: 5%;
  left: 5%;
  transform: rotate(-10deg);
}

.element-2 {
  width: 120px;
  height: 120px;
  top: 20%;
  left: 10%;
  transform: rotate(5deg);
}

.element-3 {
  width: 200px;
  height: 200px;
  bottom: 10%;
  right: 8%;
  transform: rotate(-5deg);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/*
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(var(--rotation, 0deg));
  }
  50% {
    transform: translateY(-15px) rotate(var(--rotation, 0deg));
  }
}*/

/* 响应式调整 */
@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
  }

  .login-title {
    font-size: 1.5rem;
  }
}
</style>
