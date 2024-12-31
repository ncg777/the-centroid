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
    color: (t: number, u: number) => string,
    deltaf: (t: number) => number
): void {
    ctx.lineWidth = 2;
    
    for (let t = fromInclusive; t < toExclusive; t += deltaf(t)) {
        const delta = deltaf(t);
        
        const sx = scaleX(t);
        const sy = scaleY(t);
        const tx = translateX(t);
        const ty = translateY(t);

        const A_x = sx * (x(t) + tx);
        const A_y = sy * (y(t) + ty);
        const B_x = sx * (x(t + delta) + tx);
        const B_y = sy * (y(t + delta) + ty);

        let x_ccw = A_x - (B_y - A_y);
        let y_ccw = A_y + (B_x - A_x);
        let x_cw = A_x + (B_y - A_y);
        let y_cw = A_y - (B_x - A_x);

        const w = width(t);
        const f = w / (2.0 * Math.sqrt(Math.pow(B_x - A_x, 2.0) + Math.pow(B_y - A_y, 2.0)));
        x_ccw = A_x+f*sx*(x_ccw-A_x);
        y_ccw = A_y+f*sy*(y_ccw-A_y);
        x_cw = A_x+f*sx*(x_cw-A_x);
        y_cw = A_y+f*sy*(y_cw-A_y);
        
        const dx = x_ccw-A_x;
        const dy = y_ccw-A_y;
        const l = Math.sqrt(Math.pow(dx, 2.0)+Math.pow(dy, 2.0));
        const invl = 1.0/l;

        let interX = 0;
        let interY = 0;

        // For the counterclockwise side (from the center to x_ccw, y_ccw)
        for (let u = 0; u < 1; u += invl) { 
            ctx.fillStyle = color(t, u);

            interX = A_x + u * (x_ccw - A_x);
            interY = A_y + u * (y_ccw - A_y);
            
            ctx.beginPath();
            ctx.fillRect(interX, interY, 1, 1);
            ctx.fill();

            interX = A_x + u * (x_cw - A_x);
            interY = A_y + u * (y_cw - A_y);
            
            ctx.beginPath();
            ctx.fillRect(interX, interY, 1, 1);
            ctx.fill();
        }
    }
}