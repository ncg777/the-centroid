<template>
  <div id="app">
    <h1>Parametric Animation</h1>
    <ParametricCanvas
      :width=500
      :height=500
      :functions="parametricFunctions"
      :from="0" 
      :to="1"
      :translateX="() => 0"
      :translateY="() => 0"
      :scaleX="() => 500"
      :scaleY="() => 500"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Animations } from './Animations';
import ParametricCanvas from './components/ParametricCanvas.vue';

const fps = 30;
const duration = 600; // Duration in seconds
const parametricFunctions = ref<{ x: (t: number) => number; y: (t: number) => number; color: (t: number) => string, width: (t:number) => number, delta: (t: number) => number}[]>([]);

onMounted(async () => {
  const animationGenerator = Animations.Animation20241225_1(fps, duration);
  
  const drawFrames = () => {
    const newFunctions = animationGenerator();
    if (newFunctions) {
      parametricFunctions.value = newFunctions;
    }

    // Repeat drawing for the duration of the animation
    requestAnimationFrame(drawFrames);
  };

  drawFrames();
});
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>