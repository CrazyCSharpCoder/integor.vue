<template>
  <ul :class="['items-list', {horizontal}]">
    <li v-for="item in items" :key="$generateKey(item)" class="items-list-item">
      <component
          :is="itemComponent"
          :item="item"
          :options="Boolean(optionsFactory) ? optionsFactory(item) : undefined"/>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      required: true,
      type: Array
    },
    itemComponent: {
      required: true,
      type: Object
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    optionsFactory: Function
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/controls/panels";

.items-list {
  @extend %list-reset;

  &.horizontal {
    display: flex;
  }
}

</style>