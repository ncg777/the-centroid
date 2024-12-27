// drawParametric.ts
export default function drawParametric2D(
    ctx: CanvasRenderingContext2D,
    x: (t: number) => number,
    y: (t: number) => number,
    fromInclusive: number,
    toExclusive: number,
    translateX: (t: number) => number,
    translateY: (t: number) => number,
    scaleX: (t: number) => number,
    scaleY: (t: number) => number,
    width: (t: number) => number,
    color: (t: number) => string,
    deltaf: (t: number) => number
): void {
    ctx.lineWidth = 2;
    
    for (let t = fromInclusive; t < toExclusive; t += deltaf(t)) {
        const delta = deltaf(t);
        const c = color(t);
        ctx.strokeStyle = c;
        ctx.fillStyle = c;

        const sx = scaleX(t);
        const sy = scaleY(t);
        const tx = translateX(t);
        const ty = translateY(t);

        const A_x = sx * (x(t) + tx);
        const A_y = sy * (y(t) + ty);
        const B_x = sx * (x(t + delta) + tx);
        const B_y = sy * (y(t + delta) + ty);

        const x_ccw = A_x - (B_y - A_y);
        const y_ccw = A_y + (B_x - A_x);
        const x_cw = A_x + (B_y - A_y);
        const y_cw = A_y - (B_x - A_x);

        const w = width(t);
        const f = w / (2.0 * Math.sqrt(Math.pow(B_x - A_x, 2.0) + Math.pow(B_y - A_y, 2.0)));

        ctx.beginPath();
        ctx.moveTo(A_x, A_y);
        ctx.lineTo(A_x + f * sx * (x_ccw - A_x), A_y + f * sy * (y_ccw - A_y));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(A_x, A_y);
        ctx.lineTo(A_x + f * sx * (x_cw - A_x), A_y + f * sy * (y_cw - A_y));
        ctx.stroke();
    }
}