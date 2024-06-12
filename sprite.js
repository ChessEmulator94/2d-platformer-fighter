class sprite {
  constructor({
    position,
    imageSource,
    height,
    width,
    scale = 1,
    maxAnimationFrames = 1,
    emptySpaceOffset = { x: 0, y: 0 },
    inverseFrameRate = 20,
    direction = 1,
  }) {
    this.inverseFrameRate = inverseFrameRate;
    this.scale = scale;
    this.position = position;
    this.image = new Image();
    this.image.src = imageSource;
    this.image.width = this.image.width;
    this.image.height = this.image.height;
    this.maxAnimationFrames = maxAnimationFrames;
    this.cropStartX = 0;
    this.cropStartY = 0;
    this.width = width;
    this.height = height;
    this.framesElapsed = 0;
    this.offset = 0;
    this.emptySpaceOffset = emptySpaceOffset;
    this.direction = direction;
  }

  draw() {
    /* drawImage(image, sourceX, sourceY, sourceW, sourceH, startX,startY, width, height) */
    canvasContext.drawImage(
      this.image,
      this.cropStartX,
      this.cropStartY,
      (this.image.width * this.scale) / this.maxAnimationFrames,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width * this.scale) / this.maxAnimationFrames,
      this.image.height * this.scale
    );
  }

  changeImage({ maxAnimationFrames, imageSource }) {
    this.image = new Image();
    this.image.src = imageSource;
    this.maxAnimationFrames = maxAnimationFrames;
  }

  updateGraphic() {
    this.draw();
  }
}
