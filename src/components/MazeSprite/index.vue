<script lang="tsx">
import type { Grid } from "@/maps";
import { isBlocked, minmax, type Position } from "@/utils";
import { defineComponent, reactive, computed, type PropType } from "vue";

export default defineComponent({
  name: "MazeSprite",
  props: {
    grid: {
      type: Array as PropType<Grid>,
      default: () => [],
    },
    entryPos: {
      type: Object as PropType<Position>,
      default: () => ({}),
    },
    outPos: {
      type: Object as PropType<Position>,
      default: () => ({}),
    },
    maxY: {
      type: Number,
      defalut: 0,
    },
    maxX: {
      type: Number,
      defalut: 0,
    },
  },
  setup(props, { expose }) {
    const currentPos = reactive(props.entryPos);

    const style = computed(() => {
      return `top: ${currentPos.y * 20}px; left: ${currentPos.x * 20}px`;
    });

    const move = (dx = 0, dy = 0) => {
      const allowValues = [-1, 0, 1];
      if (!(allowValues.includes(dx) && allowValues.includes(dy))) {
        throw new Error("dx, dy must be -1/0/-1");
      }

      let nextPosition = { ...currentPos };

      nextPosition.x = minmax(nextPosition.x + dx, props.maxX, 0);
      nextPosition.y = minmax(nextPosition.y + dy, props.maxY, 0);

      if (!isBlocked(props.grid, nextPosition)) {
        Object.assign(currentPos, nextPosition);
      }
    };

    expose({
      move,
    });

    return () => (
      <div class="sprite" style={style.value}>
        <div class="sprite__inner"></div>
      </div>
    );
  },
});
</script>

<style scoped>
.sprite {
  position: absolute;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sprite__inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: blue;
}
</style>
