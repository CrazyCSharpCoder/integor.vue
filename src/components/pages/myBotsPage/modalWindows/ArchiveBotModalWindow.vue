<template>
  <headered-modal-window v-if="context"
                         :active="isActive"
  >
    <template #header>Архивировать бота</template>
    <template #default>
      <div class="modal-window-content">
        <div class="modal-window-message">
          <h2 class="title">Вы действительно хотите заархивировать бота "{{bot.title}}"?</h2>
          <p>
            На время, пока бот будет заархивирован, сбор статистики для
            данного бота осуществляться не будет
          </p>
          <p>
            Бот останется доступен во вкладке
            <router-link :to="{name: $routeNames.archive}" class="archive-link">
              Архив
            </router-link>
          </p>
          <p>
            Вы можете восстановить его в любое время
          </p>
        </div>
        <ul class="modal-window-controls">
          <li class="modal-window-control">
            <!--          TODO add handler-->
            <button @click="archiveBot" class="confirm">Продолжить</button>
          </li>
          <!--        Add handler-->
          <li class="modal-window-control">
            <button @click="close()" class="cancel">Отмена</button>
          </li>
        </ul>
      </div>
    </template>
  </headered-modal-window>
</template>

<script>
import ModalWindowMixin from "@/components/primitives/modalWindow/ModalWindowMixin";
import ErrorHandlerMixin from "@/components/mixins/ErrorHandlerMixin";
import DisposableEventsMixin from "@/components/mixins/DisposableEventsMixin";

import HeaderedModalWindow from "@/components/primitives/modalWindow/HeaderedModalWindow";

export default {
  mixins: [
    ModalWindowMixin,
    ErrorHandlerMixin,
    DisposableEventsMixin
  ],
  components: {HeaderedModalWindow},
  computed: {
    bot() {
      return this.context.bot
    }
  },
  methods: {
    async archiveBot() {
      try {
        await this.$store.dispatch('archive', this.bot.id)
      }
      catch (error) {
        const errorMessage = this.createErrorMessage(error)
        this.setTheError(errorMessage)

        return;
      }

      this.close()
    },
    dispose() {
      this.resetTheError()
    }
  },
  created() {
    this.$emitter.on(
        this.$appEvents.bots.submitArchiveBot,
        this.archiveBot
    )

    this.onOpened(this.$appEvents.bots.openArchiveBotModalWindow)
    this.onClosed(this.$appEvents.bots.closeArchiveBotModalWindow, this.dispose)
  },
  unmounted() {
    this.$emitter.off(this.$appEvents.bots.submitUpdateBot)
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/text";
@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/patterns/text";

@import "/src/assets/scss/controls/panels";
@import "/src/assets/scss/controls/buttons";

.modal-window-content {
  @extend %include-all-text;

  padding: $padding-step-large * 2 $page-section-horizontal-gap-small;
  width: 400px;
}

.modal-window-controls {
  @include panel($padding-step-large * 2);
  flex-direction: column;
  align-items: stretch;

  padding-top: $modal-window-vertical-gap;

  .confirm, .cancel {
    width: 100%;
  }

  .confirm {
    @include button();
  }
  .cancel {
    @extend %secondary-button;
  }
}

.archive-link {
  @extend %inline-link;
}

</style>