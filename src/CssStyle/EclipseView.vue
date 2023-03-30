<template>
  <div class="card">
    <div class="eclipse"></div>
  </div>
  <div class="card">
    <div class="eclipse1"></div>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
.card + .card {
  margin-top: 30px;
}
.card {
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s all;
  background-color: #000000;
  box-shadow: 2px 2px 4px 2px rgb(230, 230, 229);
  -webkit-user-select: none;
  user-select: none;
}
.eclipse {
  --colorA: #fff;
  top: 20px;
  position: relative;
  margin: auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border-top: 5px solid #fff;
  transform: rotate(-15deg);
  filter: drop-shadow(0 0 2px var(--colorA)) drop-shadow(0 0 5px var(--colorA))
    drop-shadow(0 0 10px var(--colorA)) drop-shadow(0 0 20px var(--colorA));
}

.card:nth-child(2) {
  background-color: #ffffff !important;
  box-shadow: 2px 2px 4px 2px rgb(166, 166, 166);
}
.eclipse1 {
  --colorB: #000000;
  top: 20px;
  position: relative;
  margin: auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border-top: 5px solid #000000;
  transform: rotate(-15deg);
  filter: drop-shadow(0 0 2px var(--colorB)) drop-shadow(0 0 5px var(--colorB))
    drop-shadow(0 0 10px var(--colorB)) drop-shadow(0 0 20px var(--colorB));
}
</style>
