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
  const maxX = gird[0].length - 1;
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

export function randomStep() {
  const dir = Math.floor(Math.random() * 10) % 6;
  const stepMaps = [
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  return stepMaps[dir];
}

export function diffPos(pos1: Position, pos2: Position) {
  return {
    dx: pos1.x - pos2.x,
    dy: pos1.y - pos2.y,
  };
}

export function getAroundValue(curPos: Position, grid: Grid) {
  const { x, y } = curPos;
  const top = { x, y: y - 1 };
  const right = { x: x + 1, y };
  const bottom = { x, y: y + 1 };
  const left = { x: x - 1, y };

  return [
    getPosValue(top, grid),
    getPosValue(right, grid),
    getPosValue(bottom, grid),
    getPosValue(left, grid),
  ];
}

export function getPosValue(pos: Position, grid: Grid) {
  const { x, y } = pos;
  if (!grid[y]) return undefined;

  if (grid[y][x] === undefined) return undefined;

  return grid[y][x];
}
