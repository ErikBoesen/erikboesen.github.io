var treeCanvas = document.getElementById('tree');
const RESOLUTION = 2;

function setTreeCanvasDimensions() {
    treeCanvas.width = window.innerWidth * RESOLUTION;
    treeCanvas.height = window.innerHeight * RESOLUTION;
}
setTreeCanvasDimensions();

addEventListener('resize', setTreeCanvasDimensions);

var treeCtx = treeCanvas.getContext('2d');

const CONTROL_PANEL = document.getElementById('control-panel');
const CONTROLS = document.getElementById('controls');
const RANDOMIZE = document.getElementById('randomize');
const RIGHT_OFFSET = 130 * RESOLUTION;
var wind;

// Global options shared by all trees
var globalOptions = {
    windSpeed: {
        title: 'Wind',
        default: 5,
        min: 0,
        max: 100,
        randomize: false,
    }
};

// Individual tree options
var treeOptions = [];
for (let i = 0; i < 5; i++) {
    treeOptions.push({
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
    });
}

function createSlider(options, option, tree = null) {
    control = document.createElement('div');
    control.className = 'control';

    label = document.createElement('label');
    label.textContent = options[option].title;
    options[option].value = options[option].default;
    control.appendChild(label);

    readout = document.createElement('label');
    readout.textContent = options[option].default;
    options[option].readout = readout;
    control.appendChild(readout);

    slider = document.createElement('input');
    slider.type = 'range';
    slider.min = options[option].min;
    slider.max = options[option].max;
    slider.value = options[option].default;
    slider.id = option;
    slider.step = options[option].step || 1;
    if (tree) {
        slider.tree = tree;
    }
    options[option].slider = slider;
    control.appendChild(slider);

    CONTROLS.appendChild(control);
}

// Create sliders for global options
for (let option in globalOptions) {
    createSlider(globalOptions, option);
}

// Create sliders for each tree's options
treeOptions.forEach((treeOption, index) => {
    let treeHeader = document.createElement('h3');
    treeHeader.textContent = `Tree ${index + 1}`;
    CONTROLS.appendChild(treeHeader);

    for (let option in treeOption) {
        createSlider(treeOption, option);
    }
});

// Add event listeners to all sliders
document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener('input', function() {
        let optionName = this.id;
        let value = parseFloat(this.value);

        // Check if it's a global option
        if (globalOptions[optionName]) {
            setOption(optionName, value, globalOptions);
        } else {
            // It's a tree-specific option, find which tree it belongs to
            treeOptions.forEach(treeOption => {
                if (treeOption[optionName]) {
                    setOption(optionName, value, treeOption);
                }
            });
        }

        startTrees(); // Redraw trees with new options
    });
});



// Function to draw multiple trees
function startTrees() {
    treeCtx.strokeStyle = 'white';
    treeCtx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);

    treeOptions.forEach((options, index) => {
        treeCtx.beginPath();
        let xOffset = treeCanvas.width - RIGHT_OFFSET - index * 200; // Calculate x offset for each tree
        treeCtx.moveTo(xOffset, treeCanvas.height);
        treeCtx.lineTo(xOffset, treeCanvas.height - parseInt(options.stemLength.value));

        drawBranch(options.iterations.value, RESOLUTION * 100, xOffset, treeCanvas.height - parseInt(options.stemLength.value), 3 * Math.PI / 2, options);
        treeCtx.stroke();
    });
}

function radians(degrees) {
    return degrees * Math.PI / 180;
}

// Adjusted drawBranch function to accept options parameter
function drawBranch(iteration, length, startX, startY, angle, options) {
    treeCtx.lineWidth = iteration;
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
                   angle + radians(parseFloat(options.spread.value) + parseFloat(options.tilt.value) - wind), options);
        drawBranch(iteration - 1,
                   length * options.middleLengthMultiplier.value / 100,
                   endX, endY,
                   angle + radians(parseFloat(options.tilt.value) - wind), options);
        drawBranch(iteration - 1,
                   length * options.branchLengthMultiplier.value / 100,
                   endX, endY,
                   angle + radians(-parseFloat(options.spread.value) + parseFloat(options.tilt.value) - wind), options);
    }
}

// Adjusted RANDOMIZE event to handle multiple trees
function randomize() {
    treeOptions.forEach(options => {
        for (let option in options) {
            if (options[option].randomize === false) continue;
            let min = options[option].randomizeMin || options[option].min;
            let max = options[option].randomizeMax || options[option].max;
            setOption(option, Math.floor(Math.random() * (max - min + 1)) + min, options);
            document.getElementById(option).value = options[option].value;
        }
    });
}
randomize();
RANDOMIZE.onclick = randomize;

oninput = function(e) {
    setOption(e.target.id, e.target.value, e.target.tree);
    if (e.target.id === 'wind') {
        if (audio.paused) {
            audio.play();
        } else {
            //audio.pause();
        }
    }
};

// Adjusted setOption function to accept options parameter
function setOption(name, value, options) {
    console.log('Setting option');
    options[name].value = value;
    options[name].readout.textContent = value;
};

var audio = document.getElementById('wind_sound');

var time = 0;
startTrees();
setInterval(function() {
    time++;
    wind = (2+Math.sin(time / 20 * 2*Math.PI)) * globalOptions.windSpeed.value / 20;
    //console.log(globalOptions.windSpeed.value, globalOptions.windSpeed.max);
    audio.volume = globalOptions.windSpeed.value / globalOptions.windSpeed.max;
    startTrees();
}, 50);

