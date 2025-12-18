/**
 * Controls the animation state of a character based on its current status.
 *
 * This class manages idle, long idle, swimming, hurt, and dead animations,
 * as well as stopping snoring when necessary.
 */
class CharacterAnimationController {

    /**
     * @type {Object} character - The character instance being controlled.
     */
    character;


    /**
     * Creates a CharacterAnimationController for the given character.
     *
     * @param {Object} character - The character instance to control.
     */
    constructor(character) {
        this.character = character;
    }


    /**
     * Updates the character's animation state based on its current condition.
     *
     * Chooses the appropriate animation:
     * - Dead
     * - Hurt (if not attacking)
     * - Swimming (if moving by keyboard)
     * - Stops snoring if attacking or SPACE pressed
     * - Long idle (if idle for more than 8000ms)
     * - Normal idle otherwise
     */
    update() {
        const idleTime = Date.now() - this.character.lastMoveTime;

        if (this.character.isDead()) return this.dead();
        if (this.character.isHurt() && !this.character.isAttacking) return this.hurt();
        if (this.character.isMovingByKeyboard()) return this.swim();
        if (this.character.isAttacking || this.character.world.keyboard.SPACE) return this.character.stopSnoring();
        if (idleTime > 8000) return this.longIdle();

        this.idle();
    }


    /**
     * Triggers the character's swimming animation.
     *
     * Stops any snoring audio currently playing, and if the character is not
     * attacking, plays the swimming animation sequence.
     *
     * @returns {void}
     */
    swim() {
        this.character.stopSnoring();
        if (!this.character.isAttacking) {
            this.character.playAnimation(this.character.IMAGES_SWIM);
        }
    }


    /**
     * Triggers the character's idle animation.
     *
     * Stops any snoring audio currently playing and plays the idle animation
     * sequence of the character.
     *
     * @returns {void}
     */
    idle() {
        this.character.stopSnoring();
        this.character.playAnimation(this.character.IMAGES_IDLE);
    }


    /**
     * Triggers the character's long idle animation.
     *
     * Plays the long idle animation sequence of the character. If the character
     * is not already snoring, it starts looping the snoring audio and sets
     * the character's `isSnoring` flag to true.
     *
     * @returns {void}
     */
    longIdle() {
        this.character.playAnimation(this.character.IMAGES_LONG_IDLE);
        if (!this.character.isSnoring) {
            audioCharacterSnore.loop = true;
            audioCharacterSnore.play();
            this.character.isSnoring = true;
        }
    }


    /**
     * Triggers the character's hurt animation.
     *
     * Stops the character from snoring (if currently snoring) and plays
     * the hurt animation sequence of the character.
     *
     * @returns {void}
     */
    hurt() {
        this.character.stopSnoring();
        this.character.playAnimation(this.character.IMAGES_HURT);
    }


    /**
     * Triggers the character's death sequence.
     *
     * Stops the character from snoring (if currently snoring) and initiates
     * the death animation and game-over logic for the character.
     *
     * @returns {void}
     */
    dead() {
        this.character.stopSnoring();
        this.character.die();
    }
}