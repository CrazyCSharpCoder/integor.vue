<template>
  <section class="message-card">
    <div class="message-info">
      <div class="info-row title">
        <div class="info-attribute">Chat id: {{chat.id}}</div>
        <div class="info-attribute">Message id: {{item.messageId}}</div>
      </div>
      <div class="message-info-group message-date">
        <div class="info-attribute">
          <span class="attribute-name">Время отправления:</span>
          {{this.$dateFormat.formatStringDateTime(item.date)}}
        </div>
      </div>
      <div class="message-info-group sender-info">
        <div class="title">
          Отправитель
        </div>
        <div class="info-row">
          <div class="info-attribute">
            <span class="attribute-name">Id:</span>
            {{from.id}}
          </div>
          <div class="info-attribute">
            <span class="attribute-name">Is bot:</span>
            {{from.isBot}}
          </div>
        </div>
        <div class="info-row">
          <div class="info-attribute">
            <span class="attribute-name">First name:</span>
            {{from.firstName}}
          </div>
          <div v-if="from.lastName" class="info-attribute">
            <span class="attribute-name">Last name:</span>
            {{from.lastName}}
          </div>
        </div>
      </div>
      <div class="message-info-group chat-info">
        <div class="title">
          Чат
        </div>
        <div class="info-row">
          <div class="info-attribute">
            <span class="attribute-name">Id:</span>
            {{chat.id}}</div>
          <div class="info-attribute">
            <span class="attribute-name">Type:</span>
            {{chat.type}}
          </div>
        </div>
        <div class="info-row">
          <div class="info-attribute">
            <span class="attribute-name">First name:</span>
            {{chat.firstName}}
          </div>
          <div v-if="chat.lastName" class="info-attribute">
            <span class="attribute-name">Last name:</span>
            {{chat.lastName}}
          </div>
        </div>
      </div>
      <div v-if="options?.hasOpenChatButton" class="controls">
        <router-link class="action" :to="{
            name: $routeNames.botEvents,
            params: {page: 1},
            query: {chatId: chat.id}
          }">
          Перейти к чату
        </router-link>
      </div>
    </div>
    <div class="separator"></div>
    <div class="message-content-info">
      <div class="info-row info-attribute">
        <!--        TODO display real value-->
        <span class="attribute-name">Вложения:</span>&nbsp;сообщение не имеет вложений
      </div>
      <div class="message-info-group">
        <div class="title">Текст сообщения</div>
        <div class="message-text">
          {{item.text}}
        </div>
      </div>
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
  computed: {
    chat() {
      return this.item.chat
    },
    from() {
      return this.item.from
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

.message-card {
  display: flex;
  justify-content: stretch;
  align-items: stretch;

  background: $color-1-shade-3;
  color: $color-1-text;

  border-radius: $border-radius-large;

  padding: $page-section-vertical-gap $page-section-horizontal-gap;

  .message-info {
    flex: 0 0 300px;
  }
  .separator {
    @include separator-vertical();
  }

  .message-info, .message-content-info {
    @include panel($padding-step * 5);

    flex-direction: column;
  }

  @media (max-width: $large-threshold) {
    flex-direction: column;

    .message-info {
      flex-basis: 0;
    }

    .separator {
      @include separator-horizontal();
    }
  }
}

.title {
  font-weight: $bold;
}

.message-info-group {
  @include panel($padding-step * 2);
  flex-direction: column;
}

.info-row {
  @include breadcrumbs();

  .info-attribute {
    @extend %breadcrumbs-item;
  }
}

.info-attribute {
  .attribute-name {
    font-weight: $bold;
  }
}

.action {
  @extend %primary-button;
}

</style>