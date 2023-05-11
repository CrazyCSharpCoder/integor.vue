<template>
  <ul class="panel">
    <li v-for="item in items" :key="item" class="panel-item">
      <component :is="itemComponent" :item="item"/>
    </li>
  </ul>
</template>

<script>
export default {
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

.panel {
  @include panel();
}

</style>