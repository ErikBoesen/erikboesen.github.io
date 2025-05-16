const planesCanvas = document.getElementById('planes');
const ctx = planesCanvas.getContext('2d');
const CANVAS_RESOLUTION = 4;

const PLANE_WIDTH = 512,
      PLANE_HEIGHT = 342,
      PLANE_SIZE_MULTIPLIER = 0.1;
let PLANE_DRAW_WIDTH, PLANE_DRAW_HEIGHT;

function setPlaneCanvasDimensions() {
    planesCanvas.width = window.innerWidth * CANVAS_RESOLUTION;
    planesCanvas.height = window.innerHeight * CANVAS_RESOLUTION;
    PLANE_DRAW_WIDTH = parseInt(PLANE_WIDTH * PLANE_SIZE_MULTIPLIER);
    PLANE_DRAW_HEIGHT = parseInt(PLANE_HEIGHT * PLANE_SIZE_MULTIPLIER);

    console.log('Setting dimensions: ', planesCanvas.width, planesCanvas.height);
}
setPlaneCanvasDimensions();

addEventListener('resize', setPlaneCanvasDimensions);


ctx.strokeStyle = '#000000';
ctx.lineWidth = 1 * CANVAS_RESOLUTION;

let instructions = document.getElementById('instructions');

let currentPlane = null;
let startPosition = null;
let planes = [];

const CLOUD_IMAGE_DIMENSIONS = [
    [2923, 1202], [2986, 1853], [2247, 823], [2858, 1326], [2214, 1291], [1992, 1103], [4336, 2099], [2097, 1115], [1657, 1138], [2420, 1338], [2653, 1267], [3033, 1696], [2181, 638], [2674, 526], [1923, 892], [3358, 2230], [3232, 1232], [2993, 1967], [2065, 1211], [1608, 1065], [1440, 1093], [2936, 1824], [3490, 2759], [1934, 1140], [2072, 1153], [2217, 1814], [3021, 2194], [3300, 2949], [3967, 2443], [3580, 1934], [3007, 703], [3411, 1746], [3852, 1420], [4452, 2495], [3495, 1646], [3732, 1983], [3709, 2015], [2478, 1372], [2781, 1337], [1316, 926], [1533, 796], [1422, 822], [2081, 891], [1556, 994], [1885, 932], [3259, 1916], [2819, 1225], [3091, 1610], [3335, 1960], [2610, 2276],
];

function randomDigit() {
    return String(Math.floor(Math.random() * 10));
}

function generateCloud(x) {
    let cloud = {
        x: x,
        y: Math.random() * 200 + 550,
        components: [],
    };
    let imageIndex = Math.floor(Math.random() * 50);
    let [width, height] = CLOUD_IMAGE_DIMENSIONS[imageIndex];
    cloud.width = width / 5;
    cloud.height = height / 5;
    let image = new Image(width, height);
    image.src = 'images/clouds/' + imageIndex + '.png';
    cloud.image = image;
    mainComponentR = Math.random() * 150 + 200;
    cloud.components.push({xo: 0, yo: 0, r: 200});
    cloud.components.push({xo: (Math.random() * -mainComponentR / 2) - mainComponentR / 2, yo: Math.random() * 60 - 30, r: (Math.random() * mainComponentR / 2) + mainComponentR / 3});
    cloud.components.push({xo: (Math.random() * mainComponentR / 2) + mainComponentR / 2, yo: Math.random() * 60 - 30, r: (Math.random() * mainComponentR / 2) + mainComponentR / 3});
    return cloud;
}
let clouds = [];
let cloudX = planesCanvas.width/8;
for (let i = 0; i < 10; i++) {
    clouds.push(generateCloud(cloudX));
    cloudX += Math.random() * (planesCanvas.width / 2) + (planesCanvas.width / 8);
}

let mouseDown = false;
let xOld, yOld, x, y;
let mousePosition = null;

let planeImageLeft = new Image(PLANE_WIDTH, PLANE_HEIGHT);
planeImageLeft.src = 'images/plane_left.png';
let planeImageRight = new Image(PLANE_WIDTH, PLANE_HEIGHT);
planeImageRight.src = 'images/plane_right.png';

const PLANE_SPEED = 0.06;
const G = 0.05;
const PLANE_WIND_SPEED_MULTIPLIER = 0.005;
let spamPlanes = false;
const CLOUD_WIND_SPEED_MULTIPLIER = 0.1;

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
    document.body.style.cursor = 'cell';

    // For tree:
    CONTROL_PANEL.classList.add('shown');
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
    document.body.style.cursor = 'crosshair';
});
onmousemove = function(e) {
    mousePosition = {
        x: e.clientX - planesCanvas.offsetLeft,
        y: e.clientY - planesCanvas.offsetTop
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
    for (cloud of clouds) {
        cloud.x -= globalOptions.windSpeed.value * CLOUD_WIND_SPEED_MULTIPLIER;
    }

    planes = planes.filter(function(plane) {
        return (
            plane.x > 0 - PLANE_DRAW_WIDTH &&
            plane.x < planesCanvas.width + PLANE_DRAW_WIDTH &&
            plane.y < planesCanvas.height + PLANE_DRAW_HEIGHT
        );
    });
    for (plane of planes) {
        plane.x += plane.xSpeed;
        plane.y += plane.ySpeed;
        plane.xSpeed -= globalOptions.windSpeed.value * PLANE_WIND_SPEED_MULTIPLIER;
        plane.ySpeed += G;
    }
    if (spamPlanes && Math.random() < 0.3) {
        console.log('Adding plane');
        planes.push({
            //x: Math.floor(Math.random() * planesCanvas.width),
            //y: Math.floor(1.1 * planesCanvas.height),
            x: Math.random() * planesCanvas.width,
            y: 1.1 * planesCanvas.height / CANVAS_RESOLUTION,
            xSpeed: (Math.random() * 2 - 1),
            ySpeed: (Math.random() - 1) * 15,
        });
    }
}
function draw() {
    ctx.clearRect(0, 0, planesCanvas.width, planesCanvas.height);

    for (cloud of clouds) {
        for (component of cloud.components) {
            /*
            ctx.beginPath();
            ctx.arc(cloud.x + component.xo, cloud.y + component.yo, component.r, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            */
        }
        ctx.drawImage(cloud.image, cloud.x, cloud.y, cloud.width, cloud.height);
    }

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
