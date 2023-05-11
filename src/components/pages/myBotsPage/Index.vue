<template>
  <div class="my-bots-page">
    <integor-extra-header>
      <page-adjusted-content>
        <ul class="bots-management-panel">
          <li class="bots-management-panel-item">
            <button @click="openAddBotModalWindow" class="bot-action">Добавить</button>
          </li>
        </ul>
      </page-adjusted-content>
    </integor-extra-header>
    <section class="my-bots-page-content">
      <template v-if="myBots">
        <cards-list v-if="myBots.length > 0" :card-component="cardComponent" :items="myBots"/>
        <div v-else>У вас не добавлено ни одного бота</div>
      </template>
    </section>
    <add-bot-modal-window/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {shallowRef} from "vue";

import BotCard from "@/components/pages/myBotsPage/BotCard";
import CardsList from "@/components/primitives/controls/CardsList";
import IntegorExtraHeader from "@/components/primitives/IntegorExtraHeader";
import PageAdjustedContent from "@/components/primitives/contentAdjustment/PageAdjustedContent";
import AddBotModalWindow from "@/components/pages/myBotsPage/AddBotModalWindow";

export default {
  name: 'MyBotsPage',
  components: {AddBotModalWindow, PageAdjustedContent, IntegorExtraHeader, CardsList},
  data() {
    return {
      cardComponent: shallowRef(BotCard)
    }
  },
  computed: {
    ...mapGetters([
        'myBots'
    ])
  },
  methods: {
    openAddBotModalWindow() {
      this.$emitter.emit(this.$appEvents.bots.openAddBotModalWindow)
    }
  },
  async created() {
    await this.$store.dispatch('loadBots')
  }
}
</script>

<style scoped lang="scss">

@import '/src/assets/scss/palette';
@import '/src/assets/scss/contentAdjustment';
@import '/src/assets/scss/patterns/contentAdjustment';
@import '/src/assets/scss/controls/panels';
@import '/src/assets/scss/controls/buttons';

.my-bots-page {
  @extend %full-page-content;
}

.my-bots-page-content {
  @extend %page-content
}

.bots-management-panel {
  @include panel();

  .bots-management-panel-item {
    .bot-action {
      @include button($color-4, $color-4-text);
    }
  }
}

</style>