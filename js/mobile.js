/**
 * Indicates whether the device is in landscape orientation.
 * @type {boolean}
 */
let landscape = true;


/**
 * Determines whether the current device is a mobile device.
 *
 * Checks for touch support or maximum touch points.
 *
 * @returns {boolean} True if the device supports touch input, otherwise false.
 */
function isMobileDevice() {
    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
    );
}


/**
 * Checks if the device is currently in landscape orientation.
 *
 * @returns {boolean} True if the width is greater than the height, otherwise false.
 */
function isLandscape() {
    return window.innerWidth > window.innerHeight;
}


/**
 * Updates the mobile UI based on the device type and orientation.
 *
 * Shows or hides mobile controls and rotate warnings, and handles
 * orientation-specific game behavior.
 *
 * @returns {void}
 */
function updateMobileUi() {
    const mobileControls = document.getElementById('mobile-controls');
    const rotateWarning = document.getElementById('rotate-warning');
    if (!isMobileDevice()) {
        hideMobileUi(mobileControls, rotateWarning);
        return;
    }
    if (isLandscape()) {
        showMobileControls(mobileControls, rotateWarning);
        handleLandscapeMode();
    } else {
        hideMobileControls(mobileControls, rotateWarning);
        handlePortraitMode();
    }
}


/**
 * Hides all mobile UI elements.
 *
 * @param {HTMLElement} mobileControls - The container for mobile control buttons.
 * @param {HTMLElement} rotateWarning - The rotate warning element.
 */
function hideMobileUi(mobileControls, rotateWarning) {
    mobileControls.classList.add('hidden');
    rotateWarning.classList.add('hidden');
}


/**
 * Shows mobile controls while hiding the rotate warning.
 *
 * @param {HTMLElement} mobileControls - The container for mobile control buttons.
 * @param {HTMLElement} rotateWarning - The rotate warning element.
 */
function showMobileControls(mobileControls, rotateWarning) {
    mobileControls.classList.remove('hidden');
    rotateWarning.classList.add('hidden');
}


/**
 * Hides mobile controls while showing the rotate warning.
 *
 * @param {HTMLElement} mobileControls - The container for mobile control buttons.
 * @param {HTMLElement} rotateWarning - The rotate warning element.
 */
function hideMobileControls(mobileControls, rotateWarning) {
    mobileControls.classList.add('hidden');
    rotateWarning.classList.remove('hidden');
}


/**
 * Handles the landscape mode logic.
 *
 * If the game world exists and the device was previously in portrait mode,
 * the game is stopped and the menu is shown. Updates the landscape flag.
 *
 * @returns {void}
 */
function handleLandscapeMode() {
    if (world && !landscape) {
        goToMenu();
        landscape = true;
    }
}


/**
 * Handles the portrait mode logic.
 *
 * Stops the game if it is running and updates the landscape flag.
 *
 * @returns {void}
 */
function handlePortraitMode() {
    if (world) {
        world.stopGame();
        landscape = false;
    }
}