// Animations.ts

import drawColorField2D from "./drawColorField";
import drawParametric2D from "./drawParametric";

export function* animation20241225_1(ctx: CanvasRenderingContext2D, width: number, height: number, fps: number, dur: number): Generator<ImageData> {
  if (!ctx) return;
  const upper = Math.floor(dur * fps);
  
  for (let k = 0; k < upper; k++) {
      const normalized_time = k / upper;
      
      const list = [-1.0, 1.0];
      ctx.clearRect(0,0,width,height);
      for(let _i=0;_i<2;_i++) {
        const i = list[_i];
        for(let _j=0;_j<2;_j++) {
          const j = list[_j];
          drawParametric2D(
              ctx,
              (t) => 0.5+j*0.35*Math.cos(j*Math.PI*0.125+i*normalized_time*40*Math.PI)*(0.5-0.5*Math.cos((4.0-(Math.abs(2.0-4.0*t)*2.0+2.0*(2.0+(1.0-Math.abs(1.0-2.0*normalized_time)))))*Math.PI)), 
              (t) => 0.5-j*0.35*Math.sin(               -i*normalized_time*40*Math.PI)*(0.5+0.5*Math.sin((2.0-(Math.abs(1.0-2.0*t)*2.0+2.0*(4.0+(2.0-Math.abs(2.0-4.0*normalized_time)))))*Math.PI)),
              0.0,
              1.0,
              (_:number) => 0.0,
              (_:number) => 0.0,
              (_:number) => width,
              (_:number) => height,
              (t:number) => 0.1+0.1*Math.sin(42*Math.PI*t)*Math.sin(20*Math.PI*normalized_time),
              (t:number) => `rgba(${Math.round(128 - 127 * (j * Math.cos(Math.PI * (3.0 * t - i * normalized_time))))}, ${Math.round(128 + 127 * (j * Math.sin(Math.PI * (3.0 * t + i * normalized_time))))}, 128, 16)`,
              (t:number) => 0.00075+0.0007*Math.sin(Math.PI*2.0*t + Math.PI*Math.sin(80.0*Math.PI*normalized_time))
              );    
      }
    }
    ctx.resetTransform();
    ctx.translate(width/2,height/2);
    ctx.rotate(k*40.0*2*Math.PI/upper);
    ctx.translate(-width/2,-height/2);

    yield ctx.getImageData(0, 0, width, height);
  }
}
export function* animation20241225_2(ctx: CanvasRenderingContext2D, width: number, height: number, fps: number, dur: number): Generator<ImageData> {
  if (!ctx) return;
  const upper = Math.floor(dur * fps);
  
  for (let k = 0; k < upper; k++) {
      const t = k / upper;
      ctx.clearRect(0,0,width,height);
      drawColorField2D(ctx, 
          (x: number, y: number) => {
              const b = 5.0;
              const th = Math.atan2(x, y);
              const s = 0.5 + (th / Math.PI) * 0.5;
              const r1 = Math.sqrt((Math.pow(x, 2.0) + Math.pow(y, 2.0)) / 2.0);
              const r2 = (t - b * s);
              const p = 2.0 * Math.sin(2.0 * Math.PI * (1.0 * r2 + 1.0 * r1));
              
              return `rgba(
              ${Math.round(128 + Math.sin(p * 8.0 * Math.PI) * 127)}, 
              ${Math.round(128 + Math.sin(Math.PI / 4 + p * 4.0 * Math.PI) * 127)}, 
              ${Math.round(128 + Math.cos(p * 2.0 * Math.PI) * 127)}, 
              ${0.5*(1+Math.tanh(35*(0.5-r1)))})`;
          },
          width, height);
      
      yield ctx.getImageData(0, 0, width, height);
  }
}