let canvas = document.getElementById('canv');
const SIZE = 5;
const WIDTH = Math.ceil(window.innerWidth / SIZE);
const HEIGHT = Math.ceil(window.innerHeight / SIZE);
const MAX_GRASS_GROWTH = 20;
const GRASS_GROWTH_SPEED = 400;
const STARTING_BUNNY_COUNT = 20;
const BUNNY_PADDING = 1;
const REPRODUCTION_COOLDOWN = 10;
const MAX_TIME_WITHOUT_FOOD = 3;
canvas.height = HEIGHT * SIZE;
canvas.width  = WIDTH * SIZE;
let ctx = canvas.getContext('2d');

console.log('Started run.');

let grass = [];
for (row = 0; row < HEIGHT; row++) {
    grass.push([]);
    for (col = 0; col < WIDTH; col++) {
        grass[row].push(MAX_GRASS_GROWTH);
    }
}
function jump() {
    return Math.floor(Math.random() * 3 - 1);
}
function random_x() {
    return Math.floor(Math.random() * WIDTH);
}
function random_y() {
    return Math.floor(Math.random() * HEIGHT);
}
let bunnies = [];
for (count = 0; count < STARTING_BUNNY_COUNT; count++) {
    bunnies.push({
        time_since_reproduction: REPRODUCTION_COOLDOWN,
        time_since_ate: 0,
        x: random_x(),
        y: random_y(),
    });
}
let wolves = [];

function tick() {
    // Restore grass
    for (square = 0; square < GRASS_GROWTH_SPEED; square++) {
        restore_x = random_x();
        restore_y = random_y();
        if (grass[restore_y][restore_x] < MAX_GRASS_GROWTH) grass[restore_y][restore_x] += 1
    }
    // Reproduce bunnies
    var starting_bunny_count = bunnies.length;
    if (starting_bunny_count < WIDTH * HEIGHT) {
        for (bunny = 0; bunny < starting_bunny_count; bunny++) {
            for (partner = 0; partner < starting_bunny_count; partner++) {
                // If two bunnies are in the same place, reproduce.
                if (bunny != partner
                        && bunnies[bunny].x == bunnies[partner].x
                        && bunnies[bunny].y == bunnies[partner].y
                        && bunnies[bunny].time_since_reproduction >= REPRODUCTION_COOLDOWN
                        && bunnies[partner].time_since_reproduction >= REPRODUCTION_COOLDOWN) {
                    // Duplicate bunny and add to array
                    console.log('Duplicating bunny');
                    bunnies[bunny].time_since_reproduction = 0;
                    bunnies[partner].time_since_reproduction = 0;
                    bunnies.push({
                        time_since_reproduction: 0,
                        time_since_ate: 0,
                        x: bunnies[bunny].x,
                        y: bunnies[bunny].y,
                    });
                }
            }
        }
    }
    for (bunny of bunnies) {
        bunny.time_since_reproduction += 1;
        bunny.time_since_ate += 1;
        if (grass[bunny.y][bunny.x] > 0) {
            grass[bunny.y][bunny.x] -= 1;
            bunny.time_since_ate = 0;
        }
        bunny.x += jump();
        bunny.y += jump();
        if (bunny.x < 0) bunny.x = 0;
        else if (bunny.x >= WIDTH) bunny.x = WIDTH - 1;
        if (bunny.y < 0) bunny.y = 0;
        else if (bunny.y >= HEIGHT) bunny.y = HEIGHT - 1;
    }
    for (bunny = bunnies.length - 1; bunny >= 0; bunny--) {
        if (bunnies[bunny].time_since_ate > MAX_TIME_WITHOUT_FOOD) {
            console.log('Killing bunny');
            bunnies.splice(bunny, 1);
        }
    }
}
function draw() {
    for (row = 0; row < HEIGHT; row++) {
        for (col = 0; col < WIDTH; col++) {
            let shade = 155 + (100/MAX_GRASS_GROWTH * grass[row][col]);
            ctx.fillStyle = 'rgb(' + shade + ',' + shade + ',' + shade + ')';
            ctx.fillRect(col * SIZE, row * SIZE, SIZE, SIZE);
        }
    }
    ctx.fillStyle = '#aaa';
    for (bunny of bunnies) {
        ctx.fillRect(bunny.x * SIZE + BUNNY_PADDING, bunny.y * SIZE + BUNNY_PADDING, SIZE - 2*BUNNY_PADDING, SIZE - 2*BUNNY_PADDING);
    }
}
function loop() {
    tick();
    draw();
}

onclick = function(e) {
    bunnies.push({
        time_since_ate: 0,
        time_since_reproduction: REPRODUCTION_COOLDOWN,
        x: Math.floor(e.clientX / SIZE),
        y: Math.floor(e.clientY / SIZE),
    });
}

loop();
let main_loop = setInterval(loop, 1);
