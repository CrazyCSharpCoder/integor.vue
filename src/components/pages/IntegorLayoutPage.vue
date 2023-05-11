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
    <router-view></router-view>
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
import routeNames from "@/router/routeNames";

import IntegorHeader from "@/components/primitives/IntegorHeader";
import IntegorFooter from "@/components/primitives/IntegorFooter";
import PageAdjustedContent from "@/components/primitives/contentAdjustment/PageAdjustedContent";
import NavigationPanel from "@/components/primitives/panels/NavigationPanel";
import NavigationItem from "@/components/primitives/special/HeaderNavItem";

const navigationItems = [
  {
    title: 'Мои боты',
    route: { name: routeNames.bots }
  }
]

export default {
  components: {NavigationPanel, PageAdjustedContent, IntegorFooter, IntegorHeader},
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