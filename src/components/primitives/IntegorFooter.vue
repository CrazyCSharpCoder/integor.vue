<template>
  <footer class="footer">
    <slot></slot>
  </footer>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

@import '/src/assets/scss/palette';

.footer {
  background: $color-1-shade-1;
  color: $color-1-text;
}

</style>