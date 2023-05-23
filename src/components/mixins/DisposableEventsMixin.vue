<script>
export default {
  data() {
    return {
      registeredEvents: new Set()
    }
  },
  methods: {
    registerEvent(key, callback, thisContext) {
      callback = callback.bind(thisContext)
      this.registeredEvents.add(key)

      this.$emitter.on(key, callback)
    }
  },
  unmounted() {
    for (const event of this.registeredEvents) {
      this.$emitter.off(event)
      this.registeredEvents.delete(event)
    }
  }
}
</script>