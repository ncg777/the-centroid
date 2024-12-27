export default function drawColorField2D(
    ctx: CanvasRenderingContext2D,
    color: (x: number, y: number) => string,
    width: number,
    height: number
): void {
    ctx.reset();
    for (let x = 0; x < width; x++) {
        const xnorm = (x / width) * 2.0 - 1.0; // Normalize x to the range [-1,1]
        for (let y = 0; y < height; y++) {
            const ynorm = (y / height) * 2.0 - 1.0; // Normalize y to the range [-1,1]
            const c = color(xnorm, ynorm);
            ctx.fillStyle = c;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}