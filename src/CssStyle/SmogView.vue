<template>
  <section class="card">
    <div id="text">Hover</div>

    <svg width="0">
      <filter id="filter">
        <feTurbulence
          id="turbulence"
          type="fractalNoise"
          baseFrequency=".03 .03"
          numOctaves="20"
        />
        <feDisplacementMap in="SourceGraphic" scale="70" />
      </filter>
    </svg>
  </section>
</template>

<script>
var filter = document.querySelector('#turbulence')
var frames = 1
var rad = Math.PI / 180
var bfx, bfy

function freqAnimation() {
  frames += 0.2

  bfx = 0.03
  bfy = 0.03

  bfx += 0.005 * Math.cos(frames * rad)
  bfy += 0.005 * Math.sin(frames * rad)

  bf = bfx.toString() + ' ' + bfy.toString()
  filter.setAttributeNS(null, 'baseFrequency', bf)

  window.requestAnimationFrame(freqAnimation)
}

window.requestAnimationFrame(freqAnimation)
</script>
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
  cursor: pointer;
  background-color: black;
  box-shadow: 2px 2px 4px 2px rgba(44, 44, 44, 0.155);
  -webkit-user-select: none;
  user-select: none;
}
.text {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin: auto;
  background: linear-gradient(#fff, #999, #ddd, #888);
  background-clip: text;
  color: transparent;
  font-size: 28px;
  text-align: center;
  line-height: 160px;
  // transition: 3s all;
}

.card:hover {
  filter: url('#filter');
  cursor: pointer;

  .text {
    animation: blurChange 2s ease-out forwards;
  }
}

@keyframes blurChange {
  100% {
    filter: blur(15px) contrast(200%);
  }
}
</style>
