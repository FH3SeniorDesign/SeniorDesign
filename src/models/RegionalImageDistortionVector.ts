import {
  RegionalImageDistortionConstants,
  RegionalImageDistortionDirection,
} from 'constants/RegionalImageDistortionConstants';
import {Vector} from 'utilities/Vector';

export class RegionalImageDistortionVector {
  vector: [number, number];
  magnitude: number;
  direction: RegionalImageDistortionDirection;

  constructor(vector: [number, number] = [0, 0]) {
    this.vector = vector;
    this.magnitude = Vector.magnitude(vector);
    this.direction = this.calculateImageDistortionDirection(vector);
  }

  private calculateImageDistortionDirection(
    vector: [number, number],
  ): RegionalImageDistortionDirection {
    const angle: number = Vector.angle(vector);
    const offsetAngle: number = (angle + 22.5) % 360;
    const octant: number = Math.floor(offsetAngle / 45);

    return RegionalImageDistortionConstants.OCTANT_DIRECTIONS[octant];
  }
}
