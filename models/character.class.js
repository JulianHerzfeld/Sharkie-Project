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
    IMAGES_ATTACK = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ];
    IMAGES_POISON_ATTACK = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png'
    ];
    world;
    speed = 8;
    offset = {
        top: 100,       // y.+ 
        bottom: 150,    // height.-
        left: 36,       // x.+
        right: 70      // width.-
    }
    lastMoveTime = Date.now();
    isAttacking = false;
    canShoot = true;
    shootCooldown = 1500;


    constructor() {
        super();
        this.loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_POISON_ATTACK);

        // this.animate();
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

        this.world.setStoppableInterval(() => {
            const moving = this.world.keyboard.LEFT ||
                this.world.keyboard.RIGHT ||
                this.world.keyboard.UP ||
                this.world.keyboard.DOWN ||
                this.world.keyboard.SPACE;

            if (moving) {
                this.lastMoveTime = Date.now();
            }

            if (this.world.keyboard.LEFT && this.x > -600 && !this.isAttacking) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.RIGHT && this.x < 1440 && !this.isAttacking) {  // 7200 bei 11 background wiederholungen.
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.UP && this.y > -80 && !this.isAttacking) {
                this.moveUp();
            }

            if (this.world.keyboard.DOWN && this.y < 310 && !this.isAttacking) {
                this.moveDown();
            }

            if (this.x > 1040) {      // 6800  bei 11 background wiederholungen
                this.world.camera_x = -940;  // damit die kamera am ende stehen bleibt aber der charakter noch bis zum rand kann. bei 11 background wiederholungen -6700
            } else {
                this.world.camera_x = -this.x + 100;
            }

        }, 1000 / 60);

        this.world.setStoppableInterval(() => {
            let idleTime = Date.now() - this.lastMoveTime;

            if (this.isDead()) {
                this.die();
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                if (!this.isAttacking){
                    this.playAnimation(this.IMAGES_SWIM);
                }
            }
            else if (this.isAttacking) {
                // Attack nutzt eigene Animation → nichts tun
            }
            else if (this.world.keyboard.SPACE) {
                // nichts tun.
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


    playAttack(onFinish) {
        if (this.isAttacking) return; // Schon am Angreifen → überspringen

        this.isAttacking = true;
        this.currentImage = 0; // Animation beginnt bei Frame 0

        let i = 0;

        let interval = setInterval(() => {  
            let images = this.IMAGES_ATTACK;
            if (this.poisonAmount > 0) {
                images = this.IMAGES_POISON_ATTACK;
            }
            let path = images[i];
            this.img = this.imageCache[path];
            i++;

            // Animation fertig?
            if (i >= images.length) {
                clearInterval(interval);
                this.isAttacking = false;

                if (onFinish) onFinish();  // Bubble schießen
            }
        }, 80);
    }


    die() {
        if (this.isDeadAnimationRunning) return;

        this.isDeadAnimationRunning = true;
        this.energy = 0;
        this.currentImage = 0;

        let i = 0;

        let interval = setInterval(() => {
            let path = this.IMAGES_DEAD[i];
            this.img = this.imageCache[path];
            i++;

            if (i >= this.IMAGES_DEAD.length) {
                clearInterval(interval);

                // Spiel endet – Boss bleibt stehen
                this.isFinalDead = true;
            }
        }, 120);
        this.world.stopGame();
    }


    jump() {

    }
}