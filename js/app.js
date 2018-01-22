// The enemy property
var enemyProperty = {
    "ENEMY_MIN_SPEED": 50,
    "ENEMY_MAX_SPEED": 400,
    "ENEMY_HEIGHT": 40,
    "ENEMY_WIDTH": 40
};

// The player property
var playerProperty = {
    "PLAYER_SPEED": 50,
    "PLAYER_HEIGHT": 40,
    "PLAYER_WIDTH": 40,
    "PLAYER_SCORE": 0,
    "PLAYER_LIVES": 3
};

// The Gems property
var GemProperty = {
    "GEM_HEIGHT": 40,
    "GEM_WIDTH": 40,
};
// The game font color and size
var Style = {
    "font": '10pt ArcadeClassic',
    "font_Color": 'white'
};


$(document).ready(function () {
    backgroundSound.play();

    // Hide the game meun to start the game
    $("#playGame").click(function () {
        $("#gameMeun").hide();
        buttonSound.play();
        backgroundSound.play();
        player.lives = 3;
        player.maxScore = 2000;
        player.gameSetting = "Normal";

    });

    $("#easy").click(function () {
        $("#gameMeun").hide();
        buttonSound.play();
        backgroundSound.play();
        player.lives = 5;
        player.maxScore = 500;
        player.gameSetting = "easy";

    });

    $("#Normal").click(function () {
        $("#gameMeun").hide();
        buttonSound.play();
        backgroundSound.play();
        player.lives = 3;
        player.maxScore = 2000;
        player.gameSetting = "Normal";

    });

    $("#Hard").click(function () {
        $("#gameMeun").hide();
        buttonSound.play();
        backgroundSound.play();
        player.lives = 1;
        player.maxScore = 4000;
        player.gameSetting = "Hard";
    });


    //Restart the game when the player loes
    $("#gameOver").click(function () {
        $("#gameOver").hide();
        buttonSound.play();
        backgroundSound.play();
    });

    //Show how to playy the game
    $("#howToPlay").click(function () {
        $("#howTo").show();
        buttonSound.play();
        backgroundSound.play();

    });
    // Return to the start meun
    $("#Close").click(function () {
        $("#howTo").hide();
        buttonSound.play();
        backgroundSound.play();
    });

    $("#gameAgain").click(function () {
        $("#gameWin").hide();
        $("#gameMeun").show();
        buttonSound.play();
        backgroundSound.play();
        newGems();
        player.score = 0;

    });
});
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.height = enemyProperty.ENEMY_HEIGHT;
    this.width = enemyProperty.ENEMY_WIDTH;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // reset position of enemy when they off canvas 
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    //check for collision then the player will lose one live
    if (player.x < this.x + enemy.width &&
        player.x + player.width > this.x &&
        player.y < this.y + enemy.height &&
        player.height + player.y > this.y) {
        hitSound.play();
        player.x = 200;
        player.y = 380;
        player.lives--;
        backgroundSound.play();
    }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.height = playerProperty.PLAYER_HEIGHT;
    this.width = playerProperty.PLAYER_WIDTH;
    this.lives = playerProperty.PLAYER_LIVES;
    this.score = playerProperty.PLAYER_SCORE;
    this.maxScore = 2000;
    this.gameSetting = "Normal";
    this.Heart = 'images/stat-heart.png';
    var playerArray = ['char-princess-girl.png', 'char-pink-girl.png', 'char-horn-girl.png' , 'char-cat-girl.png' ,'char-boy.png'];
    var playe = playerArray[Math.floor(Math.random() * playerArray.length)];
    this.sprite = 'images/' + playe;
};

// Repostion the player at the center when it moving beyond canvas
Player.prototype.update = function () {

    if (this.x > 400 || this.x < 0 || this.y > 380) {
        this.x = 200;
        this.y = 380;
    }
    // if the player reach the end line the gems postion will change and the player postion  
    else if (this.y == -20) {
        this.x = 200;
        this.y = 380;
        newGems();
        endlinesound.play();
    }
    // if the player lives = 0 the game will rest. 
    if (this.lives == 0) {
        $("#gameOver").show();
        gameOverSound.play();
        backgroundSound.pause();
        this.score = 0;
        newGems();
        if (this.gameSetting == "easy") {
            this.lives = 5;
            this.maxScore = 500;
            this.gameSetting = "easy";
        }
        else if (this.gameSetting == "Hard") {
            this.lives = 1;
            this.maxScore = 4000;
            this.gameSetting = "Hard";
        }
        else if (this.gameSetting == "Normal") {
            this.lives = 3;
            this.maxScore = 2000;
            this.gameSetting = "Normal";
        }
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = Style.font;
    ctx.fillStyle = Style.font_Color;
    ctx.textAlign = 'start';
    ctx.fillText('x' + this.lives, 460, 85);
    ctx.drawImage(Resources.get(this.Heart), 430, 65);
};

Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 30;
            console.log("x", this.x);
            break;
        case 'right':
            this.x += this.speed + 30;
            console.log("x", this.x);
            break;
        case 'up':
            this.y -= this.speed + 30;
            console.log("y", this.y);
            break;
        case 'down':
            this.y += this.speed + 30;
            console.log("y", this.y);
            break;
    }
};
// Gem Class
var Gem = function (x, y) {
    var gemArray = ['Gem Blue.png', 'Gem Green.png', 'Gem Orange.png'];
    var gems = gemArray[Math.floor(Math.random() * gemArray.length)];
    this.sprite = 'images/' + gems;
    this.x = x;
    this.y = y;
    this.height = GemProperty.GEM_HEIGHT;
    this.width = GemProperty.GEM_WIDTH;
    this.Gems = 'images/Gems.png';
};
//check for if then the player have coloect a gem then incres the score
Gem.prototype.update = function () {
    if (player.x <= this.x + gem.width &&
        player.x + player.width >= this.x &&
        player.y <= this.y + gem.height &&
        player.height + player.y >= this.y) {
        player.score += 50;
        this.x = -100;
        gemSound.play();

    }
    if (player.y == -20 || player.lives == 0 || player.score == player.maxScore) {
        this.x = -100;
    }

    if (player.score == player.maxScore) {
        $("#gameWin").show();
        player.lives = 3;
        player.x = 200;
        player.y = 380;
        winSound.play();
        backgroundSound.pause();

    }

};


Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = Style.font;
    ctx.fillStyle = Style.font_Color;
    ctx.textAlign = 'start';
    ctx.fillText('x' + player.score, 370, 85);
    ctx.drawImage(Resources.get(this.Gems), 330, 45);
};
var allEnemies = [];
var allGems = [];

// enemy and gem position on the canves 
var enemyPosition = [60, 140, 220];
var gemPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var gem;
var enemy;


enemyPosition.forEach(function (y) {
    enemy = new Enemy(0, y, 100 + Math.floor(Math.random() * 500));
    allEnemies.push(enemy);
});

var newGems = function () {
    gemPosition.forEach(function (y) {
        gem = new Gem(Math.floor(Math.random() * (0 - 350) + 350), y);
        allGems.push(gem);
    });
}

newGems();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



//Game Sounds 
var gemSound = new Audio("sounds/sfx_coin_cluster3.wav");
var hitSound = new Audio("sounds/sfx_sounds_impact10.wav");
var gameOverSound = new Audio("sounds/GameOver.wav");
var buttonSound = new Audio("sounds/sfx_menu_select4.wav");
var backgroundSound = new Audio("sounds/Game.wav");
var endlinesound = new Audio("sounds/endline.wav");
var winSound = new Audio("sounds/win.wav");


