/**
 * Represents a Jellyfish enemy in the game.
 * Extends MovableObject and includes floating movement, swim animation, and death animation.
 */
class Jellyfish extends MovableObject {
    /** @type {number} Width of the Jellyfish */
    width = 70;

    /** @type {number} Height of the Jellyfish */
    height = 90;

    /** @type {number} Vertical movement direction (1 = down, -1 = up) */
    directionY = 1;

    /** @type {string[]} Swimming animation image paths */
    IMAGES_SWIM = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];
    
    /** @type {string[]} Death animation image paths */
    IMAGES_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
    ];

    /** @type {object} Collision offsets */
    offset = {
        top: 7,
        bottom: 18,
        left: 5,
        right: 10
    }

    /** @type {number} Energy/health of the Jellyfish */
    energy = 5;

    /** @type {number} Initial Y position for floating animation */
    startY;


    /**
     * Creates a new Jellyfish instance.
     * Loads all necessary images and sets random initial x and y positions.
     *
     * @param {number} x Initial x-coordinate (will be offset randomly)
     * @param {number} y Initial y-coordinate
     */
    constructor(x, y) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD);

        this.x = x + 720 + Math.random() * 500;
        this.y = y;
        this.startY = y + Math.random() * 100;
    }


    /**
     * Starts the floating movement and swim animation loops.
     */
    animate() {
        this.startFloatingLoop();
        this.startSwimAnimationLoop();
    }


    /**
     * Starts a loop that moves the Jellyfish up and down smoothly.
     * The direction reverses when reaching a maximum offset from the startY.
     * @private
     */
    startFloatingLoop() {
        this.world.setStoppableInterval(() => {
            if (this.energy <= 0) return;

            this.y += this.directionY * 1.5;

            if (this.y > this.startY + 30) {
                this.directionY = -1;
            }
            if (this.y < this.startY - 30) {
                this.directionY = 1;
            }
        }, 1000 / 30);
    }


    /**
     * Starts a loop to play the Jellyfish swim animation.
     * Only runs if energy > 0.
     * @private
     */
    startSwimAnimationLoop() {
        this.world.setStoppableInterval(() => {
            if (this.energy <= 0) return;
            this.playAnimation(this.IMAGES_SWIM);
        }, 250);
    }
}