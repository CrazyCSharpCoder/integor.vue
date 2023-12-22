<template>
  <div class="page-dots"></div>
</template>

<style scoped lang="scss">

.page-dots {
  text-align: center;

  &::before {
    content: '...';
    font-weight: bold;
  }
}

</style>