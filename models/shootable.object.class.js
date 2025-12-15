/**
 * Represents a projectile (bubble or poison bubble) that can be shot by the character.
 * Inherits from MovableObject.
 */
class ShootableObject extends MovableObject {

    /** @type {string} Path to the normal bubble image */
    BUBBLE_IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';

    /** @type {string} Path to the poison bubble image */
    POISON_BUBBLE_IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';

    /** @type {Object} Collision offset for this bubble */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    /** @type {boolean} Indicates if this bubble is poisonous */
    isPoisonBubble;

    /** @type {number} Horizontal movement direction (1 = right, -1 = left) */
    direction;

    /** @type {number} Damage this bubble deals on hit */
    damage;


    /**
     * Creates a ShootableObject (bubble or poison bubble) and starts its movement.
     * 
     * @param {number} x - Initial x-position of the bubble
     * @param {number} y - Initial y-position of the bubble
     * @param {number} direction - Horizontal direction of the bubble (1 for right, -1 for left)
     * @param {number} damage - Damage dealt by this bubble
     * @param {boolean} [isPoisonBubble=false] - Whether this bubble is a poison bubble
     */
    constructor(x, y, direction, damage, isPoisonBubble = false) {
        super();
        this.isPoisonBubble = isPoisonBubble;
        this.setBubbleImage();
        this.x = x;
        this.y = y;
        this.height = 45;
        this.width = 45;
        this.direction = direction;
        this.damage = damage;
        this.shoot();
    }


    /**
     * Sets the correct image for the bubble based on whether it is poisonous.
     */
    setBubbleImage() {
        if (this.isPoisonBubble) {
            this.loadImage(this.POISON_BUBBLE_IMAGE);
        } else {
            this.loadImage(this.BUBBLE_IMAGE);
        }
    }


    /**
     * Starts moving the bubble horizontally according to its direction.
     * Updates position every 25 milliseconds.
     */
    shoot() {
        setInterval(() => {
            this.x += this.direction * 10;
        }, 25);
    }


    drawFrame(ctx) {                                                 // roter kasten um den charakter.
        if (this instanceof ShootableObject) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}