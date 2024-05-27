class sprite {
  constructor({ position, imageSource, height, width }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imageSource;
  }

  draw() {
    canvasContext.drawImage(this.image, this.position.x, this.position.y);
  }

  updateGraphic() {
    this.draw();
  }
}
