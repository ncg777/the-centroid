<template>
  <div id="app">
    <canvas ref="canvasRef" width="252" height="252"></canvas>
  </div>
</template>

<script setup lang="ts">
  const fps = 30.0;
  const witdh=252;
  const height=252;

  import { ref } from 'vue';
  import { animation20241225_3 } from './Animations';

  const canvasRef = ref<HTMLCanvasElement | null>(null);
  let lastTimestamp = 0;

  const _startAnimation = async (generator: () => Generator<number>) => {
    let animationGenerator = generator();
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
   
      if (delta > (1000 / fps)) { 
        animationGenerator.next();
        lastTimestamp = timestamp;
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const startAnimation = () => _startAnimation(() => animation20241225_3(() => canvasRef.value?.getContext('2d'), witdh, height, fps, 2.0));
  
  startAnimation();
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>