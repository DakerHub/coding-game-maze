<script lang="tsx">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
  type PropType,
} from "vue";
import MazeSprite from "@/components/MazeSprite/index.vue";
import type { Grid } from "@/maps";
import type { Position } from "@/utils";

export default defineComponent({
  name: "MazeView",
  emits: ["cellChange"],
  props: {
    grid: {
      type: Array as PropType<Grid>,
      default: () => [],
    },
    gridProps: {
      type: Object,
      default: () => ({}),
    },
    cellStyles: {
      type: Object,
      default: () => ({}),
    },
    curPos: {
      type: Object as PropType<Position>,
      default: () => ({ x: 0, y: 0 }),
    },
    mutable: {
      type: Boolean,
      default: false,
    },
    hasMask: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 200,
    },
  },
  setup(props, { emit }) {
    const xAxis = ref<number | undefined>();
    const yAxis = ref<number | undefined>();

    const viewBox = ref<string>("");
    watch(
      props.gridProps,
      (newValue) => {
        xAxis.value = (newValue.maxX + 1) * 20;
        yAxis.value = (newValue.maxY + 1) * 20;
        viewBox.value = `0 0 ${(newValue.maxX + 1) * 20} ${
          (newValue.maxY + 1) * 20
        }`;
      },
      { immediate: true }
    );

    const onCellClick = (x: number, y: number, col: number) => {
      if (props.mutable) {
        emit("cellChange", x, y, col === 1 ? 0 : 1);
      }
    };

    let edting = false;
    const onMousedown = () => {
      if (props.mutable) {
        edting = true;
      }
    };
    const onMouseup = () => {
      if (props.mutable) {
        edting = false;
      }
    };

    const onMouseEnter = (x: number, y: number) => {
      if (props.mutable && edting) {
        emit("cellChange", x, y, 0);
      }
    };

    const Rows = computed(() => {
      return props.grid.map((row, i) => {
        const Cols = row.map((col, j) => {
          const classList = [];
          if (col >= 1) {
            classList.push("block");
          } else if (col === -1) {
            classList.push("entry");
          } else if (col === -2) {
            classList.push("out");
          } else {
            classList.push("road");
          }

          const style = props.cellStyles[`${j}_${i}`];

          return (
            <div
              class={`col cell ${classList.join(" ")}`}
              style={style}
              onClick={() => onCellClick(j, i, col)}
              onMousedown={() => onMousedown()}
              onMouseenter={() => onMouseEnter(j, i)}
              onMouseup={() => onMouseup()}
            ></div>
          );
        });
        return <div class="row">{Cols}</div>;
      });
    });

    const lastPos = reactive({ x: -99, y: -99 } as Position);
    const pathD = ref("");

    const calcPathD = (curPos: Position, lastPos: Position) => {
      const { x, y } = curPos;
      const { x: lastX, y: lastY } = lastPos;
      const xPos = x * 20;
      const yPos = y * 20;

      const fouseCube = `M ${xPos} ${yPos} ${drawCube()}`;

      let fouseLastCube = "";
      if (lastX !== undefined && lastY !== undefined) {
        const lastXPos = lastX * 20;
        const lastYPos = lastY * 20;
        fouseLastCube = `M ${lastXPos} ${lastYPos} ${drawCube()}`;
      }

      pathD.value = `${fouseCube} ${fouseLastCube}`;
    };

    const drawCube = () => {
      const cellSize = 20;
      return `h -${cellSize} v ${cellSize} h ${cellSize} v ${cellSize} h20 v -${cellSize} h20 v -${cellSize} h -${cellSize} v -${cellSize} h -${cellSize} v ${cellSize}`;
    };

    watch(
      props.curPos,
      (newValue) => {
        calcPathD(props.curPos, lastPos);

        Object.assign(lastPos, newValue);
      },
      { immediate: true }
    );

    return () => (
      <div class="maze-view">
        <div class="maze-view-center">
          <div class="maze-view-grid">{Rows.value}</div>
          <div class="maze-view-sprite-container">
            <MazeSprite
              grid={props.grid}
              curPos={props.curPos}
              interval={props.interval}
            ></MazeSprite>
          </div>

          {props.hasMask && (
            <div class="maze-view-mask">
              <svg viewBox={viewBox.value}>
                <mask id="mask">
                  <rect
                    x="0"
                    y="0"
                    width={xAxis.value}
                    height={yAxis.value}
                    fill="white"
                  ></rect>
                  <path d={pathD.value} fill="black" />
                </mask>
                <rect
                  mask="url(#mask)"
                  x="0"
                  y="0"
                  width={xAxis.value}
                  height={yAxis.value}
                ></rect>
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  },
});
</script>

<style>
.maze-view {
  display: flex;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
}
.maze-view-center {
  position: relative;
}
.maze-view-center {
  outline: 4px solid #333;
}
.cell {
  width: 20px;
  height: 20px;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  background-color: #e8e8e8;
}
.block {
  background-color: #333;
}
.entry {
  background-color: #4caf50;
}
.out {
  background-color: #4caf50;
}

.row {
  display: flex;
}
.maze-view-sprite-container,
.maze-view-mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}
</style>
