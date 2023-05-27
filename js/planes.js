const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const CANVAS_RESOLUTION = 4;

canvas.width = window.innerWidth * CANVAS_RESOLUTION;
canvas.height = window.innerHeight * CANVAS_RESOLUTION;

ctx.strokeStyle = '#000000';
ctx.lineWidth = 1 * CANVAS_RESOLUTION;

let instructions = document.getElementById('instructions');

let currentPlane = null;
let startPosition = null;
let planes = [];

let mouseDown = false;
let xOld, yOld, x, y;
let mousePosition = null;

const PLANE_WIDTH = 512,
      PLANE_HEIGHT = 342,
      PLANE_SIZE_MULTIPLIER = 0.1,
      PLANE_DRAW_WIDTH = parseInt(PLANE_WIDTH * PLANE_SIZE_MULTIPLIER),
      PLANE_DRAW_HEIGHT = parseInt(PLANE_HEIGHT * PLANE_SIZE_MULTIPLIER);
let planeImageLeft = new Image(PLANE_WIDTH, PLANE_HEIGHT);
planeImageLeft.src = 'images/plane_left.png';
let planeImageRight = new Image(PLANE_WIDTH, PLANE_HEIGHT);
planeImageRight.src = 'images/plane_right.png';

const PLANE_SPEED = 0.06;
const G = 0.05;
let spamPlanes = false;

addEventListener('mousedown', function(e) {
    console.log('Mouse down!');
    if (instructions) {
        instructions.parentNode.removeChild(instructions);
        instructions = null;
    }
    mouseDown = true;
    currentPlane = {
        x: mousePosition.x,
        y: mousePosition.y,
    };
});
addEventListener('mouseup', function(e) {
    console.log('Mouse up!');
    if (currentPlane === null) {
        return;
    }
    mouseDown = false;
    currentPlane.xSpeed = PLANE_SPEED * (currentPlane.x - mousePosition.x);
    currentPlane.ySpeed = PLANE_SPEED * (currentPlane.y - mousePosition.y);
    planes.push(currentPlane);
    currentPlane = null;
});
onmousemove = function(e) {
    mousePosition = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    };
    if (mouseDown) {
    }
};
onkeydown = function(e) {
    if (e.keyCode == 32) {
        spamPlanes = !spamPlanes;
    }
}

function move() {
    planes = planes.filter(function(plane) {
        return (
            plane.x > 0 - PLANE_DRAW_WIDTH &&
            plane.x < canvas.width + PLANE_DRAW_WIDTH &&
            plane.y < canvas.height + PLANE_DRAW_HEIGHT
        );
    });
    for (plane of planes) {
        plane.x += plane.xSpeed;
        plane.y += plane.ySpeed;
        plane.ySpeed += G;
    }
    if (spamPlanes && Math.random() < 0.3) {
        console.log('Adding plane');
        planes.push({
            //x: Math.floor(Math.random() * canvas.width),
            //y: Math.floor(1.1 * canvas.height),
            x: Math.random() * canvas.width,
            y: 1.1 * canvas.height / CANVAS_RESOLUTION,
            xSpeed: (Math.random() * 2 - 1),
            ySpeed: (Math.random() - 1) * 15,
        });
        console.log(planes[planes.length - 1]);
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shownPlanes = planes.slice();
    if (mouseDown && currentPlane != null) {
        let lineDashLength = Math.sqrt(Math.pow(currentPlane.x - mousePosition.x, 2) +
                              Math.pow(currentPlane.y - mousePosition.y, 2)) * 0.05;
        ctx.setLineDash([lineDashLength * CANVAS_RESOLUTION, lineDashLength / 2 * CANVAS_RESOLUTION]);
        ctx.beginPath();
        ctx.moveTo(currentPlane.x * CANVAS_RESOLUTION, currentPlane.y * CANVAS_RESOLUTION);
        ctx.lineTo(mousePosition.x * CANVAS_RESOLUTION, mousePosition.y * CANVAS_RESOLUTION);
        ctx.stroke();
    }
    if (currentPlane) {
        shownPlanes.push(currentPlane);
    }
    for (plane of shownPlanes) {
        ctx.save();
        ctx.translate(plane.x * CANVAS_RESOLUTION, plane.y * CANVAS_RESOLUTION);
        let xOffset, yOffset;
        if (plane == currentPlane) {
            xOffset = plane.x - mousePosition.x;
            yOffset = plane.y - mousePosition.y;
        } else {
            xOffset = plane.xSpeed;
            yOffset = plane.ySpeed;
        }
        let planeLeft = (xOffset < 0);
        let angle = planeLeft ?
                        -Math.atan2(yOffset, -xOffset) :
                        Math.atan2(yOffset, xOffset);
        angle += (planeLeft ? -Math.PI : Math.PI) / 6;
        ctx.rotate(angle);
        ctx.drawImage(planeLeft ? planeImageLeft : planeImageRight,
                      -PLANE_DRAW_WIDTH / 2 * CANVAS_RESOLUTION, -PLANE_DRAW_HEIGHT / 2 * CANVAS_RESOLUTION,
                      PLANE_DRAW_WIDTH * CANVAS_RESOLUTION, PLANE_DRAW_HEIGHT * CANVAS_RESOLUTION);
        ctx.restore();
    }
}
setInterval(function() {
    move();
    draw();
}, 20);
