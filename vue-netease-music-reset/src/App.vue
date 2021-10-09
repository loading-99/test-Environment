<template>
  <div id="app">
    <home />
  </div>
</template>
<script>
import home from "./views/Home.vue";

export default {
  components: {
    home,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body,
html {
  height: 100%;
}
#app {
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
