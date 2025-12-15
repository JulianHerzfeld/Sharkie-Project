/**
 * Represents a game level containing enemies, background layers, and collectable items.
 */
class Level {
    /** @type {Array<MovableObject>} Array of enemy objects in the level */
    enemies;

    /** @type {Array<DrawableObject>} Array of background objects in the level */
    backgroundObjects;

    /** @type {Array<string>} Array of paths to the background layers */
    layers;

    /** @type {Array<string>} Array of background image filenames */
    files;

    /** @type {Array<string>} Array of alternate background image filenames (light versions) */
    filesLight;

    /** @type {Array<CollectableItem>} Array of collectable items (coins, poison, etc.) */
    collectableItem;


    /**
     * Creates a new Level instance.
     *
     * @param {Array<MovableObject>} enemies - The enemies present in this level.
     * @param {Array<DrawableObject>} backgroundObjects - The background objects in this level.
     * @param {Array<string>} layers - The paths to the background layers.
     * @param {Array<string>} files - The filenames of the background images.
     * @param {Array<string>} filesLight - The filenames of the light versions of the background images.
     * @param {Array<CollectableItem>} collectableItem - The collectable items in the level.
     */
    constructor(enemies, backgroundObjects, layers, files, filesLight, collectableItem) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.layers = layers;
        this.files = files;
        this.filesLight = filesLight;
        this.collectableItem = collectableItem;
    }
}