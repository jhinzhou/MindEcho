<template>
  <div class="card">
    <div class="shadow">Press me</div>
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

.shadow {
  width: 120px;
  height: 120px;
  background: #e9ecef;
  color: #333;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 7px 7px 12px rgba(0, 0, 0, 0.4),
    -7px -7px 12px rgba(255, 255, 255, 0.9);
  &:active {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.4), 0 0 0 rgba(255, 255, 255, 0.9),
      inset -7px -7px 12px rgba(255, 255, 255, 0.9),
      inset 7px 7px 12px rgba(0, 0, 0, 0.4);
  }
}
</style>
