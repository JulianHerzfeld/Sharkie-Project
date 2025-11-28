class Coins extends MovableObject {

    IMAGES_COINS = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
    type;




    constructor(x, y, type = 'coin') {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
        this.type = type;

        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }
    

    drawFrame(ctx) {                                                 // roter kasten um den charakter.
        if (this instanceof Coins) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

}