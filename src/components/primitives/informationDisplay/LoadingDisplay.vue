<template>
  <information-display
      title="Загрузка"
      description="Пожалуйста, подождите"
  >
    <template #image>
      <loading-animation/>
    </template>
  </information-display>
</template>

<script>
import InformationDisplay from "@/components/primitives/informationDisplay/InformationDisplay";
import LoadingAnimation from "@/components/primitives/informationDisplay/primitives/LoadingAnimation";

export default {
  name: "LoadingDisplay",
  components: {LoadingAnimation, InformationDisplay}
}
</script>

<style scoped>

</style>