export class ImageDistortionResult {
  globalQuality: number;
  blurry: number;
  shaky: number;
  bright: number;
  dark: number;
  grainy: number;
  none: number;
  other: number;

  constructor(
    globalQuality: number = 0,
    blurry: number = 0,
    shaky: number = 0,
    bright: number = 0,
    dark: number = 0,
    grainy: number = 0,
    none: number = 0,
    other: number = 0,
  ) {
    this.globalQuality = globalQuality;
    this.blurry = blurry;
    this.shaky = shaky;
    this.bright = bright;
    this.dark = dark;
    this.grainy = grainy;
    this.none = none;
    this.other = other;
  }

  static from(imageDistortionResultObject: object): ImageDistortionResult {
    return Object.assign(
      new ImageDistortionResult(),
      imageDistortionResultObject,
    );
  }

  getDescendingDistortions(): [string, number][] {
    let distortions: [string, number][] = Object.entries(this).filter(
      ([property]: [string, number]) => {
        return property !== 'globalQuality';
      },
    );

    return distortions.sort((a: [string, number], b: [string, number]) => {
      return -(a[1] - b[1]);
    });
  }
}
