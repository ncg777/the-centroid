// animations.ts

import drawColorField2D from "./drawColorField";

export function* animation20241225_3(ctxf: () => CanvasRenderingContext2D|null|undefined, width: number, height: number, fps: number, dur: number): Generator<number> {
  let ctx = ctxf();
  const upper = dur*fps;
  let k = 0;
  while(++k > 0) {
      const t = k / (upper);
      if (!ctx) ctx = ctxf();
      if(ctx){
        drawColorField2D(ctx!, 
          (x: number, y: number) => {
              const b = 2.0;
              const th = Math.atan2(x, y);
              const s = 0.5 + (th / Math.PI) * 0.5;
              const r1 = Math.sqrt((Math.pow(x, 2.0) + Math.pow(y, 2.0)) / 2.0);
              const r1p = ((Math.sin(t*2.0*Math.PI)))*r1;
              const r2 = (t - b * s);
              const p = 2.0 * Math.sin(2.0 * Math.PI * (1.0 * r2 + 1.0 * r1p));
              const o = `rgba(
              ${Math.round(127*(1.0 + Math.sin(p * 8.0 * Math.PI)))}, 
              ${0}, 
              ${0}, 
              ${r1 < 0.7 ? 255 : 0})`;
              return o;
          },
          width, height);
      }
      yield k;

      if(k>=upper) k=0;
  }
}