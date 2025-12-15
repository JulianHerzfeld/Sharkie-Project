/**
 * Handles keyboard and touch input for controlling the character.
 * Tracks the state of directional keys and the shoot key.
 */
class Keyboard {
    /** @type {boolean} Whether the left key/button is pressed. */
    LEFT = false;

    /** @type {boolean} Whether the right key/button is pressed. */
    RIGHT = false;

    /** @type {boolean} Whether the up key/button is pressed. */
    UP = false;

    /** @type {boolean} Whether the down key/button is pressed. */
    DOWN = false;

    /** @type {boolean} Whether the shoot key/button (SPACE) is pressed. */
    SPACE = false;

    /** @type {boolean} Optional key D (not used in current game). */
    D = false;


    /**
     * Initializes the Keyboard handler and binds touch events after DOM content is loaded.
     */
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.bindBtnPressEvent();
        });
    }


    /**
     * Binds touch events for on-screen buttons to update key states.
     * Handles touchstart and touchend for each directional and action button.
     */
    bindBtnPressEvent() {
        document.getElementById('btnUp').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        }, { passive: false });

        document.getElementById('btnUp').addEventListener('touchend', (e) => {
            this.UP = false;
        }, { passive: false });

        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        }, { passive: false });

        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            this.LEFT = false;
        }, { passive: false });

        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        }, { passive: false });

        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            this.RIGHT = false;
        }, { passive: false });

        document.getElementById('btnDown').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.DOWN = true;
        }, { passive: false });

        document.getElementById('btnDown').addEventListener('touchend', (e) => {
            this.DOWN = false;
        }, { passive: false });

        document.getElementById('btnShoot').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        }, { passive: false });

        document.getElementById('btnShoot').addEventListener('touchend', (e) => {
            this.SPACE = false;
        }, { passive: false });

        document.addEventListener('touchmove', e => {
            e.preventDefault();
        }, { passive: false });
    }
}