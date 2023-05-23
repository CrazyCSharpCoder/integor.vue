<template>
  <ul class="gaps-panel-items">
    <li v-if="Boolean(defaultElement)" class="gaps-panel-item">
      <component :is="defaultElement.component" :data="defaultElement.data"/>
    </li>
    <li v-for="gap in items" :key="$generateKey(gap)" class="gaps-panel-item">
      <div class="gap">
        <div class="remove-gap">
<!--          TODO replace with icon-->
          <button @click="notifyClosed(gap.chat)"></button>
        </div>
        <component :is="itemComponent" :item="gap"/>
      </div>
    </li>
  </ul>
</template>

<script>
import ClosedGapsPanelMixin from "@/components/mixins/ClosedGapsPanelMixin";

export default {
  mixins: [
    ClosedGapsPanelMixin
  ],
  props: {
    itemComponent: {
      required: true,
      type: Object
    },
    defaultElement: Object
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/controls/panels";
@import "/src/assets/scss/controls/buttons";

$button-size: 16px;

.gaps-panel-items {
  @extend %list-reset;
  display: flex;
}

.gap {
  position: relative;

  .remove-gap {
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding-right: 4px;

    right: 0;
    top: 0;
    bottom: 0;

    > button {
      @include icon-button("/src/assets/icons/close-gap.svg", $button-size);
      border-radius: $button-size / 2;
    }
  }
}

</style>