<template>
  <div class="bot-events-page">
    <div class="bot-events-page-content">
      <items-list v-if="messages"
                  :item-component="itemComponent"
                  :items="messages"
                  separator-color="#D9D9D9"
      />
    </div>
    <div class="pagination-container">
      <div class="pagination-background">
        <pagination-component
            v-if="pagesCount && pagesCount > 1"
            :current-page-index="currentPageIndex"
            :pages-count="pagesCount"
            :routeFactory="createRoute"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {shallowRef} from "vue";

import ItemsList from "@/components/primitives/controls/ItemsList";
import MessageCard from "@/components/pages/botEventsPage/MessageCard";
import PaginationComponent from "@/components/primitives/PaginationComponent";

export default {
  name: "BotEventsPage",
  components: {PaginationComponent, ItemsList},
  data() {
    return {
      itemComponent: shallowRef(MessageCard),
      currentPageIndex: undefined
    }
  },
  computed: {
    ...mapGetters({
      bot: 'botEvents/bot',
      pagesCount: 'botEvents/pagesCount',
      totalEvents: 'botEvents/totalEvents',
      messages: 'botEvents/messages'
    })
  },
  methods: {
    createRoute(pageIndex) {
      return {
        name: this.$routeNames.botInfo,
        params : {
          page: pageIndex + 1
        }
      }
    },
    async refreshData(pageIndex) {
      // TODO wrong page id
      this.currentPageIndex = pageIndex

      // TODO handle wrong bot id
      const botId = this.$route.params.botId

      await this.$store.dispatch('botEvents/loadEvents', {
        botId,
        pageIndex: pageIndex
      })
    },
    pageNumberToPageIndex(pageNumber) {
      return pageNumber - 1
    },
    ...mapActions({
      discard: 'botEvents/discard'
    })
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    async $route(to, from) {
      if (to.name != this.$routeNames.botInfo)
        return

      await this.discard()
      await this.refreshData(
          this.pageNumberToPageIndex(to.params.page)
      )
      window.scrollTo(0, 0)
    }
  },
  async created() {
    await this.discard()
    await this.refreshData(
        this.pageNumberToPageIndex(this.$route.params.page)
    )
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/patterns/contentAdjustment";

.bot-events-page {
  @extend %full-page-content;
}

.bot-events-page-content {
  @extend %page-vertical-content;
  @extend %full-page-content;
}

.pagination-container {
  position: sticky;
  bottom: 0;

  display: flex;
  justify-content: center;

  .pagination-background {
    background: $color-4;
  }
}

</style>