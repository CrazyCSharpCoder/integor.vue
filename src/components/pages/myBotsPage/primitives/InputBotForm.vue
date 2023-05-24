<template>
  <form @submit.prevent="submitData" class="bot-input">
    <div class="form-items">
      <div class="form-item">
        <input v-model="input.title" type="text" placeholder="Наименование бота"
               :class="['input', {'error': titleInvalid}]"/>
        <div v-if="titleInvalid" class="input-error">
          {{outputFirst(v$.input.title)}}
        </div>
      </div>
      <div class="form-item">
        <input v-model="input.token" type="text" placeholder="Токен бота"
               :class="['input', {error: tokenInvalid}]"/>
        <div v-if="tokenInvalid" class="input-error">
          {{outputFirst(v$.input.token)}}
        </div>
      </div>
      <div class="form-item form-controls">
        <button class="confirm">Подтвердить</button>
      </div>
    </div>
    <div class="form-error">
      {{formError}}
    </div>
  </form>
</template>

<script>
import {helpers, maxLength, required} from "@vuelidate/validators";

import VuelidatedFormMixin from "@/components/mixins/VuelidatedFormMixin";
import ErrorHandlerMixin from "@/components/mixins/ErrorHandlerMixin";

export default {
  mixins: [
      ErrorHandlerMixin,
      VuelidatedFormMixin,
  ],
  props: {
    formError: String
  },
  data() {
    return {
      input: {
        title: '',
        token: ''
      }
    }
  },
  computed: {
    titleInvalid() {
      return Boolean(this.errorsCount(this.v$.input.title))
    },
    tokenInvalid() {
      return Boolean(this.errorsCount(this.v$.input.token))
    }
  },
  validations() {
    return {
      input: {
        title: {
          required: helpers.withMessage(
              this.$modelValidation.required(),
              required
          ),
          maxLength: helpers.withMessage(
              this.$modelValidation.maxLength(
                  this.$appConfiguration.validation.bots.title.maxLength
              ),
              maxLength(this.$appConfiguration.validation.bots.title.maxLength)
          )
        },
        token: {
          required: helpers.withMessage(
              this.$modelValidation.required(),
              required
          ),
          isTelegramToken: helpers.withMessage(
              'Значение не является токеном Telegram бота',
              () => this.$appConfiguration.validation.bots.token(this.input.token)
          )
        }
      }
    }
  }
}
</script>

<style lang="scss">

@import "../../../../assets/scss/palette";
@import "../../../../assets/scss/contentAdjustment";

@import "../../../../assets/scss/controls/input";
@import "../../../../assets/scss/controls/buttons";
@import "../../../../assets/scss/patterns/contentAdjustment";
@import "../../../../assets/scss/patterns/forms";

.bot-input {
  width: 100%;
  padding: $padding-step * 3 0;

  .form-items {
    @include vertical-list($padding-step-large);

    .form-item {
      @extend %list-item;

      .input {
        @include input();
        width: 100%;

        &.error {
          @extend %error-input;
        }
      }
      .input-error {
        @extend %form-error;
        padding-left: $border-radius + 2px;
      }
    }
  }

  .form-controls {
    .confirm {
      @include button();
      width: 100%;
    }
  }

  .form-error {
    @extend %form-error;
    text-align: center;
  }
}

</style>