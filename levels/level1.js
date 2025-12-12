let level1;
function createLevel1() {
    return new Level(
        [
            new Pufferfish(200, 0),
            new Pufferfish(300, 0),
            new Pufferfish(400, 0),
            new Jellyfish(100, 100),
            new Jellyfish(300, 200),
            new Pufferfish(820, 0),
            new Pufferfish(1020, 0),
            new Pufferfish(1540, 0),
            new Jellyfish(600, 150),
            new Jellyfish(1020, 200),
            new Jellyfish(1220, 50),
            new Pufferfish(1640, 0),
            // new Pufferfish(1740, 0),
            // new Pufferfish(1900, 0)
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
            new Coins(0, 0),
            new Coins(720, 0),
            new Coins(920, 0),
            new Coins(1220, 0),
            new Coins(1400, 0),
            new Coins(1650, 0),
            new Coins(1900, 0),
            new Poison(200, 400),
            new Poison(400, 400),
            new Poison(600, 400),
            new Poison(820, 400),
            new Poison(1020, 400),
            new Poison(1200, 400),
            new Poison(1500, 400),
            new Poison(1800, 400),
            new Poison(2000, 400),
            new Poison(2100, 400)
        ]
    );
} 