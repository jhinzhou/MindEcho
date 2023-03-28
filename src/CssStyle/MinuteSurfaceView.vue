<template>
  <div class="card">
    <div class="btn">Click me</div>
    <div class="btn btn1">Press me</div>
    <div class="btn btn2">Ni suiyi</div>
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
  background: #5b5a5a1a;
  box-shadow: 5px 5px 10px 5px rgba(44, 44, 44, 0.155);
}

.card:hover {
  transform: translateY(-20px);
  box-shadow: 0 10px 20px 10px rgba(223, 223, 223, 0.155);
}
@keyframes rotate {
  100% {
    transform: translate(-50%, -50%) rotate(1turn);
  }
}
.btn {
  position: relative;
  z-index: 0;
  width: 140px;
  height: 70px;
  line-height: 70px;
  color: #0ebeff;
  font-size: 24px;
  border-radius: 10px;
  text-align: center;
  margin: auto;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
  -webkit-box-reflect: below 10px
    linear-gradient(transparent, rgba(0, 0, 0, 0.4));

  &:hover {
    color: #fff;
    box-shadow: 0 0 5px #0ebeff, 0 0 25px #0ebeff;

    &::after,
    &::before {
      transition: 0.3s;
      background: #0ebeff;
    }
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 300%;
    background-color: #000;
    background-repeat: no-repeat;
    background-size: 50% 50%;
    background-position: 0 0;
    background-image: conic-gradient(#0ebeff, #0ebeff);
    animation: rotate 2s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 2px;
    top: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: #000;
    border-radius: 10px;
  }
}

.btn1 {
  filter: hue-rotate(180deg);
}

.btn2 {
  filter: hue-rotate(270deg);
}
</style>
