/**
 * Represents the main game world, handling all objects, collisions, drawing, and game logic.
 */
class World {
    /** @type {Character} The main player character. */
    character = new Character();

    /** @type {Level} The current level object. */
    level;

    /** @type {HTMLCanvasElement} The canvas for rendering the game. */
    canvas;

    /** @type {CanvasRenderingContext2D} The canvas 2D rendering context. */
    ctx;

    /** @type {Keyboard} Object containing keyboard input states. */
    keyboard;

    /** @type {number} Camera x-position offset for scrolling. */
    camera_x = 0;

    /** @type {StatusBar} Status bar for player's life. */
    statusBarLife;

    /** @type {StatusBar} Status bar for poison. */
    statusBarPoison;

    /** @type {StatusBar} Status bar for coins collected. */
    statusBarCoins;

    /** @type {StatusBar} Status bar for endboss life. */
    statusBarLifeBoss;

    /** @type {Array<MovableObject>} Shootable objects currently active in the world. */
    shootableObjects = [];

    /** @type {boolean} Whether the endboss has spawned. */
    endbossSpawned = false;

    /** @type {Array<number>} Array of interval IDs for stoppable intervals. */
    intervalIds = [];


    /**
     * Creates a new game world.
     * @param {HTMLCanvasElement} canvas The canvas element for drawing.
     * @param {Keyboard} keyboard Keyboard input handler.
     * @param {Level} level1 The level object to load.
     */
    constructor(canvas, keyboard, level1) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level1
        this.generateBackground();
        this.generateStatusBar();
        this.draw();
        this.setWorld();
        this.run();
        this.assignWorldToAll(this.level.enemies);
        this.assignWorldToAll(this.level.collectableItem);
    }


    /**
     * Starts an interval that can be stopped later.
     * @param {Function} fn Function to execute.
     * @param {number} time Interval in milliseconds.
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
    }


    /** Stops the game, all intervals, and background audio. Displays overlays. */
    stopGame() {
        this.stopAllIntervals();
        this.stopBackgroundAudio();
        gameOver = true;

        setTimeout(() => {
            this.stopDrawLoop();
            gameStarted = false;
            this.showGameOverOverlays();
        }, 2000);
    }


    /** Clears all intervals previously set via setStoppableInterval. */
    stopAllIntervals() {
        this.intervalIds.forEach(clearInterval);
        this.intervalIds = [];
    }


    /** Pauses and resets the background audio. */
    stopBackgroundAudio() {
        audioBackground.pause();
        audioBackground.currentTime = 0;
        this.character.stopSnoring();
    }


    /** Stops the continuous draw loop of the canvas. */
    stopDrawLoop() {
        if (this.drawRequestId) {
            cancelAnimationFrame(this.drawRequestId);
            this.drawRequestId = null;
        }
        this.stopDrawing = true;
    }


    /** Displays game over overlays based on character or boss death. */
    showGameOverOverlays() {
        if (this.character.energy <= 0) {
            document.getElementById('overlay-player-dead').classList.remove("hidden");
        }
        if (this.endboss && this.endboss.energy <= 0) {
            document.getElementById('overlay-boss-dead').classList.remove("hidden");
        }
    }


    /** Generates all status bars in the game world. */
    generateStatusBar() {
        this.statusBarLife = new StatusBar(this.statusBarLifeImages(), 10, -10, 100);
        this.statusBarPoison = new StatusBar(this.statusBarPoisonImages(), 10, 20, 0);
        this.statusBarCoins = new StatusBar(this.statusBarCoinsImages(), 10, 50, 0);
        this.statusBarLifeBoss = new StatusBar(this.statusBarLifeBossImages(), 540, -10, 100);
        this.statusBarLifeBoss.hide = true;
    }


    /** Returns images for the life status bar. */
    statusBarLifeImages() {
        return [
            'img/4. Marcadores/Purple/0_ .png',
            'img/4. Marcadores/Purple/20__1.png',
            'img/4. Marcadores/Purple/40_ .png',
            'img/4. Marcadores/Purple/60_ .png',
            'img/4. Marcadores/Purple/80_ .png',
            'img/4. Marcadores/Purple/100_ .png'
        ];
    }


    /** Returns images for the poison status bar. */
    statusBarPoisonImages() {
        return [
            'img/4. Marcadores/Purple/0_.png',
            'img/4. Marcadores/Purple/20_.png',
            'img/4. Marcadores/Purple/40_.png',
            'img/4. Marcadores/Purple/60_.png',
            'img/4. Marcadores/Purple/80_.png',
            'img/4. Marcadores/Purple/100_.png'
        ];
    }


    /** Returns images for the coins status bar. */
    statusBarCoinsImages() {
        return [
            'img/4. Marcadores/Purple/0_ _1.png',
            'img/4. Marcadores/Purple/20_ .png',
            'img/4. Marcadores/Purple/40_ _1.png',
            'img/4. Marcadores/Purple/60_ _1.png',
            'img/4. Marcadores/Purple/80_ _1.png',
            'img/4. Marcadores/Purple/100__1.png'
        ];
    }


    /** Returns images for the endboss life status bar. */
    statusBarLifeBossImages() {
        return [
            'img/4. Marcadores/orange/0_  copia.png',
            'img/4. Marcadores/orange/20_ copia 2.png',
            'img/4. Marcadores/orange/40_  copia.png',
            'img/4. Marcadores/orange/60_  copia.png',
            'img/4. Marcadores/orange/80_  copia.png',
            'img/4. Marcadores/orange/100_  copia.png'
        ];
    }


    /** Generates background objects for parallax effect based on level. */
    generateBackground() {
        let repeat = 5;

        for (let bgPosition = -1; bgPosition < repeat; bgPosition++) {
            let offset = bgPosition * 720;
            let variant = (bgPosition % 2 + 2) % 2;

            for (let i = 0; i < this.level.layers.length; i++) {
                let file = (i === 4) ? this.level.filesLight[variant] : this.level.files[variant];
                this.level.backgroundObjects.push(new BackgroundObject(this.level.layers[i] + file, offset));
            }
        }
    }


    /** Assigns this world instance to the character. */
    setWorld() {
        this.character.world = this;
        if (this.character.animate) this.character.animate();
    }


    /** Starts the main game logic interval checks. */
    run() {
        this.setStoppableInterval(() => {
            this.checkCollisions();
            this.checkShootObjects();
            this.checkEnemyCharacterDistance();
            this.checkSpawnEndboss();
            this.checkEndbossAttack();
        }, 150);
    }


    /**
     * Assigns the world to all objects in a list and calls their animate method.
     * @param {Array<MovableObject>} objects 
     */
    assignWorldToAll(objects) {
        objects.forEach(o => {
            o.world = this;
            if (o.animate) o.animate();
        });
    }


    /** Checks if the character can shoot and creates projectiles if so. */
    checkShootObjects() {
        if (this.canShoot()) {
            this.shoot();
        }
    }


    /** Determines if the character can currently shoot. */
    canShoot() {
        return this.keyboard.SPACE && this.character.canShoot &&
            !this.character.isAttacking && !this.character.isHurt();
    }


    /**
     * Creates a new shootable object (bubble) from the character.
     * Determines direction, offset, poison status, and damage.
     * Adds it to the world and updates the poison amount if used.
     */
    createShootableObject() {
        let direction = this.character.otherDirection ? -1 : 1;
        let offsetX = this.character.otherDirection ? -20 : 140;
        let isPoison = this.character.poisonAmount > 0;
        let damage = isPoison ? 20 : 10;

        let bubble = new ShootableObject(
            this.character.x + offsetX,
            this.character.y + 100,
            direction,
            damage,
            isPoison
        );

        bubble.world = this;
        this.usePoisonAmount(isPoison);
        this.shootableObjects.push(bubble);
    }


    /**
     * Handles the character shooting action.
     * Plays attack animation and spawns a bubble at the correct time.
     * Implements cooldown before the character can shoot again.
     */
    shoot() {
        this.character.canShoot = false;

        this.character.playAttack(() => {
            this.createShootableObject();
        });

        setTimeout(() => {
            this.character.canShoot = true;
        }, this.character.shootCooldown);
    }


    /**
     * Decreases the character's poison amount if a poison bubble is used
     * and updates the corresponding status bar.
     * @param {boolean} isPoison Whether the bubble uses poison.
     */
    usePoisonAmount(isPoison) {
        if (isPoison) {
            this.character.poisonAmount -= 20;
            this.statusBarPoison.setPercentage(this.character.poisonAmount);
        }
    }


    /**
     * Checks for all types of collisions in the world:
     * - Character with enemies
     * - Character with collectable items
     * - Bubbles with enemies
     */
    checkCollisions() {
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
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.canHurt) {
                this.character.hit(20);
                this.statusBarLife.setPercentage(this.character.energy);
                this.character.canHurt = false;
                audioCharacterHurt.play();
                setTimeout(() => {
                    this.character.canHurt = true;
                }, this.character.hurtCooldown);
            }
        });
    }


    /**
     * Handles collisions between the character and collectable items.
     * Collects the item and removes it from the level.
     */
    collisionWithItem() {
        this.level.collectableItem.forEach((item, index) => {
            if (this.character.isColliding(item)) {
                this.collect(item);
                this.level.collectableItem.splice(index, 1);
            }
        });
    }


    /**
     * Handles collisions between bubbles and enemies.
     * Applies damage, triggers enemy or endboss hit handlers,
     * and removes bubbles if out of range or after hitting.
     */
    collisionBubbleWithEnemy() {
        this.shootableObjects.forEach((bubble, bIndex) => {
            this.level.enemies.forEach((enemy, eIndex) => {
                if (this.checkBubbleCollision(bubble, enemy)) {
                    enemy.hit(bubble.damage);
                    this.removeBubble(bIndex);

                    if (enemy instanceof Endboss) {
                        this.handleEndbossHit(enemy);
                    } else if (enemy.energy <= 0) {
                        this.handleEnemyHit(enemy);
                    }
                }

                if (this.isBubbleOutOfRange(bubble)) {
                    this.removeBubble(bIndex);
                }
            });
        });
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


    /**
     * Handles an endboss being hit by a bubble.
     * Updates boss health bar, plays hurt animation, and kills boss if health <= 0.
     * @param {Endboss} enemy The endboss object.
     */
    handleEndbossHit(enemy) {
        this.statusBarLifeBoss.setPercentage(enemy.energy);
        enemy.playHurt();

        if (enemy.energy <= 0) {
            enemy.die();
        }
    }


    /**
     * Handles a normal enemy being hit by a bubble.
     * Plays hurt sound and kills the enemy.
     * @param {MovableObject} enemy The enemy object.
     */
    handleEnemyHit(enemy) {
        audioEnemyHurt.play();
        enemy.die();
    }


    /**
      * Removes a bubble from the active shootable objects array.
      * @param {number} bIndex The index of the bubble to remove.
      */
    removeBubble(bIndex) {
        this.shootableObjects.splice(bIndex, 1);
    }


    /**
     * Checks if a bubble has exceeded its allowed range from the character.
     * @param {ShootableObject} bubble The bubble object.
     * @returns {boolean} True if the bubble is out of range.
     */
    isBubbleOutOfRange(bubble) {
        return bubble.x > this.character.x + 550;
    }


    /**
     * Checks distance between enemies and character for triggering transitions (e.g., Pufferfish behavior).
     */
    checkEnemyCharacterDistance() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Pufferfish) {
                if (enemy.isTransition) return;

                let distance_x = Math.abs((this.character.x + this.character.offset.left) - (enemy.x + enemy.offset.left));
                let distance_y = Math.abs((this.character.y + this.character.offset.top) - (enemy.y + enemy.offset.top));

                if (distance_x < 200 && distance_y < 120 && !enemy.energy <= 0) {

                    enemy.playTransition(() => {
                        enemy.useAlternateSwim = true;
                        enemy.offset = enemy.transitionOffset;
                    });
                }
            }
        });
    }


    /**
     * Checks if the endboss should spawn based on character position.
     */
    checkSpawnEndboss() {
        if (this.hasEndbossSpawned()) return;

        if (this.isCharacterAtSpawnPosition()) {
            this.spawnEndboss();
        }
    }


    /**
     * Returns whether the endboss has already spawned.
     * @returns {boolean} True if spawned.
     */
    hasEndbossSpawned() {
        return this.endbossSpawned;
    }


    /**
     * Returns true if the character has reached the spawn position for the endboss.
     * @returns {boolean}
     */
    isCharacterAtSpawnPosition() {
        return this.character.x > 2300;
    }


    /**
     * Spawns the endboss at the designated location and initializes its animation.
     */
    spawnEndboss() {
        this.endbossSpawned = true;
        bossSpawn.play();
        this.endboss = new Endboss(2700, 0);
        this.endboss.world = this;

        if (this.endboss.animate) {
            this.endboss.animate();
        }
        this.endboss.playSpawn(() => {
            this.endboss.isSpawned = true;
            this.statusBarLifeBoss.hide = false;
        });
        this.level.enemies.push(this.endboss);
    }


    /**
     * Checks if the endboss should attack the character based on distance.
     */
    checkEndbossAttack() {
        this.level.enemies.forEach(enemy => {
            if (!(enemy instanceof Endboss)) return;

            let charCenterX = this.characterCenterX();
            let charCenterY = this.characterCenterY();

            let bossCenterX = this.endbossCenterX(enemy);
            let bossCenterY = this.endbossCenterY(enemy);

            let distanceX = Math.abs(charCenterX - bossCenterX);
            let distanceY = Math.abs(charCenterY - bossCenterY);

            if (distanceX < 230 && distanceY < 95 && enemy.canAttack) {
                enemy.playAttack();
                enemy.canAttack = false;

                setTimeout(() => {
                    enemy.canAttack = true;
                }, enemy.attackCooldown);
            }
        });
    }


    /**
     * Returns the X-coordinate of the character's center for distance calculations.
     * @returns {number}
     */
    characterCenterX() {
        return this.character.x + this.character.offset.left
            + (this.character.width - this.character.offset.left - this.character.offset.right) / 2;
    }


    /**
     * Returns the Y-coordinate of the character's center for distance calculations.
     * @returns {number}
     */
    characterCenterY() {
        return this.character.y + this.character.offset.top
            + (this.character.height - this.character.offset.top - this.character.offset.bottom) / 2;
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


    /**
     * Handles collecting an item, delegating to coin or poison collection.
     * @param {CollectableItem} item The item to collect.
     */
    collect(item) {
        this.collectItemCoin(item);
        this.collectItemPoison(item);
    }


    /**
     * Collects a coin item, plays sound, and updates the coin status bar.
     * @param {CollectableItem} item The coin item.
     */
    collectItemCoin(item) {
        if (item.type === 'coin') {
            collectCoin.play();
            collectCoin.currentTime = 0;
            this.character.coinsAmount += 20;
            this.statusBarCoins.setPercentage(this.character.coinsAmount);
            if (this.character.coinsAmount >= 100) {
                this.character.coinsAmount = 100;
            }
        }
    }


    /**
     * Collects a poison item, plays sound, and updates the poison status bar.
     * @param {CollectableItem} item The poison item.
     */
    collectItemPoison(item) {
        if (item.type === 'poison') {
            collectPoison.play();
            collectPoison.currentTime = 0;
            this.character.poisonAmount += 20;
            this.statusBarPoison.setPercentage(this.character.poisonAmount);
            if (this.character.poisonAmount >= 100) {
                this.character.poisonAmount = 100;
            }
        }
    }


    /**
     * Clears the canvas and redraws all objects in the world.
     * Applies camera translation for side-scrolling.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.drawLevelObjects();
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        this.level.enemies = this.level.enemies.filter(e => !e.remove);
        this.drawStatusBar();

        this.drawRequestId = requestAnimationFrame(() => this.draw());
    }


    /** Starts the drawing loop. */
    startDraw() {
        this.stopDrawing = false;
        this.draw();
    }


    /** Draws all level objects: background, items, enemies, bubbles. */
    drawLevelObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.collectableItem);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.shootableObjects);
    }


    /** Draws all status bars on the screen. */
    drawStatusBar() {
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarPoison);
        this.addToMap(this.statusBarCoins);
        if (!this.statusBarLifeBoss.hide) {
            this.addToMap(this.statusBarLifeBoss);
        }
    }


    /**
     * Adds an array of objects to the canvas.
     * @param {Array<DrawableObject>} objects Array of drawable objects.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
     * Draws a single object on the canvas, considering its direction.
     * @param {DrawableObject} mo Object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        if (mo.img && mo.img.complete && mo.img.naturalWidth !== 0) {
            mo.draw(this.ctx);
        }

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips the object's image horizontally.
     * @param {DrawableObject} mo Object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores the context after flipping an image.
     * @param {DrawableObject} mo Object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}