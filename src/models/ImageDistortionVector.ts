import {
  ImageDistortionDirection,
  ImageDistortionRegion,
} from 'models/ImageDistortionRegion';
import {Vector} from 'utilities/Vector';

export class ImageDistortionVector {
  vector: [number, number];
  direction: ImageDistortionDirection;
  magnitude: number;

  constructor(vector: [number, number] = [0, 0]) {
    this.vector = vector;
    this.direction = this.calculateImageDistortionDirection(this.vector);
    this.magnitude = Vector.calculateMagnitude(this.vector);
  }

  private calculateImageDistortionDirection(
    vector: [number, number],
  ): ImageDistortionDirection {
    const [x, y] = vector;
    let [row, column] = ImageDistortionRegion.CENTER_COORDINATE;

    if (x < 0) {
      column = 0;
    } else if (x > 0) {
      column = ImageDistortionRegion.COLUMNS - 1;
    }

    if (y < 0) {
      row = 0;
    } else if (y > 0) {
      row = ImageDistortionRegion.ROWS - 1;
    }

    return ImageDistortionRegion.DIRECTIONS[row][column];
  }
}
