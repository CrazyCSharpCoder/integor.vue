<template>
  <headered-modal-window :active="isActive" :on-close-clicked="$appEvents.bots.closeAddBotModalWindow">
    <template #header>Добавить Telegram бота</template>
    <template #default>
      <div v-if="isActive" class="add-bot-form-container">
        <input-bot-form
            :submit-event="$appEvents.bots.submitAddBot"
            :form-error="theError"/>
      </div>
    </template>
  </headered-modal-window>
</template>

<script>
import HeaderedModalWindow from "@/components/primitives/modalWindow/HeaderedModalWindow";
import ModalWindowMixin from "@/components/primitives/modalWindow/ModalWindowMixin";
import InputBotForm from "@/components/pages/myBotsPage/InputBotForm";
import ErrorHandlerMixin from "@/components/mixins/ErrorHandlerMixin";

export default {
  components: {InputBotForm, HeaderedModalWindow},
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
        this.setTheError(
            this.createErrorMessage(error)
        )
        return
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
    this.$emitter.off(this.$appEvents.bots.openAddBotModalWindow)
    this.$emitter.off(this.$appEvents.bots.closeAddBotModalWindow)
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/contentAdjustment";

.add-bot-form-container {
  padding: $modal-window-vertical-gap $modal-window-horizontal-gap;
  width: 360px;
}

</style>