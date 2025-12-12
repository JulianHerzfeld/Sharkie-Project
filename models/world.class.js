class World {
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLife;
    statusBarPoison;
    statusBarCoins;
    statusBarLifeBoss;
    shootableObjects = [];
    endbossSpawned = false;
    intervalIds = [];
    // audioTest = new Audio('audio/background_music_2.mp3');



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
        // audioBackground.play();
    }


    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
    }


    stopGame() {                                                                    //hier weiter machen. sounds.
        this.intervalIds.forEach(clearInterval);
        this.intervalIds = [];
        audioBackground.pause();
        audioBackground.currentTime = 0;
        gameOver = true;

        setTimeout(() => {
            if (this.drawRequestId) {
                cancelAnimationFrame(this.drawRequestId);
                this.drawRequestId = null;
            }

            this.stopDrawing = true;
            gameStarted = false;


            if (this.character.energy <= 0) {
                document.getElementById('overlay-player-dead').classList.remove("hidden");
            }
            if (this.endboss && this.endboss.energy <= 0) {
                document.getElementById('overlay-boss-dead').classList.remove("hidden");
            }
        }, 2000);
    }


    generateStatusBar() {
        this.statusBarLife = new StatusBar(this.statusBarLifeImages(), 10, -10, 100);
        this.statusBarPoison = new StatusBar(this.statusBarPoisonImages(), 10, 20, 0);
        this.statusBarCoins = new StatusBar(this.statusBarCoinsImages(), 10, 50, 0);
        this.statusBarLifeBoss = new StatusBar(this.statusBarLifeBossImages(), 540, -10, 100);
        this.statusBarLifeBoss.hide = true;
    }


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


    setWorld() {
        this.character.world = this;
        if (this.character.animate) this.character.animate();
    }


    run() {
        this.setStoppableInterval(() => {
            this.checkCollisions();
            this.checkShootObjects();
            this.checkEnemyCharacterDistance();
            this.checkSpawnEndboss();
            this.checkEndbossAttack();
        }, 150);
    }


    assignWorldToAll(objects) {
        objects.forEach(o => {
            o.world = this;
            if (o.animate) o.animate();
        });
    }


    checkShootObjects() {
        if (this.keyboard.SPACE && this.character.canShoot && !this.character.isAttacking && !this.character.isHurt()) {

            this.character.canShoot = false;

            this.character.playAttack(() => {
                // Wird ausgeführt NACH der Attack-Animation
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
            });

            setTimeout(() => {
                this.character.canShoot = true;
            }, this.character.shootCooldown);
        }
    }


    usePoisonAmount(isPoison) {
        if (isPoison) {
            this.character.poisonAmount -= 20;
            this.statusBarPoison.setPercentage(this.character.poisonAmount);
        }
    }


    checkCollisions() {
        this.collisionWithEnemy();
        this.collisionWithItem();
        this.collisionBubbleWithEnemy();
    }


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
                console.log('Collision with Character, energy ', this.character.energy);
            }
        });
    }


    collisionWithItem() {
        this.level.collectableItem.forEach((item, index) => {
            if (this.character.isColliding(item)) {
                this.collect(item);
                this.statusBarCoins.setPercentage(this.character.coinsAmount);          // diese zeile kann evtl. entfernt werden.
                this.level.collectableItem.splice(index, 1);
                console.log(this.character.coinsAmount);
            }
        });
    }


    collisionBubbleWithEnemy() {
        this.shootableObjects.forEach((bubble, bIndex) => {

            this.level.enemies.forEach((enemy, eIndex) => {

                if (!bubble || !enemy) return;

                // Collision Check
                if (bubble.isColliding(enemy)) {

                    enemy.hit(bubble.damage);
                    this.shootableObjects.splice(bIndex, 1);

                    if (enemy instanceof Endboss) {

                        this.statusBarLifeBoss.setPercentage(enemy.energy);

                        enemy.playHurt();

                        if (enemy.energy <= 0) {
                            enemy.die(); // Boss-Death-Animation
                        }

                    } else {

                        // Normale Gegner
                        if (enemy.energy <= 0) {
                            audioEnemyHurt.play();
                            enemy.die();
                        }
                    }
                }
            });

        });
    }


    checkEnemyCharacterDistance() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Pufferfish) {
                if (enemy.isTransition) return; // läuft gerade, nicht erneut starten

                let distance_x = Math.abs((this.character.x + this.character.offset.left) - (enemy.x + enemy.offset.left));
                let distance_y = Math.abs((this.character.y + this.character.offset.top) - (enemy.y + enemy.offset.top));

                // Gegner hat 200 px Abstand?
                if (distance_x < 200 && distance_y < 120 && !enemy.energy <= 0) {

                    enemy.playTransition(() => {
                        enemy.useAlternateSwim = true;
                        enemy.offset = enemy.transitionOffset;
                    });
                }
            }
        });
    }


    checkSpawnEndboss() {
        if (this.endbossSpawned) return;

        if (this.character.x > 2300) {                      // anpassen für endboss wann er spawnt.

            this.endbossSpawned = true;
            bossSpawn.play();

            this.endboss = new Endboss(2700, 0);            // Position für Boss.
            this.endboss.world = this;
            if (this.endboss.animate) this.endboss.animate();

            // Spawn Animation starten
            this.endboss.playSpawn(() => {
                this.endboss.isSpawned = true;
                this.statusBarLifeBoss.hide = false;
            });

            // Boss zum Level hinzufügen
            this.level.enemies.push(this.endboss);
        }
    }


    checkEndbossAttack() {
        this.level.enemies.forEach(enemy => {
            if (!(enemy instanceof Endboss)) return;

            // --- Mittelpunkt der Charakter-Hitbox ---
            let charCenterX = this.characterCenterX();
            let charCenterY = this.characterCenterY();

            // --- Mittelpunkt der Boss-Hitbox ---
            let bossCenterX = this.endbossCenterX(enemy);
            let bossCenterY = this.endbossCenterY(enemy);

            // --- Abstand ---
            let distanceX = Math.abs(charCenterX - bossCenterX);
            let distanceY = Math.abs(charCenterY - bossCenterY);

            // --- Angriffsbereich ---
            if (distanceX < 230 && distanceY < 95 && enemy.canAttack) {
                enemy.playAttack();
                enemy.canAttack = false;

                setTimeout(() => {
                    enemy.canAttack = true;
                }, enemy.attackCooldown);
            }
        });
    }

