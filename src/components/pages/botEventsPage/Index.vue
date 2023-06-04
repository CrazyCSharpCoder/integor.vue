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

<!--      Нет ошибок, есть события-->
      <template v-else>
        <integor-extra-header v-if="recentChatInfos && recentChatInfos.length">
            <page-adjusted-content>
              <div class="recent-chats-menu">
                <div :class="['all-chats-link', {current: !chatId}]">
                  <router-link :to="allChatsRoute">
                    Все чаты
                  </router-link>
                </div>
                <items-list
                    :horizontal="true"

                    :item-component="chatGapComponent"
                    :items="recentChatInfos"
                    :options-factory="createChatNavigationOptions"
                />
              </div>
            </page-adjusted-content>
        </integor-extra-header>
        <div class="bot-events-page-content-container">
          <div class="bot-events-page-content">
            <div class="bot-events-list-container">
              <information-display v-if="messages.length === 0"
                                   :image-ref="require('@/assets/icons/empty-result.svg')"
                                   title="Не сохранено ни одного события"
                                   description="События будут сохраняться по мере того,
                           как пользователи будут взаимодействовать с вашим ботом.
                           Откройте страницу позже"
              />
              <items-list v-else
                          :item-component="itemComponent"
                          :options-factory="createMessageOptions"
                          :items="messages"
              />
            </div>
            <div class="sidebar-container">
              <div class="sidebar-sticky-container">
                <bot-events-page-sidebar
                    :bot="bot"
                    :total-events="totalEvents"
                    :webhook-info="webhook"
                />
              </div>
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
          <update-bot-modal-window/>
        </div>
      </template>
    </template>
  </section>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {shallowRef} from "vue";

import {sameRoutes} from "@/helpers/routeHelpers";

import {ServerError} from "@/errorHandling/serverErrors";

import ErrorContainerMixin from "@/components/mixins/ErrorContainerMixin";
import DisposableEventsMixin from "@/components/mixins/DisposableEventsMixin";

import ItemsList from "@/components/primitives/controls/ItemsList";
import MessageCardWrapper from "@/components/pages/botEventsPage/primitives/MessageCardWrapper";
import PaginationComponent from "@/components/primitives/PaginationComponent";
import InformationDisplay from "@/components/primitives/informationDisplay/InformationDisplay";
import LoadingDisplay from "@/components/primitives/informationDisplay/LoadingDisplay";
import IntegorExtraHeader from "@/components/primitives/IntegorExtraHeader";
import PageAdjustedContent from "@/components/primitives/contentAdjustment/PageAdjustedContent";
import ChatGap from "@/components/primitives/userHistory/ChatGap";
import BotEventsPaginationLink from "@/components/pages/botEventsPage/pagination/BotEventsPaginationLink";
import BotEventsPaginationDots from "@/components/pages/botEventsPage/pagination/BotEventsPaginationDots"
import BotEventsPageSidebar from "@/components/pages/botEventsPage/primitives/BotEventsPageSidebar";
import UpdateBotModalWindow from "@/components/pages/myBotsPage/modalWindows/UpdateBotModalWindow";

function sameRouteWithoutHash(a, b) {
  const aCopy = Object.assign({}, a)
  const bCopy = Object.assign({}, b)

  aCopy.hash = bCopy.hash = null

  return sameRoutes(aCopy, bCopy)
}

