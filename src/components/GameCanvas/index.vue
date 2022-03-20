<script lang="tsx">
import { defineComponent } from "vue";
import MazeView from "@/components/MazeView/index.vue";

export default defineComponent({
  name: "GameCanvas",
  setup(props) {
    return () => (
      <div class="game-canvas">
        <div class="header">Get out of the maze</div>
        <div>
          <MazeView></MazeView>
        </div>
        <div class="sidebar">SIDEBAR</div>
      </div>
    );
  },
});
</script>

<style scoped>
.game-canvas {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-rows: 60px 1fr;
}

.header {
  grid-column: 1 / 3;
  background-color: #ccc;
  text-align: center;
}
</style>
