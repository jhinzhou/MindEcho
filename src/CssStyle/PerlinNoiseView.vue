<template>
  <div class="card">
    <css-doodle grid="100x100">
      :doodle { @size: 80vw 35vmin; perspective: 10px; } :container {
      perspective: 50px; transform-style: preserve-3d; } position: absolute;
      top: 0; left: 0; width: 2px; height: 2px; border-radius: 50%; left: 50%;
      top: 50%; background: hsl(@rn(1, 255, 3), @rn(50%, 90%), @rn(50%, 90%));
      transform: scale(@rn(1, 10, 3)) translate3d(@rn(-50, 50, 3)vw, @rn(-50,
      50, 3)vh, @rn(-100, 20)px); animation: move @rn(5, 15, 3)s infinite
      @rn(-20, -10, 3)s linear alternate; box-shadow: 0 0 1px #fff, 0 0 5px
      #fff; @keyframes move { 100% { margin-top: 500px; } }
    </css-doodle>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import "css-doodle";
onMounted(() => {
  const doodle = document.querySelector("css-doodle");

  document.addEventListener("click", function (e) {
    doodle.update();
  });
});
</script>
<style scoped>
.card {
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s all;
  background-color: #fff;
  cursor: pointer;
  background-color: black;
  box-shadow: 2px 2px 4px 2px rgba(44, 44, 44, 0.155);
  -webkit-user-select: none;
  user-select: none;
}
.card:hover {
  transform: translateY(-20px);
  box-shadow: 0 10px 20px 10px rgba(223, 223, 223, 0.155);
  z-index: -1;
}
</style>
