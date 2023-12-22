<template>
  <div class="login-content">
    <div class="login-content-header">
      Вход в систему
    </div>
    <div class="login-form-container">
      <login-form :submit-event="$appEvents.user.login"/>
    </div>
    <div class="register-link-message">
      У Вас нет учётной записи? -
      <router-link :to="{name: $routeNames.auth.register}" class="register-link">
        зерегистрироваться
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

import LoginForm from "@/components/pages/authenticationPage/loginPage/LoginForm";

export default {
  name: "LoginPage",
  mixins: [
    DisposableEventsMixin,
    ErrorHandlerMixin
  ],
  components: {LoginForm},
  methods: {
    ...mapActions([
      'login'
    ]),
    async loginUser(credentials) {
      try {
        await this.login(credentials)
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
    this.registerEvent(this.$appEvents.user.login, this.loginUser, this)
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/patterns/text";
@import "/src/assets/scss/patterns/forms";

@import "/src/assets/scss/controls/buttons";

.login-content {
  width: 340px;

  display: flex;
  flex-direction: column;
  gap: $padding-step-large * 2;
}

.login-content-header {
  @extend %h2;
  text-align: center;
}

.login-form-container {
  padding: $page-section-vertical-gap $page-section-horizontal-gap-small;
  border-radius: $border-radius-large;
  background: $color-1-shade-2;
}

.error {
  @extend %form-error;
  text-align: center;
}

.register-link-message {
  text-align: center;

  .register-link {
    @extend %inline-link;
  }
}

</style>