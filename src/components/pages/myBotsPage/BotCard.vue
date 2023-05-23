<template>
  <section class="bot-card">
    <div class="bot-card-header">
      <div class="bot-title">{{bot.title}}</div>
<!--      TODO correct notation-->
      <div class="bot-event-count"><b>{{item.totalEvents}}</b> событий</div>
    </div>
    <div class="bot-token">
      <hidden-data-display :data="bot.token" placeholder="Токен бота"/>
    </div>
    <ul class="bot-card-controls">
      <li class="bot-card-controls-item">
        <router-link :to="{
          name: $routeNames.botEvents,
          params: {
            botId: bot.id,
            page: 1
          }
        }" class="open-bot">Перейти</router-link>
      </li>

      <template v-if="!bot.isArchived">
        <li v-if="options?.updateBotEvent" class="bot-card-controls-item">
          <button @click="onUpdate" class="update-bot">Обновить</button>
        </li>
        <li v-if="options?.archiveBotEvent" class="bot-card-controls-item">
          <button @click="onArchive" class="archive-bot">В ахрив</button>
        </li>
      </template>
      <template v-else>
        <li v-if="options?.unarchiveBotEvent" class="bot-card-controls-item">
<!--          TODO add handler-->
          <button @click="onUnarchive" class="unarchive-bot">Разархивировать</button>
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

@import "/src/assets/scss/text";
@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/controls/buttons";
@import "/src/assets/scss/controls/panels";

$separation-border: 1px solid $color-4;

.bot-card {
  border: 1px solid $color-4;
  padding: 0 $padding-step;

  .bot-card-header {
    @extend %breadcrumbs;

    .bot-title {
      @extend %breadcrumbs-item;
      font-size: $h2-font-size;
    }
    .bot-event-count {
      padding-bottom: $padding-step + 2px;
      @extend %breadcrumbs-item;
    }
  }

  .bot-title, .bot-token, .bot-card-controls {
    padding: $padding-step 0;
  }

  .bot-card-header, .bot-token {
    border-bottom: $separation-border;

    > a {
      @extend %link-reset;
    }
  }

  .bot-card-controls {
    @include panel();
  }

  .open-bot, .update-bot, .unarchive-bot {
    @include button;
  }

  .archive-bot {
    @include button($color-1, $color-1-text, $color-5, $color-5-text);
  }
}

</style>