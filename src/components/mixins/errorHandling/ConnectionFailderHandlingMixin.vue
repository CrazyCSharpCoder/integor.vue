<script>

function showError() {
  this.hasConnectionFailedError = true
}

function hideError() {
  this.hasConnectionFailedError = false
}

export default function (
    connectionFailedEvent,
    connectionRestoredEvent
) {
  return {
    data() {
      return {
        hasConnectionFailedError: false
      }
    },
    created() {
      this.$emitter.on(connectionFailedEvent, showError.bind(this))
      this.$emitter.on(connectionRestoredEvent, hideError.bind(this))
    },
    unmounted() {
      this.$emitter.off(connectionFailedEvent)
      this.$emitter.off(connectionRestoredEvent)
    }
  }
}
</script>

<style scoped>

</style>