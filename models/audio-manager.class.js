class AudioManager {
    sounds;
    volume;
    isMuted = false;

    constructor() {
        this.sounds = [];
        this.volume = 0.5;

        const savedMute = localStorage.getItem('soundMuted');
        this.isMuted = savedMute === 'true';
    }


    addSound(audio) {
        audio.volume = this.isMuted ? 0 : this.volume;
        this.sounds.push(audio);
    }


    setMute(status) {
        this.isMuted = status;
        localStorage.setItem('soundMuted', status);
        this.sounds.forEach(s => s.volume = status ? 0 : this.volume);
    }


    toggleMute() {
        this.setMute(!this.isMuted);
        this.checkBackgroundAudio();
    }


    setVolume(value) {
        this.volume = value;
        if (!this.isMuted) {
            this.sounds.forEach(s => s.volume = value);
        }
    }


    checkBackgroundAudio() {
        if (this.isMuted) {
            audioBackground.pause();
            // audioBackground.currentTime = 0;
        } else if (!this.isMuted && !gameOver) {
            audioBackground.play();
        }
    }


}