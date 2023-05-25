<template>
  <section class="bot-events-page">
    <loading-display v-if="!messages && !hasError"/>
    <template v-else>
      <information-display v-if="errors.nonExistentBot"
                           title="Не существует бота с указанными данными"
      >
        <template #controls>
          <router-link :to="{name: $routeNames.bots}"
                       class="user-action">
            К моим ботам
          </router-link>
        </template>
      </information-display>
      <!--    Неверный индекс страницы-->
      <information-display v-else-if="errors.wrongPageIndex"
                           title="Указан номер несуществующей страницы"
                           description="Вы можете перейти к первой странице
                           для текущего списка событий, кликнув по ссылке ниже"
                           :enable-controls="true"
      >
        <template #controls>
          <router-link :to="{
            name: $routeNames.botInfo,
            params: {botId, page: 1},
            query: Object.fromEntries(
                Object.entries(filter).filter(entry => entry[1] !== undefined)
            )
          }" class="user-action">
            В начало списка
          </router-link>
        </template>
      </information-display>

<!--      Пустой список событий-->
      <information-display v-else-if="messages.length === 0"
                           :image-ref="require('@/assets/icons/empty-result.svg')"
                           title="Не сохранено ни одного события"
                           description="События будут сохраняться по мере того,
                           как пользователи будут взаимодействовать с вашим ботом.
                           Откройте страницу позже"
      />

<!--      Нет ошибок, есть события-->
      <template v-else>
        <integor-extra-header>
          <page-adjusted-content>
            <closed-gaps-panel
                :default-element="{
                  component: allChatsGapComponent,
                  data: {
                    botId
                  }
                }"
                :item-component="chatGapComponent"
                :close-gap-event="$appEvents.botEvents.chatGapClosed"
                :items="recentChats"
            />
          </page-adjusted-content>
        </integor-extra-header>
        <div class="bot-events-page-content-container">
          <div class="bot-events-page-content">
            <div class="bot-events-list-container">
              <items-list v-if="messages"
                          :item-component="itemComponent"
                          :options-factory="createMessageOptions"
                          :items="messages"
                          :options="{hideChat: Boolean(filter.chatId)}"
              />
            </div>
            <div class="sidebar-container">
              <bot-events-page-sidebar :bot="bot" :total-events="totalEvents"/>
            </div>
          </div>
          <div v-if="pagesCount && pagesCount > 1" class="pagination-container">
            <div class="pagination-background">
              <pagination-component
                  :page-component="pageComponent"
                  :dots-component="pageDotsComponent"

                  :pages-count="pagesCount"
                  :current-page-index="pageIndex"

                  :options-factory="createPageOptions"
              />
            </div>
          </div>
        </div>
      </template>
    </template>
  </section>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {shallowRef} from "vue";

import {ServerError} from "@/errorHandling/serverErrors";

import ItemsList from "@/components/primitives/controls/ItemsList";
import MessageCardWrapper from "@/components/pages/botEventsPage/primitives/MessageCardWrapper";
import PaginationComponent from "@/components/primitives/PaginationComponent";
import InformationDisplay from "@/components/primitives/informationDisplay/InformationDisplay";
import ErrorContainerMixin from "@/components/mixins/ErrorContainerMixin";
import LoadingDisplay from "@/components/primitives/informationDisplay/LoadingDisplay";
import IntegorExtraHeader from "@/components/primitives/IntegorExtraHeader";
import PageAdjustedContent from "@/components/primitives/contentAdjustment/PageAdjustedContent";
import ClosedGapsPanel from "@/components/primitives/panels/StandardClosedGapsPanel";
import ChatGap from "@/components/pages/botEventsPage/chatsPanel/ChatGap";
import AllChatsGap from "@/components/pages/botEventsPage/chatsPanel/AllChatsGap";
import BotEventsPaginationLink from "@/components/pages/botEventsPage/pagination/BotEventsPaginationLink";
import BotEventsPaginationDots from "@/components/pages/botEventsPage/pagination/BotEventsPaginationDots"
import BotEventsPageSidebar from "@/components/pages/botEventsPage/primitives/BotEventsPageSidebar";

