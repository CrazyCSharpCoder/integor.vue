<template>
  <ul class="context-actions">
    <li class="context-action">
      <button @click="openAddBotModalWindow" class="context-action-button">Добавить бота</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "MyBotsPageContextActions",
  methods: {
    openAddBotModalWindow() {
      this.$emitter.emit(this.$appEvents.bots.openAddBotModalWindow)
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/controls/panels";
@import "/src/assets/scss/controls/buttons";

.context-actions {
  @include panel();

  height: 100%;
  align-items: center;
}

.context-action-button {
  @extend %secondary-button;
}

</style>