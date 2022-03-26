<script lang="tsx">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "vue";
import MazeView from "@/components/MazeView/index.vue";
import { map1 } from "@/maps/index";
import {
  isBlocked,
  minmax,
  walkGrid,
  randomStep,
  type Position,
  getAroundValue,
} from "@/utils";
import Record from "@/utils/record";
import { findNext } from "@/utils/route";

export default defineComponent({
  name: "GameCanvas",
  setup(props) {
    const hasMask = ref(true);
    const interval = ref(200);
    const grid = reactive(map1.map);
    const gridProps = computed(() => walkGrid(grid)).value;
    const state = reactive({ manual: true, gridMutable: true });
    const record = new Record();
    const cellStyles = ref({} as any);

    let timer = 0;

    const curPos = reactive({ ...gridProps.entryPos } as Position);
    let payload = {};

    const changeGrid = (x: number, y: number, val: number) => {
      grid[y][x] = val;
    };

    const exportGrid = () => {
      console.log(
        "%cFrank",
        "color:#fff;background:#333;padding:2px 4px;border-radius:2px;border-left:4px solid red",
        JSON.stringify(grid)
      );
    };

    const checkGame = () => {
      const { x, y } = curPos;
      const { outPos } = gridProps;
      if (x === outPos?.x && y === outPos.y) {
        console.log(
          "%cFrank",
          "color:#fff;background:#333;padding:2px 4px;border-radius:2px;border-left:4px solid red",
          "win!"
        );
        console.log(
          "%cFrank",
          "color:#fff;background:#333;padding:2px 4px;border-radius:2px;border-left:4px solid red",
          record.getAll().length
        );
        clearInterval(timer);
      }
    };

    const setCellStyle = (style: any) => {
      cellStyles.value[`${curPos.x}_${curPos.y}`] = style;
    };

    const toggleMask = () => {
      hasMask.value = !hasMask.value;
    };

    const move = (dx = 0, dy = 0) => {
      const allowValues = [-1, 0, 1];
      if (!(allowValues.includes(dx) && allowValues.includes(dy))) {
        throw new Error("dx, dy must be -1/0/-1");
      }

      if (dx * dy !== 0) {
        throw new Error("only allow movement in one direction");
      }

      let nextPosition = { ...curPos };

      nextPosition.x = minmax(nextPosition.x + dx, gridProps.maxX, 0);
      nextPosition.y = minmax(nextPosition.y + dy, gridProps.maxY, 0);

      if (!isBlocked(grid, nextPosition)) {
        Object.assign(curPos, nextPosition);
      }

      record.add({ pos: curPos });

      checkGame();
    };

    const reset = () => {
      Object.assign(curPos, { x: -99, y: -99 });
      nextTick(() => {
        Object.assign(curPos, gridProps.entryPos);
      });
      payload = {};
      cellStyles.value = {};
      record.clear();
    };

    const play = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        try {
          const { dx, dy } = findNext(
            curPos,
            getAroundValue(curPos, grid),
            payload,
            {
              setCellStyle,
            }
          );
          // const { dx, dy } = randomStep();
          move(dx, dy);
        } catch (error) {
          console.error(error);
          clearInterval(timer);
        }
      }, interval.value);
    };

    const stop = () => {
      clearInterval(timer);
    };

    const updatePositon = (e: KeyboardEvent) => {
      let dx,
        dy = 0;
      switch (e.key) {
        case "ArrowUp":
          dy = -1;
          break;
        case "ArrowRight":
          dx = 1;
          break;
        case "ArrowDown":
          dy = 1;
          break;
        case "ArrowLeft":
          dx = -1;
          break;
      }

      move(dx, dy);
    };

    onMounted(() => {
      if (state.manual) {
        window.addEventListener("keydown", updatePositon);
      }
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
      if (state.manual) {
        window.removeEventListener("keydown", updatePositon);
      }
    });

    return () => (
      <div class="game-canvas">
        <div class="header">
          <h1>Get out of the maze</h1>
        </div>
        <div class="main">
          <MazeView
            grid={grid}
            gridProps={gridProps}
            curPos={curPos}
            onCellChange={changeGrid}
            mutable={state.gridMutable}
            cellStyles={cellStyles.value}
            hasMask={hasMask.value}
          ></MazeView>
        </div>
        <div class="sidebar">
          <button onClick={play}>Play</button>
          <button onClick={reset}>Reset</button>
          <button onClick={stop}>Stop</button>
          <button onClick={toggleMask}>Toggle Mask</button>
          <button onClick={exportGrid}>Export grid</button>
        </div>
      </div>
    );
  },
});
</script>

<style scoped>
.game-canvas {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 60px 1fr;
  background-color: #000;
}

.header {
  grid-column: 1 / 3;
  background-color: #000;
  text-align: center;
  border-bottom: 2px solid #333;
}
.main {
  padding: 40px 0;
}
h1 {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eee;
}
.sidebar {
  padding: 10px;
  min-width: 600px;
  border-left: 2px solid #333;
}
</style>
