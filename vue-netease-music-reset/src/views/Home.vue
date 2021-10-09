<template>
  <div class="home">
    <alyout />
    <play />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import alyout from "../components/alyout/index.vue";
import play from "./play";

export default {
  name: "Home",
  components: {
    alyout,
    play,
  },
};
</script>
<style>
.home {
  height: 100%;
}
</style>
