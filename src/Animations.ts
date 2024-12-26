// src/Animations.ts

export class Animations {
  static Animation20241225_1(
    fps: number,
    duration: number,
  ) {
    const upper = Math.floor(duration * fps);
    let k = 0;

    const xFunction = (t: number, normalizedTime: number, j: number, i: number): number => {
      return 0.5 + j * 0.35 * Math.cos(
        j * Math.PI * 0.125 + i * normalizedTime * 40 * Math.PI
      ) * (0.5 - 0.5 * Math.cos(
        (4.0 - (Math.abs(2.0 - 4.0 * t) * 2.0 + 2.0 * (2.0 + (1.0 - Math.abs(1.0 - 2.0 * normalizedTime)))) * Math.PI)
      ));
    };

    const yFunction = (t: number, normalizedTime: number, j: number, i: number): number => {
      return 0.5 - j * 0.35 * Math.sin(
        -i * normalizedTime * 40 * Math.PI
      ) * (0.5 + 0.5 * Math.sin(
        (2.0 - (Math.abs(1.0 - 2.0 * t) * 2.0 + 2.0 * (4.0 + (2.0 - Math.abs(2.0 - 4.0 * normalizedTime)))) * Math.PI)
      ));
    };

    const colorFunction = (t: number, normalizedTime: number, j: number, i: number): string => {
      const r = Math.round(128.0 - 127.0 * (j * Math.cos(Math.PI * (3.0 * t - i * normalizedTime))));
      const g = Math.round(128.0 + 127.0 * (j * Math.sin(Math.PI * (3.0 * t + i * normalizedTime))));
      return `rgba(${r}, ${g}, 128, 0.0625)`; // Alpha is 16 / 256
    };

    const widthFunction = (t: number, normalizedTime: number): number => {
        return 0.1*(1.0+Math.sin(42*Math.PI*t)*Math.sin(20*Math.PI*normalizedTime));
    };
    const deltaFunction = (t: number, normalizedTime: number): number => {
        return 0.00075+0.0007*Math.sin(Math.PI*2.0*t + Math.PI*Math.sin(80.0*Math.PI*normalizedTime));
    }
    return () => {
      if (k >= upper) {
        return null; // End of animation
      }

      const normalizedTime = k / upper;
      const functions: Array<{ 
        x: (t: number) => number; 
        y: (t: number) => number; 
        color: (t: number) => string;
        width: (t: number) => number;
        delta: (t: number) => number;
       }> = [];

      const list = [-1.0, 1.0];

      for (let i = 0; i < 2; i++) {
        for (let jIndex = 0; jIndex < 2; jIndex++) {
          const j = list[jIndex];
          
          const xFunc = (t: number) => xFunction(t, normalizedTime, j, i);
          const yFunc = (t: number) => yFunction(t, normalizedTime, j, i);
          const colorFunc = (t: number) => colorFunction(t, normalizedTime, j, i);
          const widthFunc = (t: number) => widthFunction(t,normalizedTime);
          const deltaFunc = (t: number) => deltaFunction(t,normalizedTime);

          functions.push({
            x: xFunc,
            y: yFunc,
            color: colorFunc,
            width: widthFunc,
            delta: deltaFunc
          });
        }
      }

      k++;
      return functions;
    };
  }
}