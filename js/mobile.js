/**
 * Indicates whether the device is in landscape orientation.
 * @type {boolean}
 */
let landscape = true;


/**
 * Determines whether the current device is a mobile or touch-capable device.
 *
 * The function checks the number of available touch points reported by the
 * browser. Devices with one or more touch points are typically mobile or
 * tablet devices, but this may also include touch-enabled laptops.
 *
 * @function isMobileDevice
 * @returns {boolean} Returns `true` if the device supports touch input,
 *                    otherwise `false`.
 */
function isMobileDevice() {
    return navigator.maxTouchPoints > 0;
}


/**
 * Determines whether the current screen orientation is landscape.
 *
 * The function first attempts to use the Screen Orientation API if available.
 * If the API is not supported by the browser, it falls back to a media query
 * check using `window.matchMedia`.
 *
 * @function isLandscape
 * @returns {boolean} Returns `true` if the screen orientation is landscape,
 *                    otherwise `false`.
 */
function isLandscape() {
    if (screen.orientation?.type) {
        return screen.orientation.type.startsWith("landscape");
    }
    return window.matchMedia("(orientation: landscape)").matches;
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


/**
 * Adds appropriate event listeners to handle UI updates based on device type.
 *
 * - On mobile or touch-capable devices, the UI is updated after an orientation
 *   change using a short timeout to allow the layout to stabilize.
 * - On non-mobile devices, the UI is updated whenever the window is resized.
 *
 * This ensures that `updateMobileUi` is called only when necessary and prevents
 * layout issues due to orientation or size changes.
 *
 * @listens window#orientationchange
 * @listens window#resize
 */
if (isMobileDevice()) {
    window.addEventListener("orientationchange", () => {
        setTimeout(updateMobileUi, 100);
    });
} else {
    window.addEventListener("resize", updateMobileUi);
}


/**
 * Executes the mobile UI update logic once the initial HTML document
 * has been fully loaded and parsed.
 *
 * This ensures that all required DOM elements are available before
 * `updateMobileUi` is executed, preventing access to undefined nodes
 * or incomplete layouts.
 *
 * @listens document#DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", updateMobileUi);