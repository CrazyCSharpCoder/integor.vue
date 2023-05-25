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
@import '/src/assets/scss/text';

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

  background: $background-color;
  color: $background-text-color;

  font-family: "Roboto", sans-serif;

  font-size: 14px;
}
</style>
