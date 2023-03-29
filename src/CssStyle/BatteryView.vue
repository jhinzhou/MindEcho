<template>
  <div class="card">
    <div class="battery"></div>
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
  background-color: #fff;
  box-shadow: 2px 2px 4px 2px rgba(44, 44, 44, 0.155);
  -webkit-user-select: none;
  user-select: none;
}
.battery {
  height: 90%;
  width: 20%;
  border-radius: 15px 15px 5px 5px;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.22));
  background: #fff;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    width: 26px;
    height: 10px;
    left: 50%;
    top: 0;
    transform: translate(-50%, -10px);
    border-radius: 5px 5px 0 0;
    background: rgba(240, 240, 240, 0.88);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 90%;
    background: linear-gradient(
      to bottom,
      #7abcff 0%,
      #00bcd4 44%,
      #2196f3 100%
    );
    border-radius: 0px 0px 5px 5px;
    box-shadow: 0 14px 28px rgba(33, 150, 243, 0),
      0 10px 10px rgba(9, 188, 215, 0.08);
    animation: charging 6s linear infinite;
    filter: hue-rotate(90deg);
  }
}

@keyframes charging {
  50% {
    box-shadow: 0 14px 28px rgba(0, 150, 136, 0.83),
      0px 4px 10px rgba(9, 188, 215, 0.4);
  }

  95% {
    top: 5%;
    filter: hue-rotate(0deg);
    border-radius: 0 0 5px 5px;
    box-shadow: 0 14px 28px rgba(4, 188, 213, 0.2),
      0 10px 10px rgba(9, 188, 215, 0.08);
  }
  100% {
    top: 0%;
    filter: hue-rotate(0deg);
    border-radius: 15px 15px 5px 5px;
    box-shadow: 0 14px 28px rgba(4, 188, 213, 0),
      0 10px 10px rgba(9, 188, 215, 0.4);
  }
}
</style>
