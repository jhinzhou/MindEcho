<template>
  <div class="card">
    <div class="marquee"></div>
    <div class="marquee"></div>
    <div class="marquee1"></div>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
.card {
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s all;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px 2px rgba(44, 44, 44, 0.155);
  -webkit-user-select: none;
  user-select: none;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}
.marquee + .marquee {
  margin-left: 20px;
}
.marquee + .marquee1 {
  margin-left: 20px;
}
.marquee {
  position: relative;
  z-index: 0;
  width: 200px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#399953, #399953),
      linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33),
      linear-gradient(#377af5, #377af5);
    animation: rotate 4s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 3px;
    top: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    background: white;
    border-radius: 5px;
    animation: opacityChange 3s infinite alternate;
  }
}

@keyframes opacityChange {
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
.marquee:nth-child(2) {
  &::after {
    background: unset !important;
  }
}
.marquee1 {
  position: relative;
  z-index: 0;
  width: 200px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #1a232a;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      transparent,
      rgb(1, 255, 242),
      transparent 30%
    );
    animation: rotate 4s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 3px;
    top: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    background: #000;
    border-radius: 5px;
    animation: opacityChange1 5s infinite linear;
  }
}
@keyframes opacityChange1 {
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
