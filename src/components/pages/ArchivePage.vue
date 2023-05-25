<template>
  <section class="archive-page">
    <loading-display v-if="!bots"/>
    <template v-else>
      <information-display v-if="bots.length === 0"
                           :image-ref="require('@/assets/icons/empty-result.svg')"
                           title="В архиве нет ни одного бота"
      >
        <template #description>
          Добавляйте в архив ботов, которые больше
          не используются Вами, чтобы они не занимали места в
          <router-link :to="{name: $routeNames.bots}">Cписке Ваших ботов</router-link>
        </template>
      </information-display>
      <section class="archive-page-content">
        <cards-list v-if="bots"
                    :card-component="cardComponent"
                    :items="bots"
                    :options-factory="createBotCardOptions"
        />
      </section>
    </template>
  </section>
</template>

<script>
import {shallowRef} from "vue";
import {mapGetters, mapActions} from "vuex";

import DisposableEventsMixin from "@/components/mixins/DisposableEventsMixin";

import BotCard from "@/components/pages/myBotsPage/primitives/BotCard";
import CardsList from "@/components/primitives/controls/CardsList";
import LoadingDisplay from "@/components/primitives/informationDisplay/LoadingDisplay";
import InformationDisplay from "@/components/primitives/informationDisplay/InformationDisplay";

export default {
  components: {InformationDisplay, LoadingDisplay, CardsList},
  mixins: [
      DisposableEventsMixin
  ],
  data() {
    return {
      cardComponent: shallowRef(BotCard)
    }
  },
  computed: {
    ...mapGetters({
      bots: 'archive/bots'
    })
  },
  methods: {
    createBotCardOptions() {
      return {
        unarchiveBotEvent: this.$appEvents.bots.unarchiveBot
      }
    },
    async unarchiveBot(botInfo) {
      try {
        await this.$store.dispatch('archive/unarchive', botInfo.bot.id)
      }
      catch (error) {
        console.log(error)
      }
    },
    ...mapActions({
      load: 'archive/load',
      discard: 'archive/discard'
    })
  },
  async created() {
    await this.discard()
    await this.load()

    this.registerEvent(
        this.$appEvents.bots.unarchiveBot,
        this.unarchiveBot
    )
  }
}
</script>

<style scoped lang="scss">

@import '/src/assets/scss/patterns/contentAdjustment';

.archive-page {
  @extend %full-page-content;
}

.archive-page-content {
  @extend %page-content
}

</style>