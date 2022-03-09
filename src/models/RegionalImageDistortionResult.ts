import {ImageDistortionRegion} from 'models/ImageDistortionRegion';
import {ImageDistortionResult} from 'models/ImageDistortionResult';
import {ImageDistortionVector} from 'models/ImageDistortionVector';
import {Vector} from 'utilities/Vector';

export class RegionalImageDistortionResult {
  imageDistortionResults: ImageDistortionResult[][];
  blurryVector: ImageDistortionVector;
  shakyVector: ImageDistortionVector;
  brightVector: ImageDistortionVector;
  darkVector: ImageDistortionVector;
  grainyVector: ImageDistortionVector;
  noneVector: ImageDistortionVector;
  otherVector: ImageDistortionVector;

  constructor(
    imageDistortionResults: ImageDistortionResult[][] = [],
    blurryVector: ImageDistortionVector = new ImageDistortionVector(),
    shakyVector: ImageDistortionVector = new ImageDistortionVector(),
    brightVector: ImageDistortionVector = new ImageDistortionVector(),
    darkVector: ImageDistortionVector = new ImageDistortionVector(),
    grainyVector: ImageDistortionVector = new ImageDistortionVector(),
    noneVector: ImageDistortionVector = new ImageDistortionVector(),
    otherVector: ImageDistortionVector = new ImageDistortionVector(),
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

  getDescendingDistortionVectors(): [string, ImageDistortionVector][] {
    let distortionVectors: [string, ImageDistortionVector][] = Object.entries(
      this,
    ).filter(([property]: [string, any]) => {
      return property !== 'imageDistortionResults';
    });

    return distortionVectors.sort(
      (
        a: [string, ImageDistortionVector],
        b: [string, ImageDistortionVector],
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
            const vector: [number, number] = [columnIndex, rowIndex];
            const translatedVector: [number, number] = Vector.translateOrigin(
              vector,
              ImageDistortionRegion.TOP_LEFT_COORDINATE,
              ImageDistortionRegion.CENTER_COORDINATE,
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
  ): ImageDistortionVector {
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

    return new ImageDistortionVector(resultantVector);
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
