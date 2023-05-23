<template>
  <section class="information">
    <div class="information-content">
      <div class="illustration-container">
        <div v-if="imageRef" class="error-image">
          <img :src="imageRef"
               :alt="imageAlt"
               class="illustration"/>
        </div>
        <slot v-else name="image">
          <div class="error-image">
            <img :src="require('@/assets/icons/error-default-image.svg')"
                 :alt="imageAlt"
                 class="illustration"/>
          </div>
        </slot>
      </div>
      <div class="title-container">
        <div v-if="title" class="error-title">
          {{title}}
        </div>
        <slot v-else name="title"></slot>
      </div>
      <div class="description-container">
        <div v-if="description" class="error-description">
          {{description}}
        </div>
        <slot v-else name="description"></slot>
      </div>
      <div v-if="enableControls" class="controls">
        <slot name="controls"></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    imageRef: String,
    imageAlt: String,

    title: String,
    description: String,

    enableControls: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/text";
@import "/src/assets/scss/contentAdjustment";

$default-width: 500px;

.information {
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

.information-content {
  width: $default-width;

  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: $padding-step * 2;
}

.error-title {
  font-size: $h1-font-size;
}

</style>