import {
  RegionalImageDistortionConstants,
  RegionalImageDistortionDirection,
} from 'constants/RegionalImageDistortionConstants';
import {Vector} from 'utilities/Vector';

export class RegionalImageDistortionVector {
  vector: [number, number];
  direction: RegionalImageDistortionDirection;
  magnitude: number;

  constructor(vector: [number, number] = [0, 0]) {
    this.vector = vector;
    this.direction = this.calculateImageDistortionDirection(this.vector);
    this.magnitude = Vector.calculateMagnitude(this.vector);
  }

  private calculateImageDistortionDirection(
    vector: [number, number],
  ): RegionalImageDistortionDirection {
    const [x, y] = vector;
    let [row, column] = RegionalImageDistortionConstants.CENTER_COORDINATE;

    if (x < 0) {
      column = 0;
    } else if (x > 0) {
      column = RegionalImageDistortionConstants.COLUMNS - 1;
    }

    if (y < 0) {
      row = 0;
    } else if (y > 0) {
      row = RegionalImageDistortionConstants.ROWS - 1;
    }

    return RegionalImageDistortionConstants.DIRECTIONS[row][column];
  }
}
