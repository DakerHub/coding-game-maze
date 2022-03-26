import type { Position } from ".";

// 接受当前格子坐标，返回下一个格子坐标，游戏有自动判赢机制，到达终点自动停止
// curPos 当前格子坐标
// around 当前格子周围的格子通行情况，依次为上右下左[top, right, bottom, left]，0为可通信，1为墙壁，-1起点，-2终点
// payload 全局存储挂载对象
// uiHelpers uiHelpers.setCellStyle(`background-color: red`); 可设置当前格子的样式
export function findNext(
  curPos: Position,
  around: (number | undefined)[],
  payload: any,
  uiHelpers: any
): Position {
  return { x: curPos.x + 1, y: curPos.y + 1 };
}

// import { diffPos, type Position } from ".";
// export function findNext(
//   curPos: Position,
//   around: (number | undefined)[],
//   payload: any,
//   uiHelpers: any
// ) {
//   if (!payload.visited) {
//     payload.visited = {};
//   }

//   const { visited } = payload;
//   const key = getKey(curPos);
//   const movalePos = getAroundMovablePos(curPos, around);

//   if (!visited[key]) {
//     const prev = movalePos.find((pos) => !!(pos && visited[getKey(pos)]));
//     visited[key] = {
//       prev,
//       next: movalePos.filter((pos) => pos && getKey(pos) !== getKey(prev)),
//     };
//   }

//   const { prev, next } = visited[key];
//   let nextPos = prev;
//   if (next.length === 0) {
//     Reflect.deleteProperty(visited, key);
//   } else {
//     [nextPos] = next.splice(randomIntBetween(0, next.length - 1), 1);
//   }

//   setVisitedCountStlye(curPos, payload, uiHelpers);

//   return diffPos(nextPos, curPos);
// }

function getKey(pos: Position | undefined) {
  if (!pos) {
    return "";
  }

  return `${pos.x}_${pos.y}`;
}

const colors = ["#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#b71c1c"];

function setVisitedCountStlye(curPos: Position, payload: any, uiHelpers: any) {
  if (!payload.visitCount) {
    payload.visitCount = {};
  }

  const count = payload.visitCount[getKey(curPos)] || 0;
  const color = colors[Math.min(colors.length - 1, count)];

  payload.visitCount[getKey(curPos)] = count + 1;

  uiHelpers.setCellStyle(`background-color: ${color};`);
}

function getAroundMovablePos(curPos: Position, around: (number | undefined)[]) {
  const { x, y } = curPos;
  const [top, right, bottom, left] = around;
  const movalePos = [];

  const blockedOrOutbound = (val: number | undefined) =>
    val == undefined || val >= 1;

  movalePos.push(
    blockedOrOutbound(top)
      ? undefined
      : {
          x,
          y: y - 1,
        }
  );
  movalePos.push(
    blockedOrOutbound(right)
      ? undefined
      : {
          x: x + 1,
          y,
        }
  );
  movalePos.push(
    blockedOrOutbound(bottom)
      ? undefined
      : {
          x,
          y: y + 1,
        }
  );
  movalePos.push(
    blockedOrOutbound(left)
      ? undefined
      : {
          x: x - 1,
          y,
        }
  );

  return movalePos;
}

function randomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
