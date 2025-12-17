/**
 * Class representing collectible poison in the game.
 * Extends MovableObject to inherit position, collision, and animation logic.
 */
class Poison extends MovableObject {

    /** @type {string[]} Array of image paths for poison animation */
    IMAGES_POISON = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    /** @type {object} Collision offsets */
    offset = {
        top: 33,
        bottom: 43,
        left: 18,
        right: 36,
    }

    /** @type {string} Type of collectible (default: 'poison') */
    type;


    /**
     * Creates a new poison instance at a given position.
     * @param {number} x X-coordinate for the poison
     * @param {number} y Y-coordinate for the poison
     * @param {string} [type='poison'] Type of collectible
     */
    constructor(x, y, type = 'poison') {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_POISON);
        this.x = x + Math.random() * 500;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.type = type;
    }


    /**
     * Starts the poison animation loop.
     * Loops through IMAGES_POISON at a fixed interval.
     */
    animate() {
        this.world.setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_POISON);
        }, 200);
    }
}