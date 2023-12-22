<template>
  <headered-modal-window :active="isActive" :on-close-clicked="$appEvents.bots.closeAddBotModalWindow">
    <template #header>Добавить Telegram бота</template>
    <template #default>
      <div v-if="isActive" class="add-bot-form-container">
        <input-bot-form
            :submit-event="$appEvents.bots.submitAddBot"/>
      </div>
    </template>
    <template v-if="theError" #footer>
      <div class="modal-window-error">{{theError}}</div>
    </template>
  </headered-modal-window>
</template>

<script>
import HeaderedModalWindow from "@/components/primitives/modalWindow/HeaderedModalWindow";
import ModalWindowMixin from "@/components/primitives/modalWindow/ModalWindowMixin";
import InputBotForm from "@/components/pages/myBotsPage/primitives/InputBotForm";
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

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/patterns/contentAdjustment";

$width: 360px;

.add-bot-form-container {
  width: $width;
  padding: $page-section-vertical-gap $page-section-horizontal-gap-small;
}

.modal-window-error {
  background: $error-color-shade-1;
  color: $error-color-text;

  padding: $padding-step $page-section-horizontal-gap;
  width: $width;
}

</style>