import {ImageDistortionResult} from 'models/ImageDistortionResult';
import {RegionalImageDistortionVector} from 'models/RegionalImageDistortionVector';
import {Vector} from 'utilities/Vector';

export class RegionalImageDistortionResult {
  imageDistortionResults: ImageDistortionResult[][];
  blurryVector: RegionalImageDistortionVector;
  shakyVector: RegionalImageDistortionVector;
  brightVector: RegionalImageDistortionVector;
  darkVector: RegionalImageDistortionVector;
  grainyVector: RegionalImageDistortionVector;
  noneVector: RegionalImageDistortionVector;
  otherVector: RegionalImageDistortionVector;

  constructor(
    imageDistortionResults: ImageDistortionResult[][] = [],
    blurryVector: RegionalImageDistortionVector = new RegionalImageDistortionVector(),
    shakyVector: RegionalImageDistortionVector = new RegionalImageDistortionVector(),
    brightVector: RegionalImageDistortionVector = new RegionalImageDistortionVector(),
    darkVector: RegionalImageDistortionVector = new RegionalImageDistortionVector(),
    grainyVector: RegionalImageDistortionVector = new RegionalImageDistortionVector(),
    noneVector: RegionalImageDistortionVector = new RegionalImageDistortionVector(),
    otherVector: RegionalImageDistortionVector = new RegionalImageDistortionVector(),
  ) {
    this.imageDistortionResults = imageDistortionResults;
    this.blurryVector = blurryVector;
    this.shakyVector = shakyVector;
    this.brightVector = brightVector;
    this.darkVector = darkVector;
    this.grainyVector = grainyVector;
    this.noneVector = noneVector;
    this.otherVector = otherVector;

    this.calculateDistortionVectors();
  }

  getDescendingDistortionVectors(): [string, RegionalImageDistortionVector][] {
    let distortionVectors: [string, RegionalImageDistortionVector][] =
      Object.entries(this).filter(([property]: [string, any]) => {
        return property !== 'imageDistortionResults';
      });

    return distortionVectors.sort(
      (
        a: [string, RegionalImageDistortionVector],
        b: [string, RegionalImageDistortionVector],
      ) => {
        return -(a[1].magnitude - b[1].magnitude);
      },
    );
  }

  private calculateDistortionVectors(): void {
    const normalizedVectors: [number, number][][] =
      this.imageDistortionResults.map(
        (row: ImageDistortionResult[], rowIndex: number) => {
          return row.map((_: ImageDistortionResult, columnIndex: number) => {
            const vector: [number, number] = [
              columnIndex,
              this.imageDistortionResults.length - rowIndex - 1,
            ];
            const topLeftCoordinate: [number, number] = [0, 0];
            const centerCoordinate: [number, number] = [
              Math.floor(row.length / 2),
              Math.floor(this.imageDistortionResults.length / 2),
            ];
            const translatedVector: [number, number] = Vector.translateOrigin(
              vector,
              topLeftCoordinate,
              centerCoordinate,
            );

            return Vector.normalize(translatedVector);
          });
        },
      );

    this.blurryVector = this.calculateDistortionVector(
      this.getDistortionScores('blurry'),
      normalizedVectors,
    );
    this.shakyVector = this.calculateDistortionVector(
      this.getDistortionScores('shaky'),
      normalizedVectors,
    );
    this.brightVector = this.calculateDistortionVector(
      this.getDistortionScores('bright'),
      normalizedVectors,
    );
    this.darkVector = this.calculateDistortionVector(
      this.getDistortionScores('dark'),
      normalizedVectors,
    );
    this.grainyVector = this.calculateDistortionVector(
      this.getDistortionScores('grainy'),
      normalizedVectors,
    );
    this.noneVector = this.calculateDistortionVector(
      this.getDistortionScores('none'),
      normalizedVectors,
    );
    this.otherVector = this.calculateDistortionVector(
      this.getDistortionScores('other'),
      normalizedVectors,
    );
  }

  private calculateDistortionVector(
    distortionScores: number[][],
    normalizedVectors: [number, number][][],
  ): RegionalImageDistortionVector {
    const scaledVectors: [number, number][] = normalizedVectors.flatMap(
      (row: [number, number][], rowIndex: number) => {
        return row.map(
          (normalizedVector: [number, number], columnIndex: number) => {
            return Vector.scalarMultiply(
              distortionScores[rowIndex][columnIndex],
              normalizedVector,
            );
          },
        );
      },
    );
    const resultantVector: [number, number] = Vector.add(...scaledVectors);

    return new RegionalImageDistortionVector(resultantVector);
  }

  private getDistortionScores(
    distortionKey: keyof ImageDistortionResult,
  ): number[][] {
    return this.imageDistortionResults.map((row: ImageDistortionResult[]) => {
      return row.map((imageDistortionResult: ImageDistortionResult) => {
        return imageDistortionResult[distortionKey] as unknown as number;
      });
    });
  }
}
