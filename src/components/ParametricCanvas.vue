<template>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, watch, type PropType } from 'vue';
  
  export default defineComponent({
    name: 'ParametricCanvas',
    props: {
      width: {
        type: Number,
        default: 800,
      },
      height: {
        type: Number,
        default: 600,
      },
      functions: {
        type: Array as PropType<{
          x: (t: number) => number;
          y: (t: number) => number;
          color: (t: number) => string;
          width: (t: number) => number;
          delta: (t: number) => number;
        }[]>,
        required: true,
      },
      from: {
        type: Number,
        default: 0,
      },
      to: {
        type: Number,
        default: 1,
      },
      translateX: {
        type: Function as PropType<(t: number) => number>,
        default: () => 0,
      },
      translateY: {
        type: Function as PropType<(t: number) => number>,
        default: () => 0,
      },
      scaleX: {
        type: Function as PropType<(t: number) => number>,
        default: () => 1,
      },
      scaleY: {
        type: Function as PropType<(t: number) => number>,
        default: () => 1,
      },
    },
    setup(props) {
      const canvas = ref<HTMLCanvasElement | null>(null);
  
      const drawParametric2D = () => {
        if (!canvas.value) return;
        const ctx = canvas.value.getContext('2d');
        if (!ctx) return;
  
        ctx.clearRect(0, 0, props.width, props.height);
  
        for (const func of props.functions) {
          const { x, y, color, width, delta } = func;
          let t = props.from;
          while (t < props.to) {
            // Assuming the necessary variables are provided in the surrounding context
            const _delta = delta(t); // Access the delta function
            const c = color(t); // Access the color function

            ctx.strokeStyle = c; // Set the color for the drawing context
            const sx = props.scaleX(t); // Scale X
            const sy = props.scaleY(t); // Scale Y
            const tx = props.translateX(t); // Translate X
            const ty = props.translateY(t); // Translate Y

            // Calculate the parametric curve points A and B
            const A_x = sx * (x(t) + tx);
            const A_y = sy * (y(t) + ty);
            const B_x = sx * (x(t + _delta) + tx);
            const B_y = sy * (y(t + _delta) + ty);

            // Calculate counter-clockwise and clockwise points
            const x_ccw = A_x - (B_y - A_y);
            const y_ccw = A_y + (B_x - A_x);
            const x_cw = A_x + (B_y - A_y);
            const y_cw = A_y - (B_x - A_x);

            // Calculate the width and factor for drawing
            const w = width(t);
            const f = w / (2.0 * Math.sqrt(Math.pow((B_x - A_x), 2.0) + Math.pow((B_y - A_y), 2.0)));

            ctx.beginPath();
            ctx.moveTo(A_x, A_y);
            ctx.lineTo(A_x + f * sx * (x_ccw - A_x), A_y + f * sy * (y_ccw - A_y));
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(A_x, A_y);
            ctx.lineTo(A_x + f * sx * (x_cw - A_x), A_y + f * sy * (y_cw - A_y));
            ctx.stroke();
            t += _delta;
          }
        }
      };
  
      onMounted(() => {
        drawParametric2D();
      });
  
      watch(
        () => ({ ...props }),
        () => {
          drawParametric2D();
        },
        { deep: true }
      );
  
      return {
        canvas,
      };
    },
  });
  </script>
  
  <style scoped>
  canvas {
    border: 0;
  }
  </style>