/**
 * Represents a Pufferfish enemy in the game.
 * Extends MovableObject and includes animations for swimming, transitioning,
 * bubble swimming, and death.
 */
class Pufferfish extends MovableObject {
    /** @type {number} Width of the Pufferfish */
    width = 100;

    /** @type {number} Height of the Pufferfish */
    height = 90;

    /** @type {string[]} Swimming animation image paths */
    IMAGES_SWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    /** @type {string[]} Transition animation image paths */
    IMAGES_TRANSITION = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png'
    ];

    /** @type {string[]} Bubble swimming animation image paths */
    IMAGES_BUBBLESWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png'
    ];

    /** @type {string[]} Death animation image paths */
    IMAGES_DEAD = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png'
    ];

    /** @type {object} Collision offsets */
    offset = {
        top: 7,
        bottom: 35,
        left: 5,
        right: 15
    }

    /** @type {object} Collision offsets during transition */
    transitionOffset = {
        top: 7,
        bottom: 10,
        left: 5,
        right: 15
    }

    /** @type {boolean} Whether the Pufferfish is currently in a transition */
    isTransition = false;

    /** @type {boolean} Whether to use alternate bubble swim animation */
    useAlternateSwim = false;

    /** @type {number} Energy/health of the Pufferfish */
    energy = 5;

    /** @type {World} Reference to the game world */
    world;


    /**
     * Creates a new Pufferfish instance.
     * Loads all necessary images and sets random initial position and speed.
     *
     * @param {number} x Initial x-coordinate (will be offset randomly)
     * @param {number} y Initial y-coordinate (will be offset randomly)
     */
    constructor(x, y) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_BUBBLESWIM);
        this.loadImages(this.IMAGES_DEAD);

        this.x = x + 720 + Math.random() * 500;
        this.y = y + Math.random() * 280;
        this.speed = 0.25 + Math.random() * 0.5;
    }


    /**
     * Starts the transition animation if not already in transition.
     *
     * @param {Function} onFinish Callback to execute after transition finishes
     */
    playTransition(onFinish) {
        if (this.isTransition) return;

        this.isTransition = true;
        this.currentImage = 0;

        this.startTransitionInterval(onFinish);
    }


    /**
     * Runs the transition animation interval.
     *
     * @param {Function} onFinish Callback when transition completes
     * @private
     */
    startTransitionInterval(onFinish) {
        let i = 0;

        this.transitionInterval = setInterval(() => {
            this.updateTransitionImage(i);
            i++;

            if (i >= this.IMAGES_TRANSITION.length) {
                this.endTransitionInterval(onFinish);
            }
        }, 100);
    }


    /**
     * Updates the current transition image.
     *
     * @param {number} index Index of the transition image to display
     * @private
     */
    updateTransitionImage(index) {
        let path = this.IMAGES_TRANSITION[index];
        this.img = this.imageCache[path];
    }


    /**
     * Ends the transition interval and calls the callback.
     *
     * @param {Function} [onFinish] Optional callback after transition
     * @private
     */
    endTransitionInterval(onFinish) {
        clearInterval(this.transitionInterval);
        this.transitionInterval = null;

        if (onFinish) onFinish();
    }


    /**
     * Starts the movement and swim animation loops.
     */
    animate() {
        this.startMovementLoop();
        this.startSwimAnimationLoop();
    }


    /**
     * Starts a continuous movement loop moving the Pufferfish left.
     * Runs only if energy > 0.
     * @private
     */
    startMovementLoop() {
        this.world.setStoppableInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


    /**
     * Starts a continuous swim animation loop.
     * Plays normal or bubble swim depending on state.
     * @private
     */
    startSwimAnimationLoop() {
        this.world.setStoppableInterval(() => {
            if (this.energy <= 0) return;

            if (!this.isTransition && !this.useAlternateSwim) {
                this.playAnimation(this.IMAGES_SWIM);
            } else if (this.useAlternateSwim) {
                this.playAnimation(this.IMAGES_BUBBLESWIM);
            }
        }, 130);
    }
}