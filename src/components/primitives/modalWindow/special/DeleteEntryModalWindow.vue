<template>
  <headered-modal-window
      :active="isActive"
      :default-close-button="false">
    <template #header>
      {{title}}
    </template>
    <div>
      <div class="modal-window-text">
        <p>
          You will no longer be able to restore it
        </p>
      </div>
      <div class="delete-controls-container">
        <ul class="delete-rating-controls">
          <li class="delete-control">
            <button @click="confirmOnClick" class="confirm">Confirm</button>
          </li>
          <li class="delete-control">
            <button @click="cancelOnClicked" class="cancel">Cancel</button>
          </li>
        </ul>
      </div>
      <div v-if="theError" class="information">
        {{theError}}
      </div>
    </div>
  </headered-modal-window>
</template>

<script>
import HeaderedModalWindow from "@/components/common/modalWindow/HeaderedModalWindow";

import ErrorHandlerMixin from "@/components/common/mixins/ErrorHandlerMixin";
import ModalWindowMixin from "@/components/common/modalWindow/common/ModalWindowMixin";

export default {
  components: {HeaderedModalWindow},
  mixins: [
    ErrorHandlerMixin,
    ModalWindowMixin
  ],
  props: {
    title: {
      type: String,
      required: true
    },
    dispatch: {
      type: String,
      required: true
    },
    dispatchParams: {
      type: Function,
      default: context => context.id
    },
    openedEvent: {
      type: String,
      required: true
    },
    closedEvent: {
      type: String,
      required: true
    },
  },
  methods: {
    cancelOnClicked() {
      this.close()
    },
    async confirmOnClick() {
      try {
        await this.$store.dispatch(this.dispatch, this.dispatchParams(this.context))
      }
      catch (error) {
        this.handleBackendError(error.message)
        return
      }

      this.close()
    },
    dispose() {
      this.resetTheError()
    }
  },
  created() {
    this.onOpened(this.openedEvent)
    this.onClosed(this.closedEvent, this.dispose)
  }
}

</script>

<style scoped lang="scss">

@import "/src/assets/scss/elements/forms";

.modal-window-text {
  padding: 16px 0;

  p {
    margin: 10px 0;
  }
}

.information {
  @extend %form-error;
  padding-top: 16px;
}

.delete-controls-container {
  ul.delete-rating-controls {
    @extend %controls-panel;

    .delete-control {
      > button {
        @extend %button;
      }
    }
  }
}

</style>