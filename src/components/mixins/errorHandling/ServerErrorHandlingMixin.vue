<script>
function showError(serverError) {
  this.serverError = serverError
}

function removeError() {
  this.serverError = undefined
}

export default function (serverErrorEvent, discardEvent) {
  return {
    data() {
      return {
        serverError: undefined
      }
    },
    computed: {
      hasServerError() {
        return Boolean(this.serverError)
      }
    },
    created() {
      this.$emitter.on(serverErrorEvent, showError.bind(this))
      this.$emitter.on(discardEvent, removeError.bind(this))
    },
    unmounted() {
      this.$emitter.off(serverErrorEvent)
      this.$emitter.off(discardEvent)
    }
  }
}
</script>