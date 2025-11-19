<!--css 波浪动态组件-->

<template>


  <div class="ripple-component">
    <div class="ripple h-[1px]">
      <svg
        class="waves relative w-full h-[15%] -mb-[7px] min-h-[80px] max-h-[150px] transform -translate-y-full z-[2]"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>

        <g class="parallax">
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="2"
            class="fill-[rgba(249,249,249,0.6)] dark:fill-[rgba(35,41,49,0.8)] animate-wave-1"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="4"
            class="fill-[rgba(249,249,249,0.9)] dark:fill-[rgba(35,41,49,0.95)] animate-wave-2"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑可以在这里添加
</script>

<style>
@keyframes moveForever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

.animate-wave-1 {
  animation: moveForever 8s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  animation-delay: -2s;
}

.animate-wave-2 {
  animation: moveForever 12s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  animation-delay: -3s;
}

@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
}
</style>