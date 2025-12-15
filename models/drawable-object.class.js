/**
 * Base class for all drawable objects on the canvas.
 */
class DrawableObject {

    /** @type {number} Horizontal position */
    x = 120;

    /** @type {number} Vertical position */
    y = 300;

    /** @type {HTMLImageElement} Current image to be drawn */
    img;

    /** @type {number} Width of the object */
    width = 150;

    /** @type {number} Height of the object */
    height = 120;

    /** @type {number} Index of the current animation frame */
    currentImage = 0;

    /** @type {Object<string, HTMLImageElement>} Cache for preloaded images */
    imageCache = {};


    /**
     * Load a single image into the object.
     * @param {string} path - Path to the image file
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preload multiple images and store them in the cache.
     * @param {string[]} arr - Array of image file paths
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draw the current image on the canvas.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    draw(ctx) {
        if (!this.img) {
            console.warn("Object has no image:", this);
            return;
        }
        if (!this.img.complete) {
            console.warn("Image not loaded yet:", this.img.src);
            return;
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Pufferfish || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}