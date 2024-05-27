class character {
  // Determines distance moved per animation refresh during jum
  JUMP_SPEED = 15;
  // Should be between a third and a quarter of JUMP_SPEED
  GRAVITY = 6;
  // Determines how long an attack animation and attack lasts
  ATTACK_TIME = 50;
  // Default Constructor
  constructor({
    height = 180,
    width = 110,
    leftKey = "ArrowLeft",
    rightKey = "ArrowRight",
    downKey = "ArrowDown",
    upKey = "ArrowUp",
    primaryAttack = "Enter",
    position = { x: 900, y: canvas.height - 180 }, // Subracted number must == height
    speed = 5,
    jumpHeight = 100,
    health = 100,
    direction = -1,
  } = {}) {
    this.showAttack = false;
    this.position = position;
    this.canJump = true;
    this.nowJumping = false;
    this.canAttack = true;
    this.direction = direction;
    this.isAttacking = false;
    this.heldWeapon = new weapon();
    this.addCharacterAttributes({ height, width, speed, jumpHeight, health });
    this.addMovementBindings({ leftKey, rightKey, downKey, upKey });
    this.addAttackBox();
    this.addAttackBindings({ primaryAttack });
  }

  // Adds a weapon to the character and initialises the attack box
  addAttackBox() {
    this.attackBox = {
      position: this.position,
      width: this.heldWeapon.range,
      height: 30,
    };
  }

  // Add character attributes
  addCharacterAttributes({ height, width, speed, jumpHeight, health }) {
    this.height = height;
    this.width = width;
    this.speed = speed;
    this.jumpHeight = jumpHeight; // Therefore maxY when jumping == canvas.height - this.jumpHeight
    this.health = health;
  }

  addAttackBindings({ primaryAttack }) {
    // Set attack button for the character
    this.attackKey = primaryAttack;
    // Add listener for button press
    document.addEventListener("keydown", (keyPressed) => {
      if (keyPressed.key == this.attackKey) {
        if (this.canAttack) {
          this.attack();
          this.canAttack = false;
        }
      }
    });
    // Allow attacks to happen after attack button lifted
    document.addEventListener("keyup", (keyPressed) => {
      if (keyPressed.key == this.attackKey) {
        setTimeout(() => {
          this.isAttacking = false;
        }, this.ATTACK_TIME); // Determines how long attack animation lasts
        setTimeout(() => {
          this.canAttack = true;
        }, 0); // Adjust to force delay between attacks
      }
    });
  }

  attack() {
    // Adjusted so that the attack box is drawn
    this.isAttacking = true;
    this.showAttack = true;
    setTimeout(() => {
      this.showAttack = false;
    }, this.ATTACK_TIME);
  }

  // Binds keyboard keys with movement actions and creates events for them
  addMovementBindings({ leftKey, rightKey, downKey, upKey }) {
    // Holds key mappings for movement and stores whether or not they're currently active
    this.movementKeyTracker = {
      leftKey: { key: leftKey, isPressed: false, moveFunc: this.moveLeft },
      rightKey: { key: rightKey, isPressed: false, moveFunc: this.moveRight },
      downKey: { key: downKey, isPressed: false, moveFunc: this.moveDown },
      upKey: { key: upKey, isPressed: false, moveFunc: this.moveUp },
    };
    this.movementKeysOfPlayer = Object.values(this.movementKeyTracker);

    // Listen for move key presses
    document.addEventListener("keydown", (pressedKey) => {
      const matchingKey = this.movementKeysOfPlayer.find(
        (keyObj) => keyObj.key === pressedKey.key
      );
      if (matchingKey) {
        matchingKey.isPressed = true;
      }
    });
    // Listen for move key releases
    document.addEventListener("keyup", (releasedKey) => {
      const matchingKey = this.movementKeysOfPlayer.find(
        (keyObj) => keyObj.key === releasedKey.key
      );
      if (matchingKey) {
        matchingKey.isPressed = false;
      }
    });
  }

  // Check for which keys are pressed
  // This funciton needs to be called at the top of draw() to
  // ensure that movement is checked before each new drawing
  checkMoveKeysInUse() {
    this.movementKeysOfPlayer.forEach((singleKey) => {
      if (singleKey.isPressed) {
        // Move the character according to required movement
        singleKey.moveFunc();
      }
    });
  }

  // Setters
  setSpeed(speed) {
    this.speed = speed;
  }
  setjumpHeight(jumpHeight) {
    this.jumpHeight = jumpHeight;
  }
  setHealth(health) {
    this.health = health;
  }

  // Move the character left
  moveLeft = () => {
    this.position.x -= this.speed;
    this.direction = -1;
  };
  // Move the character right
  moveRight = () => {
    this.position.x += this.speed;
    this.direction = 1;
  };
  // Move the character down (duck)
  moveDown = () => {
    console.log("Ducking");
  };
  // Move the character up (jump)
  moveUp = () => {
    /*
      Need to still add jump fatigue:
      if (this.canJump){
        << existing code here >>
        this.canJump = false;
      } 
      Then this.canJump can be set to true again after x many refreshes?
      Maybe just need a setTimeout somewhere
     */
    // If character on the ground
    if (this.position.y + this.height == canvas.height) {
      this.nowJumping = true;
    }
  };

  //
  jumpCheck() {
    if (this.nowJumping) {
      if (this.position.y > canvas.height - this.height - this.jumpHeight) {
        this.position.y -= this.JUMP_SPEED;
      } else {
        this.nowJumping = false;
      }
    }
  }

  applyGravity() {
    this.position.y = this.position.y + this.GRAVITY;
  }

  // If character moves beyond a boundary, character is shifted
  // to closest valid point in the canvas
  checkBoundaryRight() {
    if (this.position.x + this.width > canvas.width) {
      this.position.x = canvas.width - this.width;
    }
  }
  checkBoundaryLeft() {
    if (this.position.x < 0) {
      this.position.x = 0;
    }
  }
  checkBoundaryGround() {
    if (this.position.y + this.height >= canvas.height) {
      this.position.y = canvas.height - this.height;
      this.canJump = true;
    }
  }
  checkBoundaryCeiling() {
    if (this.position.y <= 0) {
      this.position.y = 0;
    }
  }

  // Executed after the character moves
  checkBoundaries() {
    this.checkBoundaryLeft();
    this.checkBoundaryRight();
    this.checkBoundaryGround();
    this.checkBoundaryCeiling();
  }

  drawCharacter() {
    // Draw the character
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  getAttackBoxPositionX() {
    let attackBoxPositionX = this.attackBox.position.x;
    // Check which side of character to draw attack box
    if (this.direction < 0) {
      attackBoxPositionX -= this.attackBox.width;
    } else {
      attackBoxPositionX += this.width;
    }
    return attackBoxPositionX;
  }

  adjustHealth({ damage }) {
    this.health -= damage;
  }

  drawAttack() {
    if (this.showAttack) {
      canvasContext.fillStyle = "blue";
      // Draw the box
      canvasContext.fillRect(
        this.getAttackBoxPositionX(),
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  draw() {
    // Draw character
    this.drawCharacter();
    // Draw attack box
    this.drawAttack();
  }

  // Function that is executed during every frame refresh
  updateGraphic() {
    // Move character if keys have been pressed
    this.checkMoveKeysInUse();
    // Check if the character is jumping
    this.jumpCheck();
    // Move the character towards the ground
    this.applyGravity();
    // Ensure character isn't beyond the boundaries of the canvas
    this.checkBoundaries();
    // Draw the character
    this.draw();
  }
}
