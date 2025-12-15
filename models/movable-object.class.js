/**
 * Base class for all objects that can move in the game.
 * Extends DrawableObject to include movement, energy, and interaction logic.
 */
class MovableObject extends DrawableObject {
    /** @type {number} Movement speed in pixels per frame */
    speed = 0.25;

    /** @type {number} Initial Y position (used for jump or floating logic) */
    startY;

    /** @type {boolean} Direction flag; true if object is facing left */
    otherDirection = false;

    /** @type {number} Current energy/health of the object */
    energy = 100;

    /** @type {number} Timestamp of last hit taken (milliseconds since epoch) */
    lastHit = 0;

    /** @type {number} Amount of coins collected by this object */
    coinsAmount = 0;

    /** @type {number} Amount of poison collected by this object */
    poisonAmount = 0;


    /**
     * Checks whether this object is colliding with another movable object
     * using axis-aligned bounding box (AABB) collision detection.
     *
     * The collision calculation respects individual offset values on all sides,
     * allowing precise hitboxes that are smaller or shifted relative to the
     * object's actual width and height.
     *
     * @param {MovableObject} mo - The other movable object to check collision against.
     * @returns {boolean} Returns true if the two objects' hitboxes overlap, otherwise false.
     */
    isColliding(mo) {
        return this.x + this.offset.left + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.offset.top + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.offset.left + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.offset.top + mo.height - mo.offset.bottom;
    }


    /**
     * Applies damage to the object by reducing its energy value.
     *
     * If the resulting energy drops below zero, it is clamped to zero.
     * Otherwise, the timestamp of the last hit is updated to allow
     * cooldowns, invincibility frames, or hit animations.
     *
     * @param {number} damage - The amount of damage to apply to the object.
     * @returns {void}
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Determines whether the object is currently in a "hurt" state.
     *
     * The object is considered hurt for a short duration after being hit,
     * based on the timestamp stored in `lastHit`. This can be used to
     * trigger hit animations, visual feedback, or temporary invulnerability.
     *
     * @returns {boolean} Returns true if the time since the last hit is
     * less than 0.8 seconds, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }


    /**
     * Checks whether the object is dead.
     *
     * An object is considered dead when its energy value has reached zero.
     * This method is typically used to trigger death animations,
     * game-over states, or removal from the game world.
     *
     * @returns {boolean} Returns true if the object's energy is zero,
     * otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Handles the death of the object.
     *
     * Triggers the death animation and schedules the object for removal
     * from the game world. This method should be called once the object
     * has been confirmed as dead (e.g. when energy reaches zero).
     *
     * @returns {void}
     */
    die() {
        this.playDeathAnimation();
        this.scheduleRemoval();
    }


    /**
     * Plays the death animation of the object.
     *
     * Iterates through the images defined in `IMAGES_DEAD` at a fixed interval
     * and updates the currently displayed image accordingly. Once the last
     * animation frame has been shown, the animation loop is stopped.
     *
     * This method only handles the visual animation and does not remove
     * the object from the game world.
     *
     * @returns {void}
     */
    playDeathAnimation() {
        let i = 0
        let interval = setInterval(() => {
            let images = this.IMAGES_DEAD;
            let path = images[i];
            this.img = this.imageCache[path];
            i++;
            if (i >= images.length) {
                clearInterval(interval);
            }
        }, 120);
    }


    /**
     * Schedules the removal of the object from the game world.
     *
     * Marks the object for removal after a fixed delay, allowing
     * death animations or effects to finish before the object
     * is actually removed from the game loop.
     *
     * @returns {void}
     */
    scheduleRemoval() {
        setTimeout(() => {
            this.remove = true;
        }, 1000);
    }


    /**
     * Plays a frame of an animation sequence for the object.
     *
     * Updates the object's current image based on the provided array
     * of image paths. The animation loops continuously by cycling
     * through the images using `currentImage` as the index.
     *
     * If the image is cached in `imageCache`, it is assigned to `this.img`.
     *
     * @param {string[]} images - An array of image paths representing the animation frames.
     * @returns {void}
     */
    playAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];

        if (this.imageCache[path]) {
            this.img = this.imageCache[path];
            this.currentImage = (this.currentImage + 1) % images.length;
        }
    }


    /**
     * Moves the object to the right by its current speed.
     *
     * Updates the `x` position of the object by adding the `speed` value.
     * Typically used in the game loop to animate horizontal movement.
     *
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the object to the left by its current speed.
     *
     * Updates the `x` position of the object by subtracting the `speed` value.
     * Typically used in the game loop to animate horizontal movement.
     *
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Moves the object upward by its current speed.
     *
     * Updates the `y` position of the object by subtracting the `speed` value.
     * Typically used in the game loop to animate vertical movement.
     *
     * @returns {void}
     */
    moveUp() {
        this.y -= this.speed;
    }


    /**
     * Moves the object downward by its current speed.
     *
     * Updates the `y` position of the object by adding the `speed` value.
     * Typically used in the game loop to animate vertical movement.
     *
     * @returns {void}
     */
    moveDown() {
        this.y += this.speed;
    }
}