<script>
export default {
  data() {
    return {
      errors: {}
    }
  },
  computed: {
    hasError() {
      if (!this.errors)
        return false

      if (!(this.errors instanceof Object))
        return false

      return Object.entries(this.errors)
          .some(entry => Boolean(entry[1]))
    }
  }
}
</script>

<style scoped>

</style>