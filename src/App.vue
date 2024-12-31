<template>
  <div id="app" :style="{margin:'auto',  'margin-top':'20vh'}">
    <canvas ref="canvasRef" width="504px" height="504px"></canvas>
  </div>
</template>

<script setup lang="ts">
  const fps = 15.0;
  const witdh=504;
  const height=504;

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

  const startAnimation = () => _startAnimation(() => animation20241225_3(() => canvasRef.value?.getContext('2d'), witdh, height, fps, 1.0));
  
  startAnimation();
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>