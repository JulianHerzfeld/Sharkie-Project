/**
 * Represents a static background object within the game world.
 *
 * Background objects are visual elements such as water, ground, or lighting layers
 * that move relative to the camera to create a scrolling background effect.
 * This class extends {@link MovableObject} but does not apply active movement logic.
 *
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    
    /**
     * Height of the background object in pixels.
     * @type {number}
     */
    height = 480;

    /**
     * Width of the background object in pixels.
     * @type {number}
     */
    width = 720;


    /**
     * Creates a new background object.
     *
     * Loads the image from the provided path and positions the object
     * at the bottom of the canvas by default.
     *
     * @param {string} imagePath - Path to the background image file.
     * @param {number} x - Horizontal position of the background object.
     * @param {number} y - Vertical position (not used directly; object is aligned to bottom).
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}