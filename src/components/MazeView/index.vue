<script lang="tsx">
import {
  computed,
  defineComponent,
  reactive,
  type PropType,
  onMounted,
  onBeforeUnmount,
  ref,
} from "vue";
import MazeSprite from "@/components/MazeSprite/index.vue";
import type { Grid } from "@/maps";
import { findCellByValue, walkGrid } from "@/utils";

export default defineComponent({
  name: "MazeView",
  props: {
    grid: {
      type: Array as PropType<Grid>,
      default: () => [],
    },
  },
  setup(props) {
    const gridProps = walkGrid(props.grid);
    const sprite = ref<InstanceType<typeof MazeSprite> | null>(null);

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
      sprite.value?.move(dx, dy);
    };

    onMounted(() => {
      window.addEventListener("keydown", updatePositon);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", updatePositon);
    });

    const Rows = props.grid.map((row) => {
      const Cols = row.map((col) => {
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

        return <div class={`col cell ${classList.join(" ")}`}></div>;
      });
      return <div class="row">{Cols}</div>;
    });

    return () => (
      <div class="maze-view">
        <div class="maze-view-center">
          <div class="maze-view-grid">{Rows}</div>
          <div class="maze-view-sprite-container">
            <MazeSprite
              ref={sprite}
              grid={props.grid}
              {...gridProps}
            ></MazeSprite>
          </div>
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
.cell {
  width: 20px;
  height: 20px;
  border: 1px solid #666;
  box-sizing: border-box;
  background-color: antiquewhite;
}
.block {
  background-color: black;
}
.entry {
  background-color: greenyellow;
}
.out {
  background-color: greenyellow;
}

.row {
  display: flex;
}
.maze-view-sprite-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
