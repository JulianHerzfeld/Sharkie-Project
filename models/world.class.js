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
        }, 150);
    }


    checkShootObjects() {
        if (this.keyboard.SPACE && !this.character.isAttacking) {

            this.character.playAttack(() => {
                // Wird ausgeführt NACH der Attack-Animation
                let bubble = new ShootableObject(
                    this.character.x + 120,
                    this.character.y + 100
                );
                this.shootableObjects.push(bubble);
            });
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarLife.setPercentage(this.character.energy);
                console.log('Collision with Character, energy ', this.character.energy);
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.shootableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poison);

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
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

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