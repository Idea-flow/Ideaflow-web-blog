<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // 星星的密集程度，数字越大越多
  const stars = 800
  const starsContainer = document.querySelector('.stars_starrySky')

  // 星星的看起来的距离,值越大越远
  const r = 1000
  for (let i = 0; i < stars; i++) {
    const star = document.createElement('div')
    star.classList.add('star_starrySky')
    starsContainer?.appendChild(star)
  }

  const starElements = document.querySelectorAll<HTMLElement>('.star_starrySky')
  starElements?.forEach((starElement) => {
    const s = 0.2 + Math.random() * 1
    const curR = r + Math.random() * 300
    starElement.style.transformOrigin = `0 0 ${curR}px`
    starElement.style.transform = `translate3d(0,0,-${curR}px) rotateY(${Math.random() * 360}deg) rotateX(${Math.random() * -50}deg) scale(${s},${s})`
  })
})
</script>

<template>

  <div class='StarryComponent'>
    <div class="overflow-hidden absolute w-full h-[180%] sm:h-[160%] md:h-[150%]">
      <!-- 背景层，不要删除，否则没有作用 -->
      <div class="stars_starrySky"></div>
    </div>
  </div>
</template>

<style lang="scss">
/* 将样式移到全局作用域 */
.StarryComponent {
  @keyframes Rotate_StarrySky {
    0% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }

    100% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
    }
  }

  .stars_starrySky {
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: absolute;
    bottom: 0;
    perspective-origin: 50% 100%;
    left: 50%;
    animation: Rotate_StarrySky 90s infinite linear;
  }

  .star_starrySky {
    width: 2px;
    height: 2px;
    background: #F7F7B6;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0 -300px;
    transform: translate3d(0, 0, -300px);
    backface-visibility: hidden;
  }
}
</style>