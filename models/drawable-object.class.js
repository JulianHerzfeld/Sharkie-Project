class DrawableObject {
    x = 120;
    y = 300;
    img;
    width = 150;
    height = 120;
    currentImage = 0;
    imageCache = {};




    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


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