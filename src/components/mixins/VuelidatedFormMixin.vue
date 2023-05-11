<script>
import useVuelidate from "@vuelidate/core";

export default {
  data() {
    return {
      input: {},
      v$: useVuelidate()
    }
  },
  props: {
    submitEvent: {
      type: String,
      required: true
    },
    inputData: Object,
    trim: [Object, Boolean]
  },
  methods: {
    async submitData() {
      if (this.trim)
        this.$formsHelp.trimStrings(
            this.input,
            typeof this.trim === 'object' ? this.trim : undefined
        )

      await this.v$.$validate()

      if (!this.v$.$error)
        this.$emitter.emit(this.submitEvent, this.input)
    }
  },
  created() {
    if (this.inputData)
      Object.assign(this.input, this.inputData)
  }
}
</script>

<style scoped>

</style>