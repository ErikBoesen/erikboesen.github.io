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
var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration, callback) {
    var oscillator = audioCtx.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.connect(audioCtx.destination);
    oscillator.start();

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

function colorRange() {
    return Math.random() * 255;
}
function color() {
    return 'rgb(' + colorRange() + ',' + colorRange() + ',' + colorRange() + ')';
}

function playKey(target) {
    if (target.className == CLASS) {
        let index = parseInt(target.id.slice(PREFIX.length));
        target.style.color = color();
        playNote(notes[index], 200, function() {
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

/////////////////////////
// Link to Alice Mao
//
const E_PORTRAIT = document.getElementById('portrait');
E_PORTRAIT.onclick = function() {
    window.open('https://alice-mao.com', '_blank');
}
