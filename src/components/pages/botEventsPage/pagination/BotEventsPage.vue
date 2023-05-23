<template>
  <router-link :to="route"
      :class="['page', {selected: this.pageDisplayNumber == this.$route.params.page}]">
    {{pageDisplayNumber}}
  </router-link>
</template>

<script>
export default {
  props: {
    pageIndex: {
      required: true,
      type: Number
    },
    options: Object
  },
  computed: {
    pageDisplayNumber() {
      return this.pageIndex + 1
    },
    route() {
      const route = {
        name: this.$routeNames.botEvents,
        params: {
          botId: this.options.botId,
          page: this.pageDisplayNumber
        },
        query: {}
      }

      const filter = this.options.filter

      if (filter.chat)
        route.query.chatId = filter.chat.id

      return route
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/controls/buttons";

.page {
  @include button;
  user-select: none;
  text-align: center;

  padding: 0;

  &.selected {
    @include button($color-1, $color-1-text);
    padding: 0;
  }
}

</style>