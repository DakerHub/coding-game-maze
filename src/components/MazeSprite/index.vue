<script lang="tsx">
import type { Grid } from "@/maps";
import type { Position } from "@/utils";
import { defineComponent, computed, type PropType } from "vue";

export default defineComponent({
  name: "MazeSprite",
  props: {
    grid: {
      type: Array as PropType<Grid>,
      default: () => [],
    },
    curPos: {
      type: Object as PropType<Position>,
      default: () => ({ x: 0, y: 0 }),
    },
  },
  setup(props) {
    const style = computed(() => {
      return `top: ${props.curPos.y * 20}px; left: ${props.curPos.x * 20}px`;
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
  transition: all 0.3s;
}
.sprite__inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: blue;
  animation: wave 0.3s infinite alternate-reverse;
}

@keyframes wave {
  0% {
    outline: 4px solid #9ad59c;
  }
  100% {
    outline: 0px solid #9ad59c;
  }
}
</style>
