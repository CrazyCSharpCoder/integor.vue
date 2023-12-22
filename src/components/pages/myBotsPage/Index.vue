<template>
  <div class="my-bots-page">
    <loading-display v-if="!myBots"/>
    <template v-else>
      <integor-extra-header v-if="recentBots && recentBots.length">
        <page-adjusted-content>
          <div class="recent-bots-menu">
            <items-list
                :horizontal="true"

                :item-component="botHistoryComponent"
                :items="recentBots"
                :options-factory="createBotNavigationOptions"
            />
          </div>
        </page-adjusted-content>
      </integor-extra-header>
      <information-display v-if="myBots.length === 0"
                           :image-ref="require('@/assets/icons/empty-result.svg')"
                           title="У вас не добавлено ни одного бота"
                           description="Давайте добавим вашего первого бота прямо сейчас!"
      >
        <template #controls>
          <button @click="openAddBotModalWindow" class="add-bot">Добавить бота</button>
        </template>
      </information-display>
      <section v-else class="my-bots-page-content">
        <div class="cards-list-container">
          <cards-list
              :card-component="cardComponent"
              :items="myBots"
              :options-factory="createBotCardOptions"
          />
        </div>
      </section>
    </template>
    <add-bot-modal-window/>
    <update-bot-modal-window/>
    <archive-bot-modal-window/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {shallowRef} from "vue";

import BotCard from "@/components/pages/myBotsPage/primitives/BotCard";
import BotGap from "@/components/primitives/userHistory/BotGap";

import DisposableEventsMixin from "@/components/mixins/DisposableEventsMixin";

import CardsList from "@/components/primitives/controls/CardsList";
import IntegorExtraHeader from "@/components/primitives/IntegorExtraHeader";
import PageAdjustedContent from "@/components/primitives/contentAdjustment/PageAdjustedContent";
import AddBotModalWindow from "@/components/pages/myBotsPage/modalWindows/AddBotModalWindow";
import InformationDisplay from "@/components/primitives/informationDisplay/InformationDisplay";
import LoadingDisplay from "@/components/primitives/informationDisplay/LoadingDisplay";
import UpdateBotModalWindow from "@/components/pages/myBotsPage/modalWindows/UpdateBotModalWindow";
import ArchiveBotModalWindow from "@/components/pages/myBotsPage/modalWindows/ArchiveBotModalWindow";
import ItemsList from "@/components/primitives/controls/ItemsList";

export default {
  name: 'MyBotsPage',
  components: {
    ItemsList,
    ArchiveBotModalWindow,
    UpdateBotModalWindow,
    LoadingDisplay,
    InformationDisplay,
    AddBotModalWindow,
    PageAdjustedContent,
    IntegorExtraHeader,
    CardsList
  },
  mixins: [
    DisposableEventsMixin
  ],
  data() {
    return {
      cardComponent: shallowRef(BotCard),
      botHistoryComponent: shallowRef(BotGap)
    }
  },
  computed: {
    ...mapGetters([
        'myBots'
    ]),
    ...mapGetters({
      recentBots: 'history/bots'
    })
  },
  methods: {
    openAddBotModalWindow() {
      this.$emitter.emit(this.$appEvents.bots.openAddBotModalWindow)
    },
    createBotCardOptions() {
      return {
        updateBotEvent: this.$appEvents.bots.openUpdateBotModalWindow,
        archiveBotEvent: this.$appEvents.bots.openArchiveBotModalWindow
      }
    },
    createBotNavigationOptions() {
      return {
        removeBotEvent: this.$appEvents.history.botGapClosed
      }
    },
    closeBotNavigationGap(bot) {
      this.$store.dispatch('history/removeBot', bot.id)
    }
  },
  async created() {
    this.registerEvent(
        this.$appEvents.history.botGapClosed,
        this.closeBotNavigationGap
    )

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
  @extend %page-content;
}

.cards-list-container {
  margin: 0 (-$border-radius-large);
}

.bots-management-panel {
  @include panel();

  .bots-management-panel-item {
    .bot-action {
      @include button($color-1-shade-4, $color-1-text);
    }
  }
}

.add-bot {
  @include button();
}

.recent-bots-menu {
  margin: 0 (-$border-radius);
}

</style>