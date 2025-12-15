/**
 * Represents a status bar (e.g., health, energy) that displays a value as a percentage.
 * Extends DrawableObject to be drawn on the canvas.
 */
class StatusBar extends DrawableObject {

    /** @type {number} Current percentage value of the status bar */
    percentage = 100;

    /**
     * Creates a new StatusBar instance.
     * @param {string[]} imagesArray - Array of image paths representing different percentage states
     * @param {number} x - X-coordinate of the status bar
     * @param {number} y - Y-coordinate of the status bar
     * @param {number} percent - Initial percentage value
     */
    constructor(imagesArray, x, y, percent) {
        super();
        this.imagesArray = imagesArray;
        this.loadImages(this.imagesArray);
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 150;
        this.setPercentage(percent);
    }

    /**
     * Set the current percentage and update the displayed image.
     * @param {number} percentage - New percentage value
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.imagesArray[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determine which image index corresponds to the current percentage.
     * @returns {number} Index in the imagesArray
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}