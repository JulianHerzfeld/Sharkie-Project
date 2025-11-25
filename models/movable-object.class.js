class MovableObject extends DrawableObject {
    speed = 0.25;
    otherDirection = false;
    energy = 100;
    lastHit = 0;




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