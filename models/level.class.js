class Level {
    enemies;
    backgroundObjects;
    layers;
    files;
    filesLight;
    coins;
    poison;

    constructor(enemies, backgroundObjects, layers, files, filesLight, coins, poison) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.layers = layers;
        this.files = files;
        this.filesLight = filesLight;
        this.coins = coins;
        this.poison = poison;
    }
}