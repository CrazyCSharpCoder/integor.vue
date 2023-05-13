<template>
  <section class="bot-events-page">
    <loading-display v-if="!messages && !hasError"/>
    <template v-else>
      <information-display v-if="errors.nonExistentBot"
                           title="Не существует бота с указанными данными"
                           :enable-controls="true"
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
          <router-link :to="{name: $routeNames.botInfo, params: {botId, page: 1}}"
                       class="user-action">
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
        <div class="bot-events-page-content">
          <items-list v-if="messages"
                      :item-component="itemComponent"
                      :items="messages"
                      separator-color="#D9D9D9"
          />
        </div>
        <div v-if="pagesCount && pagesCount > 1"
             class="pagination-container"
        >
          <div class="pagination-background">
            <pagination-component
                :current-page-index="pageIndex"
                :pages-count="pagesCount"
                :routeFactory="createRoute"/>
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
import MessageCard from "@/components/pages/botEventsPage/MessageCard";
import PaginationComponent from "@/components/primitives/PaginationComponent";
import InformationDisplay from "@/components/primitives/InformationDisplay/InformationDisplay";
import ErrorContainerMixin from "@/components/mixins/ErrorContainerMixin";
import LoadingDisplay from "@/components/primitives/InformationDisplay/LoadingDisplay";

export default {
  name: "BotEventsPage",
  components: {LoadingDisplay, InformationDisplay, PaginationComponent, ItemsList},
  mixins: [
    ErrorContainerMixin
  ],
  data() {
    return {
      itemComponent: shallowRef(MessageCard)
    }
  },
  computed: {
    pageIndex() {
      return this.$route.params.page - 1
    },
    botId() {
      return this.$route.params.botId
    },
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
    validatePageIndex(pageIndex) {
      // В случаях, когда у ботов отсутствуют события, единственный возможный
      // вариант pageIndex == 0. Если убрать это условие, то следующее условие
      // (возле return), вернёт false, так как ложной будет его вторая часть
      if (pageIndex == 0)
        return true

      return pageIndex >= 0 && pageIndex < this.$store.getters['botEvents/pagesCount']
    },
    async refreshData(botId, pageIndex) {
      // TODO wrong page id
      // TODO handle wrong bot id

      this.errors.nonExistentBot = false
      await this.discard()

      try {
        await this.loadBot(botId)
      }
      catch (error) {
        if (!(error instanceof ServerError) && error.statusCode != 404)
          throw error;

        this.errors.nonExistentBot = true
        return
      }

      // TODO after using my libraries rewrite logic
      this.errors.wrongPageIndex = !this.validatePageIndex(pageIndex)

      if (this.errors.wrongPageIndex) {
        this.discard()
        return
      }

      await this.load( {
        botId: this.botId,
        pageIndex: pageIndex
      })
    },
    ...mapActions({
      discard: 'botEvents/discard',
      loadBot: 'botEvents/loadBot',
      load: 'botEvents/loadAll'
    })
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    async $route(to, from) {
      if (to.name != this.$routeNames.botInfo)
        return

      await this.discard()
      await this.refreshData(this.botId, this.pageIndex)

      window.scrollTo(0, 0)
    }
  },
  async created() {
    await this.refreshData(this.botId, this.pageIndex)
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/patterns/contentAdjustment";
@import "/src/assets/scss/controls/buttons";

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

.user-action {
  @include button();
}

</style>