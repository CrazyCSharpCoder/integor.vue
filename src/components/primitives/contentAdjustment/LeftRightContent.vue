<template>
  <div class="left-right-content">
    <div class="content-group">
      <slot name="first"></slot>
    </div>
    <div class="content-group">
      <slot name="second"></slot>
    </div>
  </div>
</template>

<style scoped>

.left-right-content {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

</style>