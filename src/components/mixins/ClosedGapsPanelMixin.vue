<script>
export default {
  props: {
    items: {
      required: true,
      type: Array
    },
    closeGapEvent: {
      required: true,
      type: String
    },
  },
  methods: {
    notifyClosed(gap) {
      const gapId = 'id' in gap ? gap.id : gap
      this.$emitter.emit(this.closeGapEvent, gapId)
    }
  }
}
</script>