var treeCanvas = document.getElementById('tree');
const RESOLUTION = 2;
treeCanvas.height = window.innerHeight * RESOLUTION;
treeCanvas.width  = window.innerWidth * RESOLUTION;
var treeCtx = treeCanvas.getContext('2d');

const CONTROLS = document.getElementById('controls');
var wind;

var options = {
    windSpeed: {
        title: 'Wind',
        default: 5,
        min: 0,
        max: 100,
    },
    branchLengthMultiplier: {
        title: 'Branch scale',
        default: 75,
        min: 0,
        max: 100,
    },
    middleLengthMultiplier: {
        title: 'Middle scale',
        default: 65,
        min: 0,
        max: 100,
    },
    iterations: {
        title: 'Iterations',
        default: 8,
        min: 3,
        max: 12,
    },
    spread: {
        title: 'Spread',
        default: 30,
        min: 0,
        max: 120,
    },
    tilt: {
        title: 'Tilt',
        default: 0,
        min: -90,
        max: 90,
    },
    stemLength: {
        title: 'Stem length',
        default: -150,
        min: 0,
        max: 200,
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
    var endX = startX + Math.cos(angle) * length;
    var endY = startY + Math.sin(angle) * length;
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
    treeCtx.moveTo(treeCanvas.width / 2, treeCanvas.height);
    treeCtx.lineTo(treeCanvas.width / 2, treeCanvas.height - parseInt(options.stemLength.value));

    drawBranch(options.iterations.value, RESOLUTION * 100, treeCanvas.width / 2, parseInt(options.stemLength.value), Math.PI / 2);
    treeCtx.stroke();
}

oninput = function(e) {
    options[e.target.id].value = e.target.value;
    options[e.target.id].readout.textContent = e.target.value;
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

var playButton = document.getElementById('play_button');
playButton.onclick = function() {

    if (audio.paused) {
        audio.play();
        playButton.textContent = '||';
    } else {
        audio.pause();
        playButton.textContent = '▶';
    }
}

console.log('hi');
