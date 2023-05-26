<template>
  <aside class="sidebar">
    <section class="bot-info">
      <bot-info :bot="bot" :total-events="totalEvents"/>
      <div class="bot-info-controls">
        <button @click="onUpdate" class="update-bot">Изменить</button>
      </div>
    </section>
    <template v-if="webhookInfo">
      <div class="separator"></div>
      <section class="bot-webhook-info">
        <div class="webhook-info-item title">Webhook</div>
        <template v-if="webhookInfo.is_set">
          <div class="webhook-info-item webhook-url">{{webhookMeta.url}}</div>
          <div class="webhook-info-item additional-webhook-infos">
            <div class="additional-webhook-info max-connections">
              <div class="value">
                {{telegramWebhook.max_connections}}
              </div>
              <div class="label">Макс. соединений</div>
            </div>
            <div class="additional-webhook-info set-date">
              <div class="value">
                {{webhookMeta.created_date}}
              </div>
              <div class="label">Активен с</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="webhook-info-item">
            Webhook для данного бота не установлен
          </div>
        </template>
      </section>
    </template>
  </aside>
</template>

<script>
import BotInfo from "@/components/primitives/special/BotInfo";

export default {
  components: {BotInfo},
  props: {
    bot: {
      required: true,
      type: Object
    },
    totalEvents: {
      required: true,
      type: Number
    },
    webhookInfo: Object
  },
  computed: {
    webhookMeta() {
      return this.webhookInfo.meta
    },
    telegramWebhook() {
      return this.webhookInfo.telegram_webhook
    }
  },
  methods: {
    onUpdate() {
      this.$emitter.emit(this.$appEvents.bots.openUpdateBotModalWindow, this.bot)
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/text";
@import "/src/assets/scss/contentAdjustment";
@import "/src/assets/scss/primitives";

@import "/src/assets/scss/patterns/text";

@import "/src/assets/scss/controls/buttons";

$webhook-info-items-padding: $padding-step-large;

.bot-info-controls {
  padding-top: $page-section-vertical-gap;
  margin: 0 (-$border-radius);

  .update-bot {
    @extend %primary-button;

    width: 100%;
  }
}

.bot-webhook-info {
  margin: -$webhook-info-items-padding 0;

  .title {
    @extend %h3;
  }

  .webhook-info-item {
    padding: $webhook-info-items-padding 0;
  }

  .additional-webhook-infos {
    display: flex;
    justify-content: space-around;
  }
}

.additional-webhook-info {
  text-align: center;

  .value {
    font-weight: $bold;
  }
  .label {
    font-size: 12px;
  }
}

.separator {
  @include separator-horizontal();
}

</style>