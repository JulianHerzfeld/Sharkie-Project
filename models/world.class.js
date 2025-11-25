class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    shootableObjects = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackground();
        this.draw();
        this.setWorld();
        this.run();
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
        if(this.keyboard.SPACE) {
            let bubble = new ShootableObject(this.character.x + 100, this.character.y + 100);
            this.shootableObjects.push(bubble);
        }
    }


    checkCollisions() {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    console.log('Collision with Character, energy ', this.character.energy);
                }
            });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.shootableObjects);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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