// breite boss = 320, höhe boss = 125.
    characterCenterX() {
        return this.character.x + this.character.offset.left
            + (this.character.width - this.character.offset.left - this.character.offset.right) / 2;
    }


    characterCenterY() {
        return this.character.y + this.character.offset.top
            + (this.character.height - this.character.offset.top - this.character.offset.bottom) / 2;
    }


    endbossCenterX(enemy) {
        return enemy.x + enemy.offset.left - 15
            + 315 / 2;
    }


    endbossCenterY(enemy) {
        return enemy.y + enemy.offset.top
            + (enemy.height - enemy.offset.top - 175) / 2;
    }


    collect(item) {
        if (item.type === 'coin') {
            this.character.coinsAmount += 20;
            this.statusBarCoins.setPercentage(this.character.coinsAmount);
            if (this.character.coinsAmount >= 100) {
                this.character.coinsAmount = 100;
            }
        }

        if (item.type === 'poison') {
            this.character.poisonAmount += 20;
            this.statusBarPoison.setPercentage(this.character.poisonAmount);
            if (this.character.poisonAmount >= 100) {
                this.character.poisonAmount = 100;
            }
        }
    }


    draw() {
        // if (this.stopDrawing) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.collectableItem);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.shootableObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        this.level.enemies = this.level.enemies.filter(e => !e.remove);
        this.drawStatusBar();


        // let self = this;
        // requestAnimationFrame(function () {
        //     self.draw();
        // });
        this.drawRequestId = requestAnimationFrame(() => this.draw());
    }


    startDraw() {
        this.stopDrawing = false;
        this.draw();
    }


    drawStatusBar() {
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarPoison);
        this.addToMap(this.statusBarCoins);
        if (!this.statusBarLifeBoss.hide) {
            this.addToMap(this.statusBarLifeBoss);
        }
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        if (mo.img && mo.img.complete && mo.img.naturalWidth !== 0) {
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
        }

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}