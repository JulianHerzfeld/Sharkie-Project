class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLife;
    statusBarPoison;
    statusBarCoins;
    shootableObjects = [];
    endbossSpawned = false;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackground();
        this.generateStatusBar();
        this.draw();
        this.setWorld();
        this.run();
    }


    generateStatusBar() {
        this.statusBarLife = new StatusBar(this.statusBarLifeImages(), 10, -10, 100);
        this.statusBarPoison = new StatusBar(this.statusBarPoisonImages(), 10, 20, 0);
        this.statusBarCoins = new StatusBar(this.statusBarCoinsImages(), 10, 50, 0);
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


    generateBackground() {
        let repeat = 11;

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
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkShootObjects();
            this.checkEnemyCharacterDistance();
            this.checkSpawnEndboss();
            this.checkEndbossAttack();
        }, 150);
    }


    checkShootObjects() {
        if (this.keyboard.SPACE && !this.character.isAttacking) {

            this.character.playAttack(() => {
                // Wird ausgeführt NACH der Attack-Animation
                let direction = this.character.otherDirection ? -1 : 1;
                let offsetX = this.character.otherDirection ? -20 : 140;
                let isPoison = this.character.poisonAmount > 0;
                let damage = isPoison ? 25 : 10;
                let bubble = new ShootableObject(
                    this.character.x + offsetX,
                    this.character.y + 100,
                    direction,
                    damage,
                    isPoison
                );
                this.usePoisonAmount(isPoison);
                this.shootableObjects.push(bubble);
            });
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
    }


    collisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarLife.setPercentage(this.character.energy);
                console.log('Collision with Character, energy ', this.character.energy);
            }
        });
    }


    collisionWithItem() {
        this.level.collectableItem.forEach((item, index) => {
            if (this.character.isColliding(item)) {
                this.collect(item);
                this.statusBarCoins.setPercentage(this.character.coinsAmount);
                this.level.collectableItem.splice(index, 1);
                console.log(this.character.coinsAmount);
            }
        });
    }


    checkEnemyCharacterDistance() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Pufferfish) {
                if (enemy.isTransition) return; // läuft gerade, nicht erneut starten

                let distance_x = Math.abs((this.character.x + this.character.offset.left) - (enemy.x + enemy.offset.left));
                let distance_y = Math.abs((this.character.y + this.character.offset.top) - (enemy.y + enemy.offset.top));

                // Gegner hat 200 px Abstand?
                if (distance_x < 200 && distance_y < 120) {

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

        if (this.character.x > 800) {

            this.endbossSpawned = true;

            this.endboss = new Endboss(1000, 0); // Position für Boss
            this.endboss.world = this;

            // Spawn Animation starten
            this.endboss.playSpawn(() => {
                this.endboss.isSpawned = true;
            });

            // Boss zum Level hinzufügen
            this.level.enemies.push(this.endboss);
        }
    }


    // checkEndbossAttack() {
    //     this.level.enemies.forEach(enemy => {
    //         if (enemy instanceof Endboss) {

    //             if (!enemy) return;

    //             // Abstand berechnen
    //             let distanceX = Math.abs((this.character.x + this.character.offset.left) - (enemy.x + enemy.offset.left));       // attack distanz stimmt noch nicht.
    //             let distanceY = Math.abs((this.character.y + this.character.offset.top) - (enemy.y + enemy.offset.top));



    //             // Attack-Distanz (anpassen nach Geschmack)
    //             if (distanceX < 200 && distanceY < 100) {

    //                 enemy.playAttack();
    //             }
    //         }
    //     });
    // }


    checkEndbossAttack() {                                                      // distanz passt noch nicht.
        this.level.enemies.forEach(enemy => {
            if (!(enemy instanceof Endboss)) return;

            // --- Mittelpunkt der Charakter-Hitbox ---
            let charCenterX = this.character.x + this.character.offset.left
                + (this.character.width - this.character.offset.left - this.character.offset.right) / 2;

            let charCenterY = this.character.y + this.character.offset.top
                + (this.character.height - this.character.offset.top - this.character.offset.bottom) / 2;

            // --- Mittelpunkt der Boss-Hitbox ---
            let bossCenterX = enemy.x + enemy.offset.left
                + (enemy.width - enemy.offset.left - enemy.offset.right) / 2;

            let bossCenterY = enemy.y + enemy.offset.top
                + (enemy.height - enemy.offset.top - enemy.offset.bottom) / 2;

            // --- Abstand ---
            let distanceX = Math.abs(charCenterX - bossCenterX);
            let distanceY = Math.abs(charCenterY - bossCenterY);

            // --- Angriffsbereich ---
            if (distanceX < 300 && distanceY < 100) {
                enemy.playAttack();
            }
        });
    }


    collect(item) {
        if (item.type === 'coin') {
            this.character.coinsAmount += 20;
            this.statusBarCoins.setPercentage(this.character.coinsAmount);
        }

        if (item.type === 'poison') {
            this.character.poisonAmount += 20;
            this.statusBarPoison.setPercentage(this.character.poisonAmount);
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.collectableItem);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.shootableObjects);

        this.ctx.translate(-this.camera_x, 0);

        this.drawStatusBar();


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    drawStatusBar() {
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarPoison);
        this.addToMap(this.statusBarCoins);
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