var canvas = document.getElementById('bg'),
    ctx = canvas.getContext('2d'),
    size = canvas.width;

ctx.fillStyle = '#222';
ctx.strokeStyle = '#333';
ctx.lineWidth = 2;

stepX = 10;

// Create the line
line = [];
for (x = 0; x < size; x += stepX) {
    var distanceToCenter = Math.abs(x - size / 2);
    var variance = Math.max(size/2 - 50 - distanceToCenter, 0);
    var random = Math.random() * variance / 2;
    var point = {
        x: x,
        y: random + 80
    };
    line.push(point);
}

function draw() {
    // Shift line a bit
    for (x = 0; x < line.length; x++) {
        line[x].y += (Math.random() - 0.5);
        line[x].y
    }

    // Actually draw line
    console.log(line[15].y);
    ctx.beginPath();
    ctx.moveTo(line[0].x, line[0].y);
    for (x = 1; x < line.length; x++) {
        ctx.lineTo(line[x].x, line[x].y);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
