<template>
  <div class="page-adjusted-content">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/patterns/contentAdjustment";

.page-adjusted-content {
  @extend %page-horizontal-content;
}

</style>