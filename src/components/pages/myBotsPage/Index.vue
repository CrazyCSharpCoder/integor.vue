<template>
  <section class="my-bots-page">
    <template v-if="myBots">
      <cards-list v-if="myBots.length > 0" :card-component="cardComponent" :items="myBots"/>
      <div v-else>У вас не добавлено ни одного бота</div>
    </template>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import {shallowRef} from "vue";

import BotCard from "@/components/pages/myBotsPage/BotCard";
import CardsList from "@/components/primitives/controls/CardsList";

export default {
  name: 'MyBotsPage',
  components: {CardsList},
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
  async created() {
    await this.$store.dispatch('loadBots')
  }
}
</script>

<style scoped lang="scss">

@import '/src/assets/scss/patterns/contentAdjustment';

.my-bots-page {
  @extend %full-page-content;
  @extend %page-vertical-content;
}

</style>