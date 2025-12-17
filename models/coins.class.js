/**
 * Class representing collectible coins in the game.
 * Extends MovableObject to inherit position, collision, and animation logic.
 */
class Coins extends MovableObject {

    /** @type {string[]} Array of image paths for coin animation */
    IMAGES_COINS = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    /** @type {object} Collision offsets */
    offset = {
        top: 10,
        bottom: 20,
        left: 10,
        right: 20,
    }

    /** @type {string} Type of the collectible (default: 'coin') */
    type;


    /**
     * Creates a new coin instance at a given position.
     * @param {number} x X-coordinate for the coin
     * @param {number} y Y-coordinate for the coin
     * @param {string} [type='coin'] Type of collectible
     */
    constructor(x, y, type = 'coin') {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = x + Math.random() * 500;
        this.y = y + Math.random() * 400;
        this.height = 40;
        this.width = 40;
        this.type = type;
    }


    /**
     * Starts the coin animation loop.
     * Loops through IMAGES_COINS at a fixed interval.
     */
    animate() {
        this.world.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }
}