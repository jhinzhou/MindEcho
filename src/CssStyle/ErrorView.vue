<template>
  <div class="page">
    <div class="card">
      <h1 class="title">给最好看的你</h1>
      <p class="subtitle">会不定期更新的哦</p>
      <div class="couple-scene">
        <div class="path">
          <div class="person person-left person-sleeping">
            <div class="head"></div>
            <div class="body"></div>
            <div class="arm arm-right"></div>
            <div class="sleeping-indicator">
              <div class="zzz zzz-1">Z</div>
              <div class="zzz zzz-2">z</div>
              <div class="zzz zzz-3">z</div>
            </div>
          </div>
          <div class="car-wrapper">
            <div class="car" aria-hidden="true">
              <div class="car-body">
                <div class="car-top"></div>
                <div class="car-window"></div>
                <div class="driver-head"></div>
                <div class="wheel wheel-back"></div>
                <div class="wheel wheel-front"></div>
                <div class="light light-back"></div>
                <div class="light light-front"></div>
              </div>
            </div>
            <div class="person person-right person-outside hidden-person">
              <div class="head"></div>
              <div class="body"></div>
              <div class="arm arm-left"></div>
            </div>
          </div>
          <div class="sun-7am" v-if="showSun">
            <div class="sun-circle"></div>
            <div class="sun-rays"></div>
          </div>
          <div class="moon-fade" v-if="showSun">
            <div class="moon-circle"></div>
          </div>
          <div class="heart-kiss" v-if="showHeart">
            <div class="heart heart-1">💕</div>
            <div class="heart heart-2">💕</div>
            <div class="heart heart-3">💕</div>
          </div>
        </div>
      </div>
      <transition name="fade-slide">
        <div v-if="canSee" class="letter-block">
          <div class="letter">
            <p>亲爱的宝贝：</p>
            <p>抱歉，这么久才更新</p>
            <p>今天一直在处理本期自己的任务</p>
            <p>确保不能有问题</p>
            <p>所以一直在改代码</p>
            <p>刚刚项目管理的人又给我们培训飞书的使用</p>
            <p>所以一直忙到现在</p>
            <p>应该很快就可以下班了</p>
            <p>上次更新 2025.12.12 11:36</p>
            <p>本次更新 2025.12.12 18:30</p>
          </div>
          <div class="actions">
            <button class="pill-btn pill-positive" @click="handleForgive">
              原谅了 {{ forgiveCount > 0 ? "+" + forgiveCount : "" }}
            </button>
            <button class="pill-btn pill-neutral" @click="handleNotForgive">
              不原谅 {{ notForgiveCount > 0 ? "+" + notForgiveCount : "" }}
            </button>
            <button class="pill-btn pill-danger" @click="handleKillYou">
              打死我 {{ killYouCount > 0 ? "+" + killYouCount : "" }}
            </button>
            <button class="pill-btn pill-positive" @click="handleBehaviour">
              看表现 {{ behaviourCount > 0 ? "+" + behaviourCount : "" }}
            </button>
          </div>
        </div>
      </transition>
      
      <div class="rose-wrapper">
        <div class="rose">
          <div class="petal petal-1"></div>
          <div class="petal petal-2"></div>
          <div class="petal petal-3"></div>
          <div class="petal petal-4"></div>
          <div class="petal petal-5"></div>
          <div class="bud"></div>
          <div class="stem"></div>
          <div class="leaf leaf-left"></div>
          <div class="leaf leaf-right"></div>
          <div class="glow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import emailjs from "@emailjs/browser";

const password = ref("");
const canSee = ref(true);
const forgiveCount = ref(0);
const notForgiveCount = ref(0);
const killYouCount = ref(0);
const behaviourCount = ref(0);
const sending = ref(false);
const showHeart = ref(false);
const showSun = ref(false);

const emailConfig = {
  serviceId: "service_z1h5jyl",
  templateId: "template_lcejwjk",
  publicKey: "3Jv2DxNV-flHZaSQ6",
};

