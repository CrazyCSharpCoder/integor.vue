<template>
  <router-link class="chat-gap" :to="{
    name: $routeNames.botEvents,
    params: {
      botId: item.botId,
      page: 1
    },
    query: {chatId: item.chat.id}
  }">{{chatTitle}}</router-link>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    chatTitle() {
      const chat = this.item.chat

      let text = chat.firstName

      if (chat.lastName)
        text + ' ' + chat.lastName

      return text
    }
  }
}
</script>

<style scoped lang="scss">

@import "../../../../assets/scss/palette";
@import "../../../../assets/scss/contentAdjustment";
@import "../../../../assets/scss/controls/buttons";

.chat-gap {
  @include button(transparent, $color-5-text, $color-4, $color-4-text);
  padding-right: 24px;
}

</style>