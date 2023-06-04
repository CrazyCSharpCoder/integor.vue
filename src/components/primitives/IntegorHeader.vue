<template>
  <header class="header">
    <slot></slot>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

@import '/src/assets/scss/palette';

.header {
  background: $color-1-shade-1;
  color: $color-1-text;
}

</style>