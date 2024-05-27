class gameEngine {
  constructor() {
    // Array to hold all graphical elemnts that need to redrawn at a constant frame rate
    this.allGraphics = [];

    // Holds all characters
    this.allCharacters = [];

    // // Create the background image
    // this.backgroundImage = new background({
    //   position: { x: 0, y: 0 },
    //   imageSource: "./assets/backgrounds/bgj-ruins.jpg",
    //   height: 576,
    //   width: 1024,
    // });

    // // Push bg image to list of graphics
    // this.allGraphics.push(this.backgroundImage);

    // Create player
    this.playerCharacter = new character({
      width: 110,
      height: 180,
      leftKey: "a",
      downKey: "s",
      rightKey: "d",
      upKey: "w",
      position: { x: 50, y: canvas.height - 180 }, // Subracted number must == height
      direction: 1,
      primaryAttack: " ",
    });
    // Create enemy using default constructor
    this.playerCharacter2 = new character();

    // Add playerCharacter objects to arr of graphics that need to be drawn
    this.allGraphics.push(this.playerCharacter);
    this.allGraphics.push(this.playerCharacter2);

    // Add playerCharacter objects to arr of all playerCharacters
    this.allCharacters.push(this.playerCharacter);
    this.allCharacters.push(this.playerCharacter2);
  }

  // Iterate over all the objects and call their updateGraphic methods
  updateGraphics() {
    this.allGraphics.forEach((element) => {
      element.updateGraphic();
    });
  }

  // Check if player hit enemy, used by checkCollisions()
  successfulAttack({ player, enemy }) {
    return (
      player.getAttackBoxPositionX() < enemy.position.x + enemy.width &&
      player.getAttackBoxPositionX() + player.attackBox.width >
        enemy.position.x &&
      player.attackBox.position.y < enemy.position.y + enemy.height &&
      player.attackBox.position.y > enemy.height
    );
  }

  // Checks for successful attacks
  checkCollisions({ player }) {
    if (player.isAttacking) {
      this.allCharacters.forEach((otherPlayer) => {
        if (otherPlayer != player) {
          if (this.successfulAttack({ player: player, enemy: otherPlayer })) {
            console.log("Opponent Hit");
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
