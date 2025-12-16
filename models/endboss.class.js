/**
 * Class representing the final boss of the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {

    /** @type {number} Height of the endboss */
    height = 370;

    /** @type {number} Width of the endboss */
    width = 380;

    /** @type {number} Vertical position */
    y = 0;

    /** @type {World} Reference to the game world */
    world;

    /** @type {string[]} Swim animation frames */
    IMAGES_SWIM = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    /** @type {string[]} Spawn animation frames */
    IMAGES_SPAWN = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];

    /** @type {string[]} Attack animation frames */
    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    /** @type {string[]} Hurt animation frames */
    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];

    /** @type {string[]} Death animation frames */
    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    /** @type {Object} Collision offsets */
    offset = {
        top: 175,
        bottom: 245,
        left: 25,
        right: 60
    }

    /** @type {Object} Collision offsets for transition animations */
    transitionOffset = {
        top: 175,
        bottom: 245,
        left: 25,
        right: 60
    }

    /** @type {boolean} Whether the boss is currently spawning */
    isSpawning = false;

    /** @type {boolean} Whether the boss has spawned */
    isSpawned = false;

    /** @type {boolean} Whether the boss is attacking */
    isAttacking = false;

    /** @type {number} Movement speed */
    speed = 10;

    /** @type {number} Health points of the boss */
    energy = 100;

    /** @type {number|null} Current animation interval ID */
    currentAnimationInterval = null;

    /** @type {boolean} Whether the boss can attack */
    canAttack = true;

    /** @type {number} Attack cooldown in milliseconds */
    attackCooldown = 1200;


    /**
     * Create an Endboss.
     * @param {number} x - Initial horizontal position
     * @param {number} y - Initial vertical position
     */
    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_SPAWN);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.y = y
    }


    /**
     * Start the continuous animation loop for the boss.
     */
    animate() {
        this.world.setStoppableInterval(() => {
            if (this.isSpawning) return;
            if (this.isHurt()) return;
            if (this.isDead()) return;
            if (this.isHurtAnimationRunning) return;
            if (this.isFinalDead) return;
            if (this.world && this.world.character) {
                this.moveTowards(this.world.character);
            }
            if (this.isSpawned && !this.isAttacking) {

                this.playAnimation(this.IMAGES_SWIM);
            }
        }, 135);
    }


    /**
     * Play spawn animation.
     * @param {function} [onFinish] - Callback after animation finishes
     */
    playSpawn(onFinish) {
        if (this.isSpawning) return;

        this.startSpawnAnimation(onFinish);
    }


    /**
     * Start the spawn animation interval.
     * @param {function} [onFinish] - Callback when animation finishes
     */
    startSpawnAnimation(onFinish) {
        this.isSpawning = true;
        this.currentImage = 0;

        let i = 0;
        const interval = setInterval(() => {
            this.showSpawnFrame(i);
            i++;

            if (i >= this.IMAGES_SPAWN.length) {
                clearInterval(interval);
                this.isSpawning = false;
                if (onFinish) onFinish();
            }
        }, 120);
    }


    /**
     * Display a single frame of spawn animation.
     * @param {number} index - Frame index
     */
    showSpawnFrame(index) {
        const path = this.IMAGES_SPAWN[index];
        this.img = this.imageCache[path];
    }


    /**
     * Play hurt animation sequence.
     */
    playHurt() {
        if (this.isHurtAnimationRunning) return;
        if (!this.isHurt()) return;
        if (this.isDead()) return;

        this.startHurtAnimation();
    }


    /**
     * Start the hurt animation interval.
     */
    startHurtAnimation() {
        this.stopCurrentAnimation();
        this.isHurtAnimationRunning = true;
        this.currentImage = 0;
        audioBossHurt.play();

        let i = 0;
        const interval = setInterval(() => {
            this.showHurtFrame(i);
            i++;

            if (i >= this.IMAGES_HURT.length || !this.isHurt()) {
                clearInterval(interval);
                this.isHurtAnimationRunning = false;
            }
        }, 80);
    }


    /**
     * Display a single frame of hurt animation.
     * @param {number} index - Frame index
     */
    showHurtFrame(index) {
        this.img = this.imageCache[this.IMAGES_HURT[index]];
    }


    /**
     * Play death animation sequence.
     */
    die() {
        if (this.isDeadAnimationRunning) return;

        this.startDeadAnimation();
    }


    /**
     * Start the death animation interval.
     */
    startDeadAnimation() {
        this.isDeadAnimationRunning = true;
        this.energy = 0;
        this.currentImage = 0;

        let i = 0;
        const interval = setInterval(() => {
            this.showDeadFrame(i);
            i++;

            if (i >= this.IMAGES_DEAD.length) {
                clearInterval(interval);
                this.finishDeadAnimation();
            }
        }, 120);

        audioGameWin.play();
    }


    /**
     * Display a single frame of death animation.
     * @param {number} index - Frame index
     */
    showDeadFrame(index) {
        this.img = this.imageCache[this.IMAGES_DEAD[index]];
    }


    /**
     * Finish the death animation and stop the game world.
     */
    finishDeadAnimation() {
        this.isFinalDead = true;
        if (this.world) this.world.stopGame();
    }


    /**
     * Calculate the center coordinates of a target character.
     * @param {Character} character - Target character
     * @returns {{x: number, y: number}} Center coordinates of the target
     */
    calculateTargetCenter(character) {
        return {
            x: character.x + character.width / 2,
            y: character.y + character.height / 2
        };
    }


    /**
     * Calculate distance in x and y to a target point.
     * @param {number} targetX
     * @param {number} targetY
     * @returns {{distanceX: number, distanceY: number}}
     */
    calculateDistance(targetX, targetY) {
        const distanceX = targetX - (this.x + this.width / 2);
        const distanceY = targetY - (this.y + this.height / 2);
        return { distanceX, distanceY };
    }


    /**
     * Update boss direction based on horizontal distance.
     * @param {number} distanceX
     */
    updateDirection(distanceX) {
        this.otherDirection = distanceX > 0;
    }


    /**
     * Apply movement towards a target based on distances.
     * @param {number} distanceX
     * @param {number} distanceY
     */
    applyMovement(distanceX, distanceY) {
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance < 1) return;

        this.x += (distanceX / distance) * this.speed;
        this.y += (distanceY / distance) * this.speed;
    }


    /**
     * Move the boss towards a character.
     * @param {Character} character - Target character
     */
    moveTowards(character) {
        const target = this.calculateTargetCenter(character);
        const { distanceX, distanceY } = this.calculateDistance(target.x, target.y);
        this.updateDirection(distanceX);
        this.applyMovement(distanceX, distanceY);
    }


    /**
     * Initiates the attack sequence for the Endboss.
     * Plays the attack animation frame by frame and plays the attack sound for each frame.
     * Prevents starting a new attack if the Endboss is already attacking, dead, or hurt.
     */
    playAttack() {
        if (this.isAttacking) return;
        if (this.isDead()) return;
        if (this.isHurt()) return;
        if (this.isHurtAnimationRunning) return;
        this.stopCurrentAnimation();
        this.isAttacking = true;
        this.currentImage = 0;
        let i = 0;

        this.currentAnimationInterval = setInterval(() => {
            let images = this.IMAGES_ATTACK;
            let path = images[i];
            this.img = this.imageCache[path];
            i++; audioBossAttack.play();
            if (i >= images.length) {
                this.stopCurrentAnimation();
                this.isAttacking = false;
            }
        }, 120);
    }


    /**
     * Stop any currently running animation interval.
     */
    stopCurrentAnimation() {
        if (this.currentAnimationInterval) {
            clearInterval(this.currentAnimationInterval);
            this.currentAnimationInterval = null;
        }
        this.isAttacking = false;
    }
}