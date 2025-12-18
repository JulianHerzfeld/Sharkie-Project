/**
 * Manages creation of all status bars in the game world.
 */
class StatusBarManager {

    /** @type {World} Reference to the game world. */
    world;


    /**
     * Creates a new StatusBarManager for the given world.
     * @param {World} world The game world instance.
     */
    constructor(world) {
        this.world = world;
    }


    /**
     * Creates the player's life status bar.
     * @returns {StatusBar} Life bar instance.
     */
    createLifeBar() {
        return new StatusBar(this.lifeImages(), 10, -10, 100);
    }


    /**
     * Creates the poison status bar.
     * @returns {StatusBar} Poison bar instance.
     */
    createPoisonBar() {
        return new StatusBar(this.poisonImages(), 10, 20, 0);
    }


    /**
     * Creates the coins status bar.
     * @returns {StatusBar} Coins bar instance.
     */
    createCoinsBar() {
        return new StatusBar(this.coinsImages(), 10, 50, 0);
    }


    /**
     * Creates the endboss life bar (initially hidden).
     * @returns {StatusBar} Boss bar instance.
     */
    createBossBar() {
        const bar = new StatusBar(this.bossImages(), 540, -10, 100);
        bar.hide = true;
        return bar;
    }


    /**
     * Returns the image paths for the life bar at different percentages.
     * @returns {string[]} Array of image URLs.
     */
    lifeImages() {
         return [
            'img/4. Marcadores/Purple/0_ .png',
            'img/4. Marcadores/Purple/20__1.png',
            'img/4. Marcadores/Purple/40_ .png',
            'img/4. Marcadores/Purple/60_ .png',
            'img/4. Marcadores/Purple/80_ .png',
            'img/4. Marcadores/Purple/100_ .png'
        ];
    }


    /**
     * Returns the image paths for the poison bar at different percentages.
     * @returns {string[]} Array of image URLs.
     */
    poisonImages() {
        return [
            'img/4. Marcadores/Purple/0_.png',
            'img/4. Marcadores/Purple/20_.png',
            'img/4. Marcadores/Purple/40_.png',
            'img/4. Marcadores/Purple/60_.png',
            'img/4. Marcadores/Purple/80_.png',
            'img/4. Marcadores/Purple/100_.png'
        ];
    }


    /**
     * Returns the image paths for the coins bar at different percentages.
     * @returns {string[]} Array of image URLs.
     */
    coinsImages() {
        return [
            'img/4. Marcadores/Purple/0_ _1.png',
            'img/4. Marcadores/Purple/20_ .png',
            'img/4. Marcadores/Purple/40_ _1.png',
            'img/4. Marcadores/Purple/60_ _1.png',
            'img/4. Marcadores/Purple/80_ _1.png',
            'img/4. Marcadores/Purple/100__1.png'
        ];
    }


    /**
     * Returns the image paths for the boss bar at different percentages.
     * @returns {string[]} Array of image URLs.
     */
    bossImages() {
        return [
            'img/4. Marcadores/orange/0_  copia.png',
            'img/4. Marcadores/orange/20_ copia 2.png',
            'img/4. Marcadores/orange/40_  copia.png',
            'img/4. Marcadores/orange/60_  copia.png',
            'img/4. Marcadores/orange/80_  copia.png',
            'img/4. Marcadores/orange/100_  copia.png'
        ];
    }
}