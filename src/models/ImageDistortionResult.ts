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

  get descendingDistortions(): [string, number][] {
    let distortions: [string, number][] = [
      ['blurry', this.blurry],
      ['shaky', this.shaky],
      ['bright', this.bright],
      ['dark', this.dark],
      ['grainy', this.grainy],
      ['none', this.none],
      ['other', this.other],
    ];

    return distortions.sort((a, b) => b[1] - a[1]);
  }

  toString() {
    return `ImageDistortionResult(globalQuality=${this.globalQuality}, blurry=${this.blurry}, shaky=${this.shaky}, bright=${this.bright}, dark=${this.dark}, grainy=${this.grainy}, none=${this.none}, other=${this.other})`;
  }

  static from(object: any): ImageDistortionResult {
    return Object.assign(new ImageDistortionResult(), object);
  }
}
