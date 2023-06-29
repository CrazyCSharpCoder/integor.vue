<template>
  <integor-header>
    <page-adjusted-content>
      <left-right-content>
        <template #first>
          <div class="nav-panel-container">
            <navigation-panel :items="navigationItems" :itemComponent="navigationItemComponent"/>
          </div>
        </template>
        <template #second>
          <router-view name="contextActions"></router-view>
        </template>
      </left-right-content>
    </page-adjusted-content>
  </integor-header>
  <main class="main">
    <router-view></router-view>
  </main>
  <integor-default-footer/>
</template>

<script>
import {shallowRef} from "vue";
import routeNames from "@/router/routeNames";

import IntegorHeader from "@/components/primitives/IntegorHeader";
import PageAdjustedContent from "@/components/primitives/contentAdjustment/PageAdjustedContent";
import NavigationPanel from "@/components/primitives/panels/NavigationPanel";
import NavigationItem from "@/components/primitives/special/HeaderNavItem";
import LeftRightContent from "@/components/primitives/contentAdjustment/LeftRightContent";
import IntegorDefaultFooter from "@/components/primitives/IntegorDefaultFooter";

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
    IntegorDefaultFooter,
    LeftRightContent, NavigationPanel, PageAdjustedContent, IntegorHeader
  },
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
@import '/src/assets/scss/projectSpecific/header';

.nav-panel-container {
  margin: 0 (-$nav-item-horizontal-padding);
}

.main {
  @extend %full-page-content;
}

</style>