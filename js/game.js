let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, createLevel1());
    document.getElementById('overlay-start-screen').classList.add('hidden');
    // world.startDraw();

    console.log('my character is', world.character);
}


function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    world = null;
    document.getElementById('overlay-start-screen').classList.add('hidden');
    init();
}


function restartGame() {
    // world.stopGame();
    world = null;
    console.log(world);
    
    document.getElementById('overlay-boss-dead').classList.add('hidden');
    document.getElementById('overlay-player-dead').classList.add('hidden');
    init();
}


function goToMenu() {
    document.getElementById('overlay-boss-dead').classList.add('hidden');
    document.getElementById('overlay-player-dead').classList.add('hidden');
    document.getElementById('overlay-start-screen').classList.remove('hidden');
}


window.addEventListener("keydown", (e) => {

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (e) => {

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});