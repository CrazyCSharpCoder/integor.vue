<template>
  <div class="register-content">
    <div class="register-content-header">
      Создание учётной записи
    </div>
    <div class="register-form-container">
      <register-form :submit-event="$appEvents.user.register"/>
    </div>
    <div class="login-link-message">
      Вы - зарегистрированный пользователь? -
      <router-link :to="$routeNames.auth.login" class="login-link">
        войти
      </router-link>
    </div>
    <div v-if="theError" class="error">
      {{theError}}
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

import DisposableEventsMixin from "@/components/mixins/DisposableEventsMixin";
import ErrorHandlerMixin from "@/components/mixins/ErrorHandlerMixin";

import RegisterForm from "@/components/pages/authenticationPage/registerPage/RegisterForm";

export default {
  name: "RegisterPage",
  mixins: [
    DisposableEventsMixin,
    ErrorHandlerMixin
  ],
  components: {RegisterForm},
  methods: {
    ...mapActions([
      'register'
    ]),
    async registerUser(data) {
      try {
        await this.register(data)
      }
      catch (error) {
        this.setTheError(
            this.createErrorMessage(error)
        )
        return
      }

      await this.$router.push({
        name: this.$routeNames.bots
      })
    }
  },
  created() {
    this.registerEvent(this.$appEvents.user.register, this.registerUser, this)
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/patterns/text";
@import "/src/assets/scss/patterns/forms";

@import "/src/assets/scss/controls/buttons";

.register-content {
  width: 340px;

  display: flex;
  flex-direction: column;
  gap: $padding-step-large;
}

.register-content-header {
  @extend %h2;
  text-align: center;
}

.register-form-container {
  padding: $page-section-vertical-gap $page-section-horizontal-gap-small;
  border-radius: $border-radius-large;
  background: $color-1-shade-2;
}

.error {
  @extend %form-error;
  text-align: center;
}

.login-link-message {
  text-align: center;

  .login-link {
    @extend %inline-link;
  }
}

</style>