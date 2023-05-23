<template>
  <integor-header>
    <router-view name="header">
      <page-adjusted-content>
        <router-view name="header">
          <navigation-panel :items="navigationItems" :itemComponent="navigationItemComponent"/>
        </router-view>
      </page-adjusted-content>
    </router-view>
  </integor-header>
  <main class="main">
    <connection-failed-display v-if="hasConnectionFailedError"/>
    <server-error-display v-else-if="hasServerError" :server-error="serverError"/>
    <router-view v-else></router-view>
  </main>
  <integor-footer>
    <page-adjusted-content>
      <router-view name="footer">
<!--        TODO add content-->
        <h1>Footer</h1>
      </router-view>
    </page-adjusted-content>
  </integor-footer>
</template>

<script>
import {shallowRef} from "vue";
import appEvents from "@/helpers/appEvents";
import routeNames from "@/router/routeNames";

import ConnectionFailderHandlingMixin from '@/components/mixins/errorHandling/ConnectionFailderHandlingMixin'
import ServerErrorHandlingMixin from '@/components/mixins/errorHandling/ServerErrorHandlingMixin'

import IntegorHeader from "@/components/primitives/IntegorHeader";
import IntegorFooter from "@/components/primitives/IntegorFooter";
import PageAdjustedContent from "@/components/primitives/contentAdjustment/PageAdjustedContent";
import NavigationPanel from "@/components/primitives/panels/NavigationPanel";
import NavigationItem from "@/components/primitives/special/HeaderNavItem";
import ConnectionFailedDisplay from "@/components/primitives/InformationDisplay/ConnectionFailedDisplay";
import ServerErrorDisplay from "@/components/primitives/InformationDisplay/ServerErrorDisplay";

const navigationItems = [
  {
    title: 'Мои боты',
    route: { name: routeNames.bots }
  },
  {
    title: 'Архив',
    route: {name: routeNames.archive}
  }
]

export default {
  components: {
    ServerErrorDisplay,
    ConnectionFailedDisplay, NavigationPanel, PageAdjustedContent, IntegorFooter, IntegorHeader},
  mixins: [
      ConnectionFailderHandlingMixin(
          appEvents.connection.connectionFailedError,
          appEvents.connection.connectionRestoredError
      ),
      ServerErrorHandlingMixin(
          appEvents.errors.serverError,
          appEvents.errors.discardServerError
      )
  ],
  data() {
    return {
      navigationItems,
      navigationItemComponent: shallowRef(NavigationItem)
    }
  }
}
</script>

<style scoped lang="scss">

@import '/src/assets/scss/patterns/contentAdjustment';

.main {
  @extend %full-page-content;
}

</style>