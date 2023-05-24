<template>
  <section class="message-card">
    <div class="message-meta">
      <div v-if="!options?.hideChat" class="message-meta-group chat">
        <div class="message-meta-field meta-group-title">Чат</div>
        <div class="message-meta-field chat-primary-info">
          <div class="chat-id">Id: {{chat.id}}</div>
          <div class="chat-type">{{chat.type}}</div>
        </div>
        <div v-if="chat.type != 'private'" class="message-meta-field chat-info">
          <!--          TODO experiment with groups-->
          <div class="chat-title">{{chat.title}}</div>
        </div>
        <div class="message-meta-options">
          <router-link :to="{
            name: $routeNames.botEvents,
            params: {
              page: 1
            },
            query: {
              chatId: chat.id
            }
          }" class="open-chat">Перейти к чату</router-link>
        </div>
      </div>

      <div class="message-meta-group sender">
        <div class="message-meta-field meta-group-title">
          Отправитель
        </div>
        <div class="message-meta-field sender-primary-info">
          <div v-if="from" class="sender-name">
            {{from.firstName}}
            <template v-if="from.last_name">{{from.lastName}}</template>
          </div>
          <div v-if="from.is_bot" class="sender-bot">Бот</div>
        </div>
        <div class="message-meta-field sender-id">Id: {{from.id}}</div>
        <div v-if="from.username" class="message-meta-field sender-username">
          @{{from.username}}
        </div>
      </div>
    </div>
    <div class="message">
      <div class="message-info">
        <div class="message-id">Id сообщения: {{item.messageId}}</div>
        <div class="message-time">Время: {{item.date}}</div>
      </div>
      <div class="message-text">{{item.text}}</div>
    </div>
  </section>
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
  data() {
    return {
      chat: undefined,
      from: undefined
    }
  },
  created() {
    this.chat = this.item.chat
    this.from = this.item.from
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";
@import "/src/assets/scss/patterns/contentAdjustment";
@import "/src/assets/scss/controls/panels";
@import "/src/assets/scss/controls/buttons";

$grouped-items-padding: $padding-step;

.message-card {
  display: flex;
  align-items: stretch;
  gap: $padding-step-large * 4;

  padding: $padding-step-large * 2 $page-horizontal-gap;
}

.message-meta {
  display: flex;
  gap: $padding-step-large * 2;

  overflow: hidden;

  flex-grow: 0;
  flex-shrink: 0;

  .message-meta-group {
    display: flex;
    flex-direction: column;
    gap: $grouped-items-padding;

    overflow: hidden;
    width: 200px;

    .meta-group-title {
      font-weight: bold;
    }

    .message-meta-options {
      margin-top: auto;
    }
  }
}

.message {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  gap: $grouped-items-padding;

  .message-info {
    @extend %breadcrumbs;

    .message-id, .message-time {
      @extend %breadcrumbs-item;
    }
  }

  .message-text {
    border: 1px solid $color-1-shade-4;
    padding: $padding-step;

    height: 100%;

    font-size: 12px;
    color: rgba($color-1-text, 0.8);
  }
}

.sender-primary-info {
  @extend %breadcrumbs;
  overflow: hidden;

  .sender-name, .sender-bot {
    @extend %breadcrumbs-item;
  }

  .sender-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.chat {
  .chat-primary-info {
    @extend %breadcrumbs;

    .chat-id, .chat-type {
      @extend %breadcrumbs-item;
    }
  }
  .open-chat {
    @include button($color-1-shade-2, $color-1-text);
    width: fit-content;
  }
}

</style>