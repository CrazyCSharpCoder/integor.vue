<template>
  <ul class="cards-list">
    <li v-for="item in items" :key="$generateKey(item)"
        class="cards-list-item">
      <component
          :is="cardComponent"
          :item="item"
          :options="Boolean(optionsFactory) ? optionsFactory(item) : undefined"/>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    cardComponent: {
      required: true,
      type: Object
    },
    items: {
      required: true,
      type: Array
    },
    optionsFactory: Function
  }
}
</script>

<style scoped lang="scss">

@import '/src/assets/scss/adaptiveness';
@import '/src/assets/scss/contentAdjustment';

@import '/src/assets/scss/controls/panels';
@import '/src/assets/scss/patterns/contentAdjustment';

.cards-list {
  @extend %list-reset;
  @include horizontal-vertical-list($padding-step, $padding-step);

  display: flex;
  flex-wrap: wrap;

  .cards-list-item {
    @extend %list-item;

    flex-grow: 0;
    flex-shrink: 0;
    overflow: hidden;
    
    @media (max-width: $large-threshold) {
      flex-basis: 100%
    }

    flex-basis: 50%
  }
}

</style>