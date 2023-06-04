<template>
  <headered-modal-window v-if="context"
                         :active="isActive"
                         :on-close-clicked="$appEvents.bots.closeUpdateBotModalWindow"
                         width="300px"
  >
    <template #header>
      <div class="update-bot-header-container">Обновить бота "{{context.title}}"</div>
    </template>
    <template #default>
      <div v-if="isActive" class="update-bot-form-container">
        <input-bot-form
            :submit-event="$appEvents.bots.submitUpdateBot"
            :form-error="theError"
            :input-data="context"
        />
      </div>
    </template>
  </headered-modal-window>
</template>

<script>
import ModalWindowMixin from "@/components/primitives/modalWindow/ModalWindowMixin";
import ErrorHandlerMixin from "@/components/mixins/ErrorHandlerMixin";

import HeaderedModalWindow from "@/components/primitives/modalWindow/HeaderedModalWindow";
import InputBotForm from "@/components/pages/myBotsPage/primitives/InputBotForm";

export default {
  components: {InputBotForm, HeaderedModalWindow},
  mixins: [
    ModalWindowMixin,
    ErrorHandlerMixin
  ],
  methods: {
    async updateBot(bot) {
      try {
        await this.$store.dispatch('botEvents/updateBot', bot)
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
        this.$appEvents.bots.submitUpdateBot,
        this.updateBot
    )

    this.onOpened(this.$appEvents.bots.openUpdateBotModalWindow)
    this.onClosed(this.$appEvents.bots.closeUpdateBotModalWindow, this.dispose)
  },
  unmounted() {
    this.$emitter.off(this.$appEvents.bots.submitUpdateBot)
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/contentAdjustment";

.update-bot-form-container {
  padding: $modal-window-vertical-gap $modal-window-horizontal-gap;
}

</style>