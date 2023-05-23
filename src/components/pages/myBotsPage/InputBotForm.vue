<template>
  <form @submit.prevent="submitData" class="bot-input">
    <div class="form-fields">
      <div class="form-field">
        <input v-model="input.title" type="text" placeholder="Наименование бота"
               :class="['input', {'error': titleInvalid}]"/>
        <div v-if="titleInvalid" class="input-error">
          {{outputFirst(v$.input.title)}}
        </div>
      </div>
      <div class="form-field">
        <input v-model="input.token" type="text" placeholder="Токен бота"
               :class="['input', {error: tokenInvalid}]"/>
        <div v-if="tokenInvalid" class="input-error">
          {{outputFirst(v$.input.token)}}
        </div>
      </div>
    </div>
    <div class="form-controls">
      <button class="confirm">Подтвердить</button>
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

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/controls/input";
@import "/src/assets/scss/controls/buttons";
@import "/src/assets/scss/patterns/contentAdjustment";
@import "/src/assets/scss/patterns/forms";

.bot-input {
  width: 100%;

  .form-fields, .form-controls {
    padding: $padding-step-small * 3 0;
  }

  .form-fields {
    @include vertical-list($padding-step-small);

    .form-field {
      @extend %list-item;

      .input {
        @include input($color-2, $color-5);
        width: 100%;

        &.information {
          @extend %error-input;
        }
      }
      .input-error {
        @extend %form-error;
      }
    }
  }

  .form-controls {
    border-top: 1px solid $color-3;

    .confirm {
      @include button($color-5, $color-5-text);
      width: 100%;
    }
  }

  .form-error {
    @extend %form-error;
    text-align: center;
  }
}

</style>