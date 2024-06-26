class gameEngine {
  constructor() {
    // Array to hold all graphical elemnts that need to redrawn at a constant frame rate
    this.allGraphics = [];

    // Holds all characters
    this.allCharacters = [];

    // Create the background image
    this.backgroundImage = new background({
      position: { x: 0, y: 0 },
      imageSource: "./assets/backgrounds/bg-oakwoods.jpg",
      height: 576,
      width: 1024,
    });

    // Push bg image to list of graphics
    this.allGraphics.push(this.backgroundImage);

    this.shopImage = new animated_sprite({
      position: { x: 761, y: 228 },
      // position: { x: 261, y: 228 },
      maxAnimationFrames: 6,
      imageSource: "./assets/backgrounds/shop-animation.png",
      scale: 2.22,
    });

    this.allGraphics.push(this.shopImage);

    // Create player
    this.playerCharacter = new character({
      leftKey: "a",
      downKey: "s",
      rightKey: "d",
      upKey: "w",
      position: { x: 50, y: canvas.height - 180 }, // Subracted number must == height
      direction: 1,
      primaryAttack: " ",
      characterName: "samurai",
    });

    // Create enemy using default constructor
    this.playerCharacter2 = new character({ characterName: "samurai" });

    // Add playerCharacter objects to arr of graphics that need to be drawn
    this.allGraphics.push(this.playerCharacter);
    this.allGraphics.push(this.playerCharacter2);

    // Add playerCharacter objects to arr of all playerCharacters
    this.allCharacters.push(this.playerCharacter);
    this.allCharacters.push(this.playerCharacter2);

    this.p1HealthBar = document.querySelector("#p1-healthbar");
    this.p2HealthBar = document.querySelector("#p2-healthbar");
    this.gameTimer = document.querySelector(".round-timer");
  }

  // Updates non canvas html elements
  updateDivs() {
    this.updateHealthBars();
    this.updateTimer();
  }

  updateHealthBars() {
    let left = `${100 - this.playerCharacter.health}%`;
    this.p1HealthBar.setAttribute(
      "style",
      `width:${this.playerCharacter.health}%`
    );
    this.p1HealthBar.style.left = left;
    this.p2HealthBar.setAttribute(
      "style",
      `width:${this.playerCharacter2.health}%`
    );
  }

  updateTimer() {}

  // Iterate over all the objects and call their updateGraphic methods
  updateGraphics() {
    this.allGraphics.forEach((element) => {
      element.updateGraphic();
    });
    this.updateDivs();
  }

  // Check if player hit enemy, used by checkCollisions()
  // New function that makes use of the animation
  // TODO add check for position.y
  successfulAttack({ player, enemy }) {
    let playerReach = {
      start: player.position.x + player.width,
      end: player.position.x + player.width + player.heldWeapon.range,
    };
    let enemyHitRange = {
      start: enemy.position.x,
      end: enemy.position.x + enemy.width,
    };
    for (let i = playerReach.start; i < playerReach.end; i++) {
      for (let j = enemyHitRange.start; j < enemyHitRange.end; j++) {
        if (i == j) {
          return true;
        }
      }
    }
    return false;
  }

  recordAttack({ attacker, victim, damage }) {
    victim.takeDamage();
    victim.adjustHealth({ damage: damage });
  }

  // Checks for successful attacks
  // TODO Currently not working if player is facing -1
  checkCollisions({ player }) {
    if (player.isAttacking) {
      this.allCharacters.forEach((otherPlayer) => {
        if (otherPlayer != player) {
          if (this.successfulAttack({ player: player, enemy: otherPlayer })) {
            this.recordAttack({
              attacker: player,
              victim: otherPlayer,
              damage: 5,
            });
          }
        }
      });
      player.isAttacking = false;
    }
  }

  // Runs all checks necessary for game to work
  run() {
    this.checkCollisions({ player: this.playerCharacter });
    this.checkCollisions({ player: this.playerCharacter2 });
    this.updateGraphics();
  }
}
