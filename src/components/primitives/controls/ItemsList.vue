<template>
  <ul class="items-list">
    <li v-for="item in items" :key="$generateKey(item)"
        :class="['items-list-item', {separator: Boolean(separatorColor)}]"
        :style="{'border-color': separatorColor ?? 'none'}"
    >
      <component :is="itemComponent" :item="item" :options="options"/>
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
    options: Object,
    separatorColor: String
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/controls/panels";

.items-list-item {
  @extend %list-reset;

  &.separator {
    border-bottom-width: 1px;
    border-bottom-style: solid;

    &:last-child {
      border-bottom: none;
    }
  }
}

</style>