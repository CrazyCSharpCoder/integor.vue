<template>
  <div class="bot-info">
    <div class="bot-info-item bot-info-header">
      <div class="bot-title">{{bot.title}}</div>
      <div class="bot-event-count">
        {{totalEvents}} событий
      </div>
    </div>
    <div class="bot-info-item bot-token">
      <hidden-data-display :data="bot.token" placeholder="Токен бота"/>
    </div>
    <div :class="['bot-info-item', 'bot-description', {blank: !bot.description}]">
      <template v-if="bot.description">{{bot.description}}</template>
      <template v-else>Бот не имеет описания</template>
    </div>
  </div>
</template>

<script>
import HiddenDataDisplay from "@/components/primitives/controls/HiddenDataDisplay";

export default {
  components: {HiddenDataDisplay},
  props: {
    bot: {
      required: true,
      type: Object
    },
    totalEvents: {
      required: true,
      type: Number
    },
    titleFontSizePx: Number
  }
}
</script>

<style scoped lang="scss">

@import "src/assets/scss/text";
@import "src/assets/scss/palette";
@import "src/assets/scss/contentAdjustment";
@import "src/assets/scss/patterns/contentAdjustment";
@import "src/assets/scss/controls/buttons";
@import "src/assets/scss/controls/panels";

$info-items-padding: $padding-step-large;

.bot-info {
  margin: -$info-items-padding 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.bot-info-header {
  @include breadcrumbs();

  white-space: nowrap;

  .bot-title {
    font-weight: $bold;
    font-size: $h3-font-size;
  }

  .bot-event-count {
    margin-bottom: 1px;
  }

  .bot-title, .bot-event-count {
    @extend %breadcrumbs-item;
  }
}

.bot-info-item {
  padding: $info-items-padding 0;
}

.bot-token{
  @extend %controls-container;
}


.bot-description {
  flex-grow: 1;

  &.blank {
    font-style: italic;
  }
}

</style>