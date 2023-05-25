<template>
  <router-link :to="item.route"
               :class="['header-nav-item', {current: isCurrentRoute}]"
  >
    {{item.title}}
  </router-link>
</template>

<script>
export default {
  props: {
    item: Object
  },
  computed: {
    isCurrentRoute() {
      return this.$route.name == this.item.route.name
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/animations";
@import "/src/assets/scss/controls/buttons";
@import "/src/assets/scss/projectSpecific/header";

.header-nav-item {
  @extend %link-reset;

  padding: 0 $nav-item-horizontal-padding;

  display: block;
  line-height: $header-height;

  text-decoration: underline transparent;
  text-underline-offset: $nav-items-ubderline-offset;

  transition: $transition;

  white-space: nowrap;

  &:hover, &.current {
    text-decoration-color: inherit;
  }
}

</style>