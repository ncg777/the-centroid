<template>
  <div id="app">
    <canvas ref="canvasRef" width="800" height="800"></canvas>
    <button @click="startAnimation1">Start Animation 1</button>
    <button @click="startAnimation2">Start Animation 2</button>
    <button @click="stopAnimation">Stop Animation</button>
  </div>
</template>

<script setup lang="ts">
const fps = 30;
const witdh=800;
const height=800;

import { ref } from 'vue';
import { animation20241225_1, animation20241225_2 } from './Animations';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let lastTimestamp = 0;
let animationFrameId: number | null = null; // To store the animation frame ID

const startAnimation = async (generator: () => Generator<ImageData>) => {
  if (animationFrameId) return;
  let animationGenerator = generator();
  const animate = (timestamp: number) => {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;

    if (delta > 1000 / fps) { 
      let n = animationGenerator.next();
      if(n.done) {
        animationGenerator = generator();
        n = animationGenerator.next();
      } 
      lastTimestamp = timestamp;
    }
    animationFrameId = requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

const startAnimation1 = () => startAnimation(() => animation20241225_1(canvasRef.value?.getContext('2d')!, witdh, height, fps, 600));
const startAnimation2 = () => startAnimation(() => animation20241225_2(canvasRef.value?.getContext('2d')!, witdh, height, fps, 2));

// Stop Animation function
const stopAnimation = () => {
  animationFrameId !== null && cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>