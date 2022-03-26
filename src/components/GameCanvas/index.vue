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
import CodeEditor from "@/components/CodeEditor/index.vue";
import { map1 } from "@/maps/index";
import {
  isBlocked,
  minmax,
  walkGrid,
  randomStep,
  type Position,
  getAroundValue,
  diffPos,
} from "@/utils";
import Record from "@/utils/record";
import { initialCodeText, mySolution } from "@/utils/route";

export default defineComponent({
  name: "GameCanvas",
  setup(props) {
    const hasMask = ref(true);
    const interval = ref(200);
    const grid = reactive(map1.map);
    const gridProps = computed(() => walkGrid(grid)).value;
    const state = reactive({
      manual: false,
      gridMutable: false,
      emptyDoc: true,
    });
    const record = new Record();
    const cellStyles = ref({} as any);
    const codeText = ref(initialCodeText);
    const editor = ref(null as any);

    let timer = 0;

    const curPos = reactive({ ...gridProps.entryPos } as Position);

    let payload = {};

    const changeGrid = (x: number, y: number, val: number) => {
      grid[y][x] = val;
    };

    const toggleDoc = () => {
      editor.value?.updateDoc(state.emptyDoc ? mySolution : initialCodeText);
      state.emptyDoc = !state.emptyDoc;
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const setCellStyle = (style: any) => {
      cellStyles.value[`${curPos.x}_${curPos.y}`] = style;
    };

    const toggleMask = () => {
      hasMask.value = !hasMask.value;
    };

    const changeInterval = (e: any) => {
      interval.value = +e.target.value;
    };

    const move = (dx = 0, dy = 0) => {
      const allowValues = [-1, 0, 1];
      if (!(allowValues.includes(dx) && allowValues.includes(dy))) {
        throw new Error("dx, dy must be -1/0/-1");
      }

      if (dx * dy !== 0) {
        throw new Error("only allow movement in one direction");
      }

      if (dx === 0 && dy === 0) {
        throw new Error("the spirte stop to move");
      }

      let nextPosition = { ...curPos };

      nextPosition.x = minmax(nextPosition.x + dx, gridProps.maxX, 0);
      nextPosition.y = minmax(nextPosition.y + dy, gridProps.maxY, 0);

      if (nextPosition.x === curPos.x && nextPosition.y === curPos.y) {
        throw new Error("the sprite stop to move");
      }

      if (!isBlocked(grid, nextPosition)) {
        Object.assign(curPos, nextPosition);
      } else {
        throw new Error("can't go through the wall");
      }

      record.add({ pos: curPos });

      checkGame();
    };

    const reset = () => {
      stop();
      Object.assign(curPos, { x: -99, y: -99 });
      nextTick(() => {
        Object.assign(curPos, gridProps.entryPos);
      });
      cellStyles.value = {};
      record.clear();
      payload = {};
    };

    const play = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        try {
          const around = getAroundValue(curPos, grid);
          const codes = editor.value?.getDoc();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _diffPos = diffPos;
          const execCode = `
          const { dx, dy } = findNext(
            curPos,
            ${JSON.stringify(around)},
            payload,
            {
              setCellStyle,
              diffPos: _diffPos
            }
          );
          move(dx, dy);
          `;
          codes.push(execCode);

          eval(codes.join("\n"));
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
          <div class="tool">
            <input value={interval.value} onChange={changeInterval}></input>
            <button onClick={play}>Play</button>
            <button onClick={reset}>Reset</button>
            <button onClick={stop}>Stop</button>
            <button onClick={toggleMask}>Toggle Mask</button>
            <button onClick={toggleDoc}>
              {state.emptyDoc ? "Daker's solution" : "Do it yourself"}
            </button>
          </div>
          <CodeEditor ref={editor} value={codeText.value}></CodeEditor>
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
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  min-width: 600px;
  border-left: 2px solid #333;
  box-sizing: border-box;
  overflow: hidden;
}

.code-editor {
  flex-grow: 1;
}
.tool {
  margin-bottom: 10px;
}
input {
  background-color: transparent;
  border: thin solid #999;
  margin-right: 10px;
  height: 22px;
  border-radius: 2px;
  color: #eee;
  outline: none;
}
input:focus {
  border-color: #2196f3;
}
button {
  background: #333;
  border: thin solid #999;
  margin-right: 10px;
  color: #fff;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.2s;
}
button:hover {
  background-color: #eee;
  color: #333;
  border: thin solid #fff;
}
</style>
