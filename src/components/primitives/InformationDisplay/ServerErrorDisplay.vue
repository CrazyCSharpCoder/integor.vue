<template>
  <information-display v-if="errorDisplayInfo"
      :title="errorDisplayInfo.title"
      :description="errorDisplayInfo.description"
      :image-ref="require('@/assets/icons/errors/error-default-image.svg')"
  />
</template>

<script>
import InformationDisplay from "@/components/primitives/InformationDisplay/InformationDisplay";

export default {
  components: {InformationDisplay},
  props: {
    serverError: {
      required: true
    }
  },
  computed: {
    body() {
      console.log('body', this.serverError.responseBody)
      return this.serverError.responseBody
    },
    statusCode() {
      console.log('statusCode', this.serverError.statusCode)
      return this.serverError.statusCode
    },
    errors() {
      console.log('errors', this.body.errors)
      return this.body.errors
    },

    errorDisplayInfo() {
      const info = {
        title: undefined,
        description: undefined
      }

      if (this.statusCode == 500) {
        info.title = 'Произошла ошибка на сервере'
        info.description = 'Приносим свои извинения. Попробуйте воспользоваться сервисом позже'
      }
      else {
        const firstError = this.errors[0]

        info.title = firstError.message
        info.description =
            'Убедитесь в том, что Вы указали корректные данные, ' +
            'или обратитесь в службу поддержки'
      }

      return info
    }
  }
}
</script>

<style scoped>

</style>