<template>
  <div id="app">
    <canvas ref="canvasRef" width="500" height="500"></canvas>
    <button @click="startAnimation1">Start Animation 1</button>
    <button @click="startAnimation2">Start Animation 2</button>
    <button @click="stopAnimation">Stop Animation</button>
  </div>
</template>

<script setup lang="ts">
const fps = 30;
const witdh=500;
const height=500;


import { ref } from 'vue';
import { animation20241225_1, animation20241225_2 } from './Animations';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let lastTimestamp = 0;
let animationFrameId: number | null = null; // To store the animation frame ID

const startAnimation1 = async () => {
  if (animationFrameId) return;
  const dur = 600;
  const ctx = canvasRef.value?.getContext('2d');
  if (!ctx) return;
  let animationGenerator = animation20241225_1(ctx, witdh, height, fps, dur);
  const animate = (timestamp: number) => {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;

    if (delta > 1000 / fps) { 
      let n = animationGenerator.next();
      if(n.done) {
        animationGenerator = animation20241225_1(ctx, witdh, height, fps, dur);
        n = animationGenerator.next();
      } 
      ctx.putImageData(n.value, 0, 0);
      lastTimestamp = timestamp;
    }
    animationFrameId = requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

const startAnimation2 = async () => {
  if (animationFrameId) return;
  const dur = 1;
  const ctx = canvasRef.value?.getContext('2d');
  if (!ctx) return;
  let animationGenerator = animation20241225_2(ctx, witdh, height, fps, dur);
  const animate = (timestamp: number) => {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;

    if (delta > 1000 / fps) { 
      let n = animationGenerator.next();
      if(n.done) {
        animationGenerator = animation20241225_2(ctx, witdh, height, fps, dur);
        n = animationGenerator.next();
      } 
      ctx.putImageData(n.value, 0, 0);
      lastTimestamp = timestamp;
    }
    animationFrameId = requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};


// Stop Animation function
const stopAnimation = () => {
  animationFrameId !== null && cancelAnimationFrame(animationFrameId); // Stop the animation
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