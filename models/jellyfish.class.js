class Jellyfish extends MovableObject {
    width = 70;
    height = 90;
    directionY = 1;

    IMAGES_SWIM = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
    ];

    offset = {
        top: 7,
        bottom: 18,
        left: 5,
        right: 10
    }
    energy = 5;


    constructor(x, y) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD);

        this.x = x + 720 + Math.random() * 500;
        this.y = y;
        this.startY = y + Math.random() * 100;
        // this.animate();
    }


    animate() {                                         
        this.world.setStoppableInterval(() => {
            this.y += this.directionY * 1.5;
            if (this.y > this.startY + 30 && !this.energy == 0) {
                this.directionY = -1;
            }
            if (this.y < this.startY -30 && !this.energy == 0) {
                this.directionY = 1;
            }
        }, 1000 / 30);

        this.world.setStoppableInterval(() => {
            if (!this.energy == 0) {
                this.playAnimation(this.IMAGES_SWIM);
            }
        }, 250);
    }


    drawFrame(ctx) {
        if (this instanceof Jellyfish) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 5, this.y + 7, this.width - 10, this.height - 18);
            ctx.stroke();
        }
    }

}