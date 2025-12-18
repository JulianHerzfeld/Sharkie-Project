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
     * Creates a new character instance.
     *
     * Initializes the default character image, preloads all animation frames
     * required for movement, idle states, attacks, damage reactions, and death.
     * Additionally, an instance of {@link CharacterAnimationController} is created
     * to handle animation state transitions and timing logic.
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
        this.animationController = new CharacterAnimationController(this);
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
     * This function checks if the character is currently moving via keyboard input
     * (LEFT, RIGHT, UP, DOWN, SPACE) or if the character is hurt. If any of these
     * conditions are true, it updates `lastMoveTime` to the current timestamp.
     *
     * This timestamp is used to determine idle behavior and long-idle animations.
     *
     * @returns {void}
     */
    updateLastMoveTime() {
        const moving =
            this.world.keyboard.LEFT ||
            this.world.keyboard.RIGHT ||
            this.world.keyboard.UP ||
            this.world.keyboard.DOWN ||
            this.world.keyboard.SPACE ||
            this.isHurt();

        if (moving) {
            this.lastMoveTime = Date.now();
        }
    }


    /**
     * Handles character movement based on keyboard input and boundary constraints.
     *
     * Evaluates the current keyboard state and moves the character accordingly
     * (left, right, up, down), while ensuring movement stays within the defined
     * world boundaries. Movement is blocked if the character is not allowed to move
     * (e.g. during attacks or animations), as determined by {@link canMove}.
     *
     * Side effects:
     * - Updates the character's position (`x`, `y`)
     * - Updates the facing direction via `otherDirection`
     *
     * @returns {void}
     */
    handleMovement() {
        if (this.canMove(this.world.keyboard.LEFT, this.x > -600)) {
            this.moveLeft(); this.otherDirection = true;
        }
        if (this.canMove(this.world.keyboard.RIGHT, this.x < 2880)) {
            this.moveRight(); this.otherDirection = false;
        }
        if (this.canMove(this.world.keyboard.UP, this.y > -80)) {
            this.moveUp();
        }
        if (this.canMove(this.world.keyboard.DOWN, this.y < 310)) {
            this.moveDown();
        }
    }


    /**
     * Determines whether the character is allowed to move in a given direction.
     *
     * Movement is permitted only if:
     * - The corresponding movement key is currently pressed
     * - The provided boundary condition is fulfilled
     * - The character is not currently attacking
     *
     * If movement is allowed, the movement sound effect is played.
     *
     * @param {boolean} keyPressed - Indicates whether the movement key is pressed.
     * @param {boolean} condition - Boundary or state condition that must be true to allow movement.
     * @returns {boolean} Returns `true` if movement is allowed, otherwise `false`.
     */
    canMove(keyPressed, condition) {
        if (keyPressed && condition && !this.isAttacking) {
            audioCharacterMove.play();
            return true;
        }
        return false;
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
     * Starts the animation update loop for the character.
     *
     * This loop periodically delegates animation state handling to the
     * {@link CharacterAnimationController}, which decides which animation
     * should currently be played (idle, swim, attack, hurt, or death).
     *
     * The loop is registered as a stoppable interval via the world instance
     * and runs approximately every 130 milliseconds.
     *
     * @returns {void}
     */
    startAnimationLoop() {
        this.world.setStoppableInterval(() => {
            this.animationController.update();
        }, 130);
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
                this.finishAttack(onFinish, audioCharacterAttack);
            }
        }, 80);
    }


    /**
     * Get the appropriate attack animation images.
     * @returns {string[]} Attack image paths
     */
    getAttackImages() {
        return this.poisonAmount > 0 ? this.IMAGES_POISON_ATTACK : this.IMAGES_ATTACK;
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