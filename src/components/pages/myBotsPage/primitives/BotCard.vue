<template>
  <section class="bot-card">
    <div class="bot-card-item bot-card-header">
      <div class="bot-title">{{bot.title}}</div>
      <div class="bot-event-count">{{item.totalEvents}} событий</div>
    </div>
    <div class="bot-card-item bot-token">
      <hidden-data-display :data="bot.token" placeholder="Токен бота"/>
    </div>
    <ul class="bot-card-item bot-card-controls">
      <li class="bot-card-controls-item">
        <router-link :to="{
          name: $routeNames.botEvents,
          params: {
            botId: bot.id,
            page: 1
          }
        }" class="bot-card-button open-bot">Перейти</router-link>
      </li>

      <template v-if="!bot.isArchived">
        <li v-if="options?.archiveBotEvent" class="bot-card-controls-item">
          <button @click="onArchive" class="bot-card-button archive-bot">Архивировать</button>
        </li>
      </template>
      <template v-else>
        <li v-if="options?.unarchiveBotEvent" class="bot-card-controls-item">
<!--          TODO add handler-->
          <button @click="onUnarchive" class="bot-card-button unarchive-bot">Разархивировать</button>
        </li>
      </template>
    </ul>
  </section>
</template>

<script>
import HiddenDataDisplay from "@/components/primitives/controls/HiddenDataDisplay";

export default {
  components: {HiddenDataDisplay},
  props: {
    item: {
      type: Object,
      required: true
    },
    options: Object
  },
  computed: {
    bot() {
      return this.item.bot
    }
  },
  methods: {
    onUpdate() {
      this.$emitter.emit(this.options.updateBotEvent, this.item)
    },
    onArchive() {
      this.$emitter.emit(this.options.archiveBotEvent, this.item)
    },
    onUnarchive() {
      this.$emitter.emit(this.options.unarchiveBotEvent, this.item)
    }
  }
}
</script>

<style scoped lang="scss">

@import "../../../../assets/scss/text";
@import "../../../../assets/scss/palette";
@import "../../../../assets/scss/contentAdjustment";

@import "../../../../assets/scss/patterns/contentAdjustment";

@import "../../../../assets/scss/controls/buttons";
@import "../../../../assets/scss/controls/panels";

$controls-gap: $padding-step * 2;

.bot-card {
  border-radius: $border-radius-large;
  padding: $page-section-vertical-gap $page-section-horizontal-gap;

  background: $color-1-shade-3;

  .bot-card-item {
    padding: $padding-step-large 0;
  }

  .bot-token{
    @extend %controls-container;
  }
}

.bot-card-header {
  @extend %breadcrumbs;

  .bot-title {
    font-weight: $bold;
  }

  .bot-title, .bot-event-count {
    @extend %breadcrumbs-item;
  }
}

.bot-card-controls {
  @extend %list-reset;

  display: flex;
  justify-content: stretch;

  margin: 0 (-$controls-gap);

  .bot-card-controls-item {
    padding: 0 $controls-gap;
    flex: 0 0 50%;
  }

  .bot-card-button {
    @include button;
    width: 100%;

    &.archive-bot {
      @extend %secondary-button;
    }
  }
}

</style>