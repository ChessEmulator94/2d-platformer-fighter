class sprite {
  constructor({
    position,
    imageSource,
    height,
    width,
    scale = 1,
    maxAnimationFrames = 1,
  }) {
    this.scale = scale;
    this.position = position;
    this.image = new Image();
    this.image.src = imageSource;
    this.image.width = this.image.width * scale;
    this.image.height = this.image.height * scale;
    this.maxAnimationFrames = maxAnimationFrames;
    this.cropStartX = 0;
    this.cropStartY = 0;
    this.width = width;
    this.height = height;
    this.framesElapsed = 0;
    this.offset = 0;
  }

  draw() {
    /* drawImage(image, sourceX, sourceY, sourceW, sourceH, startX,startY, width, height) */
    canvasContext.drawImage(
      this.image,
      this.cropStartX,
      this.cropStartY,
      this.image.width / this.maxAnimationFrames,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width * this.scale) / this.maxAnimationFrames,
      this.image.height * this.scale
    );
  }

  updateGraphic() {
    this.draw();
  }
}
