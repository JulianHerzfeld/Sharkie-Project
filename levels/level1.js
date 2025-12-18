/**
 * Creates and returns Level 1 with predefined enemies, background layers, and items.
 * @returns {Level} The Level 1 instance.
 */
function createLevel1() {
    return new Level(
        createLevel1Enemies(),
        [],
        getLevel1Layers(),
        ["D1.png", "D2.png"],
        ["1.png", "2.png"],
        createLevel1Items()
    );
}


/**
 * Returns an array of enemies for Level 1 with predefined positions.
 * @returns {Array<MovableObject>} Array of Pufferfish and Jellyfish enemies.
 */
function createLevel1Enemies() {
    return [
        new Pufferfish(200, 0),
        new Pufferfish(300, 0),
        new Pufferfish(400, 0),
        new Jellyfish(100, 100),
        new Jellyfish(300, 200),
        new Pufferfish(820, 0),
        new Pufferfish(1020, 0),
        new Pufferfish(1540, 0),
        new Jellyfish(600, 150),
        new Jellyfish(1020, 200),
        new Jellyfish(1220, 50),
        new Pufferfish(1640, 0)
    ];
}


/**
 * Returns an array of collectable items for Level 1 with predefined positions.
 * @returns {Array<CollectableItem>} Array of Coins and Poison items.
 */
function createLevel1Items() {
    return [
        new Coins(0, 0),
        new Coins(720, 0),
        new Coins(920, 0),
        new Coins(1220, 0),
        new Coins(1400, 0),
        new Coins(1650, 0),
        new Coins(1900, 0),
        new Poison(200, 400),
        new Poison(400, 400),
        new Poison(600, 400),
        new Poison(820, 400),
        new Poison(1020, 400),
        new Poison(1200, 400),
        new Poison(1500, 400),
        new Poison(1800, 400),
        new Poison(2000, 400),
        new Poison(2100, 400)
    ];
}


/**
 * Returns the background layer paths for Level 1.
 * @returns {string[]} Array of folder paths for background layers.
 */
function getLevel1Layers() {
    return [
        'img/3. Background/Layers/5. Water/',
        'img/3. Background/Layers/4.Fondo 2/',
        'img/3. Background/Layers/3.Fondo 1/',
        'img/3. Background/Layers/2. Floor/',
        'img/3. Background/Layers/1. Light/'
    ];
}