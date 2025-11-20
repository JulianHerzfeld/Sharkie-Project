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


    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIM);

        this.x = 200 + Math.random() * 500;
        this.y = 0 + Math.random() * 400;
        this.speed = 0.25 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        this.moveLeft();

        setInterval(() => {
            let path = this.IMAGES_SWIM[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage = (this.currentImage + 1) % this.IMAGES_SWIM.length;
        }, 130);
    }


    // animate() {
    //     setInterval(() => {
    //         this.x -= 0.4;
    //     }, 1000 / 60);
    // }

}