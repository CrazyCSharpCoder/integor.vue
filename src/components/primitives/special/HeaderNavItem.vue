<template>
  <router-link :to="item.route" class="header-nav-item">{{item.title}}</router-link>
</template>

<script>
export default {
  props: {
    item: Object
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/contentAdjustment";
@import "/src/assets/scss/controls/buttons";

.header-nav-item {
  @extend %link-reset;

  display: block;
  line-height: $header-height;
}

</style>