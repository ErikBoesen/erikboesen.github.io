const E_NAME = document.getElementById('name');

////////////////////
// Email obfuscation
//
const ADDR = 'me',
      DOMAIN = 'erikboesen.com';
document.getElementById('email').href = 'mailto' + ':' + ADDR + '@' + DOMAIN;

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
onmousedown = function(e) {
    console.log('Mouse down!');
    playKey(e.target);
    mouseDown = true;
}
onmouseup = function() {
    console.log('Mouse up!');
    mouseDown = false;
}

//////////////
// Vexillology
//
const E_PORTRAIT = document.getElementById('portrait'),
      E_FLAG = document.getElementById('flag'),
      E_VEXILLOLOGY = document.getElementById('vexillology');

E_VEXILLOLOGY.onclick = function(e) {
    e.preventDefault();
    E_FLAG.style.display = 'inline-block';
    flaggify();
};

const F_LIGHT = 1;
const FLAGS = [
    {
        name: 'Austria',
        image: 'austria',
        colors: [
            '#C8102E',
        ],
    },
    {
        name: 'Canada',
        image: 'canada',
        colors: [
            '#EF3340',
        ],
    },
    {
        name: 'Chile',
        image: 'chile',
        colors: [
            '#0033A0',
            '#DA291C',
        ],
    },
    {
        name: 'Colorado',
        image: 'colorado',
        colors: [
            '#002868',
            '#bf0a30',
            'gold',
        ],
    },
    {
        name: 'Washington D.C.',
        image: 'dc',
        colors: [
            '#e81b39',
        ],
    },
    {
        name: 'Denmark',
        image: 'denmark',
        colors: [
            '#c60c30',
        ],
    },
    {
        name: 'New Mexico',
        image: 'new_mexico',
        colors: [
            '#ffd700',
        ],
    },
    {
        name: 'United Nations',
        image: 'un',
        colors: [
            '#418fde',
        ],
    },
];

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
shuffle(FLAGS);

let flag_index = -1;
const NAME_OFFSET = 5;
function flaggify() {
    flag_index = (flag_index + 1) % FLAGS.length;
    const flag = FLAGS[flag_index];
    E_FLAG.src = 'images/flags/' + flag.image + '.svg';
    E_FLAG.title = flag.name;
    E_FLAG.alt = flag.name + ' flag';
    for (letter_index = NAME_OFFSET; letter_index < E_NAME.childNodes.length; letter_index++) {
        let color = flag.colors[0];
        E_NAME.childNodes[letter_index].style.color = color;
    }
}
