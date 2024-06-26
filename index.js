const canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 576;

const canvasContext = canvas.getContext("2d");
canvasContext.fillStyle = "white";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);
// Add white opacity over background image (assists distinguishing characters)
canvasContext.fillStyle = "rgba(255,255,255,0.5)";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const gameEngineMain = new gameEngine();

function animate() {
  window.requestAnimationFrame(animate);
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  // Get the new game state
  gameEngineMain.run();
  // Call updateGraphics() on the game which calls all the draw methods
  // gameEngineMain.updateGraphics();
}
animate();
