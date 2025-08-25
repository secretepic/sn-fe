<script setup lang="ts">
// 定义按钮ARIA标签，提升可访问性
const backButtonLabel = "返回网站首页";
</script>

<template>
  <div class="not-found-container">
    <!-- 背景装饰元素 -->
    <div class="bg-decoration"></div>

    <div class="content-wrapper">
      <!-- 404数字动画 -->
      <div class="error-code">
        <span class="digit" :style="{ animationDelay: '0ms' }">4</span>
        <span class="zero">
          <span class="hole"></span>
        </span>
        <span class="digit" :style="{ animationDelay: '300ms' }">4</span>
      </div>

      <!-- 错误信息 -->
      <h1 class="title">页面未找到</h1>
      <p class="subtitle">抱歉，您访问的页面不存在或已被移动</p>

      <!-- 返回按钮 -->
      <button
        class="back-button"
        @click="$router.push('/')"
        :aria-label="backButtonLabel"
      >
        <i class="icon-arrow-left"></i>
        返回首页
      </button>
    </div>

    <!-- 装饰性元素 -->
    <div class="decor-element element-1"></div>
    <div class="decor-element element-2"></div>
    <div class="decor-element element-3"></div>
  </div>
</template>

<style scoped>
.not-found-container {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
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

.content-wrapper {
  text-align: center;
  position: relative;
  z-index: 1;
  max-width: 600px;
  width: 100%;
}

.error-code {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  height: 160px;
}

.digit {
  font-size: 120px;
  font-weight: 800;
  color: #1e40af;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s forwards cubic-bezier(0.215, 0.61, 0.355, 1);
}

.zero {
  width: 100px;
  height: 100px;
  border: 16px solid #1e40af;
  border-radius: 50%;
  position: relative;
  opacity: 0;
  transform: scale(0.8) translateY(30px);
  animation: fadeInUp 0.8s 150ms forwards cubic-bezier(0.215, 0.61, 0.355, 1);
}

.hole {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  background-color: #f8fafc;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 1rem 0;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s 300ms forwards cubic-bezier(0.215, 0.61, 0.355, 1);
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s 450ms forwards cubic-bezier(0.215, 0.61, 0.355, 1);
  max-width: 450px;
  margin: 0 auto 2.5rem;
}

.back-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.85rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s 600ms forwards cubic-bezier(0.215, 0.61, 0.355, 1);
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1),
    0 2px 4px -1px rgba(59, 130, 246, 0.06);
}

.back-button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1),
    0 4px 6px -2px rgba(59, 130, 246, 0.05);
}

.back-button:active {
  transform: translateY(0);
}

.icon-arrow-left {
  width: 18px;
  height: 18px;
  position: relative;
}

.icon-arrow-left::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  left: 0;
  top: 50%;
}

.icon-arrow-left::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-left: 2px solid currentColor;
  border-top: 2px solid currentColor;
  left: 0;
  top: 65%;
  transform: translateY(-70%) rotate(-45deg);
}

.decor-element {
  position: absolute;
  background-color: rgba(59, 130, 246, 0.05);
  border-radius: 8px;
  z-index: 0;
}

.element-1 {
  width: 120px;
  height: 120px;
  bottom: 10%;
  left: 10%;
  animation: float 6s linear infinite;
}

.element-2 {
  width: 80px;
  height: 80px;
  top: 30%;
  left: 8%;
  animation: float 7s linear 1s infinite;
}

.element-3 {
  width: 150px;
  height: 150px;
  bottom: 5%;
  right: 15%;
  animation: float 8s linear 2s infinite;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(0px) rotate(180deg);
  }
  100% {
    transform: translateY(0) rotate(360deg);
  }
}


/* 响应式调整 */
@media (max-width: 768px) {
  .error-code {
    height: 120px;
  }

  .digit {
    font-size: 90px;
  }

  .zero {
    width: 80px;
    height: 80px;
    border-width: 12px;
  }

  .hole {
    width: 30px;
    height: 30px;
  }

  .title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .error-code {
    height: 100px;
    gap: 0.25rem;
  }

  .digit {
    font-size: 70px;
  }

  .zero {
    width: 60px;
    height: 60px;
    border-width: 10px;
  }

  .title {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
