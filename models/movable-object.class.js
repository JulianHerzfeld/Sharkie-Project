class MovableObject {
    x = 120;
    y = 300;
    img;
    width = 150;
    height = 120;
    imageCache = {};
    currentImage = 0;
    speed = 0.25;
    otherDirection = false;
    energy = 100;
    lastHit = 0;




    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {                            //alte version.
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    // loadImages(arr) {                                    // vill lösung.
    //     arr.forEach((path) => {
    //         let img = new Image();
    //         img.src = path;

    //         img.onload = () => {
    //             this.imageCache[path] = img;
    //         };

    //         img.onerror = () => console.error("Image failed to load: ", path);
    //     });
    // }


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


    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }


    isDead() {
        return this.energy == 0;
    }


    playAnimation(images) {
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage = (this.currentImage + 1) % images.length;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    moveUp() {
        this.y -= this.speed;
    }


    moveDown() {
        this.y += this.speed;
    }
}