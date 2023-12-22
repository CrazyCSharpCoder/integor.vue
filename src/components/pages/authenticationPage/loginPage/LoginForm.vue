<template>
  <form class="login" @submit.prevent="submitData">
    <div class="form-items">
      <div class="form-item">
        <input v-model="input.email" type="text" placeholder="Ваш E-Mail"
               :class="['input', {'error': emailInvalid}]"/>
        <div v-if="emailInvalid" class="input-error">
          {{outputFirst(v$.input.email)}}
        </div>
      </div>
      <div class="form-item">
        <input v-model="input.password" type="password" placeholder="Ваш пароль"
               :class="['input', {error: passwordInvalid}]"/>
        <div v-if="passwordInvalid" class="input-error">
          {{outputFirst(v$.input.password)}}
        </div>
      </div>
      <div class="form-item form-controls">
        <button class="confirm">Подтвердить</button>
      </div>
    </div>
  </form>
</template>

<script>
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";

import ErrorHandlerMixin from "@/components/mixins/ErrorHandlerMixin";
import VuelidatedFormMixin from "@/components/mixins/VuelidatedFormMixin";

export default {
  mixins: [
    ErrorHandlerMixin,
    VuelidatedFormMixin,
  ],
  data() {
    return {
      input: {
        email: '',
        password: '',
      }
    }
  },
  computed: {
    emailInvalid() {
      return Boolean(this.errorsCount(this.v$.input.email))
    },
    passwordInvalid() {
      return Boolean(this.errorsCount(this.v$.input.password))
    }
  },
  validations() {
    const emailValidators = this.$appConfiguration.validation.users.email
    const passwordValidators = this.$appConfiguration.validation.users.password

    return {
      input: {
        email: {
          required: helpers.withMessage(
              this.$modelValidation.required(),
              required
          ),
          maxLength: helpers.withMessage(
              this.$modelValidation.maxLength(
                  emailValidators.maxLength
              ),
              maxLength(emailValidators.maxLength)
          ),
          isEmail: helpers.withMessage(
              'Некорректный E-Mail',
              email => emailValidators.isEmail(email)
          )
        },
        password: {
          required: helpers.withMessage(
              this.$modelValidation.required(),
              required
          ),
          minLength: helpers.withMessage(
              `Минимальная длина пароля - ${passwordValidators.minLength} символов`,
              minLength(passwordValidators.minLength)
          ),
          maxLength: helpers.withMessage(
              `Максимальная длина пароля - ${passwordValidators.maxLength} символов`,
              maxLength(passwordValidators.maxLength)
          ),
          isValidPassword: helpers.withMessage(
              // TODO give more detailed error description
              'Некорректный пароль',
              password => passwordValidators.isValidPassword(password)
          )
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/controls/input";
@import "/src/assets/scss/controls/buttons";
@import "/src/assets/scss/patterns/contentAdjustment";
@import "/src/assets/scss/patterns/forms";

.login {
  width: 100%;

  .form-items {
    @include vertical-list($padding-step-large);

    .form-item {
      @extend %list-item;

      .input {
        width: 100%;

        &.error {
          @extend %error-input;
        }
      }
      input.input {
        @include input();
      }
      textarea.input {
        @include textarea();
        height: 120px;
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