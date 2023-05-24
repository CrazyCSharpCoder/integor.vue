<template>
  <modal-window-template :active="active">
    <section class="modal-window">
      <div class="modal-window-header">
        <div class="header-content-container">
          <slot name="header"></slot>
        </div>
        <div v-if="onCloseClicked" class="close-button-container">
          <button @click="onClosed" class="close-button"></button>
        </div>
      </div>
      <div class="modal-window-content">
        <slot></slot>
      </div>
    </section>
  </modal-window-template>
</template>

<script>
import ModalWindowTemplate from "@/components/primitives/modalWindow/ModalWindowTemplate";

export default {
  components: {ModalWindowTemplate},
  props: {
    onCloseClicked: String,
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClosed() {
      this.$emitter.emit(this.onCloseClicked)
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/text";
@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/controls/buttons";

$close-button-size: 32px;

.modal-window {
  background: $color-1-shade-4;
  color: $color-1-text;

  overflow: hidden;

  .modal-window-header {
    background: $color-1-shade-1;
    color: $color-1-text;
    display: flex;
    align-items: stretch;

    .header-content-container {
      font-size: $h2-font-size;
      flex-grow: 1;

      display: flex;
      align-items: center;
    }

    .close-button-container {
      height: $close-button-size + $padding-step * 2;
      flex-grow: 0;
    }

    .header-content-container, .close-button-container {
      padding: $modal-window-vertical-gap $modal-window-horizontal-gap;
    }
  }

  .close-button {
    @include icon-button("/src/assets/icons/close.svg", $close-button-size);
  }
}

</style>