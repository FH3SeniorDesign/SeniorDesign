export class Vector {
  static add(...vectors: [number, number][]): [number, number] {
    return vectors.reduce(
      (previousVector: [number, number], currentVector: [number, number]) => {
        const [previousX, previousY] = previousVector;
        const [currentX, currentY] = currentVector;

        return [previousX + currentX, previousY + currentY];
      },
    );
  }

  static subtract(...vectors: [number, number][]): [number, number] {
    return vectors.reduce(
      (previousVector: [number, number], currentVector: [number, number]) => {
        const [previousX, previousY] = previousVector;
        const [currentX, currentY] = currentVector;

        return [previousX - currentX, previousY - currentY];
      },
    );
  }

  static scalarMultiply(
    scalar: number,
    vector: [number, number],
  ): [number, number] {
    const [x, y] = vector;

    return [scalar * x, scalar * y];
  }

  static normalize(vector: [number, number]): [number, number] {
    const [x, y] = vector;
    const magnitude = this.calculateMagnitude(vector);

    return [x / magnitude || 0, y / magnitude || 0];
  }

  static calculateMagnitude(vector: [number, number]): number {
    const [x, y] = vector;

    return Math.sqrt(x ** 2 + y ** 2);
  }

  static translateOrigin(
    vector: [number, number],
    oldOriginFromTopLeft: [number, number],
    newOriginFromTopLeft: [number, number],
  ): [number, number] {
    const translationVector: [number, number] = this.subtract(
      oldOriginFromTopLeft,
      newOriginFromTopLeft,
    );

    return this.add(vector, translationVector);
  }
}
