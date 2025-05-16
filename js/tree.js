var treeCanvas = document.getElementById('tree');
const RESOLUTION = 2;

function setTreeCanvasDimensions() {
    treeCanvas.width = window.innerWidth * RESOLUTION;
    treeCanvas.height = window.innerHeight * RESOLUTION;
}
setTreeCanvasDimensions();

addEventListener('resize', setTreeCanvasDimensions);

var treeCtx = treeCanvas.getContext('2d');

const CONTROL_PANEL_TAB = document.getElementById('control-panel-tab');
const CONTROL_PANEL = document.getElementById('control-panel');
const CONTROLS = document.getElementById('controls');
const RANDOMIZE = document.getElementById('randomize');
const SIDE_OFFSET = 20 * RESOLUTION;
const TREE_SPACING = 100;
const NUM_TREES = 35;
var wind;

// Global options shared by all trees
var globalOptions = {
    windSpeed: {
        title: 'Wind',
        default: 5,
        min: -100,
        max: 100,
        randomize: false,
    }
};

// Individual tree options
var treeOptions = [];
for (let i = 0; i < NUM_TREES; i++) {
    treeOptions.push({
        branchLengthMultiplier: {
            title: 'Branch scale',
            default: 45,
            min: 0,
            max: 100,
            randomizeMin: 40,
            randomizeMax: 60,
        },
        middleLengthMultiplier: {
            title: 'Middle scale',
            default: 75,
            min: 10,
            max: 100,
            randomizeMin: 40,
            randomizeMax: 70,
        },
        iterations: {
            title: 'Iterations',
            default: 150,
            min: 6,
            max: 10,
            randomize: false,
        },
        spread: {
            title: 'Spread',
            default: 30,
            min: 0,
            max: 120,
            randomizeMin: 15,
            randomizeMax: 50,
        },
        tilt: {
            title: 'Tilt',
            default: 0,
            min: -90,
            max: 90,
            randomizeMin: -3,
            randomizeMax: 3,
        },
        stemLength: {
            title: 'Stem length',
            default: -50,
            min: -50,
            max: 100,
            randomizeMax: 10,
        },
        growthStage: {
            title: 'Growth stage',
            default: 7,
            min: 0,
            max: 10,
            randomizeMax: 3,
        },
        smolness: {
            title: 'Smolness',
            default: 2,
            min: 0.9,
            max: 5,
            step: 0.1,
        },
        leftMargin: {
            title: 'Left margin',
            default: 100,
            min: 20,
            max: 300,
            randomizeMin: 90,
            randomizeMax: 100,
        }
    });
}

function createSlider(options, option, treeIndex = null) {
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
    if (treeIndex !== null) {
        slider.setAttribute('tree-index', treeIndex);
    }
    options[option].slider = slider;
    control.appendChild(slider);

    return control;
}

// Create sliders for global options
for (let option in globalOptions) {
    CONTROLS.appendChild(
        createSlider(globalOptions, option)
    );
}

let treeOptionContainers = [];
let buttonRow = document.createElement('div');
buttonRow.className = 'button-row'
let treeButtons = [];
treeOptions.forEach((_, index) => {
    let button = document.createElement('button');
    button.textContent = index + 1;
    button.onclick = () => {
        for (let treeOptionContainer of treeOptionContainers) {
            treeOptionContainer.classList.remove('active')
        }
        for (let treeButton of treeButtons) {
            treeButton.classList.remove('active');
        }
        treeOptionContainers[index].classList.add('active');
        treeButtons[index].classList.add('active');
    };
    treeButtons.push(button);
    buttonRow.appendChild(button);
});
CONTROLS.appendChild(buttonRow);

// Create sliders for each tree's options
treeOptions.forEach((treeOption, index) => {
    let treeOptionContainer = document.createElement('div');
    treeOptionContainer.classList.add('tree-option-container');

    for (let option in treeOption) {
        treeOptionContainer.appendChild(
            createSlider(treeOption, option, index)
        );
    }
    treeOptionContainers.push(treeOptionContainer);
    CONTROLS.appendChild(treeOptionContainer);
});
treeOptionContainers[0].classList.add('active');
treeButtons[0].classList.add('active');

// Function to draw multiple trees
function startTrees() {
    treeCtx.strokeStyle = 'white';
    treeCtx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);

    treeOptions.forEach((options, index) => {
        treeCtx.beginPath();
        let xOffset = SIDE_OFFSET + index * options.leftMargin.value;
        treeCtx.moveTo(xOffset, treeCanvas.height);
        treeCtx.lineTo(xOffset, treeCanvas.height - parseInt(options.stemLength.value));

        drawBranch(options.iterations.value, RESOLUTION * 100, xOffset, treeCanvas.height - parseInt(options.stemLength.value), 3 * Math.PI / 2, options, index);
        treeCtx.stroke();
    });
}

function radians(degrees) {
    return degrees * Math.PI / 180;
}

// Adjusted drawBranch function to accept options parameter
function drawBranch(iteration, length, startX, startY, angle, options, treeIndex) {
    if (iteration <= 0) {
        return;
    }
    // Also early exit if the lines have gotten really small, to conserve resources
    if (length < 3) {
        return;
    }
    //treeCtx.lineWidth = iteration;
    treeCtx.lineWidth = 1;
    treeCtx.moveTo(startX, startY);
    let ownLength = length;
    if (options.iterations.value - iteration < (10 - options.growthStage.value)) {
        ownLength /= options.smolness.value;
    }
    let endX = startX + Math.cos(angle) * ownLength;
    let endY = startY + Math.sin(angle) * ownLength;
    treeCtx.lineTo(endX, endY);
    let wind = (2+Math.sin(treeIndex + time / 20 * 2*Math.PI)) * globalOptions.windSpeed.value / 20;

    drawBranch(iteration - 1,
               length * options.branchLengthMultiplier.value / 100,
               endX, endY,
               angle + radians(parseFloat(options.spread.value) + parseFloat(options.tilt.value) - wind), options, treeIndex);
    drawBranch(iteration - 1,
               length * options.middleLengthMultiplier.value / 100,
               endX, endY,
               angle + radians(parseFloat(options.tilt.value) - wind), options, treeIndex);
    drawBranch(iteration - 1,
               length * options.branchLengthMultiplier.value / 100,
               endX, endY,
               angle + radians(-parseFloat(options.spread.value) + parseFloat(options.tilt.value) - wind), options, treeIndex);
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
    let options = globalOptions;
    const treeIndex = e.target.getAttribute('tree-index');
    if (treeIndex) options = treeOptions[parseInt(treeIndex)];
    setOption(e.target.id, e.target.value, options);
    if (e.target.id === 'wind') {
        if (audio.paused) {
            audio.play();
        } else {
            //audio.pause();/
        }
    }
};

// Adjusted setOption function to accept options parameter
function setOption(name, value, options) {
    options[name].value = value;
    options[name].readout.textContent = value;
};

var audio = document.getElementById('wind_sound');

var time = 0;
startTrees();
setInterval(function() {
    time++;
    //console.log(globalOptions.windSpeed.value, globalOptions.windSpeed.max);
    audio.volume = globalOptions.windSpeed.value / globalOptions.windSpeed.max;
    startTrees();
}, 50);


CONTROL_PANEL_TAB.addEventListener('click', () => {
    CONTROL_PANEL.classList.toggle('open');
});
