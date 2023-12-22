<template>
  <div :class="['modal-window-mount', {'closed': !active}]">
    <div class="modal-window-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped lang="scss">

.modal-window-mount {
  position: fixed;
  background: rgba(0, 0, 0, 0.7);

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 10;
  top: 0;
  left: 0;

  backdrop-filter: blur(4px);
}

.modal-window-container {
  box-shadow: 0 0 24px -12px rgba(0, 0, 0, 1);
}

.closed {
  display: none;
}

</style>