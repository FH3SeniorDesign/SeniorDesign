export type RegionalImageDistortionDirection =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

const ROWS: number = 3;
const COLUMNS: number = 3;

export const RegionalImageDistortionConstants: {
  ROWS: number;
  COLUMNS: number;
  TOP_LEFT_COORDINATE: [number, number];
  CENTER_COORDINATE: [number, number];
  DIRECTIONS: RegionalImageDistortionDirection[][];
} = {
  ROWS,
  COLUMNS,
  TOP_LEFT_COORDINATE: [0, 0],
  CENTER_COORDINATE: [Math.floor(COLUMNS / 2), Math.floor(ROWS / 2)],
  DIRECTIONS: [
    ['top-left', 'top', 'top-right'],
    ['left', 'center', 'right'],
    ['bottom-left', 'bottom', 'bottom-right'],
  ],
};
