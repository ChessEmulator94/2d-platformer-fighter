class animated_sprite extends sprite {
  draw() {
    this.changeFrame();

    // canvasContext.drawImage(
    //   this.image,
    //   this.cropStartX +
    //     (this.image.width / this.maxAnimationFrames) * this.offset,
    //   this.cropStartY,
    //   this.image.width / this.maxAnimationFrames,
    //   this.image.height,
    //   this.position.x - this.emptySpaceOffset.x,
    //   this.position.y - this.emptySpaceOffset.y,
    //   (this.image.width * this.scale) / this.maxAnimationFrames,
    //   this.image.height * this.scale
    // );

    if (this.direction == 1) {
      /* drawImage(image, sourceX, sourceY, sourceW, sourceH, startX,startY, width, height) */
      canvasContext.drawImage(
        this.image,
        this.cropStartX +
          (this.image.width / this.maxAnimationFrames) * this.offset,
        this.cropStartY,
        this.image.width / this.maxAnimationFrames,
        this.image.height,
        this.position.x - this.emptySpaceOffset.x,
        this.position.y - this.emptySpaceOffset.y,
        (this.image.width * this.scale) / this.maxAnimationFrames,
        this.image.height * this.scale
      );
    } else {
      canvasContext.save();

      canvasContext.translate(this.position.x + canvas.width / 2, 0);

      // Multiply the y value by -1 to flip vertically
      canvasContext.scale(-1, 1);
      // Start at (0, -height), which is now the bottom-left corner
      canvasContext.drawImage(
        this.image,
        this.cropStartX +
          (this.image.width / this.maxAnimationFrames) * this.offset,
        this.cropStartY,
        this.image.width / this.maxAnimationFrames,
        this.image.height,
        0 + (this.width + this.emptySpaceOffset.x),
        this.position.y - this.emptySpaceOffset.y,
        (this.image.width * this.scale) / this.maxAnimationFrames,
        this.image.height * this.scale
      );
      canvasContext.restore();
    }
  }

  changeFrame() {
    this.framesElapsed++;
    if (this.framesElapsed % this.inverseFrameRate == 0) {
      this.offset += 1;
    }
    if (this.offset > this.maxAnimationFrames - 1) {
      this.offset = 0;
    }
  }

  updateGraphic() {
    this.draw();
  }
}
