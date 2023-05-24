<template>
  <div class="header-extra">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";

.header-extra {
  background: $color-2-shade-1;
  color: $color-2-text;

  width: 100%;
  position: sticky;
  top: 0;
}

</style>