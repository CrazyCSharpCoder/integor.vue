<template>
  <modal-window-template :active="active">
    <section class="modal-window">
      <div class="modal-window-header">
        <div class="header-content-container">
          <slot name="header"></slot>
        </div>
        <div class="close-button-container">
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
    onCloseClicked: {
      type: String,
    },
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
  background: $color-4;
  color: $color-4-text;

  .modal-window-header {
    background: $color-1;
    color: $color-1-text;
    display: flex;
    align-items: stretch;

    padding: 0 $padding-step;

    .header-content-container {
      font-size: $h2-font-size;
      flex-grow: 1;

      display: flex;
      align-items: center;
    }

    .close-button-container {
      height: $close-button-size + $padding-step-small * 2;
      flex-grow: 0;
    }

    .header-content-container, .close-button-container {
      padding: $padding-step-small $padding-step;
    }
  }

  .close-button {
    @include icon-button("/src/assets/icons/close.svg", $close-button-size);
  }
}

</style>