<template>
  <div class="g-bg">
    <div class="g-polygon g-polygon-1"></div>
    <div class="g-polygon g-polygon-2"></div>
    <div class="g-polygon g-polygon-3"></div>
  </div>
</template>
<script setup></script>
<style scoped>
.g-bg {
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s all;
  background-color: #fff;
  box-shadow: 2px 2px 4px 2px rgba(44, 44, 44, 0.155);
  -webkit-user-select: none;
  user-select: none;
}

.g-polygon {
  position: absolute;
  opacity: 0.5;
  width: 50%;
  height: 90%;
}
.g-polygon-1 {
  left: 0;
  bottom: 0;
  background: #ccff99;
  clip-path: polygon(0 0, 30% 0, 100% 40%, 70% 100%, 5% 100%);
}
.g-polygon-2 {
  right: 0;
  bottom: 0;
  background: #ff3399;
  clip-path: polygon(90% 0, 100% 70%, 100% 100%, 20% 20%);
}
.g-polygon-3 {
  margin-left: 30%;
  bottom: 0;
  background: #99ccff;
  clip-path: polygon(0 0, 100% 0, 60% 100%, 20% 90%);
}
.g-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  -webkit-backdrop-filter: blur(150px);
  backdrop-filter: blur(150px);
  z-index: 1;
}
</style>
