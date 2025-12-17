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

    /** @type {boolean} Whether the character is currently Snoring */
    isSnoring = false;


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
     * Starts all animation and movement loops for the object.
     * Initializes continuous logic such as movement updates and
     * sprite animation cycles.
     *
     * This method is typically called once after the object
     * has been added to the game world.
     */
    animate() {
        this.startMovementLoop();
        this.startAnimationLoop();
    }


    /**
     * Starts the continuous movement update loop.
     *
     * Executes movement-related logic at approximately 60 frames per second.
     * The loop updates the last movement timestamp, processes character movement
     * based on input, and adjusts the camera position accordingly.
     *
     * The interval is registered as stoppable and will be cleared automatically
     * when the game stops.
     */
    startMovementLoop() {
        this.world.setStoppableInterval(() => {
            this.updateLastMoveTime();
            this.handleMovement();
            this.updateCamera();
        }, 1000 / 60);
    }


    /**
     * Updates the timestamp of the last movement or action.
     *
     * Checks whether the player is currently performing any movement or action
     * via keyboard input (left, right, up, down, or attack).
     * If any relevant input is detected, the current timestamp is stored.
     *
     * This timestamp is primarily used to determine idle and long-idle states
     * for animation control.
     */
    updateLastMoveTime() {
        const moving =
            this.world.keyboard.LEFT ||
            this.world.keyboard.RIGHT ||
            this.world.keyboard.UP ||
            this.world.keyboard.DOWN ||
            this.world.keyboard.SPACE;

        if (moving) {
            this.lastMoveTime = Date.now();
        }
    }


    /**
     * Handles the movement of the character by calling the individual
     * movement functions for left, right, up, and down directions.
     *
     * This function coordinates all directional movement, but does not
     * return any value. Movement logic is implemented in the called functions.
     */
    handleMovement() {
        this.characterMoveLeft();
        this.characterMoveRight();
        this.characterMoveUp();
        this.characterMoveDown();
    }


    /**
     * Moves the character to the left if movement in that direction is allowed.
     *
     * Checks whether the character can move left using `canMoveLeft()`. 
     * If movement is possible, executes `moveLeft()`, updates the character's
     * direction state, and plays the movement audio.
     */
    characterMoveLeft() {
        if (this.canMoveLeft()) {
            this.moveLeft();
            this.otherDirection = true;
            audioCharacterMove.play();
        }
    }


    /**
     * Moves the character to the right if movement in that direction is allowed.
     *
     * Checks whether the character can move right using `canMoveRight()`. 
     * If movement is possible, executes `moveRight()`, updates the character's
     * direction state, and plays the movement audio.
     */
    characterMoveRight() {
        if (this.canMoveRight()) {
            this.moveRight();
            this.otherDirection = false;
            audioCharacterMove.play();
        }
    }


    /**
     * Moves the character upward if movement in that direction is allowed.
     *
     * Checks whether the character can move up using `canMoveUp()`. 
     * If movement is possible, executes `moveUp()` and plays the movement audio.
     */
    characterMoveUp() {
        if (this.canMoveUp()) {
            this.moveUp();
            audioCharacterMove.play();
        }
    }


    /**
     * Moves the character downward if movement in that direction is allowed.
     *
     * Checks whether the character can move down using `canMoveDown()`. 
     * If movement is possible, executes `moveDown()` and plays the movement audio.
     */
    characterMoveDown() {
        if (this.canMoveDown()) {
            this.moveDown();
            audioCharacterMove.play();
        }
    }


    /**
     * Checks if the character can move left.
     *
     * The character can move left if the LEFT key is pressed, the x-position
     * is greater than -600, and the character is not currently attacking.
     *
     * @returns {boolean} True if the character can move left, otherwise false.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -600 && !this.isAttacking;
    }


    /**
     * Checks if the character can move right.
     *
     * The character can move right if the RIGHT key is pressed, the x-position
     * is less than 2880, and the character is not currently attacking.
     *
     * @returns {boolean} True if the character can move right, otherwise false.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < 2880 && !this.isAttacking;
    }


    /**
     * Checks if the character can move up.
     *
     * The character can move up if the UP key is pressed, the y-position
     * is greater than -80, and the character is not currently attacking.
     *
     * @returns {boolean} True if the character can move up, otherwise false.
     */
    canMoveUp() {
        return this.world.keyboard.UP && this.y > -80 && !this.isAttacking;
    }


    /**
     * Checks if the character can move down.
     *
     * The character can move down if the DOWN key is pressed, the y-position
     * is less than 310, and the character is not currently attacking.
     *
     * @returns {boolean} True if the character can move down, otherwise false.
     */
    canMoveDown() {
        return this.world.keyboard.DOWN && this.y < 310 && !this.isAttacking;
    }


    /**
     * Updates the camera position based on the character's x-coordinate.
     *
     * If the character's x-position exceeds 2480, the camera is fixed at -2380.
     * Otherwise, the camera follows the character, offset by 100 units.
     */
    updateCamera() {
        if (this.x > 2480) {
            this.world.camera_x = -2380;
        } else {
            this.world.camera_x = -this.x + 100;
        }
    }


    /**
     * Starts the character's animation loop.
     *
     * Uses the world's `setStoppableInterval` method to repeatedly call
     * `updateAnimationState()` every 130 milliseconds, updating the character's
     * animation frames.
     */
    startAnimationLoop() {
        this.world.setStoppableInterval(() => {
            this.updateAnimationState();
        }, 130);
    }


    /**
     * Updates the character's animation state based on current conditions.
     *
     * Determines which animation or state should be active:
     * - If the character is dead, triggers the dead state.
     * - If the character is hurt and not attacking, triggers the hurt state.
     * - If the character is moving via keyboard input, triggers the swimming state.
     * - If the character is attacking, stops snoring animation.
     * - If the SPACE key is pressed, stops snoring animation.
     * - If the character has been idle for more than 8000 ms, triggers the long idle state.
     * - Otherwise, triggers the normal idle state.
     */
    updateAnimationState() {
        const idleTime = Date.now() - this.lastMoveTime;

        if (this.isDead()) {
            this.handleDeadState();
        }
        else if (this.isHurt() && !this.isAttacking) {
            this.handleHurtState();
        }
        else if (this.isMovingByKeyboard()) {
            this.handleSwimState();
        }
        else if (this.isAttacking) {
            this.stopSnoring();
        }
        else if (this.world.keyboard.SPACE) {
            this.stopSnoring();
        }
        else if (idleTime > 8000) {
            this.handleLongIdleState();
        }
        else {
            this.handleIdleState();
        }
    }


    /**
     * Checks if the character is currently moving via keyboard input.
     *
     * Returns true if any of the movement keys (LEFT, RIGHT, UP, DOWN) are pressed.
     * 
     * @returns {boolean} True if the character is moving by keyboard, otherwise false.
     */
    isMovingByKeyboard() {
        return (
            this.world.keyboard.RIGHT ||
            this.world.keyboard.LEFT ||
            this.world.keyboard.UP ||
            this.world.keyboard.DOWN
        );
    }


    /**
     * Handles the character's dead state.
     *
     * Stops any snoring animation and triggers the character's death sequence
     * by calling `die()`.
     */
    handleDeadState() {
        this.stopSnoring();
        this.die();
    }


    /**
     * Handles the character's hurt state.
     *
     * Stops any snoring animation and plays the hurt animation
     * by using the `IMAGES_HURT` animation frames.
     */
    handleHurtState() {
        this.stopSnoring();
        this.playAnimation(this.IMAGES_HURT);
    }


    /**
     * Handles the character's swimming/moving state.
     *
     * Stops any snoring animation and, if the character is not attacking,
     * plays the swimming animation using the `IMAGES_SWIM` frames.
     */
    handleSwimState() {
        this.stopSnoring();
        if (!this.isAttacking) {
            this.playAnimation(this.IMAGES_SWIM);
        }
    }


    /**
     * Handles the character's long idle state.
     *
     * Plays the long idle animation using `IMAGES_LONG_IDLE`. 
     * If the character is not already snoring, starts the snoring audio
     * in a loop and sets the `isSnoring` flag to true.
     */
    handleLongIdleState() {
        this.playAnimation(this.IMAGES_LONG_IDLE);

        if (!this.isSnoring) {
            audioCharacterSnore.loop = true;
            audioCharacterSnore.play();
            this.isSnoring = true;
        }
    }


    /**
     * Handles the character's normal idle state.
     *
     * Stops any snoring animation and plays the standard idle animation
     * using the `IMAGES_IDLE` frames.
     */
    handleIdleState() {
        this.stopSnoring();
        this.playAnimation(this.IMAGES_IDLE);
    }


    /**
     * Stops the character's snoring sound if it is currently playing.
     * Resets the audio playback and updates the snoring state.
     */
    stopSnoring() {
        if (this.isSnoring) {
            audioCharacterSnore.pause();
            audioCharacterSnore.currentTime = 0;
            this.isSnoring = false;
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