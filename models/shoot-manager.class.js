/**
 * Manages all shooting logic for the character.
 */
class ShootManager {

    /** @type {World} Reference to the game world. */
    world;


    /**
     * Creates a new ShootManager for the given world.
     * @param {World} world The game world instance.
     */
    constructor(world) {
        this.world = world;
    }


    /**
     * Checks if the character can shoot and triggers shooting.
     */
    checkShoot() {
        if (this.canShoot()) {
            this.shoot();
        }
    }


    /** Determines if the character can currently shoot. */
    canShoot() {
        return this.world.keyboard.SPACE && this.world.character.canShoot &&
            !this.world.character.isAttacking && !this.world.character.isHurt();
    }


    /**
     * Handles the character shooting action.
     * Plays attack animation and spawns a bubble at the correct time.
     * Implements cooldown before the character can shoot again.
     */
    shoot() {
        this.world.character.canShoot = false;

        this.world.character.playAttack(() => {
            this.createShootableObject();
        });

        setTimeout(() => {
            this.world.character.canShoot = true;
        }, this.world.character.shootCooldown);
    }


    /**
     * Creates a new shootable object (bubble) from the character.
     * Determines direction, offset, poison status, and damage.
     * Adds it to the world and updates the poison amount if used.
     */
    createShootableObject() {
        let direction = this.world.character.otherDirection ? -1 : 1;
        let offsetX = this.world.character.otherDirection ? -20 : 140;
        let isPoison = this.world.character.poisonAmount > 0;
        let damage = isPoison ? 20 : 10;

        let bubble = new ShootableObject(
            this.world.character.x + offsetX,
            this.world.character.y + 100,
            direction,
            damage,
            isPoison
        );

        bubble.world = this.world;
        this.usePoisonAmount(isPoison);
        this.world.shootableObjects.push(bubble);
    }


    /**
     * Decreases the character's poison amount if a poison bubble is used
     * and updates the corresponding status bar.
     * @param {boolean} isPoison Whether the bubble uses poison.
     */
    usePoisonAmount(isPoison) {
        if (isPoison) {
            this.world.character.poisonAmount -= 20;
            this.world.statusBarPoison.setPercentage(this.world.character.poisonAmount);
        }
    }


    /**
     * Checks if a bubble has exceeded its allowed range from the character.
     * @param {ShootableObject} bubble The bubble object.
     * @returns {boolean} True if the bubble is out of range.
     */
    isBubbleOutOfRange(bubble) {
        return bubble.x > this.world.character.x + 550;
    }
}