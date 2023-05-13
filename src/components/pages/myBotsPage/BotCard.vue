<template>
  <section class="bot-card">
    <div class="bot-card-header">
      <div class="bot-title">{{item.bot.title}}</div>
<!--      TODO correct notation-->
      <div class="bot-event-count"><b>{{item.total_events}}</b> событий</div>
    </div>
    <div class="bot-token">
      <hidden-data-display :data="item.bot.token" placeholder="Токен бота"/>
    </div>
    <ul class="bot-card-controls">
      <li class="bot-card-controls-item">
        <router-link :to="{
          name: $routeNames.botInfo,
          params: {
            botId: item.bot.id,
            page: 1
          }
        }" class="open-bot">Перейти</router-link>
      </li>
      <li class="bot-card-controls-item">
<!--        TODO add handler-->
        <button class="delete-bot">В ахрив</button>
      </li>
    </ul>
  </section>
</template>

<script>
import HiddenDataDisplay from "@/components/primitives/controls/HiddenDataDisplay";

export default {
  name: "BotListItem",
  components: {HiddenDataDisplay},
  props: {
    item: {
      type: Object,
      required: true
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

  .open-bot {
    @include button;
  }

  .delete-bot {
    @include button($color-1, $color-1-text, $color-2, $color-2-text);
  }
}

</style>