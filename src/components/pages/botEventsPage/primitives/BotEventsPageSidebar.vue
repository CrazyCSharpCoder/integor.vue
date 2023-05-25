<template>
  <aside class="sidebar">
    <section class="bot-info">
      <bot-info :bot="bot" :total-events="totalEvents"/>
      <div class="bot-info-controls">
        <button class="update-bot">Изменить</button>
      </div>
    </section>
    <div class="separator"></div>
    <section class="bot-webhook-info">
      <div class="webhook-info-item title">Webhook</div>
<!--      TODO paste the real URL-->
      <div class="webhook-info-item webhook-url">https://72a3-193-218-138-71.eu.ngrok.io/bot</div>
      <div class="webhook-info-item additional-webhook-infos">
        <div class="additional-webhook-info max-connections">
          <div class="value">
<!--            TODO paste real value-->
            30
          </div>
          <div class="label">Макс. соединений</div>
        </div>
        <div class="additional-webhook-info set-date">
          <div class="value">
            <!--            TODO paste real value-->
            24.05.2022
          </div>
          <div class="label">Активен с</div>
        </div>
      </div>
    </section>
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