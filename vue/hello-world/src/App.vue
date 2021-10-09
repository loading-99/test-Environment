<template>
  <div id="app">
    <music-player />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import MusicPlayer from "./components/MusicPlayer.vue";

export default {
  name: "App",
  components: {
    MusicPlayer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: green;
  overflow: hidden;
}

body {
  margin: 0 auto;
}
</style>
