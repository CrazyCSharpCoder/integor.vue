<template>
  <ul>
    <li v-for="item in items" :key="$generateKey(item)">
      <component :is="itemComponent" :item="item"/>
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
    }
  }
}
</script>

<style scoped>

</style>