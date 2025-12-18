/**
 * Class representing an audio manager.
 */
class AudioManager {
    /**
     * Array of all audio elements managed by this manager.
     * @type {HTMLAudioElement[]}
     */
    sounds;

    /**
     * Current volume level (0.0 to 1.0).
     * @type {number}
     */
    volume;

    /**
     * Indicates if audio is muted.
     * @type {boolean}
     */
    isMuted = false;

    /**
     * Create an AudioManager instance.
     */
    constructor() {
        this.sounds = [];
        this.volume = 0.2;

        const savedMute = localStorage.getItem('soundMuted');
        this.isMuted = savedMute === 'true';
    }


    /**
     * Add a new sound to the manager.
     * @param {HTMLAudioElement} audio - The audio element to add.
     */
    addSound(audio) {
        audio.volume = this.isMuted ? 0 : this.volume;
        this.sounds.push(audio);
    }


    /**
     * Set mute status for all sounds.
     * @param {boolean} status - True to mute, false to unmute.
     */
    setMute(status) {
        this.isMuted = status;
        localStorage.setItem('soundMuted', status);
        this.sounds.forEach(s => s.volume = status ? 0 : this.volume);
    }


    /**
     * Toggle the current mute state.
     */
    toggleMute() {
        this.setMute(!this.isMuted);
        this.checkBackgroundAudio();
    }


    /**
     * Set the volume for all sounds.
     * @param {number} value - Volume level (0.0 to 1.0).
     */
    setVolume(value) {
        this.volume = value;
        if (!this.isMuted) {
            this.sounds.forEach(s => s.volume = value);
        }
    }


    /**
     * Play or pause background audio based on mute state.
     */
    checkBackgroundAudio() {
        if (this.isMuted) {
            audioBackground.pause();
            // audioBackground.currentTime = 0;
        } else if (!this.isMuted && !gameOver) {
            audioBackground.play();
        }
    }
}