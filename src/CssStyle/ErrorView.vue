<template>
  <div class="page">
    <div class="card">
      <h1 class="title">给最好看的你</h1>
      <p class="subtitle">输入我们的密码，看看我真诚的道歉</p>
      <div class="form">
        <input
          v-model="password"
          type="password"
          class="input-custom"
          placeholder="请输入密码"
        />
        <button class="confirm-btn" @click="confirm">开始查看</button>
      </div>

      <transition name="fade-slide">
        <div v-if="canSee" class="letter-block">
          <div class="letter">
            <p>我为12月8日晚的态度，向你真诚的道歉。</p>
            <p>错误在我，对不起。</p>
            <p>我为我的愚蠢行为再次向你道歉，对不起。</p>
            <p>下班的时候一路上还在想着我们以后幸福三口。</p>
            <p>回来后却是这个样子，心里落差太大。</p>
            <p>对不起，没有及时向你道歉，对不起。</p>
            <p>你删掉我后，我心很痛，这不是我想要的结果。</p>
            <p>对不起，对不起。</p>
            <p>我冷静了很久，我要向你道歉。</p>
            <p>我有很多问题，我都在慢慢去改了。</p>
            <p>是我做的不好，不到位，对不起。</p>
            <p>希望你能原谅我。</p>
            <p>希望你给个机会让我努力做个合格的爸爸。</p>
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
import { ref } from "vue";
import emailjs from "@emailjs/browser";

const password = ref("");
const canSee = ref(false);
const forgiveCount = ref(0);
const notForgiveCount = ref(0);
const killYouCount = ref(0);
const sending = ref(false);

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

const confirm = async () => {
  if (password.value === "619515") {
    canSee.value = true;
    await sendEmail(`查看了,密码对了： ${password.value}`, { password: password.value });
  } else {
    alert("密码错误");
    await sendEmail(`查看了,但是密码错了： ${password.value}`, { password: password.value });
  }
};

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
