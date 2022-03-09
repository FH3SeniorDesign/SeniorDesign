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
  OCTANT_DIRECTIONS: RegionalImageDistortionDirection[];
} = {
  ROWS,
  COLUMNS,
  OCTANT_DIRECTIONS: [
    'right',
    'top-right',
    'top',
    'top-left',
    'left',
    'bottom-left',
    'bottom',
    'bottom-right',
  ],
};
