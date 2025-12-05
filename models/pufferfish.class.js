class Pufferfish extends MovableObject {
    width = 100;
    height = 90;

    IMAGES_SWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];
    IMAGES_TRANSITION = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png'
    ];
    IMAGES_BUBBLESWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png'
    ];

    offset = {
        top: 7,
        bottom: 35,
        left: 5,
        right: 15
    }
    transitionOffset = {
        top: 7,
        bottom: 10,
        left: 5,
        right: 15
    }
    isTransition = false;
    useAlternateSwim = false;
    energy = 5;


    constructor(x, y) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_BUBBLESWIM);
        this.loadImages(this.IMAGES_DEAD);

        this.x = x + 200 + Math.random() * 500;
        this.y = y + 0 + Math.random() * 400;
        this.speed = 0.25 + Math.random() * 0.5;
        this.animate();
    }


    playTransition(onFinish) {
        if (this.isTransition) return;

        this.isTransition = true;
        this.currentImage = 0;

        let i = 0;

        let interval = setInterval(() => {
            let path = this.IMAGES_TRANSITION[i];
            this.img = this.imageCache[path];
            i++;

            if (i >= this.IMAGES_TRANSITION.length) {
                clearInterval(interval);
                // this.isTransition = false;

                if (onFinish) onFinish(); // Swim danach starten
            }
        }, 100);
    }


    // getSwimAnimationAfterTransition() {
    //     return this.IMAGES_BUBBLESWIM;
    // }


    animate() {                                         
        setInterval(() => {
            if (!this.energy == 0) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isTransition && !this.useAlternateSwim && !this.energy == 0) {
                this.playAnimation(this.IMAGES_SWIM);
            } else if (this.useAlternateSwim && !this.energy == 0) {
                this.playAnimation(this.IMAGES_BUBBLESWIM);
            }
        }, 130);
    }


    drawFrame(ctx) {                                                 // roter kasten um den charakter.
        if (this instanceof Pufferfish) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 5, this.y + 7, this.width - 15, this.height - 10);
            ctx.stroke();
        }
    }

    // animate() {
    //     setInterval(() => {
    //         this.x -= 0.4;
    //     }, 1000 / 60);
    // }

}