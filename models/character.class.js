/**
 * Class representing the main player character Sharkie.
 * @extends MovableObject
 */
class Character extends MovableObject {

    /** @type {number} Initial horizontal position */
    x = 0;

    /** @type {number} Initial vertical position */
    y = 100;

    /** @type {number} Character width */
    width = 180;

    /** @type {number} Character height */
    height = 200;

    /** @type {string[]} Swim animation frames */
    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    /** @type {string[]} Death animation frames */
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

    /** @type {string[]} Hurt animation frames */
    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png'
    ];

    /** @type {string[]} Idle animation frames */
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

    /** @type {string[]} Long idle animation frames */
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

    /** @type {string[]} Regular attack animation frames */
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

    /** @type {string[]} Poison attack animation frames */
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

    /** @type {World} Reference to the game world */
    world;

    /** @type {number} Movement speed */
    speed = 4;

    /** @type {Object} Collision offsets */
    offset = {
        top: 100,
        bottom: 150,
        left: 36,
        right: 70
    }

    /** @type {number} Timestamp of last movement */
    lastMoveTime = Date.now();

    /** @type {boolean} Whether the character is currently attacking */
    isAttacking = false;

    /** @type {boolean} Whether the character can shoot */
    canShoot = true;

    /** @type {number} Shoot cooldown in milliseconds */
    shootCooldown = 1500;

    /** @type {boolean} Whether the character can be hurt */
    canHurt = true;

    /** @type {number} Hurt cooldown in milliseconds */
    hurtCooldown = 1000;


    /**
     * Create the main character and load all animations.
     */
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
    }


    /**
     * Animate the character's movement and idle state.
     */
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
                audioCharacterMove.play();
            }

            if (this.world.keyboard.RIGHT && this.x < 2880 && !this.isAttacking) {
                this.moveRight();
                this.otherDirection = false;
                audioCharacterMove.play();
            }

            if (this.world.keyboard.UP && this.y > -80 && !this.isAttacking) {
                this.moveUp();
                audioCharacterMove.play();
            }

            if (this.world.keyboard.DOWN && this.y < 310 && !this.isAttacking) {
                this.moveDown();
                audioCharacterMove.play();
            }

            if (this.x > 2480) {
                this.world.camera_x = -2380;
            } else {
                this.world.camera_x = -this.x + 100;
            }

        }, 1000 / 60);

        this.world.setStoppableInterval(() => {
            let idleTime = Date.now() - this.lastMoveTime;

            if (this.isDead()) {
                this.die();
            }
            else if (this.isHurt() && !this.isAttacking) {
                this.playAnimation(this.IMAGES_HURT);
                // audioCharacterHurt.play();
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                if (!this.isAttacking) {
                    this.playAnimation(this.IMAGES_SWIM);
                }
            }
            else if (this.isAttacking) {
                // Attack nutzt eigene Animation → nichts tun
            }
            else if (this.world.keyboard.SPACE) {
                // nichts tun.
            }
            else if (idleTime > 8000) {
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


    /**
     * Check if the character is idle.
     * @returns {boolean} True if idle
     */
    idle() {
        if (!this.isDead() && !this.isHurt() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN) {
            return true;
        }
    }


    /**
     * Play the character's attack animation.
     * @param {function} [onFinish] - Callback after attack finishes
     */
    playAttack(onFinish) {
        if (!this.canAttack()) return;

        this.startAttack();
        let images = this.getAttackImages();
        let i = 0;

        let interval = setInterval(() => {
            this.showAttackFrame(images, i);
            i++;

            if (this.isAttackFinished(i, images)) {
                clearInterval(interval);
                this.finishAttack(onFinish);
            }
        }, 80);
    }


    /**
     * Check if the character can attack.
     * @returns {boolean} True if attack is possible
     */
    canAttack() {
        return !this.isAttacking;
    }


    /**
     * Start attack sequence.
     */
    startAttack() {
        this.isAttacking = true;
        this.currentImage = 0;
    }


    /**
     * Get the appropriate attack animation images.
     * @returns {string[]} Attack image paths
     */
    getAttackImages() {
        return this.poisonAmount > 0 ? this.IMAGES_POISON_ATTACK : this.IMAGES_ATTACK;
    }


    /**
     * Display a single attack frame.
     * @param {string[]} images - Animation frames
     * @param {number} i - Frame index
     */
    showAttackFrame(images, i) {
        this.img = this.imageCache[images[i]];
    }


    /**
     * Check if attack animation is finished.
     * @param {number} i - Frame index
     * @param {string[]} images - Animation frames
     * @returns {boolean} True if finished
     */
    isAttackFinished(i, images) {
        return i >= images.length;
    }


    /**
     * Finish attack animation.
     * @param {function} [onFinish] - Optional callback
     */
    finishAttack(onFinish) {
        this.isAttacking = false;
        if (onFinish) {
            onFinish();
            audioCharacterAttack.play();
        }
    }


    /**
     * Initiates the death sequence for the character.
     * Plays the death animation frame by frame and stops the game when finished.
     * Also sets energy to 0 and plays the game over audio.
     */
    die() {
        if (this.isDeadAnimationRunning) return;
        this.isDeadAnimationRunning = true;
        this.energy = 0; this.currentImage = 0;
        let i = 0; let interval = setInterval(() => {
            let path = this.IMAGES_DEAD[i];
            this.img = this.imageCache[path];
            i++; if (i >= this.IMAGES_DEAD.length) {
                clearInterval(interval);
                this.isFinalDead = true;
            }
        }, 120);
        this.world.stopGame();
        audioGameLose.play();
    }
}