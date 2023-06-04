<template>
  <div :class="['bot-gap', {current: Boolean(options?.current)}]">
    <router-link :to="route" class="title">
      {{item.title}}
    </router-link>
    <div class="bot-gap-content">
      <ul class="actions">
        <li class="action">
          <router-link :to="route">Перейти</router-link>
        </li>
        <li v-if="options?.removeBotEvent" class="action">
          <button @click="onClose">Закрыть</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object
    },
    options: Object
  },
  computed: {
    route() {
      return {
        name: this.$routeNames.botEvents,
        params: {
          botId: this.item.id,
          page: 1
        }
      }
    }
  },
  methods: {
    onClose() {
      this.$emitter.emit(this.options.removeBotEvent, this.item)
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/projectSpecific/navigationGaps";

.bot-gap {
  @extend %dropdown;
  @extend %nav-gap;

  &.current {
    @extend %current-nav-gap;
  }
}

.actions {
  @extend %nav-gap-actions;

  .action {
    & > button, & > a {
      @extend %nav-gap-action;
    }
  }
}

.bot-gap-content {
  @extend %content;
}

.title {
  @extend %nav-gap-title;
}

</style>