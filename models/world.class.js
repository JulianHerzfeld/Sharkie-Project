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

    /** @type {CollisionManager} Handles all collision logic in the game world. */
    collisionManager;

    /** @type {ShootManager} Handles all shooting-related logic. */
    shootManager;

    /** @type {EndbossManager} Handles endboss spawning, attacks, and behavior. */
    endbossManager;


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
        this.loadAllManager();
    }


    /**
     * Initializes all manager instances used by the world:
     * - CollisionManager
     * - ShootManager
     * - EndbossManager
     */
    loadAllManager() {
        this.collisionManager = new CollisionManager(this);
        this.shootManager = new ShootManager(this);
        this.endbossManager = new EndbossManager(this);
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
        const sbManager = new StatusBarManager(this);
        this.statusBarLife = sbManager.createLifeBar();
        this.statusBarPoison = sbManager.createPoisonBar();
        this.statusBarCoins = sbManager.createCoinsBar();
        this.statusBarLifeBoss = sbManager.createBossBar();
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
        this.shootManager.checkShoot();
    }


    /**
     * Executes all collision checks via the CollisionManager.
     * Includes character-enemy, character-item, and bubble-enemy collisions.
     */
    checkCollisions() {
        this.collisionManager.checkAll();
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
     * Checks if the endboss should spawn and triggers spawn logic.
     */
    checkSpawnEndboss() {
        this.endbossManager.checkSpawn();
    }


    /**
     * Checks if the endboss can attack and triggers attack logic.
     */
    checkEndbossAttack() {
        this.endbossManager.checkAttack();
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