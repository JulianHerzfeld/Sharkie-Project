const audioManager = new AudioManager();

let audioBackground = new Audio('audio/background_music_2.mp3');
audioManager.addSound(audioBackground);

let audioCharacterMove = new Audio('audio/sharkie_swim.mp3');
audioManager.addSound(audioCharacterMove);

let audioCharacterAttack = new Audio('audio/sharkie_attack.mp3');
audioManager.addSound(audioCharacterAttack);

let audioEnemyHurt = new Audio('audio/sharkie_hurt_1.mp3');
audioManager.addSound(audioEnemyHurt);

let audioCharacterHurt = new Audio('audio/sharkie_hurt_2.mp3');
audioManager.addSound(audioCharacterHurt);

let audioGameLose = new Audio('audio/game_lose.wav');
audioManager.addSound(audioGameLose);

let audioGameWin = new Audio('audio/game_victory.mp3');
audioManager.addSound(audioGameWin);

let audioBossHurt = new Audio('audio/boss_hurt.mp3');
audioManager.addSound(audioBossHurt);

let audioBossAttack = new Audio('audio/boss_attack_2.mp3');
audioManager.addSound(audioBossAttack);

let audioTest = new Audio('audio/bubble_pop.mp3');
audioManager.addSound(audioTest);


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


function changeMuteStatus() {
    audioManager.toggleMute();
    updateMuteButton();
}