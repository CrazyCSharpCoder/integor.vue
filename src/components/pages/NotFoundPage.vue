<template>
  <section class="not-found">
    <information-display
        title="Не существует страиницы с указанным адресом"
        :image-ref="require('@/assets/icons/errors/not-found.svg')"
    >
      <template #controls>
        <router-link
            :to="{name: $routeNames.bots}"
            class="to-main-page"
        >
          Вернуться на главную
        </router-link>
      </template>
    </information-display>
  </section>
</template>

<script>
import InformationDisplay from "@/components/primitives/InformationDisplay/InformationDisplay";

export default {
  components: {InformationDisplay}
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/controls/buttons";

.to-main-page {
  @include button();
}

</style>