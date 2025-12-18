/**
 * Manages all collision logic in the game world.
 * Checks interactions between the character, enemies, items, and projectiles.
 */
class CollisionManager {

    /** @type {World} Reference to the game world. */
    world;


    /**
     * Creates a new CollisionManager for the given world.
     * @param {World} world The game world instance.
     */
    constructor(world) {
        this.world = world;
    }


    /**
     * Executes all collision checks:
     * - character vs enemies
     * - character vs items
     * - bubbles vs enemies
     */
    checkAll() {
        this.collisionWithEnemy();
        this.collisionWithItem();
        this.collisionBubbleWithEnemy();
    }

    
    /**
     * Handles collisions between the character and enemies.
     * Applies damage to the character, plays hurt sound,
     * and sets a cooldown for invulnerability.
     */
    collisionWithEnemy() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy) && this.world.character.canHurt) {
                this.world.character.hit(20);
                this.world.statusBarLife.setPercentage(this.world.character.energy);
                this.world.character.canHurt = false;
                audioCharacterHurt.play();
                setTimeout(() => {
                    this.world.character.canHurt = true;
                }, this.world.character.hurtCooldown);
            }
        });
    }


    /**
     * Handles collisions between the character and collectable items.
     * Collects the item and removes it from the level.
     */
    collisionWithItem() {
        this.world.level.collectableItem.forEach((item, index) => {
            if (this.world.character.isColliding(item)) {
                this.world.collect(item);
                this.world.level.collectableItem.splice(index, 1);
            }
        });
    }


    /**
     * Checks for collisions between bubbles and enemies.
     *
     * Iterates over all shootable objects (bubbles) and all enemies in the level,
     * calling `bubbleHitEnemy()` to handle collisions between each bubble and enemy,
     * and `checkBubbleRange()` to verify if the bubble is still within its valid range.
     */
    collisionBubbleWithEnemy() {
        this.world.shootableObjects.forEach((bubble, bIndex) => {
            this.world.level.enemies.forEach((enemy, eIndex) => {
                this.bubbleHitEnemy(bubble, enemy, bIndex);
                this.checkBubbleRange(bubble, bIndex);
            });
        });
    }


    /**
     * Handles the interaction when a bubble hits an enemy.
     *
     * Checks if the given `bubble` collides with the `enemy` using `checkBubbleCollision()`.
     * If a collision occurs:
     *   - Reduces the enemy's health by `bubble.damage`.
     *   - Removes the bubble from the game.
     *   - If the enemy is an Endboss, calls `handleEndbossHit()`.
     *   - Otherwise, if the enemy's energy reaches 0, calls `handleEnemyHit()`.
     *
     * @param {Object} bubble - The bubble object that may hit the enemy.
     * @param {number} bubble.damage - The damage value inflicted by the bubble.
     * @param {Object} enemy - The enemy object that may be hit by the bubble.
     * @param {number} bIndex - The index of the bubble in the `shootableObjects` array.
     */
    bubbleHitEnemy(bubble, enemy, bIndex) {
        if (this.checkBubbleCollision(bubble, enemy)) {
            enemy.hit(bubble.damage);
            this.world.removeBubble(bIndex);

            if (enemy instanceof Endboss) {
                this.world.endbossManager.handleHit(enemy);
            } else if (enemy.energy <= 0) {
                this.world.handleEnemyHit(enemy);
            }
        }
    }


    /**
     * Checks if a bubble is out of its valid range and removes it if necessary.
     *
     * Uses `isBubbleOutOfRange()` to determine if the bubble has exceeded its range.
     * If the bubble is out of range, it is removed from the `shootableObjects` array.
     *
     * @param {Object} bubble - The bubble object to check.
     * @param {number} bIndex - The index of the bubble in the `shootableObjects` array.
     */
    checkBubbleRange(bubble, bIndex) {
        if (this.world.shootManager.isBubbleOutOfRange(bubble)) {
            this.world.removeBubble(bIndex);
        }
    }


    /**
     * Checks if a bubble collides with an enemy.
     * @param {ShootableObject} bubble The bubble object.
     * @param {MovableObject} enemy The enemy object.
     * @returns {boolean} True if collision occurs.
     */
    checkBubbleCollision(bubble, enemy) {
        if (!bubble || !enemy) return false;
        return bubble.isColliding(enemy);
    }
}