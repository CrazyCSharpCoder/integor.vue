<template>
  <div class="hello-world">
    <h1>Hello World</h1>
    <p>
      The number is {{number}}
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      number: this.$store.getters['number']
    }
  }
}
</script>

<style scoped lang="scss">

@import "src/assets/scss/helloWorld";

.hello-world {
  @extend %hello-world;
}

</style>