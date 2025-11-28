class Level {
    enemies;
    backgroundObjects;
    layers;
    files;
    filesLight;
    collectableItem;

    constructor(enemies, backgroundObjects, layers, files, filesLight, collectableItem) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.layers = layers;
        this.files = files;
        this.filesLight = filesLight;
        this.collectableItem = collectableItem;
    }
}