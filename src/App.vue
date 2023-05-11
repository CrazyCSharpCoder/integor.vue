<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style lang="scss">
@import '/src/assets/scss/palette';
@import '/src/assets/scss/patterns/contentAdjustment';

* {
  padding: 0;
  margin: 0;

  box-sizing: border-box;
}

html {
  height: 100%;

  display: flex;
  flex-direction: column;
}

body {
  @extend %full-page-content;

  margin: 0;
  padding: 0;
}

#app {
  @extend %full-page-content;

  background: $color-3;
  color: $color-3-text;
  font-family: sans-serif;
}
</style>
