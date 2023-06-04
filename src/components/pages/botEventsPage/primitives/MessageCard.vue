<template>
  <section :id="htmlId" :class="['message-card', {'current-bot-message': options?.isCurrentBot}]">
    <section :class="['message-card-section', 'message-info-section', {'with-reply': Boolean(replyToMessage)}]">
      <message-info :message="item">
        <template v-if="options?.hasOpenChatButton" #controls>
          <router-link class="go-to-chat" :to="{
            name: $routeNames.botEvents,
            params: {page: 1},
            query: {chatId: chat.id}
          }">
            Перейти к чату
          </router-link>
        </template>
      </message-info>
    </section>
    <section v-if="replyToMessage" class="message-card-section reply-to-message-section">
      <message-info :message="replyToMessage">
        <template #header>
          <div class="message-section-title">В ответ на сообщение</div>
        </template>
        <template v-if="options?.goToRepliedMessageEvent" #controls>
          <button @click="goToMessage" class="go-to-message">Перейти к сообщению</button>
        </template>
      </message-info>
    </section>
  </section>
</template>

<script>
import MessageInfo from "@/components/pages/botEventsPage/primitives/MessageInfo";

export default {
  components: {MessageInfo},
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
    from() {
      return this.item.from
    },
    replyToMessage() {
      return this.item.replyToMessage
    },
    htmlId() {
      return this.$special.botEventsHelpers
          .createMessageHtmlId(
              this.chat.id,
              this.item.messageId
          )
    }
  },
  methods: {
    goToMessage() {
      this.$emitter.emit(this.options.goToRepliedMessageEvent, this.replyToMessage)
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/text";
@import "/src/assets/scss/contentAdjustment";
@import "/src/assets/scss/adaptiveness";
@import "/src/assets/scss/primitives";

@import "/src/assets/scss/patterns/contentAdjustment";

@import "/src/assets/scss/controls/panels";
@import "/src/assets/scss/controls/buttons";

$grouped-items-padding: $padding-step;
$highlight-duration: 2s;

$current-bot-message-border: 2px solid $color-2-shade-1;

@keyframes pulse-background-message {
  0% {
    background: $color-2-shade-1;
  }
  100% {
    background: $color-1-shade-3;
  }
}

@keyframes pulse-background-message-reply {
  0% {
    background: $color-2-shade-1;
  }
  100% {
    background: $color-1-shade-2;
  }
}

.message-card-section {
  border-radius: $border-radius-large;
  padding: $page-section-vertical-gap $page-section-horizontal-gap;
}

.message-section-title {
  font-size: $h3-font-size;
  font-weight: $bold;
}

.message-info-section {
  background: $color-1-shade-3;
  color: $color-1-text;

  &.with-reply {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.reply-to-message-section {
  background: $color-1-shade-2;
  color: $color-1-text;

  border-top-left-radius: 0;
  border-top-right-radius: 0;

  border-top: 1px solid rgba($color-contrast, 0.5);
}

.message-card.current-bot-message {
  .message-info-section {
    border: $current-bot-message-border;

    &.with-reply {
      border-bottom: none;
    }
  }

  .reply-to-message-section {
    border-left: $current-bot-message-border;
    border-right: $current-bot-message-border;
    border-bottom: $current-bot-message-border;
  }
}

.highlight {
  .message-info-section {
    animation: pulse-background-message $highlight-duration;
  }
  .reply-to-message-section {
    animation: pulse-background-message-reply $highlight-duration;
  }
}

.go-to-chat {
  @extend %primary-button;
}

.go-to-message {
  @extend %secondary-button;
  width: 100%;
}

</style>