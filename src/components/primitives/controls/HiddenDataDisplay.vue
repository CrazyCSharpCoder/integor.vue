<template>
  <div class="hidden-data">
    <div v-if="show" class="data">{{data}}</div>
    <div v-else class="data hidden">{{placeholder}}</div>
    <button @mousedown="showData"
            @mouseup="hideData"
            @mouseleave="hideData"
            class="show-button"></button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      required: true
    },
    placeholder: String
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    showData() {
      this.show = true
    },
    hideData() {
      this.show = false
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";
@import "/src/assets/scss/animations";

@import "/src/assets/scss/patterns/contentAdjustment";

@import "/src/assets/scss/controls/buttons";
@import "/src/assets/scss/controls/input";

$line-height: $border-radius * 2;
$show-button-size: $border-radius * 2 - 2px;

.hidden-data {
  display: flex;
  align-items: stretch;

  border: 2px solid $color-2-shade-1;
  border-radius: $border-radius;

  overflow: hidden;

  background: $color-1-shade-4;

  transition: $transition;

  &:hover {
    border-color: $color-2-shade-2;
  }

  .data {
    margin: -1px -2px;

    padding: 0 $border-radius;
    line-height: $line-height;

    flex-grow: 1;

    overflow: hidden;
    text-overflow: ellipsis;
  }

  .show-button {
    @include icon-button("/src/assets/icons/show/hide.svg", $show-button-size);

    flex-shrink: 0;

    margin-right: 4px;
  }

  .data.hidden + .show-button {
    @include icon-button("/src/assets/icons/show/show.svg", $show-button-size);
  }
}

</style>