const sendEmail = async (action, extra = {}) => {
  try {
    sending.value = true;
    const now = new Date();
    const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const basePayload = {
      action,
      password: password.value,
      to_email: "windbell520gxq@gmail.com",
      // EmailJS template fields
      title: action,
      name: "爱你的老婆",
      time,
      message: action,
      ...extra,
    };

    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      basePayload,
      emailConfig.publicKey
    );
  } catch (err) {
    console.error("邮件发送失败", err);
    alert("邮件发送失败，请稍后再试");
    throw err;
  } finally {
    sending.value = false;
  }
};

onMounted(async () => {
  await sendEmail("查看了汇报12.12.02");
  // 两个小人牵手时同时显示太阳和月亮（约4.3秒）
  setTimeout(() => {
    showSun.value = true;
  }, 4300);
  // 两个小人牵手后显示爱心（动画完成后约5.2秒）
  setTimeout(() => {
    showHeart.value = true;
  }, 5200);
});

const handleForgive = async () => {
  forgiveCount.value++;
  await sendEmail("原谅了");
};
const handleNotForgive = async () => {
  notForgiveCount.value++;
  await sendEmail("不原谅");
};
const handleKillYou = async () => {
  killYouCount.value++;
  await sendEmail("打死你");
};
const handleBehaviour = async () => {
  behaviourCount.value++;
  await sendEmail("看表现");
};
</script>

<style>
:root {
  --bg: #0f172a;
  --card: rgba(255, 255, 255, 0.08);
  --accent: #ff4d6d;
  --accent-2: #ff8fab;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --glow: rgba(255, 77, 109, 0.45);
}

.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 20% 20%, #1e293b, #0f172a 50%),
    radial-gradient(circle at 80% 10%, #111827, #0f172a 60%),
    linear-gradient(135deg, #0f172a, #111827);
  padding: 32px;
  box-sizing: border-box;
  font-family: "PingFang SC", "Helvetica Neue", Arial, sans-serif;
  color: var(--text);
}

.card {
  width: min(780px, 92vw);
  padding: 32px;
  border-radius: 24px;
  background: var(--card);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.02);
  position: relative;
  overflow: hidden;
}

.card::before,
.card::after {
  content: "";
  position: absolute;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, var(--glow), transparent 60%);
  filter: blur(10px);
  z-index: 0;
}

.card::before {
  top: -50px;
  right: -30px;
}

.card::after {
  bottom: -60px;
  left: -40px;
}

.title {
  margin: 0;
  font-size: 28px;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

.subtitle {
  margin: 8px 0 24px;
  color: var(--muted);
  font-size: 16px;
  position: relative;
  z-index: 1;
}

.form {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.input-custom {
  flex: 1;
  min-width: 240px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
}

.input-custom:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 77, 109, 0.15);
  transform: translateY(-1px);
}

.confirm-btn {
  padding: 14px 18px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #0b1220;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
  box-shadow: 0 12px 24px rgba(255, 77, 109, 0.35);
}

.confirm-btn:hover {
  transform: translateY(-1px) scale(1.01);
  box-shadow: 0 16px 32px rgba(255, 77, 109, 0.4);
}

.confirm-btn:active {
  transform: translateY(0);
  box-shadow: 0 10px 18px rgba(255, 77, 109, 0.35);
}

.hint {
  width: 100%;
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 14px;
}

.letter {
  margin-top: 28px;
  padding: 24px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
  line-height: 1.7;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
}

.letter p {
  margin: 0 0 10px;
}

.letter p:last-child {
  margin-bottom: 0;
}

.letter-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.actions {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.pill-btn {
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  font-weight: 700;
  letter-spacing: 0.3px;
  cursor: pointer;
  color: #0b1220;
  min-width: 120px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.pill-btn:hover {
  transform: translateY(-1px) scale(1.01);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.22);
  filter: brightness(1.02);
}

.pill-btn:active {
  transform: translateY(0);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.2);
}

