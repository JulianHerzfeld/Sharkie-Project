/**
 * @type {HTMLCanvasElement} The main game canvas.
 */
let canvas;

/**
 * @type {World} The main game world instance.
 */
let world;

/**
 * @type {Keyboard} The keyboard input manager.
 */
let keyboard = new Keyboard();

/**
 * Indicates whether the game has started.
 * @type {boolean}
 */
let gameStarted = false;

/**
 * Indicates whether the game is currently over.
 * @type {boolean}
 */
let gameOver = true;

/**
 * Indicates whether the game is in fullscreen mode.
 * @type {boolean}
 */
let isFullscreen = false;


/**
 * Initializes the game by creating the world, hiding the start screen,
 * and updating the mobile UI.
 *
 * @returns {void}
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, createLevel1());
    document.getElementById('overlay-start-screen').classList.add('hidden');
    updateMobileUi();
    gameOver = false;

    console.log('my character is', world.character);
}


/**
 * Starts the game if it has not been started yet.
 *
 * Initializes the world, hides the start screen, and plays background music.
 *
 * @returns {void}
 */
function startGame() {
    if (gameStarted) return;

    gameStarted = true;
    resetWorld();
    hideStartScreen();
    init();
    playBackgroundMusic();
}


/**
 * Restarts the game by resetting the world, hiding death overlays,
 * initializing the world again, and playing background music.
 *
 * @returns {void}
 */
function restartGame() {
    resetWorld();
    hideDeathOverlays();
    init();
    playBackgroundMusic();
}


/**
 * Resets the world instance to null.
 *
 * @returns {void}
 */
function resetWorld() {
    world = null;
}


/**
 * Hides the start screen overlay.
 *
 * @returns {void}
 */
function hideStartScreen() {
    document.getElementById('overlay-start-screen').classList.add('hidden');
}


/**
 * Plays the background music if the audio manager is not muted.
 *
 * @returns {void}
 */
function playBackgroundMusic() {
    if (!audioManager.isMuted) {
        audioBackground.play();
        audioBackground.loop = true;
    }
}


/**
 * Hides the death overlays for both boss and player.
 *
 * @returns {void}
 */
function hideDeathOverlays() {
    document.getElementById('overlay-boss-dead').classList.add('hidden');
    document.getElementById('overlay-player-dead').classList.add('hidden');
}


/**
 * Navigates back to the game menu by hiding death overlays,
 * showing the start screen, and hiding mobile controls.
 *
 * @returns {void}
 */
function goToMenu() {
    document.getElementById('overlay-boss-dead').classList.add('hidden');
    document.getElementById('overlay-player-dead').classList.add('hidden');
    document.getElementById('overlay-start-screen').classList.remove('hidden');
    document.getElementById('mobile-controls').classList.add('hidden');
}


/**
 * Exits the running game by stopping the world and going to the menu.
 *
 * @returns {void}
 */
function exitRunningGame() {
    world.stopGame();
    goToMenu();
}


/**
 * Opens the control overlay by removing the 'hidden' class.
 *
 * @returns {void}
 */
function openControlOverlay() {
    document.getElementById('control-overlay').classList.remove('hidden');
}


/**
 * Closes the control overlay by adding the 'hidden' class.
 *
 * @returns {void}
 */
function closeControlOverlay() {
    document.getElementById('control-overlay').classList.add('hidden');
}


/**
 * Updates initialization elements such as mute buttons and game menu events.
 *
 * @returns {void}
 */
function updateInits() {
    updateMuteButton();
    setGameMenuEvents();
}


/**
 * Sets up all event listeners related to the game menu.
 *
 * @returns {void}
 */
function setGameMenuEvents() {
    const menuToggle = document.getElementById('game-menu-toggle');
    const gameMenu = document.getElementById('game-menu');

    setupMenuToggle(menuToggle, gameMenu);
    setupMenuClick(gameMenu);
    setupDocumentClick(gameMenu);
}


/**
 * Sets up the toggle functionality for a menu element.
 *
 * @param {HTMLElement} toggleElement - The element that toggles the menu visibility.
 * @param {HTMLElement} menuElement - The menu element to show/hide.
 */
function setupMenuToggle(toggleElement, menuElement) {
    toggleElement.addEventListener('click', (e) => {
        e.stopPropagation();
        menuElement.classList.toggle('hidden');
    });
}


/**
 * Stops click events from propagating on the menu element.
 *
 * @param {HTMLElement} menuElement - The menu element to attach the click handler.
 */
function setupMenuClick(menuElement) {
    menuElement.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}


/**
 * Hides the menu when clicking outside of it.
 *
 * @param {HTMLElement} menuElement - The menu element to hide on outside click.
 */
function setupDocumentClick(menuElement) {
    document.addEventListener('click', () => {
        menuElement.classList.add('hidden');
    });
}


/**
 * Updates mobile UI elements when the window is resized or orientation changes.
 */
window.addEventListener('resize', updateMobileUi);
window.addEventListener('orientationchange', updateMobileUi);


/**
 * Handles keydown events for controlling the keyboard object.
 */
window.addEventListener("keydown", (e) => {

    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});


/**
 * Handles keyup events for controlling the keyboard object.
 */
window.addEventListener("keyup", (e) => {

    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});








// impressum hinzufügen,                             // fehlt noch inhalt.
// alles nochmal testen,