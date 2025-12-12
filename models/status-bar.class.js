class StatusBar extends DrawableObject {

    percentage = 100;


    constructor(imagesArray, x, y, percent) {
        super();
        this.imagesArray = imagesArray;
        this.loadImages(this.imagesArray);
        this.x = x;  //10
        this.y = y; //-10
        this.height = 40;
        this.width = 150;
        this.setPercentage(percent);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.imagesArray[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }


}