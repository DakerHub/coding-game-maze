import type { Grid } from "@/maps";
export type Position = {
  x: number;
  y: number;
};

export function findCellByValue(grid: Grid, num: number): Position | undefined {
  for (let i = 0; i < grid.length; i++) {
    const cols = grid[i];
    for (let j = 0; j < cols.length; j++) {
      if (cols[j] === num) {
        return {
          x: i,
          y: j,
        };
      }
    }
  }
}

export function walkGrid(gird: Grid) {
  if (!gird[0]) return {};

  const maxY = gird.length - 1;
  const maxX = gird[0].length;
  let entryPos = { x: 0, y: 0 };
  let outPos = { x: 0, y: 0 };

  gird.forEach((cols, i) => {
    cols.forEach((cell, j) => {
      if (cell === -1) {
        entryPos = {
          x: j,
          y: i,
        };
      }

      if (cell === -2) {
        outPos = {
          x: j,
          y: i,
        };
      }
    });
  });

  return {
    maxX,
    maxY,
    entryPos,
    outPos,
  };
}

export function isBlocked(grid: Grid, postion: Position) {
  return grid[postion.y][postion.x] >= 1;
}

export function minmax(value: number, max = 0, min = 0) {
  return Math.min(max, Math.max(min, value));
}
