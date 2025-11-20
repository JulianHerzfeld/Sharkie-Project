class Level {
    enemies;
    backgroundObjects;
    layers;
    files;
    filesLight;

    constructor(enemies, backgroundObjects, layers, files, filesLight) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.layers = layers;
        this.files = files;
        this.filesLight = filesLight;
    }
}