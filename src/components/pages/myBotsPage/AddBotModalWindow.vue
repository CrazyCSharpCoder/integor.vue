<template>
  <headered-modal-window :active="isActive" :on-close-clicked="$appEvents.bots.closeAddBotModalWindow">
    <template #header>Добавить Telegram бота</template>
    <template #default>
      <div v-if="isActive" class="add-bot-form-container">
        <add-bot-form
            :submit-event="$appEvents.bots.submitAddBot"
            :form-error="theError"/>
      </div>
    </template>
  </headered-modal-window>
</template>

<script>
import {ConnectionFailedError} from "@/errorHandling/serverErrors";

import HeaderedModalWindow from "@/components/primitives/modalWindow/HeaderedModalWindow";
import ModalWindowMixin from "@/components/primitives/modalWindow/common/ModalWindowMixin";
import AddBotForm from "@/components/pages/myBotsPage/AddBotForm";
import ErrorHandlerMixin from "@/components/mixins/ErrorHandlerMixin";

export default {
  components: {AddBotForm, HeaderedModalWindow},
  mixins: [
      ModalWindowMixin,
      ErrorHandlerMixin
  ],
  methods: {
    async addBot(bot) {
      try {
        await this.$store.dispatch('addBot', bot)
      }
      catch (error) {
        if (error instanceof ConnectionFailedError) {
          this.setTheError('Не удалось установить соединение с сервером')
          return
        }

        throw error
      }
      this.close()
    },
    dispose() {
      this.resetTheError()
    }
  },
  created() {
    this.$emitter.on(
        this.$appEvents.bots.submitAddBot,
        this.addBot
    )

    this.onOpened(this.$appEvents.bots.openAddBotModalWindow)
    this.onClosed(this.$appEvents.bots.closeAddBotModalWindow, this.dispose)
  },
  unmounted() {
    this.$emitter.off(this.$appEvents.bots.submitAddBot)
  }
}
</script>

<style scoped>

.add-bot-form-container {
  width: 360px;
}

</style>