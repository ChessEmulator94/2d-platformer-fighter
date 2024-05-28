class animated_sprite extends sprite {
  draw() {
    /* drawImage(image, sourceX, sourceY, sourceW, sourceH, startX,startY, width, height) */
    canvasContext.drawImage(
      this.image,
      this.cropStartX +
        (this.image.width / this.scale / this.maxAnimationFrames) * this.offset,
      this.cropStartY,
      this.image.width / this.maxAnimationFrames / this.scale,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.maxAnimationFrames,
      this.image.height * this.scale
    );
  }

  changeFrame() {
    this.framesElapsed++;
    if (this.framesElapsed % 20 == 0) {
      this.offset += 1;
    }
    if (this.offset > this.maxAnimationFrames - 1) {
      this.offset = 0;
    }
  }

  updateGraphic() {
    this.changeFrame();
    this.draw();
  }
}
