let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = GAME.width;
canvas.height = GAME.height;

ctx.scale(GAME.scale, GAME.scale)

function setup() {
    Cockroach.addEventListeners();
    Cockroach.setup();
    GAME.setup();
    SLIPPER.setup();
    menu.setup();
}

function draw() {
    GAME.clear();
    GAME.draw();
    clumb.draw();
    Cockroach.draw();
    SLIPPER.draw();
}

function update() {
    Cockroach.update();
    SLIPPER.update();
    clumb.update();
}

function play() {
    update();
    draw();
    if (Cockroach.alive) {
        requestAnimationFrame(play);
    } else {
        menu.draw("GAME OVER");
    }
}

function setLevel(number = 0) {
    if (number >= levels.length) {
        return;
    }

    let level = levels[number];
    SLIPPER.swingFramesCount = level[1];

    let intervalID = setInterval(() => {
        if (!Cockroach.alive) {
            clearInterval(intervalID);
            return;
        }
        let currPos = Cockroach.center;
        SLIPPER.swing(
            randInt(currPos.x - 300, currPos.x + 300),
            randInt(currPos.y - 300, currPos.y + 300)
        );
        level[2]--;
        if (level[2] <= 0) {
            clearInterval(intervalID);
            clumb.set();
            setTimeout(() => setLevel(number + 1))
        }
    }, level[0])
}

setup();



function start() {
    Cockroach.start();
    setLevel();
    play();
}


addEventListener("keydown", (e) => {
    if (e.code == "KeyH" && e.shiftKey) {
        SLIPPER.swing(Cockroach.x, Cockroach.y);
    }
})

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => menu.draw(), 1000);
});
