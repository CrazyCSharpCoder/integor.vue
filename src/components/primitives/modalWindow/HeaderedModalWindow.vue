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
      <div v-if="$slots.footer" class="modal-window-footer">
        <slot name="footer"></slot>
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

$close-button-size: 26px;

.modal-window {
  background: $background-color;
  color: $background-text-color;

  overflow: hidden;

  border-radius: $border-radius-large;

  .modal-window-header {
    background: $color-2-shade-1;
    color: $color-2-text;

    display: flex;
    align-items: stretch;

    .header-content-container {
      flex-grow: 1;

      display: flex;
      align-items: center;

      font-weight: $bold;
      line-height: $border-radius * 2;

      padding: 0 $page-section-horizontal-gap;
    }

    .close-button-container {
      flex-grow: 0;

      display: flex;
      align-items: center;

      padding: 0 $page-section-horizontal-gap-small;
    }
  }

  .close-button {
    @include icon-button("/src/assets/icons/close.svg", $close-button-size);
  }
}

</style>