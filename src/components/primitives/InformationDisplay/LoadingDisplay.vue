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
import InformationDisplay from "@/components/primitives/InformationDisplay/InformationDisplay";
import LoadingAnimation from "@/components/primitives/InformationDisplay/primitives/LoadingAnimation";

export default {
  name: "LoadingDisplay",
  components: {LoadingAnimation, InformationDisplay}
}
</script>

<style scoped>

</style>