class Character extends MovableObject {
    x = 0;
    y = 100;
    width = 180;
    height = 200;
    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ]
    world;
    speed = 8;
    offset = {
        top: 100,       // + 
        bottom: 150,    // -
        left: 36,       // +
        right: 70,      // -
    }


    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIM);

        this.animate();
    }


    // animate() {
    //     setInterval(() => {
    //         let i = this.currentImage % this.IMAGES_SWIM.length;
    //         let path = this.IMAGES_SWIM[i];
    //         this.img = this.imageCache[path];
    //         this.currentImage++;
    //     }, 130);
    // }


    animate() {

        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > -600) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.RIGHT && this.x < 1440) {  // 7200 bei 11 background wiederholungen.
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.UP && this.y > -80) {
                this.moveUp();
            }

            if (this.world.keyboard.DOWN && this.y < 310) {
                this.moveDown();
            }

            if (this.x > 1040) {      // 6800  bei 11 background wiederholungen
                this.world.camera_x = -940;  // damit die kamera am ende stehen bleibt aber der charakter noch bis zum rand kann. bei 11 background wiederholungen -6700
            } else {
                this.world.camera_x = -this.x + 100;
            }
            
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_SWIM);
            }
        }, 130);
    }


    jump() {

    }
}