export default {
  name: "BotEventsPage",
  components: {
    BotEventsPageSidebar,
    ClosedGapsPanel,
    PageAdjustedContent,
    IntegorExtraHeader,
    LoadingDisplay,
    InformationDisplay,
    PaginationComponent,
    ItemsList
  },
  mixins: [
    ErrorContainerMixin
  ],
  data() {
    return {
      itemComponent: shallowRef(MessageCardWrapper),

      allChatsGapComponent: shallowRef(AllChatsGap),
      chatGapComponent: shallowRef(ChatGap),

      pageComponent: shallowRef(BotEventsPaginationLink),
      pageDotsComponent: shallowRef(BotEventsPaginationDots),

      filter: {
        chatId: undefined
      },
      recentChats: []
    }
  },
  computed: {
    pageIndex() {
      return this.$route.params.page - 1
    },
    botId() {
      return this.$route.params.botId
    },
    chatId() {
      return this.$route.query.chatId
    },
    ...mapGetters({
      bot: 'botEvents/bot',
      pagesCount: 'botEvents/pagesCount',
      totalEvents: 'botEvents/totalEvents',
      messages: 'botEvents/messages',
      appliedFilter: 'botEvents/filter'
    })
  },
  methods: {
    createPageOptions() {
      return {
        botId: this.botId,
        filter: this.appliedFilter
      }
    },
    createMessageOptions() {
      return {
        hasOpenChatButton: !this.chatId
      }
    },
    async handleServerError(error) {
      this.errors.nonExistentBot = Boolean(
          error.responseBody.errors.find(bodyError => bodyError.key == 'botId')
      )

      this.errors.wrongPageIndex = Boolean(
          error.responseBody.errors.find(bodyError => bodyError.key == 'startIndex')
      )

      return this.errors.nonExistentBot || this.errors.wrongPageIndex
    },
    async refreshData(botId, pageIndex, filter) {
      // TODO wrong page id
      // TODO handle wrong bot id

      this.errors = {}
      await this.discard()

      try {
        await this.load({
          botId,
          pageIndex,
          filter
        })
      }
      catch (error) {
        let errorHandlingResult = false

        if (error instanceof ServerError && error.statusCode == 400)
          errorHandlingResult = this.handleServerError(error)

        if (errorHandlingResult)
          return

        throw error
      }

        await this.load({
          botId,
          pageIndex,
          filter
        })
    },
    getRouteFilterData() {
      return {
        chatId: this.$route.query.chatId
      }
    },
    getRecentChat(id) {
      return this.recentChats.find(chatInfo => chatInfo.chat.id == id)
    },
    async removeRecentChat(id) {
      const chatIndex = this.getRecentChat(id)

      if (chatIndex == -1)
        return

      this.recentChats.splice(chatIndex, 1)

      if(this.chatId == id)
        await this.$router.push({
          ...this.$route,
          query: {}
        })
    },
    ...mapActions({
      discard: 'botEvents/discard',
      load: 'botEvents/load'
    })
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    async $route(to, from) {
      if (to.name != this.$routeNames.botEvents)
        return

      this.filter = this.getRouteFilterData()

      await this.discard()
      await this.refreshData(this.botId, this.pageIndex, this.filter)

      window.scrollTo(0, 0)
    },
    appliedFilter(newFilter) {
      if (!newFilter.chat)
        return;

      if (this.getRecentChat(newFilter.chat.id))
        return

      const recentChats = this.recentChats

      recentChats.unshift({
        botId: this.botId,
        chat: newFilter.chat,
        filter: this.appliedFilter
      })

      if (recentChats.length > this.$appConfiguration.botEvents.maxRecentChats)
        recentChats.pop()
    }
  },
  async created() {
    this.$emitter.on(this.$appEvents.botEvents.chatGapClosed, this.removeRecentChat)

    this.filter = this.getRouteFilterData()
    await this.refreshData(this.botId, this.pageIndex, this.filter)
  },
  unmounted() {
    this.$emitter.off(this.$appEvents.botEvents.chatGapClosed)
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/patterns/contentAdjustment";
@import "/src/assets/scss/controls/buttons";

$sidebar-width: 340px;

.bot-events-page {
  @extend %full-page-content;
}

.bot-events-page-content-container {
  @extend %page-content;
  @extend %full-page-content;

  .bot-events-page-content {
    @extend %full-page-content;

    flex-direction: row;
    gap: $padding-step-large * 3;

    margin: 0 (-$page-section-horizontal-gap);
  }
}

.bot-events-list-container {
  margin: -$padding-step-large * 2 0;
  flex-grow: 1;
}

.sidebar-container {
  flex: 0 0 $sidebar-width;
  background: $color-1-shade-3;

  padding: $page-section-vertical-gap $page-section-horizontal-gap;
  border-radius: $border-radius-large;

  overflow: hidden;
}

.pagination-container {
  position: sticky;
  bottom: $padding-step;

  display: flex;
  justify-content: center;

  margin-top: $page-vertical-gap;

  .pagination-background {
    border-top-left-radius: $border-radius-large;
    border-top-right-radius: $border-radius-large;

    padding: $padding-step-large;
    margin: -$padding-step-large;

    background: $background-color;
  }
}

.user-action {
  @include button();
}

</style>