export default {
  name: "BotEventsPage",
  components: {
    UpdateBotModalWindow,
    BotEventsPageSidebar,
    PageAdjustedContent,
    IntegorExtraHeader,
    LoadingDisplay,
    InformationDisplay,
    PaginationComponent,
    ItemsList
  },
  mixins: [
    ErrorContainerMixin,
    DisposableEventsMixin
  ],
  data() {
    return {
      chatGapComponent: shallowRef(ChatGap),
      itemComponent: shallowRef(MessageCardWrapper),

      pageComponent: shallowRef(BotEventsPaginationLink),
      pageDotsComponent: shallowRef(BotEventsPaginationDots),

      filter: {
        chatId: undefined
      }
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
      return this.$route.query?.chatId
    },
    recentChatInfos() {
      const currentChats = this.currentChats

      if (!currentChats)
        return undefined

      return currentChats.map(chat => ({chat, bot: this.bot}))
    },
    allChatsRoute() {
      return {
        name: this.$routeNames.botEvents,
        params: {
          botId: this.botId,
          page: 1
        }
      }
    },
    ...mapGetters({
      bot: 'botEvents/bot',
      webhook: 'botEvents/webhookInfo',
      pagesCount: 'botEvents/pagesCount',
      totalEvents: 'botEvents/totalEvents',
      messages: 'botEvents/messages',
      appliedFilter: 'botEvents/filter',

      currentChats: 'history/currentChats'
    })
  },
  methods: {
    createChatNavigationOptions(chatInfo) {
      return {
        removeChatEvent: this.$appEvents.history.chatGapClosed,
        current: chatInfo.chat.id == this.chatId
      }
    },
    createPageOptions() {
      return {
        botId: this.botId,
        filter: this.appliedFilter
      }
    },
    createMessageOptions(message) {
      return {
        hasOpenChatButton: !this.chatId,
        goToRepliedMessageEvent: this.$appEvents.botEvents.goToMessage,
        isCurrentBot: message.from.id == this.botId
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
    closeChatGap(chat) {
      if (this.chatId == chat.id)
          this.$router.push(this.allChatsRoute)

      this.removeChatGap(chat.id)
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

      this.addBotGap(this.bot)
      this.setCurrentBot(this.bot.id)

      if (!this.appliedFilter.chat)
        return

      this.addChatGap(this.appliedFilter.chat)
    },
    getRouteFilterData() {
      return {
        chatId: this.$route.query.chatId
      }
    },
    async goToMessage(message) {
      let searchResult

      try {
        searchResult = await this.searchMessage({
          botId: this.botId,

          chatId: message.chat.id,
          messageId: message.messageId,

          filter: this.filter
        })
      }
      catch (error) {
        // TODO notify user
        return
      }

      const messageHtmlId = this.$special.botEventsHelpers
          .createMessageHtmlId(
              message.chat.id, message.messageId
          )

      const route = {
        name: this.$routeNames.botEvents,
        params: {
          botId: this.botId,
          page: searchResult.pageIndex + 1
        },
        hash: `#${messageHtmlId}`
      }

      if (this.filter)
        route.query = {chatId: this.filter.chatId}

      if (!this.$routeHelpers.sameRoutes(this.$route, route)) {
        await this.$router.push(route)
      }

      const messageElement = this.tryScrollToMessage()

      if (messageElement)
        await this.highlightMessage(messageElement)
    },
    tryScrollToMessage() {
      if (!this.$route.hash)
        return null

      const hash = this.$routeHelpers.parseHash(
          this.$route.hash
      )

      if (!hash)
        return null

      if (!this.$special.botEventsHelpers.isMessageHtmlId(hash))
        return null

      const targetElement = document.getElementById(hash)

      if (!targetElement)
        return null

      targetElement.scrollIntoView({block: 'center'})

      return targetElement
    },
    async highlightMessage(htmlElement) {
      const highlightClass = 'highlight'

      if (htmlElement.classList.contains(highlightClass)) {
        htmlElement.classList.remove(highlightClass)
        // Костыль. Пробовал через $nextTick() - не сработало
        setTimeout(() => htmlElement.classList.add(highlightClass), 100)
      }
      else {
        htmlElement.classList.add(highlightClass)
      }
    },
    ...mapActions({
      discard: 'botEvents/discard',
      load: 'botEvents/load',

      addBotGap: 'history/addBot',
      setCurrentBot: 'history/setCurrentBot',
      closeCurrentBot: 'history/closeCurrentBot',

      addChatGap: 'history/addChatToCurrent',
      removeChatGap: 'history/removeChatFromCurrent',

      searchMessage: 'botEvents/searchMessage'
    })
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    async $route(to, from) {
      if (to.name != this.$routeNames.botEvents)
        return

      if (!sameRouteWithoutHash(to, from)) {
        this.closeCurrentBot(this.bot.id)

        this.filter = this.getRouteFilterData()

        await this.discard()
        await this.refreshData(this.botId, this.pageIndex, this.filter)
      }

      const scrolledMessage = this.tryScrollToMessage()

      if (!scrolledMessage) {
        window.scrollTo(0, 0)
      }
      else {
        this.highlightMessage(scrolledMessage)
      }
    }
  },
  async created() {
    this.registerEvent(this.$appEvents.history.chatGapClosed, this.closeChatGap, this)
    this.registerEvent(this.$appEvents.botEvents.goToMessage, this.goToMessage, this)

    this.filter = this.getRouteFilterData()
    await this.refreshData(this.botId, this.pageIndex, this.filter)

    const messageElement = this.tryScrollToMessage()

    if (messageElement)
      this.highlightMessage(messageElement)
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/patterns/contentAdjustment";
@import "/src/assets/scss/controls/buttons";

@import "/src/assets/scss/projectSpecific/navigationGaps";

$sidebar-width: 340px;
$sidebar-top-position: $border-radius * 2 + $page-vertical-gap;

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
  flex-shrink: 0;

  .sidebar-sticky-container {
    position: sticky;
    width: $sidebar-width;

    overflow: hidden;

    top: $sidebar-top-position;
    height: calc(100vh - $sidebar-top-position - $page-vertical-gap);

    padding: $page-section-vertical-gap $page-section-horizontal-gap;
    background: $color-1-shade-3;
    border-radius: $border-radius-large;
  }
}

.pagination-container {
  position: sticky;
  bottom: $padding-step;

  margin-left: auto;
  margin-right: auto;

  display: flex;
  justify-content: center;

  margin-top: $page-vertical-gap;

  width: fit-content;

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

.recent-chats-menu {
  display: flex;
  margin: 0 (-$border-radius);
}

.all-chats-link {
  @extend %nav-gap;

  &.current {
    @extend %current-nav-gap;
  }

  a {
    @extend %nav-gap-title;
  }
}

</style>