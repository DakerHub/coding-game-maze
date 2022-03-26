<script lang="tsx">
import { defineComponent } from "vue";
import GameCanvas from "@/components/GameCanvas/index.vue";

export default defineComponent({
  name: "HomeView",
  setup(props) {
    return () => (
      <>
        <GameCanvas></GameCanvas>
        <div class="github">
          <a
            href="https://github.com/DakerHub/coding-game-maze"
            target="__blank"
          >
            Github - DakerHub
          </a>
        </div>
      </>
    );
  },
});
</script>

<style scoped>
.github {
  position: fixed;
  right: 10px;
  top: 10px;
  background-color: #333;
  border-radius: 4px;
  padding: 6px 10px;
}
.github a {
  color: #ccc;
  text-decoration: none;
  transition: all 0.2s;
}
.github a:hover {
  color: #2196f3;
}
</style>
