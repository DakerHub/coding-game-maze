<script lang="tsx">
import { defineComponent } from "vue";
import GameCanvas from "@/components/GameCanvas/index.vue";

export default defineComponent({
  name: "HomeView",
  setup(props) {
    return () => <GameCanvas></GameCanvas>;
  },
});
</script>

<style scoped></style>
