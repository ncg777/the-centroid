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
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #000;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #fff;
    background-color: #000;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #333;
  }
}
</style>