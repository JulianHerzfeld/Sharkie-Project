let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let gameOver = true;
// let audioBackground = new Audio('audio/background_music_2.mp3');
// let audioCharacterMove = new Audio('audio/sharkie_swim.mp3');
// let audioCharacterAttack = new Audio('audio/sharkie_attack.mp3');
// let audioEnemyHurt = new Audio('audio/sharkie_hurt_1.mp3');
// let audioCharacterHurt = new Audio('audio/sharkie_hurt_2.mp3');
// let audioGameLose = new Audio('audio/game_lose.wav');
// let audioGameWin = new Audio('audio/game_victory.mp3');
// let audioBossHurt = new Audio('audio/boss_hurt.mp3');
// let audioBossAttack = new Audio('audio/boss_attack_2.mp3');
// let audioTest = new Audio('audio/bubble_pop.mp3');


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, createLevel1());
    document.getElementById('overlay-start-screen').classList.add('hidden');
    // world.startDraw();
    gameOver = false;

    console.log('my character is', world.character);
}


function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    world = null;
    document.getElementById('overlay-start-screen').classList.add('hidden');
    init();
    // audioBackground.volume = 0.1;
    if (!audioManager.isMuted) {
        audioBackground.play();
        audioBackground.loop = true;
    }
    // updateMuteButton();
}


function restartGame() {
    // world.stopGame();
    world = null;
    console.log(world);

    document.getElementById('overlay-boss-dead').classList.add('hidden');
    document.getElementById('overlay-player-dead').classList.add('hidden');
    init();
    // audioBackground.volume = 0.1;
    if (!audioManager.isMuted) {
        audioBackground.play();
        audioBackground.loop = true;
    }
    // updateMuteButton();
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



