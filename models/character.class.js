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
    ];
    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];
    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png'
    ];
    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png'
    ];
    world;
    speed = 8;
    offset = {
        top: 100,       // y.+ 
        bottom: 150,    // height.-
        left: 36,       // x.+
        right: 70,      // width.-
    }
    lastMoveTime = Date.now();


    constructor() {
        super();
        this.loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);

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
            const moving = this.world.keyboard.LEFT ||
                this.world.keyboard.RIGHT ||
                this.world.keyboard.UP ||
                this.world.keyboard.DOWN;

            if (moving) {
                this.lastMoveTime = Date.now();
            }

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
            let idleTime = Date.now() - this.lastMoveTime;

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_SWIM);
            }
            else if (idleTime > 3000) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            }
            else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 130);
    }


    drawFrame(ctx) {                                                 // roter kasten um den charakter.
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 36, this.y + 100, this.width - 70, this.height - 150);
            ctx.stroke();
        }
    }


    idle() {
        if (!this.isDead() && !this.isHurt() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN) {
            return true;
        }
    }


    jump() {

    }
}