.pill-positive {
  background: linear-gradient(135deg, #5be7a9, #3bc47f);
}

.pill-neutral {
  background: linear-gradient(135deg, #8fa3ff, #6b7bff);
  color: #0a1024;
}

.pill-danger {
  background: linear-gradient(135deg, #ff7c8a, #ff4d6d);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.rose-wrapper {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.rose {
  position: relative;
  width: 140px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 4.2s ease-in-out infinite;
}

.petal {
  position: absolute;
  width: 90px;
  height: 120px;
  background: radial-gradient(circle at 30% 30%, #ffb3c1, var(--accent));
  border-radius: 60% 60% 50% 50%;
  box-shadow: inset 0 -18px 28px rgba(0, 0, 0, 0.15);
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.3));
  animation: bloom 6s ease-in-out infinite;
}

.petal-1 {
  transform: rotate(0deg) translateY(-10px);
  animation-delay: 0s;
}

.petal-2 {
  transform: rotate(72deg) translateY(-10px);
  animation-delay: 0.2s;
}

.petal-3 {
  transform: rotate(144deg) translateY(-10px);
  animation-delay: 0.4s;
}

.petal-4 {
  transform: rotate(216deg) translateY(-10px);
  animation-delay: 0.6s;
}

.petal-5 {
  transform: rotate(288deg) translateY(-10px);
  animation-delay: 0.8s;
}

.bud {
  position: absolute;
  width: 70px;
  height: 90px;
  background: radial-gradient(circle at 20% 20%, #ffc2d1, #ff4d6d);
  border-radius: 50% 50% 45% 45%;
  box-shadow: inset 0 -12px 18px rgba(0, 0, 0, 0.18);
  z-index: 2;
  animation: pulse 3s ease-in-out infinite;
}

.stem {
  position: absolute;
  width: 10px;
  height: 150px;
  background: linear-gradient(180deg, #0c513f, #0a3f32);
  bottom: -20px;
  border-radius: 10px;
  box-shadow: inset 0 -8px 12px rgba(0, 0, 0, 0.2);
}

.leaf {
  position: absolute;
  width: 70px;
  height: 36px;
  background: linear-gradient(135deg, #2fa56a, #1f7f4f);
  border-radius: 40px 10px 40px 10px;
  box-shadow: inset 0 -6px 10px rgba(0, 0, 0, 0.2);
  animation: sway 3.2s ease-in-out infinite alternate;
}

.leaf-left {
  left: -60px;
  bottom: 30px;
  transform: rotate(-24deg);
  transform-origin: right center;
}

.leaf-right {
  right: -60px;
  bottom: 50px;
  transform: rotate(18deg) scaleX(-1);
  transform-origin: left center;
}

.glow {
  position: absolute;
  width: 220px;
  height: 220px;
  background: radial-gradient(
    circle,
    rgba(255, 77, 109, 0.12),
    transparent 60%
  );
  filter: blur(8px);
  z-index: -1;
  animation: glow 5s ease-in-out infinite;
}

/* Couple + Sun Scene */
.couple-scene {
  position: relative;
  height: 140px;
  margin-top: -40px;
  z-index: 3;
  overflow: visible;
}

.rose {
  position: relative;
  width: 140px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 4.2s ease-in-out infinite, rose-move 0.6s 4.5s forwards ease-out;
  transform-origin: center bottom;
}

.couple-scene .path {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 120px;
}

.person {
  position: absolute;
  bottom: -6px;
  width: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.person .head {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ffdcb3;
  margin-bottom: 6px;
  box-shadow: 0 2px 0 rgba(0,0,0,0.08);
}

.person .body {
  width: 22px;
  height: 44px;
  border-radius: 8px;
  background: linear-gradient(180deg,#ff9aa8,#ff607a);
}

.person .arm {
  position: absolute;
  top: 36px;
  width: 34px;
  height: 6px;
  background: #ffdcb3;
  border-radius: 6px;
}

.person-left { 
  left: calc(50% - 48px);
  bottom: -6px;
  transform: rotate(-15deg);
  transform-origin: bottom center;
  animation: wake-up-left 0.5s 3.8s forwards ease-out;
}

.person-sleeping {
  position: absolute;
}

/* car + reveal right-person */
.car-wrapper { position: absolute; right: 0; bottom: 0; width: 220px; height: 120px; pointer-events: none; }
.car { position: absolute; right: -160px; bottom: 6px; width: 140px; height: 68px; display:flex; align-items:flex-end; justify-content:center; animation: drive-in 3.9s forwards ease-in-out; transform-origin: center; filter: drop-shadow(0 10px 18px rgba(20,40,80,0.45)); }
.car-body { position: relative; width: 116px; height: 44px; background: linear-gradient(180deg,#ff6b6b,#d93535); border-radius: 12px 18px 14px 14px; box-shadow: inset 0 -4px 0 rgba(0,0,0,0.12); }
.car-top { position: absolute; width: 78px; height: 32px; background: linear-gradient(180deg,#ffd4d4,#ff9ba9); border-radius: 16px 16px 10px 10px; left: 24px; top: -22px; box-shadow: 0 4px 0 rgba(0,0,0,0.08); }
.car-window { position: absolute; width: 60px; height: 22px; background: linear-gradient(180deg,#eaf7ff,#cfe6ff); border-radius: 8px; left: 30px; top: -18px; box-shadow: inset 0 0 0 2px rgba(255,255,255,0.45); overflow: hidden; }
.car-window::after { content: ""; position: absolute; right: 6px; top: 0; bottom: 0; width: 10px; background: linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.02)); }
.driver-head { position: absolute; left: 48px; top: -10px; width: 18px; height: 18px; border-radius: 50%; background: #ffdcb3; border: 2px solid #f4c08f; box-shadow: 0 1px 0 rgba(0,0,0,0.08); }
.wheel { position: absolute; bottom: -14px; width: 26px; height: 26px; background: #0f172a; border-radius: 50%; box-shadow: inset 0 0 0 4px #1f2937, 0 4px 8px rgba(0,0,0,0.28); }
.wheel::after { content: ""; position: absolute; inset: 5px; border-radius: 50%; background: radial-gradient(circle,#d9dde7 0%,#9aa0ad 65%,#5a6070 100%); }
.wheel-back { left: 14px; }
.wheel-front { right: 14px; }
.light { position: absolute; top: 14px; width: 12px; height: 6px; border-radius: 4px; }
.light-front { right: -10px; background: linear-gradient(90deg,#ffef9f,#ffd166); box-shadow: 0 0 8px rgba(255,209,102,0.8); }
.light-back { left: -10px; background: linear-gradient(90deg,#ff6b6b,#ff9a9a); box-shadow: 0 0 6px rgba(255,107,107,0.7); }

.hidden-person { 
  opacity: 0; 
  transform: scale(0.98); 
}

.sleeping-indicator {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  animation: hide-snore 0.1s 3.8s forwards;
  z-index: 10;
}

.person-outside {
  position: absolute;
  left: 50%;
  bottom: -6px;
  animation: person-reveal 0.28s 3.9s forwards ease-out;
}

.person-right { 
  left: 50%;
  bottom: -6px;
}

.zzz {
  font-size: 16px;
  font-weight: bold;
  color: #94a3b8;
  opacity: 0;
  animation: snore 2s infinite;
}

.zzz-1 {
  animation-delay: 0s;
  transform: translateY(0) rotate(-10deg);
}

.zzz-2 {
  animation-delay: 0.3s;
  transform: translateY(-8px) rotate(5deg);
}

.zzz-3 {
  animation-delay: 0.6s;
  transform: translateY(-16px) rotate(-5deg);
}

.sun-7am {
  position: absolute;
  left: 5%;
  bottom: 15%;
  width: 50px;
  height: 50px;
  pointer-events: none;
  z-index: 1;
  animation: sun-appear 0.8s 0s ease-out forwards;
  opacity: 0;
}

.sun-circle {
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffeb3b, #ffc107);
  box-shadow: 0 0 15px rgba(255, 235, 59, 0.5);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.sun-rays {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.sun-rays::before,
.sun-rays::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffeb3b;
  border-radius: 1px;
  opacity: 0.6;
}

.sun-rays::before {
  width: 2px;
  height: 100%;
}

.sun-rays::after {
  width: 100%;
  height: 2px;
}

.moon-fade {
  position: absolute;
  right: 8%;
  top: 15%;
  width: 40px;
  height: 40px;
  pointer-events: none;
  z-index: 1;
  animation: moon-fade-in-out 3s 0s ease-in-out infinite;
  opacity: 0;
}

.moon-circle {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle at 60% 40%, #e8eaf6, #c5cae9);
  box-shadow: 0 0 10px rgba(200, 200, 255, 0.3);
  overflow: hidden;
}

.moon-circle::before {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--bg);
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
}

.heart-kiss {
  position: absolute;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 10;
}

.heart {
  position: absolute;
  font-size: 28px;
  animation: heart-float 2s ease-out infinite;
  opacity: 0;
}

.heart-1 {
  left: -20px;
  animation-delay: 0s;
  animation-duration: 2s;
}

.heart-2 {
  left: 0;
  animation-delay: 0.2s;
  animation-duration: 2.2s;
}

.heart-3 {
  left: 20px;
  animation-delay: 0.4s;
  animation-duration: 2.4s;
}

.person-left .arm-right { right: -12px; transform: translateX(0) rotate(0deg); animation: arm-reach-right 0.9s 4.3s forwards ease-out; }
.person-right .arm-left { left: -12px; transform: translateX(0) rotate(0deg); animation: arm-reach-left 0.9s 4.3s forwards ease-out; }

@keyframes walk-left {
  0% { left: -120px; }
  100% { left: calc(50% - 48px); }
}

@keyframes walk-right {
  0% { right: -120px; }
  100% { left: calc(50% + 24px); }
}

@keyframes arm-reach-right {
  0% { transform: translateX(0) rotate(0deg); }
  100% { transform: translateX(38px) rotate(8deg); }
}

@keyframes arm-reach-left {
  0% { transform: translateX(0) rotate(0deg); }
  100% { transform: translateX(-38px) rotate(-8deg); }
}

@keyframes sun-rise {
  0% { transform: translateY(40px) scale(0.9); opacity: 0; }
  100% { transform: translateY(-28px) scale(1); opacity: 1; }
}

@keyframes sun-appear {
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes moon-fade-in-out {
  0%, 100% { opacity: 0.3; transform: scale(0.9); }
  50% { opacity: 0.6; transform: scale(1); }
}

@keyframes rose-move {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-98px) scale(0.6); }
}

@keyframes wake-up-left {
  0% { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
}

@keyframes drive-in {
  0% { right: -160px; transform: translateX(0) scale(1); opacity: 1; }
  80% { right: calc(50% - 48px); opacity: 1; }
  100% { right: calc(50% - 48px); transform: scale(0.7); opacity: 0; }
}

@keyframes person-reveal {
  0% { opacity: 0; transform: scale(0.98); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes snore {
  0%, 100% {
    opacity: 0;
    transform: translateX(0) translateY(0) scale(0.8);
  }
  50% {
    opacity: 1;
    transform: translateX(8px) translateY(-4px) scale(1);
  }
}

@keyframes hide-snore {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes heart-float {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }
  20% {
    opacity: 1;
    transform: translateY(-10px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px) scale(1.2);
  }
}

@keyframes bloom {
  0%,
  100% {
    transform: translateY(-10px) scale(0.9);
  }
  50% {
    transform: translateY(-14px) scale(1.02);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(0.94);
  }
  50% {
    transform: scale(1.04);
  }
}

@keyframes sway {
  0% {
    transform: rotate(-4deg);
  }
  100% {
    transform: rotate(6deg);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes glow {
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 0.8;
  }
}

@media (max-width: 520px) {
  .card {
    padding: 22px;
  }

  .form {
    flex-direction: column;
    align-items: stretch;
  }

  .confirm-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
