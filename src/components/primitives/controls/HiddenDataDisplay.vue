<template>
  <div class="hidden-data">
    <div v-if="show" class="data">{{data}}</div>
    <div v-else class="data hidden">{{placeholder}}</div>
    <button @mousedown="showData"
            @mouseup="hideData"
            @mouseleave="hideData"
            class="show-button">Show</button>
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

@import "/src/assets/scss/controls/buttons";
@import "/src/assets/scss/controls/input";

.hidden-data {
  display: flex;
  align-items: stretch;

  &:hover {
    .data {
      border-color: $color-5;
    }
  }

  .data {
    @include input($color-2, $color-5);

    border-right: none;

    flex-grow: 1;

    &.hidden {
      background: $color-4; // TODO color from palette
    }
  }
  .show-button {
    @include button($color-1, $color-1-text);
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;

    flex-grow: 0;
  }
}

</style>