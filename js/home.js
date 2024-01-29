const E_NAME = document.getElementById('name');

/////////////////////////
// Name element splitting
//
let name = E_NAME.textContent;
let i = 0;
E_NAME.textContent = '';
const CLASS = 'letter',
      PREFIX = 'letter_';

for (let letter of name) {
    let container = document.createElement('span');
    container.textContent = letter;
    if (letter != ' ') {
        container.className = CLASS;
        container.id = PREFIX + i;
        container.onmouseenter = function(e) {
            console.log('Entered!');
            if (mouseDown) playKey(e.target);
        }
        i++;
    }
    E_NAME.appendChild(container);
}

////////
// Piano
//
let audioCtx = null;
let volume = 0.6;

function playNote(frequency, callback) {
    if (audioCtx === null) {
        audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    }
    let oscillator = new OscillatorNode(audioCtx);
    let gain = new GainNode(audioCtx);
    oscillator.type = 'triangle';
    oscillator.frequency.value = frequency;
    oscillator.connect(gain).connect(audioCtx.destination);
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    oscillator.start();
    let duration = 500;
    let stopTime = audioCtx.currentTime + (duration / 1000);
    gain.gain.setValueAtTime(volume, stopTime - 0.25);
    gain.gain.linearRampToValueAtTime(0, stopTime);

    setTimeout(function() {
        oscillator.stop();
        callback();
    }, duration);
}

const notes = [
    261.626,
    293.665,
    329.628,
    349.228,
    391.995,
    440,
    493.883,

    523.251,
    587.33,
    659.255,
    698.456,
    783.991,
    880,
    987.767,
    1046.502,
    1174.659,
    1318.51,
    1396.913,
    1567.982,
    1760,
];

function colorRange(min, max) {
    return min + (Math.random() * (max - min));
}
function color() {
    return 'hsl(' + colorRange(0, 255) + ',' + colorRange(60, 80) + '%,' + colorRange(60, 70) + '%)';
}

function playKey(target) {
    if (target.className == CLASS) {
        let index = parseInt(target.id.slice(PREFIX.length));
        target.style.color = color();
        playNote(notes[index], function() {
            target.style.removeProperty('color');
        });
    }
}
mouseDown = false;
addEventListener('mousedown', function(e) {
    playKey(e.target);
    mouseDown = true;
});
onmouseup = function() {
    mouseDown = false;
}

/////////////////////////
// Dark Mode
//
const E_NIGHT = document.getElementById('night');
let dark_mode = false;
E_NIGHT.onclick = function() {
    dark_mode = !dark_mode;
    document.body.classList.toggle('dark');
}
