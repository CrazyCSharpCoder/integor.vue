<template>
  <ul class="cards-list">
    <li class="cards-list-item" v-for="item in items" :key="$generateKey(item)">
      <component :is="cardComponent" :item="item"/>
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
    }
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
    
    @media (max-width: $large-threshold) {
      flex-basis: 50%
    }

    @media (max-width: $medium-threshold) {
      flex-basis: 100%
    }

    flex-basis: 33%
  }
}

</style>