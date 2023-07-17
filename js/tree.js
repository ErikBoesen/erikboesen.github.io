var treeCanvas = document.getElementById('tree');
const RESOLUTION = 2;
treeCanvas.height = window.innerHeight * RESOLUTION;
treeCanvas.width  = window.innerWidth * RESOLUTION;
var treeCtx = treeCanvas.getContext('2d');

const CONTROL_PANEL = document.getElementById('control-panel');
const CONTROLS = document.getElementById('controls');
const RANDOMIZE = document.getElementById('randomize');
const RIGHT_OFFSET = 130 * RESOLUTION;
var wind;

var options = {
    windSpeed: {
        title: 'Wind',
        default: 5,
        min: 0,
        max: 100,
        randomize: false,
    },
    branchLengthMultiplier: {
        title: 'Branch scale',
        default: 45,
        min: 0,
        max: 100,
        randomizeMin: 40,
        randomizeMax: 80,
    },
    middleLengthMultiplier: {
        title: 'Middle scale',
        default: 75,
        min: 10,
        max: 100,
        randomizeMin: 40,
        randomizeMax: 100,
    },
    iterations: {
        title: 'Iterations',
        default: 8,
        min: 6,
        max: 10,
        randomize: false,
    },
    spread: {
        title: 'Spread',
        default: 30,
        min: 0,
        max: 120,
        randomizeMin: 5,
        randomizeMax: 45,
    },
    tilt: {
        title: 'Tilt',
        default: 0,
        min: -90,
        max: 90,
        randomizeMin: -10,
        randomizeMax: 10,
    },
    stemLength: {
        title: 'Stem length',
        default: 0,
        min: 0,
        max: 100,
    },
    stoutness: {
        title: 'Stoutness',
        default: 2,
        min: 0,
        max: 15,
    },
    stoutnessMultiplier: {
        title: 'Stoutness factor',
        default: 2,
        min: 0.9,
        max: 5,
        step: 0.1,
    },
};

// Make options list
for (option in options) {
    control = document.createElement('div');
    control.className = 'control';

    label = document.createElement('label');
    label.textContent = options[option].title;
    options[option].value = options[option].default;
    control.appendChild(label);

    slider = document.createElement('input');
    slider.type = 'range';
    slider.min = options[option].min;
    slider.max = options[option].max;
    slider.value = options[option].default;
    slider.id = option;
    slider.step = options[option].step || 1;
    options[option].slider = slider;
    control.appendChild(slider);

    readout = document.createElement('label');
    readout.textContent = options[option].default;
    options[option].readout = readout;
    control.appendChild(readout);

    CONTROLS.appendChild(control);
}

treeCtx.strokeStyle = 'white';
function radians(degrees) {
    return degrees * Math.PI / 180;
}
function drawBranch(iteration, length, startX, startY, angle) {
    treeCtx.moveTo(startX, startY);
    let ownLength = length;
    if (options.iterations.value - iteration < options.stoutness.value) {
        ownLength /= options.stoutnessMultiplier.value;
    }
    var endX = startX + Math.cos(angle) * ownLength;
    var endY = startY + Math.sin(angle) * ownLength;
    treeCtx.lineTo(endX, endY);
    if (iteration > 0) {
        drawBranch(iteration - 1,
                   length * options.branchLengthMultiplier.value / 100,
                   endX, endY,
                   angle + radians(parseFloat(options.spread.value) + parseFloat(options.tilt.value) + wind));
        drawBranch(iteration - 1,
                   length * options.middleLengthMultiplier.value / 100,
                   endX, endY,
                   angle + radians(parseFloat(options.tilt.value) + wind));
        drawBranch(iteration - 1,
                   length * options.branchLengthMultiplier.value / 100,
                   endX, endY,
                   angle + radians(-parseFloat(options.spread.value) + parseFloat(options.tilt.value) + wind));
    }
}

function startTree() {
    treeCtx.beginPath();
    treeCtx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);

    // Draw extra line at the bottom so that leaves don't touch the ground too quickly
    treeCtx.moveTo(treeCanvas.width - RIGHT_OFFSET, 0);
    treeCtx.lineTo(treeCanvas.width - RIGHT_OFFSET, parseInt(options.stemLength.value));

    drawBranch(options.iterations.value, RESOLUTION * 100, treeCanvas.width - RIGHT_OFFSET, parseInt(options.stemLength.value), Math.PI / 2);
    treeCtx.stroke();
}

function setOption(name, value) {
    options[name].value = value;
    options[name].readout.textContent = value;
};

oninput = function(e) {
    setOption(e.target.id, e.target.value);
    if (e.target.id === 'wind') {
        if (audio.paused) {
            audio.play();
        } else {
            //audio.pause();
        }
    }
};

var audio = document.getElementById('wind_sound');

var time = 0;
startTree();
setInterval(function() {
    time++;
    wind = (2+Math.sin(time / 20 * 2*Math.PI)) * options.windSpeed.value / 20;
    audio.volume = options.windSpeed.value / options.windSpeed.max;
    startTree();
}, 50);

RANDOMIZE.onclick = function() {
    for (let option in options) {
        // Intentional; no value should be interpreted as true by default
        if (options[option].randomize === false) {
            continue;
        }

        console.log(options[option].randomizeMin);
        let min = options[option].randomizeMin || options[option].min;
        let max = options[option].randomizeMax || options[option].max;
        setOption(option, Math.floor(Math.random() * (max - min + 1)) + min);
        document.getElementById(option).value = options[option].value;
        console.log(options[option].value);
    }
}
