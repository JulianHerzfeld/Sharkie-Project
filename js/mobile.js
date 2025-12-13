let landscape = true;

function isMobileDevice() {
    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
    );
}


function isLandscape() {
    return window.innerWidth > window.innerHeight;
}


function updateMobileUi() {
    const mobileControls = document.getElementById('mobile-controls');
    const rotateWarning = document.getElementById('rotate-warning');
    console.log(world);
    

    if (!isMobileDevice()) {
        mobileControls.classList.add('hidden');
        rotateWarning.classList.add('hidden');
        return;
    }

    if (isLandscape()) {
        mobileControls.classList.remove('hidden');
        rotateWarning.classList.add('hidden');

        //Spiel ggf. fortsetzen
        if (world && !landscape) {
            goToMenu();
            landscape = true;
        }
    } else {
        mobileControls.classList.add('hidden');
        rotateWarning.classList.remove('hidden');

        if (world) {
            world.stopGame();
            landscape = false;
        }
    }
}

// window.addEventListener('resize', updateMobileUi);
// window.addEventListener('orientationchange', updateMobileUi);

// function setupMobileDetection() {
//     window.addEventListener('resize', updateMobileUi);
//     window.addEventListener('orientationchange', updateMobileUi);

//     const mq = window.matchMedia('(pointer: coarse)');
//     mq.addEventListener('change', updateMobileUi);

//     updateMobileUi(); // initial
// }