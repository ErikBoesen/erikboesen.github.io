const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

let ops = {
    lineCount: 30,
    lineLength: 15,
    rotationIncrement: -0.02,
    rotationDifference: 0.4,
}

canvas.width = ops.lineLength * ops.lineCount;
canvas.height = ops.lineLength;

ctx.globalAlpha = 0.05;
ctx.strokeStyle = '#333333';
ctx.lineWidth = 2;

let baseTheta = 0;

function line(ox, oy, theta) {
    let r = ops.lineLength / 2,
        x = r * Math.cos(theta),
        y = r * Math.sin(theta);
    ctx.moveTo(ox - x, oy - y);
    ctx.lineTo(ox + x, oy + y);
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    for (let i = 0; i < ops.lineCount; i++) {
        line(i * ops.lineLength + ops.lineLength / 2, ops.lineLength / 2, baseTheta + i * ops.rotationDifference);
    }

    baseTheta += ops.rotationIncrement;
}

draw();
setInterval(draw, 8);
