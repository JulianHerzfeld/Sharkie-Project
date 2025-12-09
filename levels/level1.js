let level1;
function createLevel1() {
    return new Level(
        [
            new Pufferfish(200, 0),
            new Pufferfish(300, 0),
            new Pufferfish(400, 100),
            new Jellyfish(100, 100)
        ],
        [

        ],
        [
            'img/3. Background/Layers/5. Water/',
            'img/3. Background/Layers/4.Fondo 2/',
            'img/3. Background/Layers/3.Fondo 1/',
            'img/3. Background/Layers/2. Floor/',
            'img/3. Background/Layers/1. Light/'
        ],
        ["D1.png", "D2.png"],
        ["1.png", "2.png"],
        [
            new Coins(300, 100),
            new Coins(200, 100),
            new Coins(500, 100),
            new Coins(300, 300),
            new Poison(450, 100)
        ]
    );
} 