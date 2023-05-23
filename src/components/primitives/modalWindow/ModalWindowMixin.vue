<script>
function onWindowOpened(context) {
  this.context = context === undefined ? null : context
  this.isActive = true

  const onOpened = this.callbacks.onOpened
  if (!onOpened)
    return

  onOpened.call(this, context)
}

function onWindowClosed() {
  const oldContext = this.context

  this.context = undefined
  this.isActive = false

  const onClosed = this.callbacks.onClosed
  if (!onClosed)
    return

  onClosed.call(this, oldContext)
}

export default {
  data() {
    return {
      context: undefined,
      isActive: false,
      onOpenedEvent: undefined,
      onClosedEvent: undefined,
      callbacks: {
        onOpened: undefined,
        onClosed: undefined
      }
    }
  },
  methods: {
    onOpened(onOpenedEvent, callback) {
      if (this.onOpenedEvent)
        this.$emitter.off(this.onOpenedEvent)

      this.onOpenedEvent = onOpenedEvent
      this.callbacks.onOpened = callback

      this.$emitter.on(onOpenedEvent, onWindowOpened.bind(this))
    },
    onClosed(onClosedEvent, callback) {
      if (this.onClosedEvent)
        this.$emitter.off(this.onClosedEvent)

      this.onClosedEvent = onClosedEvent
      this.callbacks.onClosed = callback

      this.$emitter.on(onClosedEvent, onWindowClosed.bind(this))
    },
    close() {
      this.$emitter.emit(this.onClosedEvent, {
        context: this.context
      })
    }
  },
  unmounted() {
    if (this.onOpenedEvent)
      this.$emitter.off(this.onOpenedEvent)
    if (this.onClosedEvent)
      this.$emitter.off(this.onClosedEvent)
  }
}

</script>

<style scoped>

</style>