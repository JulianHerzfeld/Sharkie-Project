class Endboss extends MovableObject {

    height = 370;
    width = 380;
    y = 0;
    world;

    IMAGES_SWIM = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];
    IMAGES_SPAWN = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];
    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];
    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    offset = {
        top: 175,
        bottom: 245,
        left: 25,
        right: 60
    }
    transitionOffset = {
        top: 175,
        bottom: 245,
        left: 25,
        right: 60
    }
    isSpawning = false;
    isSpawned = false;
    isAttacking = false;
    speed = 10;
    energy = 100;


    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_SPAWN);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;  //1200
        this.y = y
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.isSpawning) return;
            if (this.isHurt()) return;
            if (this.isDead()) return;
            if (this.isFinalDead) return;
            if (this.isSpawned && !this.isAttacking) {                       // nicht schwimmen wenn hurt animation läuft. fehlt noch.

                this.playAnimation(this.IMAGES_SWIM);

                if (this.world && this.world.character) {
                    this.moveTowards(this.world.character);
                }
            }
        }, 135);
    }


    playSpawn(onFinish) {
        if (this.isSpawning) return;

        this.isSpawning = true;
        this.currentImage = 0;

        let i = 0;
        let interval = setInterval(() => {

            let path = this.IMAGES_SPAWN[i];
            this.img = this.imageCache[path];
            i++;

            if (i >= this.IMAGES_SPAWN.length) {
                clearInterval(interval);
                this.isSpawning = false;

                if (onFinish) onFinish(); // sagt World: Boss ist fertig gespawnt
            }
        }, 120);
    }


    playHurt() {
        if (this.isHurtAnimationRunning) return;

        this.isHurtAnimationRunning = true;
        this.currentImage = 0;

        let i = 0;
        let interval = setInterval(() => {
            let path = this.IMAGES_HURT[i];
            this.img = this.imageCache[path];
            i++;

            if (i >= this.IMAGES_HURT.length || !this.isHurt()) {
                clearInterval(interval);
                this.isHurtAnimationRunning = false;
            }
        }, 80);
    }


    die() {
        if (this.isDeadAnimationRunning) return;

        this.isDeadAnimationRunning = true;
        this.energy = 0;
        this.currentImage = 0;

        let i = 0;

        let interval = setInterval(() => {
            let path = this.IMAGES_DEAD[i];
            this.img = this.imageCache[path];
            i++;

            if (i >= this.IMAGES_DEAD.length) {
                clearInterval(interval);

                // Spiel endet – Boss bleibt stehen
                this.isFinalDead = true;
            }
        }, 120);
    }


    moveTowards(character) {
        // Mittelpunkt des Charakters anpeilen
        let targetX = character.x + character.width / 2;
        let targetY = character.y + character.height / 2;

        let distanceX = targetX - (this.x + this.width / 2);
        let distanceY = targetY - (this.y + this.height / 2);

        // Blickrichtung aktualisieren
        this.otherDirection = distanceX > 0;

        // Distanz berechnen
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance < 1) return;

        // Boss bewegt sich mit konstanter Geschwindigkeit
        this.x += (distanceX / distance) * this.speed;
        this.y += (distanceY / distance) * this.speed;
    }


    playAttack() {
        if (this.isAttacking) return;
        if (this.isDead()) return;

        this.isAttacking = true;
        this.currentImage = 0;

        let i = 0;

        let interval = setInterval(() => {
            let images = this.IMAGES_ATTACK;
            let path = images[i];
            this.img = this.imageCache[path];
            i++;

            // Animation fertig?
            if (i >= images.length) {
                clearInterval(interval);
                this.isAttacking = false;
            }
        }, 80);
    }


    drawFrame(ctx) {                                                 // roter kasten um den charakter.
        if (this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 25, this.y + 175, this.width - 60, this.height - 245);
            ctx.stroke();
        }
    }


}