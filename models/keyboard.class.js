class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;


    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.bindBtnPressEvent();
        });
    }



    bindBtnPressEvent() {
        document.getElementById('btnUp').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        }, { passive: false });

        document.getElementById('btnUp').addEventListener('touchend', (e) => {
            this.UP = false;
        }, { passive: false });

        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        }, { passive: false });

        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            this.LEFT = false;
        }, { passive: false });

        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        }, { passive: false });

        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            this.RIGHT = false;
        }, { passive: false });

        document.getElementById('btnDown').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.DOWN = true;
        }, { passive: false });

        document.getElementById('btnDown').addEventListener('touchend', (e) => {
            this.DOWN = false;
        }, { passive: false });

        document.getElementById('btnShoot').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        }, { passive: false });

        document.getElementById('btnShoot').addEventListener('touchend', (e) => {
            this.SPACE = false;
        }, { passive: false });

        document.addEventListener('touchmove', e => {
            e.preventDefault();
        }, { passive: false });
    }

}