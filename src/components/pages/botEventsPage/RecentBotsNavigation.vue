<template>
  <div v-if="bots && bots.length" class="bots-navigation-container">
    <ul class="bot-navigation-items">
      <li v-for="bot in bots" :key="bot.id"
          :class="['bot-navigation-item', {
            current: $route.name == $routeNames.botEvents && $route.params?.botId == bot.id}
            ]">
        <router-link class="bot-link" :to="{
          name: $routeNames.botEvents,
          params: {
            botId: bot.id,
            page: 1
          }
        }">{{bot.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      bots: 'history/bots'
    })
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";
@import "/src/assets/scss/animations";

@import "/src/assets/scss/controls/panels";
@import "/src/assets/scss/controls/buttons";

@import "/src/assets/scss/projectSpecific/header";

$items-gap: $padding-step-large * 2;
$separator-size: 18px;

.bots-navigation-container {
  margin-right: -$items-gap / 2;
}

.bot-navigation-items {
  @include panel($items-gap);

  .bot-navigation-item {
    position: relative;

    transition: $transition;
    text-decoration: underline transparent;
    text-underline-offset: $nav-items-ubderline-offset;

    &.current, &:hover, &:focus {
      text-decoration-color: inherit;
    }

    &::before {
      position: absolute;
      left: -$items-gap / 2 - 1px;
      top: ($header-height - $separator-size) / 2;

      height: $separator-size;
      border-right: 1px solid rgba($color-contrast, 0.5);

      content: '';
    }

    &:first-child::before {
      content: none;
    }
  }
}

.bot-link {
  @extend %link-reset;
  line-height: $header-height;
}

</style>