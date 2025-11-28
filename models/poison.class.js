class Poison extends MovableObject {

    IMAGES_POISON = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    offset = {
        top: 25,
        bottom: 27,
        left: 10,
        right: 20,
    }
    type;



    constructor(x, y, type = 'poison') {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_POISON);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.type = type;

        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISON);
        }, 200);
    }


    drawFrame(ctx) {                                                 // roter kasten um den charakter.
        if (this instanceof Poison) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 10, this.y + 25, this.width - 20, this.height - 27);
            ctx.stroke();
        }
    }



}