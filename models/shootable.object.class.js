class ShootableObject extends MovableObject {

    BUBBLE_IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
    POISON_BUBBLE_IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';



    constructor(x, y, direction, damage, isPoisonBubble = false) {
        super();
        this.isPoisonBubble = isPoisonBubble;
        this.setBubbleImage();
        this.x = x;
        this.y = y;
        this.height = 45;
        this.width = 45;
        this.direction = direction;
        this.damage = damage;
        this.shoot();
    }


    setBubbleImage() {
        if (this.isPoisonBubble) {
            this.loadImage(this.POISON_BUBBLE_IMAGE);
        } else {
            this.loadImage(this.BUBBLE_IMAGE);
        }
    }


    shoot() {
        setInterval(() => {
            this.x += this.direction * 10;
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