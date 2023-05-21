<template>
  <router-link class="all-chats-gap" :to="{
    name: $routeNames.botEvents,
    botId: data.botId
  }">Все чаты</router-link>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/controls/buttons";

.all-chats-gap {
  @include button(transparent, $color-5-text, $color-4, $color-4-text);
}

</style>