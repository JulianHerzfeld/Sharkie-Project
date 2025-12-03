class MovableObject extends DrawableObject {
    speed = 0.25;
    startY;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    coinsAmount = 0;
    poisonAmount = 0;




    isColliding(mo) {
        return this.x + this.offset.left + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.offset.top + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.offset.left + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.offset.top + mo.height - mo.offset.bottom;
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


    // playAnimation(images) {                          // alte version
    //     let path = images[this.currentImage];
    //     this.img = this.imageCache[path];
    //     this.currentImage = (this.currentImage + 1) % images.length;
    // }

    playAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];

        if (this.imageCache[path]) {
            this.img = this.imageCache[path];
            this.currentImage = (this.currentImage + 1) % images.length;
        }
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