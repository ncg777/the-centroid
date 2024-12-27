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
let isAnimating = false; // State variable to track animation status

const startAnimation1 = async () => {
  if (isAnimating) return; 
  isAnimating = true;
  const ctx = canvasRef.value?.getContext('2d');
  
  if (!ctx) return;
  let animationGenerator = animation20241225_1(ctx,witdh, height, fps, 600); // Specify your animation parameters
  while(true) { 
    const n = animationGenerator.next();
    if(!isAnimating) break
    if(n.done) { animationGenerator = animation20241225_1(ctx, witdh, height, fps, 600);}
    ctx.putImageData(n.value, 0, 0);
    await new Promise(resolve => setTimeout(resolve, 1000 / fps)); // 30 FPS
  }
};

const startAnimation2 = async () => {
  if (isAnimating) return; 
  isAnimating = true;
  const ctx = canvasRef.value?.getContext('2d');
  if (!ctx) return;
  let animationGenerator = animation20241225_2(ctx,witdh, height, fps, 5); // Specify your animation parameters
  while(true) { 
    const n = animationGenerator.next();
    if(!isAnimating) break;
    if(n.done) animationGenerator = animation20241225_1(ctx, witdh, height, fps, 2);
    ctx.putImageData(n.value, 0, 0);
    await new Promise(resolve => setTimeout(resolve, 1000 / fps)); // 30 FPS
  }
  isAnimating = false;
};


// Stop Animation function
const stopAnimation = () => {
  isAnimating = false; // Set the state to stop the animation
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>