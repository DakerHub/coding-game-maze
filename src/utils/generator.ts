import type { Grid } from "@/maps";
import generateMaze from "generate-maze";

export function generateRandomMaze(
  width = Math.ceil(Math.random() * 100),
  height = Math.ceil(Math.random() * 60),
  closed = true,
  seed = Math.ceil(Math.random() * 1000000)
) {
  width = Math.min(24, Math.max(3, Math.ceil(width / 2 + 0.5)));
  height = Math.min(20, Math.max(3, Math.ceil(height / 2 + 0.5)));

  const generated = generateMaze(width, height, closed, seed);
  const converted: Grid = [];
  for (let h = 0; h < generated.length; h++) {
    const lineOfRight = [];
    const lineOfBottom = [];
    for (let w = 0; w < generated[h].length; w++) {
      lineOfRight.push(0);
      lineOfRight.push(generated[h][w].right ? 1 : 0);
      lineOfBottom.push(generated[h][w].bottom ? 1 : 0);
      lineOfBottom.push(1);
    }
    converted.push(lineOfRight.slice(0, -1));
    converted.push(lineOfBottom.slice(0, -1));
  }
  converted[0][0] = -1;
  converted.splice(-1, 1);
  converted[converted.length - 1][converted[0].length - 1] = -2;
  console.debug("generated", generated);
  console.debug("converted", converted);
  return {
    map: converted,
    width: converted[0].length,
    height: converted.length,
    closed,
    seed,
  }
}
