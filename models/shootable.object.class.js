class ShootableObject extends MovableObject {



    constructor(x, y) {
        super();
        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 45;
        this.width = 45;
        this.shoot();
    }


    shoot() {
        setInterval(() => {
            this.x += 10;
        }, 25);
    }


    drawFrame(ctx) {                                                 // roter kasten um den charakter.
        if (this instanceof ShootableObject) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


}