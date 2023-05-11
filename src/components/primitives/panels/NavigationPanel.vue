<template>
  <nav class="nav-panel">
    <items-panel :items="items" :item-component="itemComponent"/>
  </nav>
</template>

<script>
import ItemsPanel from "@/components/primitives/panels/ItemsPanel";
export default {
  components: {ItemsPanel},
  props: {
    itemComponent: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/controls/panels";

.nav-panel {
  .nav-items {
    @extend %list-reset;

    .nav-item {

    }
  }
}

</style>