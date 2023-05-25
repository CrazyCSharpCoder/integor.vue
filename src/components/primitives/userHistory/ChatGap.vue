<template>
  <div :class="['chat-gap', {current: Boolean(options?.current)}]">
    <router-link :to="route" class="title">
      {{chat.firstName}}
      <template v-if="item.chat.lastName"></template>
    </router-link>
    <div class="chat-gap-content">
      <ul class="actions">
        <li class="action">
          <router-link :to="route">Перейти</router-link>
        </li>
        <li v-if="options?.removeChatEvent" class="action">
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
    chat() {
      return this.item.chat
    },
    bot() {
      return this.item.bot
    },
    route() {
      return {
        name: this.$routeNames.botEvents,
        params: {
          botId: this.bot.id,
          page: 1
        },
        query: {
          chatId: this.chat.id
        }
      }
    }
  },
  methods: {
    onClose() {
      this.$emitter.emit(this.options.removeChatEvent, this.chat)
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/projectSpecific/navigationGaps";

.chat-gap {
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

.chat-gap-content {
  @extend %content;
}

.title {
  @extend %nav-gap-title;
}

</style>