import { CellStatus } from '../app/minigames/FSLBingoScreen';

/** index helper for 5×5 board */
const i = (r: number, c: number) => r * 5 + c;

const LINES: number[][] = [
  /* horizontals */ [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
  /* verticals   */ [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
  /* diagonals   */ [0, 6, 12, 18, 24], [4, 8, 12, 16, 20],
];

export const isBingo = (cells: CellStatus[]): boolean =>
  LINES.some(line =>
    line.every(idx => ['correct', 'free'].includes(cells[idx])),
  );
