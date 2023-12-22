<template>
  <section class="authentication-page">
    <div v-if="isAuth === true" class="return-link-container">
      <router-link :to="{name: $routeNames.bots}">К моим ботам</router-link>
    </div>
    <main class="authentication-page-content">
      <loading-display v-if="isAuth === undefined"/>
      <div class="authorized-message" v-else-if="isAuth">
        <h2>Вы уже авторизованы</h2>
        <p>
          Выйдите из учётной записи,
          чтобы совершить вход в другой аккаунт или создать новый
        </p>
        <button @click="logoutUser" class="logout">Выйти</button>
        <p class="error">
          {{theError}}
        </p>
      </div>
      <div v-else class="authentication-form-container">
        <router-view></router-view>
      </div>
    </main>
    <integor-footer>
      Auth
    </integor-footer>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import ErrorHandlerMixin from "@/components/mixins/ErrorHandlerMixin";

import IntegorFooter from "@/components/primitives/IntegorFooter";
import LoadingDisplay from "@/components/primitives/informationDisplay/LoadingDisplay";

export default {
  name: 'AuthenticationPage',
  mixins: [
    ErrorHandlerMixin
  ],
  components: {LoadingDisplay, IntegorFooter},
  computed: {
    ...mapGetters(['isAuth'])
  },
  methods: {
    ...mapActions(['logout']),
    async logoutUser() {
      try {
        await this.logout()
      }
      catch (error) {
        this.setTheError(
            this.createErrorMessage(error)
        )
      }
    }
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/contentAdjustment";

@import "/src/assets/scss/patterns/text";
@import "/src/assets/scss/patterns/contentAdjustment";
@import "/src/assets/scss/patterns/forms";

@import "/src/assets/scss/controls/buttons";

.authentication-page {
  @extend %include-headers;
}

.authentication-page, .authentication-page-content {
  @extend %full-page-content;
}

.authentication-page-content {
  justify-content: center;
  align-items: center;
}

.authorized-message {
  width: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  gap: $padding-step-large * 2;
}

.logout {
  @extend %primary-button;
  width: 150px;
}

.error {
  @extend %form-error;
}

.return-link-container {
  padding: $padding-step-large * 2;

  a {
    position: relative;
    padding-left: 30px;

    text-decoration: none;
    color: $color-contrast;
  }

  > a::before {
    @include icon('/src/assets/icons/go-back.svg', 30px);
    top: -7px;
    left: 0;
    position: absolute;
    content: '';
  }
}

</style>