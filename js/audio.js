/**
 * The global AudioManager instance that handles all game audio.
 * @type {AudioManager}
 */
const audioManager = new AudioManager();

/**
 * Background music for the game.
 * @type {HTMLAudioElement}
 */
let audioBackground = new Audio('audio/background_music_2.mp3');
audioManager.addSound(audioBackground);

/** Character swimming sound */
let audioCharacterMove = new Audio('audio/sharkie_swim.mp3');
audioManager.addSound(audioCharacterMove);

/** Character attack sound */
let audioCharacterAttack = new Audio('audio/sharkie_attack.mp3');
audioManager.addSound(audioCharacterAttack);

/** Enemy hurt sound */
let audioEnemyHurt = new Audio('audio/sharkie_hurt_1.mp3');
audioManager.addSound(audioEnemyHurt);

/** Character hurt sound */
let audioCharacterHurt = new Audio('audio/sharkie_hurt_2.mp3');
audioManager.addSound(audioCharacterHurt);

/** Game lose sound */
let audioGameLose = new Audio('audio/game_lose.wav');
audioManager.addSound(audioGameLose);

/** Game victory sound */
let audioGameWin = new Audio('audio/game_victory.mp3');
audioManager.addSound(audioGameWin);

/** Boss hurt sound */
let audioBossHurt = new Audio('audio/boss_hurt.mp3');
audioManager.addSound(audioBossHurt);

/** Boss attack sound */
let audioBossAttack = new Audio('audio/boss_attack_2.mp3');
audioManager.addSound(audioBossAttack);

/** Boss spawn sound */
let bossSpawn = new Audio('audio/boss_spawn.mp3');
audioManager.addSound(bossSpawn);

/** Collect poison sound */
let collectPoison = new Audio('audio/bubble_pop.mp3');
audioManager.addSound(collectPoison);

/** Collect coin sound */
let collectCoin = new Audio('audio/collect-coin.mp3');
audioManager.addSound(collectCoin);

/** Character Snore sound */
let audioCharacterSnore = new Audio('audio/snore-character.mp3');
audioManager.addSound(audioCharacterSnore);


/**
 * Updates the visibility of the mute/unmute buttons based on the current
 * mute state of the AudioManager.
 *
 * @returns {void}
 */
function updateMuteButton() {
    muteButton = document.getElementById('mute-button');
    unmuteButton = document.getElementById('unmute-button');
    if(audioManager.isMuted) {
        muteButton.classList.add('hidden');
        unmuteButton.classList.remove('hidden');
    } else {
        muteButton.classList.remove('hidden');
        unmuteButton.classList.add('hidden');
    }
}


/**
 * Toggles the mute status of all game audio and updates the UI buttons.
 *
 * @returns {void}
 */
function changeMuteStatus() {
    audioManager.toggleMute();
    updateMuteButton();
}