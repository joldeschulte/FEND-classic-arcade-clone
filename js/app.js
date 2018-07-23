// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Set x and y position of enemy
    this.x = -100
    this.y = [236, 154, 72][Math.floor(Math.random()*3)]
    // Set speed of enemy
    this.speed = [50, 150, 250][Math.floor(Math.random()*3)]
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
      this.x = -100
      this.y = [236, 154, 72][Math.floor(Math.random()*3)]
      this.speed = [50, 150, 250][Math.floor(Math.random()*3)]
    }
    // check player collision
    if (player.y == this.y) {
      if (this.x + 80 > player.x && this.x < player.x + 80) {
        player.reset();
        allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()]; //back to four enemies on loss
        winCounter = 0; //win counter resets on loss
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Gem = function() {
    // The image/sprite for our gem, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/Gem Blue.png';
    // Set x and y position of gem
    this.x = 200
    this.y = 400
};

Gem.prototype.update = function(dt) {
    // check player collision with gem
    if (player.y == this.y) {
      if (this.x + 80 > player.x && this.x < player.x + 80) {
        player.reset();
        winCounter++;
      }
    }
};

// Draw the gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = {
  sprite: 'images/char-boy.png',
  x: 200,
  y: 400,
  update: function() {
    // update the plaer x and y position
    x = this.x;
    y = this.y;
    // check win
    if (y == -10) {
      win();
    }
  },
  render: function() {
    // draw the player just like we draw enemies
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  },
  handleInput: function(direction) {
    /* player movement based on keydown handleInput
     * the player cannot move off the screen
     */
    if (direction == 'left') {
      if (x > 0) {
        this.x -= 100;
      }
    } else if (direction == 'up') {
      if (y > -10) {
        this.y -= 82;
      }
    } else if (direction == 'right') {
      if (x < 400) {
        this.x += 100;
      }
    } else if (direction == 'down') {
      if (y < 400) {
        this.y += 82;
      }
    }
  },
  reset: function() {
    this.y = 400;
    this.x = 200;
    allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
    for (var i = 0; i <= winCounter; i++) {
      allEnemies.push(new Enemy());
    }
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

let player = Player;

let winCounter = 0;

// Gems are the enemy! Resist the tempation.
// An artistic comentary on nature and greed.
win = function() {
  allEnemies = [new Gem()];
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
