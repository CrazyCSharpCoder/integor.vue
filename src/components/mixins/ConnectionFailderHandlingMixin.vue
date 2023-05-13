<script>
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
    methods: {
      showError() {
        this.hasConnectionFailedError = true
      },
      hideError() {
        this.hasConnectionFailedError = false
      }
    },
    created() {
      this.$emitter.on(connectionFailedEvent, this.showError)
      this.$emitter.on(connectionRestoredEvent, this.hideError)
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