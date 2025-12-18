/**
 * Manages the endboss logic: spawning, attacks, and behavior.
 */
class EndbossManager {

    /** @type {World} Reference to the game world. */
    world;


    /**
     * Creates a new EndbossManager for the given world.
     * @param {World} world The game world instance.
     */
    constructor(world) {
        this.world = world;
    }


    /**
     * Checks if the endboss should spawn and triggers spawn logic.
     */
    checkSpawn() {
        if (this.hasEndbossSpawned()) return;

        if (this.isCharacterAtSpawnPosition()) {
            this.spawn();
        }
    }


    /**
     * Returns whether the endboss has already spawned.
     * @returns {boolean} True if spawned.
     */
    hasEndbossSpawned() {
        return this.world.endbossSpawned;
    }


    /**
     * Returns true if the character has reached the spawn position for the endboss.
     * @returns {boolean}
     */
    isCharacterAtSpawnPosition() {
        return this.world.character.x > 2300;
    }


    /**
     * Spawns the endboss at the designated position,
     * initializes its animation, and adds it to the level.
     */
    spawn() {
        this.world.endbossSpawned = true;
        bossSpawn.play();
        this.world.endboss = new Endboss(2700, 0);
        this.world.endboss.world = this.world;

        if (this.world.endboss.animate) {
            this.world.endboss.animate();
        }
        this.world.endboss.playSpawn(() => {
            this.world.endboss.isSpawned = true;
            this.world.statusBarLifeBoss.hide = false;
        });
        this.world.level.enemies.push(this.world.endboss);
    }


    /**
     * Checks if the endboss is in range to attack the character
     * and triggers the attack if possible.
     */
    checkAttack() {
        this.world.level.enemies.forEach(enemy => {
            if (!(enemy instanceof Endboss)) return;

            let charCenterX = this.characterCenterX();
            let charCenterY = this.characterCenterY();
            let bossCenterX = this.endbossCenterX(enemy);
            let bossCenterY = this.endbossCenterY(enemy);
            let distanceX = Math.abs(charCenterX - bossCenterX);
            let distanceY = Math.abs(charCenterY - bossCenterY);

            if (distanceX < 230 && distanceY < 95 && enemy.canAttack) {
                this.attack(enemy);
            }
        });
    }


    /**
     * Executes an attack for the given endboss and applies cooldown.
     * @param {Endboss} enemy The endboss performing the attack.
     */
    attack(enemy) {
        enemy.playAttack();
        enemy.canAttack = false;

        setTimeout(() => {
            enemy.canAttack = true;
        }, enemy.attackCooldown);
    }


    /**
     * Handles the endboss being hit by updating its health bar,
     * playing hurt animation, and killing it if energy reaches 0.
     * @param {Endboss} enemy The endboss that was hit.
     */
    handleHit(enemy) {
        this.world.statusBarLifeBoss.setPercentage(enemy.energy);
        enemy.playHurt();

        if (enemy.energy <= 0) {
            enemy.die();
        }
    }

    
    /**
     * Returns the X-coordinate of the character's center for distance calculations.
     * @returns {number}
     */
    characterCenterX() {
        return this.world.character.x + this.world.character.offset.left
            + (this.world.character.width - this.world.character.offset.left - this.world.character.offset.right) / 2;
    }


    /**
     * Returns the Y-coordinate of the character's center for distance calculations.
     * @returns {number}
     */
    characterCenterY() {
        return this.world.character.y + this.world.character.offset.top
            + (this.world.character.height - this.world.character.offset.top - this.world.character.offset.bottom) / 2;
    }


    /**
     * Returns the X-coordinate of the endboss's center.
     * @param {Endboss} enemy The endboss object.
     * @returns {number}
     */
    endbossCenterX(enemy) {
        return enemy.x + enemy.offset.left - 15
            + 315 / 2;
    }


    /**
     * Returns the Y-coordinate of the endboss's center.
     * @param {Endboss} enemy The endboss object.
     * @returns {number}
     */
    endbossCenterY(enemy) {
        return enemy.y + enemy.offset.top
            + (enemy.height - enemy.offset.top - 175) / 2;
    }
}