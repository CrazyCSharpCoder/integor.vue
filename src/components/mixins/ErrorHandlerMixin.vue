<script>
import {ConnectionFailedError, ServerError} from "@/errorHandling/serverErrors";

export default {
  data() {
    return {
      theError: undefined
    }
  },
  computed: {
    hasError() {
      return Boolean(this.theError)
    }
  },
  methods: {
    errorsCount(vuelidateProp) {
      return vuelidateProp.$errors.length
    },
    outputFirst(vuelidateProp) {
      return vuelidateProp.$errors[0].$message
    },
    setTheError(errText) {
      this.theError = errText
    },
    resetTheError() {
      this.theError = undefined
    },
    handleBackendError(json) {
      try {
        if (typeof json === 'string')
          json = JSON.parse(json)
      }
      catch {
        this.setTheError(json)
        return
      }

      if (typeof json.message === 'string') {
        this.setTheError(json.message)
        return
      }

      let message = json.message[0]

      let propName = message.property
      let constraintMsg = Object.values(message.constraints)[0]

      this.setTheError(`${propName}: ${constraintMsg}`)
    },
    createErrorMessage(error) {
      if (error instanceof ConnectionFailedError) {
        return 'Не удалось установить соединение с сервером'
      }

      if (error instanceof ServerError) {
        const firstError = error.responseBody.errors[0]
        let errorMessage = firstError.message ?? firstError.messages[0]

        if (firstError.key)
          errorMessage = firstError.key + ': ' + errorMessage

        return errorMessage
      }

      return 'Произошла ошибка'
    }
  }
}
</script>
