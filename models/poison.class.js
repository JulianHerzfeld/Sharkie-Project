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



    constructor() {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_POISON);
        this.x = 450;
        this.y = 100;
        this.height = 60;
        this.width = 50;

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
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }



}