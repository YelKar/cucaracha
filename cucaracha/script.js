let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = GAME.width;
canvas.height = GAME.height;

ctx.scale(GAME.scale, GAME.scale)

function draw() {
    GAME.clear();
    GAME.draw();
    CAR.draw();
}

function update() {
    CAR.update();
}

function play() {
    update();
    draw();
    requestAnimationFrame(play);
}

function setup() {
    CAR.addEventListeners();
    GAME.setup();
}
setup();
play();
