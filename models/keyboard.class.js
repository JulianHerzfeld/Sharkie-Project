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
     * Binds touch events to on-screen control buttons for mobile input.
     *
     * For each button (Up, Down, Left, Right, Shoot), this function:
     *   - Selects the element by its ID.
     *   - Sets up touchstart and touchend events using `setTouchstartEvent` and `setTouchendEvent`.
     * Finally, it calls `preventTouchmove()` to disable default touch scrolling behavior.
     */
    bindBtnPressEvent() {
        const bindButton = (id, property) => {
            const element = document.getElementById(id);
            if (!element) return;
            this.setTouchstartEvent(element, property);
            this.setTouchendEvent(element, property);
        };

        bindButton('btnUp', 'UP');
        bindButton('btnDown', 'DOWN');
        bindButton('btnLeft', 'LEFT');
        bindButton('btnRight', 'RIGHT');
        bindButton('btnShoot', 'SPACE');
        this.preventTouchmove();
    }


    /**
     * Attaches a touchstart event listener to a DOM element.
     *
     * When the element is touched, prevents the default behavior and
     * sets the corresponding property on `this` to true.
     *
     * @param {HTMLElement} element - The DOM element to attach the event to.
     * @param {string} property - The property of `this` to set to true on touchstart.
     */
    setTouchstartEvent(element, property) {
        element.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this[property] = true;
        }, { passive: false });
    }


    /**
     * Attaches a touchend event listener to a DOM element.
     *
     * When the touch ends on the element, sets the corresponding property
     * on `this` to false.
     *
     * @param {HTMLElement} element - The DOM element to attach the event to.
     * @param {string} property - The property of `this` to set to false on touchend.
     */
    setTouchendEvent(element, property) {
        element.addEventListener('touchend', () => {
            this[property] = false;
        }, { passive: false });
    }


    /**
     * Prevents the default touchmove behavior on the document.
     *
     * This stops the page from scrolling when the user swipes on the screen,
     * which is useful for on-screen game controls.
     */
    preventTouchmove() {
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
    }
}