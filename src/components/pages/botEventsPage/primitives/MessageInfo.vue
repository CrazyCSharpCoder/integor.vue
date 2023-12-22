<template>
  <div class="message-info">
    <div v-if="$slots.header" class="message-info-header">
      <slot name="header"></slot>
    </div>
    <div class="message-info-content">
      <div class="message-primary-info">
        <div class="info-row title">
          <div class="info-attribute">Chat id: {{chat.id}}</div>
          <div class="info-attribute">Message id: {{message.messageId}}</div>
        </div>
        <div class="message-info-group message-date">
          <div class="info-attribute">
            <span class="attribute-name">Время отправления:</span>
            {{this.$dateFormat.formatStringDateTime(message.date)}}
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
          <div v-if="from.username" class="info-attribute">
            <span class="attribute-name">Username:</span>
            @{{from.username}}
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
          <div v-if="chat.username" class="info-attribute">
            <span class="attribute-name">Username:</span>
            @{{chat.username}}
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
        <div v-if="$slots.controls" class="controls">
          <slot name="controls"></slot>
        </div>
      </div>
      <div class="separator"></div>
      <div class="message-content-info">
<!--        <div class="info-row info-attribute">-->
<!--          &lt;!&ndash;        TODO display real value&ndash;&gt;-->
<!--          <span class="attribute-name">Вложения:</span>&nbsp;сообщение не имеет вложений-->
<!--        </div>-->
        <div class="message-info-group">
          <div class="title">Текст сообщения</div>
          <div class="message-text">
            {{message.text}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    chat() {
      return this.message.chat
    },
    from() {
      return this.message.from
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
$big-padding: $padding-step * 5;

.message-info-header {
  padding-bottom: $big-padding;
}

.message-info-content {
  display: flex;
  justify-content: stretch;
  align-items: stretch;

  .message-primary-info {
    flex: 0 0 300px;
  }
  .separator {
    @include separator-vertical();
  }

  .message-primary-info, .message-content-info {
    @include panel($big-padding);

    flex-direction: column;
  }

  @media (max-width: $large-threshold) {
    flex-direction: column;

    .message-primary-info {
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

</style>